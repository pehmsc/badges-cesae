// Adiciona coluna template_id à tabela events
const sequelize = require("../config/database");

async function migrate() {
  try {
    await sequelize.authenticate();
    await sequelize.query(`
      ALTER TABLE events
      ADD COLUMN IF NOT EXISTS template_id INTEGER REFERENCES badge_templates(id) ON DELETE SET NULL;
    `);
    console.log("Coluna template_id adicionada com sucesso.");
  } catch (error) {
    console.error("Erro na migração:", error.message);
  } finally {
    await sequelize.close();
  }
}

migrate();
