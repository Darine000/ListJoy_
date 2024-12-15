exports.authMiddleware = (req, res, next) => {
  const userProfile = req.headers["x-user-profile"];
  if (!userProfile || (userProfile !== "admin" && userProfile !== "user")) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  req.userProfile = userProfile; 
  next();
};
