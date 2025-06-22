const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "الوصول مرفوض. مطلوب صلاحيات المدير." });
  }
  next();
};

module.exports = admin;
