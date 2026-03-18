const Certificate = require("../models/Certificate");
const Enrollment = require("../models/Enrollment");
const Event = require("../models/Event");
const crypto = require("crypto");

/**
 * Gera código de validação único no formato CESAE-YYYY-XXXX-YYYY
 * @param {number} enrollmentId - ID da enrollment para obter ano do evento
 * @returns {Promise<string>} - Código único garantido
 */
async function generateValidationCode(enrollmentId) {
  const enrollment = await Enrollment.findByPk(enrollmentId, {
    include: [{ model: Event, as: "event" }],
  });

  if (!enrollment || !enrollment.event) {
    throw new Error("Enrollment ou evento não encontrado");
  }

  const year = enrollment.event.start_date.getFullYear();

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    // Generate 4 alphanum chunks
    const chunk1 = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()
      .substring(0, 4)
      .replace(/[^A-Z0-9]/g, "A");
    const chunk2 = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()
      .substring(0, 4)
      .replace(/[^A-Z0-9]/g, "B");

    const code = `CESAE-${year}-${chunk1}-${chunk2}`;

    try {
      // Test uniqueness by trying to create (will fail if duplicate due to unique constraint)
      await Certificate.create(
        { validation_code: code, enrollment_id: enrollmentId },
        { validateModel: true },
      );
      await Certificate.destroy({ where: { validation_code: code } }); // Cleanup test record

      return code;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        attempts++;
        continue;
      }
      throw error;
    }
  }

  throw new Error("Não foi possível gerar código único após várias tentativas");
}

// Stub para future PDF generation
async function generateCertificatePDF(enrollmentId, templatePath = null) {
  // TODO: Implement PDFKit or puppeteer
  return `/uploads/certificates/cert_${enrollmentId}_${Date.now()}.pdf`;
}

module.exports = {
  generateValidationCode,
  generateCertificatePDF,
};
