module.exports = function checkRole(requiredRole) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user || user.role !== requiredRole) {
        return res.status(403).json({ message: "Acceso denegado: permiso insuficiente" });
      }

      next();
    } catch (err) {
      console.error("Error en middleware de rol:", err);
      res.status(500).json({ message: "Error interno en verificación de roles" });
    }
  };
};
