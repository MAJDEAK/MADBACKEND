const sql = require("./db.js");
const bcrypt = require("bcrypt");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.isAdmin = user.isAdmin || false;
};

User.create = async (newUser) => {
  try {
    const { username, password, fname, lname, isAdmin } = newUser;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [res] = await sql.query(
      "INSERT INTO `Users` (Username, Password, FName, LName, IsAdmin) VALUES (?, ?, ?, ?, ?)",
      [username, hashedPassword, fname, lname, isAdmin || false]
    );

    return { id: res.insertId, username, fname, lname, isAdmin };
  } catch (err) {
    throw err;
  }
};

User.findByUsername = async (username) => {
  try {
    const [rows] = await sql.query(
      `SELECT * FROM \`Users\` WHERE Username = ?`,
      [username]
    );
    return rows.length ? rows[0] : null;
  } catch (err) {
    throw err;
  }
};

User.findById = async (id) => {
  try {
    const [rows] = await sql.query(`SELECT * FROM \`Users\` WHERE Id = ?`, [
      id,
    ]);
    return rows.length ? rows[0] : null;
  } catch (err) {
    throw err;
  }
};

module.exports = User;
