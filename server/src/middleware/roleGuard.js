// server/src/middleware/roleGuard.js
// Middleware de verificação de role

function roleGuard(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Sem permissão para aceder a este recurso",
      });
    }

    next();
  };
}

module.exports = { roleGuard };
