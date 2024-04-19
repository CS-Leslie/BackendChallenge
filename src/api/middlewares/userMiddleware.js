import database from "../../config/db.js";

const checkUserExists = async (req, res, next) => {
  const email = req.query.email || req.body.email; 
  try {
    const result = await database.query("SELECT 1 FROM users WHERE email = $1", [email]);
    if (result.rowCount > 0) {
      req.userExists = true;
    } else {
      req.userExists = false;
    }
    next();
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { checkUserExists };