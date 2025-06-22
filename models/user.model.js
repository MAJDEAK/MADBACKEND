const sql = require("./db.js");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.isAdmin = user.isAdmin || false;
};

User.create = async (newUser) => {
  try {
    const [res] = await sql.query("INSERT INTO `Users` SET ?", newUser);
    return { id: res.insertId, ...newUser };
  } catch (err) {
    throw err;
  }
};

User.findByUsername = async (username) => {
  try {
    const [rows] = await sql.query(
      `SELECT * FROM \`Users\` WHERE username = ?`,
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
