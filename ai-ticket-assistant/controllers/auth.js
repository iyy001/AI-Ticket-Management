import jwt from "jsonwebtoken";

export const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token found." });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
