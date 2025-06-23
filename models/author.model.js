const path = require("path");
const db = require(path.join(__dirname, "db"));

class Author {
  static async create(authorData) {
    const { fname, lname, country, city, address } = authorData;

    const [result] = await db.execute(
      "INSERT INTO `Author` (FName, LName, Country, City, Address) VALUES (?, ?, ?, ?, ?)",
      [fname, lname, country, city, address]
    );

    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute(
      "SELECT Id, FName, LName, Country, City, Address FROM `Author`"
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      "SELECT Id, FName, LName, Country, City, Address FROM `Author` WHERE Id = ?",
      [id]
    );

    return rows.length ? rows[0] : null;
  }

  static async findByName(name) {
    const [rows] = await db.execute(
      "SELECT Id, FName, LName, Country, City, Address FROM `Author` WHERE FName LIKE ? OR LName LIKE ?",
      [`%${name}%`, `%${name}%`]
    );

    return rows;
  }

  static async getAuthorBooks(id) {
    const [rows] = await db.execute(
      `SELECT b.*, p.PName as PublisherName
       FROM \`Book\` b
       JOIN \`Publisher\` p ON b.PubId = p.Id
       WHERE b.AuthorId = ?`,
      [id]
    );

    return rows;
  }

  static async deleteAll() {
    const [result] = await db.execute("DELETE FROM `Author`");
    return result;
  }
}
module.exports = Author;
