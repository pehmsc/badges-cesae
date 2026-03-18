// server/src/services/certificateGenerator.js
// Gera certificados PDF para eventos usando Puppeteer + HTML template

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // npm i uuid if needed

const CERTIFICATES_DIR = path.join(__dirname, "../../../uploads/certificates");
if (!fs.existsSync(CERTIFICATES_DIR)) {
  fs.mkdirSync(CERTIFICATES_DIR, { recursive: true });
}

/**
 * Gera HTML template para certificado PDF
 */
function generateCertificateHTML({
  participantName,
  eventTitle,
  eventType,
  date,
  durationHours,
  validationCode,
}) {
  const badgeType =
    eventType === "curso" ? "Conclusão do Curso" : "Participação no Evento";
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Certificado - CESAE Digital</title>
  <style>
    @page { margin: 2cm; }
    body { font-family: Arial, sans-serif; max-width: 21cm; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #1B4F72; }
    .badge-type { background: linear-gradient(90deg, #1B4F72, #8E44AD); color: white; padding: 10px 20px; display: inline-block; margin: 20px 0; border-radius: 5px; }
    .participant { font-size: 32px; font-weight: bold; text-align: center; margin: 40px 0; color: #1C2833; }
    .event-title { font-size: 24px; text-align: center; margin: 30px 0; color: #1B4F72; }
    .details { text-align: center; color: #566573; margin: 20px 0; }
    .validation { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 40px 0; text-align: center; }
    .code { font-size: 24px; font-weight: bold; color: #1B4F72; letter-spacing: 3px; }
    .footer { margin-top: 60px; text-align: center; color: #566573; font-size: 12px; border-top: 1px solid #dee2e6; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">CESAE DIGITAL</div>
    <div class="badge-type">${badgeType}</div>
  </div>
  
  <div class="participant">CERTIFICADO DE ${badgeType.toUpperCase()}</div>
  
  <p style="text-align: center; font-size: 18px; margin-bottom: 20px;">
    É certificado que <strong>${participantName}</strong>
  </p>
  
  <div class="event-title"><strong>${eventTitle}</strong></div>
  
  <div class="details">
    📅 ${date} | ⏱ ${durationHours || "N/A"} horas
  </div>
  
  <div class="validation">
    <div style="font-size: 16px; margin-bottom: 10px;">Código de Validação</div>
    <div class="code">${validationCode}</div>
    <div style="font-size: 12px; color: #6b7280; margin-top: 10px;">
      badges.cesae.pt/validate/${validationCode}
    </div>
  </div>
  
  <div class="footer">
    Emitido em ${new Date().toLocaleDateString("pt-PT")} | CESAE Digital © 2026<br>
    Verificar autenticidade em badges.cesae.pt/validate
  </div>
</body>
</html>`;
}

/**
 * Gera PDF para uma enrollment
 */
async function generateCertificatePDF(enrollmentData) {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const validationCode = uuidv4().slice(0, 8).toUpperCase(); // Short unique code
    const html = generateCertificateHTML({
      participantName: enrollmentData.participantName,
      eventTitle: enrollmentData.eventTitle,
      eventType: enrollmentData.eventType,
      date: enrollmentData.date,
      durationHours: enrollmentData.durationHours,
      validationCode,
    });

    await page.setContent(html, { waitUntil: "networkidle0" });

    const filename = `cert_${validationCode}.pdf`;
    const filepath = path.join(CERTIFICATES_DIR, filename);
    await page.pdf({
      path: filepath,
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px" },
    });

    await browser.close();

    return {
      filename,
      filepath,
      pdf_url: `/uploads/certificates/${filename}`,
      validation_code: validationCode,
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
}

/**
 * Gera certificates para todos eligible enrollments de um event
 */
async function generateCertificatesForEvent(event) {
  const eligibleEnrollments = event.enrollments.filter((e) => {
    if (event.type === "evento") return e.status === "presente";
    if (event.type === "curso") return e.evaluation_result === "aprovado";
    return false;
  });

  const results = [];
  for (const enrollment of eligibleEnrollments) {
    try {
      const cert = await generateCertificatePDF({
        participantName: enrollment.participant.name,
        eventTitle: event.title,
        eventType: event.type,
        date: new Date(event.start_date).toLocaleDateString("pt-PT"),
        durationHours: event.duration_hours,
      });

      results.push({
        enrollmentId: enrollment.id,
        certificate: cert,
        success: true,
      });
    } catch (error) {
      results.push({
        enrollmentId: enrollment.id,
        error: error.message,
        success: false,
      });
    }
  }
  return results;
}

module.exports = {
  generateCertificatePDF,
  generateCertificatesForEvent,
};
