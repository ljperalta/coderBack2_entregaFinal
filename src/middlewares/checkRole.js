module.exports = function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const user = req.user;

      // Si no hay usuario o su rol no está en la lista permitida
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).render('accessDenied', { layout: false });
      }

      next();
    } catch (err) {
      console.error("Error en middleware de rol:", err);
      res.status(500).json({ message: "Error interno en verificación de roles" });
    }
  };
};