// server/src/routes/templates.js
// Rotas de templates de badges — protegidas por JWT

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const { roleGuard } = require("../middleware/roleGuard");
const { listTemplates, createTemplate, updateTemplate, deleteTemplate } = require("../controllers/templateController");

router.get("/", authMiddleware, listTemplates);
router.post("/", authMiddleware, roleGuard("admin"), createTemplate);
router.put("/:id", authMiddleware, roleGuard("admin"), updateTemplate);
router.delete("/:id", authMiddleware, roleGuard("admin"), deleteTemplate);

module.exports = router;
