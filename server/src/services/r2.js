// server/src/services/r2.js
// Upload de ficheiros para Cloudflare R2

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "certs-badges-cesae";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "https://pub-ddb7ff25ed4c42faa1bc9b366ec8b459.r2.dev";

function getR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

function isR2Configured() {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

async function uploadToR2(buffer, key, contentType) {
  const client = getR2Client();
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );
    const url = `${R2_PUBLIC_URL}/${key}`;
    console.log(`R2 upload OK: ${url}`);
    return url;
  } catch (err) {
    console.error(`R2 upload ERRO [${key}]:`, err.message, err.$metadata);
    throw err;
  }
}

module.exports = { uploadToR2, isR2Configured };
