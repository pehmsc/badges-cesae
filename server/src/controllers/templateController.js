// server/src/controllers/templateController.js
// CRUD de templates de badges

const { BadgeTemplate } = require("../models");

// GET /api/templates
async function listTemplates(req, res) {
  try {
    const templates = await BadgeTemplate.findAll({
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json(templates);
  } catch (error) {
    console.error("Erro ao listar templates:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// POST /api/templates
async function createTemplate(req, res) {
  try {
    const { name, type, is_default, design_config } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    if (is_default) {
      await BadgeTemplate.update({ is_default: false }, { where: {} });
    }

    const template = await BadgeTemplate.create({
      name,
      type: type || null,
      is_default: is_default || false,
      design_config: design_config || null,
      created_by: req.user.id,
    });

    return res.status(201).json(template);
  } catch (error) {
    console.error("Erro ao criar template:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// PUT /api/templates/:id
async function updateTemplate(req, res) {
  try {
    const { id } = req.params;
    const { name, type, is_default, design_config } = req.body;

    const template = await BadgeTemplate.findByPk(id);
    if (!template) {
      return res.status(404).json({ error: "Template não encontrado" });
    }

    if (is_default) {
      await BadgeTemplate.update({ is_default: false }, { where: {} });
    }

    await template.update({
      name: name ?? template.name,
      type: type !== undefined ? type : template.type,
      is_default: is_default !== undefined ? is_default : template.is_default,
      design_config: design_config !== undefined ? design_config : template.design_config,
    });

    return res.status(200).json(template);
  } catch (error) {
    console.error("Erro ao atualizar template:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// DELETE /api/templates/:id
async function deleteTemplate(req, res) {
  try {
    const { id } = req.params;
    const template = await BadgeTemplate.findByPk(id);
    if (!template) {
      return res.status(404).json({ error: "Template não encontrado" });
    }
    await template.destroy();
    return res.status(200).json({ message: "Template eliminado" });
  } catch (error) {
    console.error("Erro ao eliminar template:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = { listTemplates, createTemplate, updateTemplate, deleteTemplate };
