const path = require("path");
const db = require(path.join(__dirname, "./db"));

class Publisher {
  static async create(publisherData) {
    const { pname, city } = publisherData;

    const [result] = await db.execute(
      "INSERT INTO `Publisher` (PName, City) VALUES (?, ?)",
      [pname, city]
    );

    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute("SELECT Id, PName, City FROM `Publisher`");
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      "SELECT Id, PName, City FROM `Publisher` WHERE Id = ?",
      [id]
    );

    return rows.length ? rows[0] : null;
  }

  static async findByName(name) {
    const [rows] = await db.execute(
      "SELECT Id, PName, City FROM `Publisher` WHERE PName LIKE ?",
      [`%${name}%`]
    );

    return rows;
  }

  static async getPublisherBooks(id) {
    const [rows] = await db.execute(
      `SELECT b.*, a.FName as AuthorFName, a.LName as AuthorLName, p.PName as PublisherName, p.City as PublisherCity
       FROM \`Book\` b
       JOIN \`Author\` a ON b.AuthorId = a.Id
       JOIN \`Publisher\` p ON b.PubId = p.Id
       WHERE b.PubId = ?`,
      [id]
    );

    return rows;
  }

  static async deleteAll() {
    const [result] = await db.execute("DELETE FROM `Publisher`");
    return result;
  }
}

module.exports = Publisher;
