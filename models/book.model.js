const path = require("path");
const db = require(path.join(__dirname, "db"));

class Book {
  static async create(bookData) {
    const { title, type, price, pubId, authorId } = bookData;

    const [result] = await db.execute(
      "INSERT INTO `Book` (Title, Type, Price, PubId, AuthorId) VALUES (?, ?, ?, ?, ?)",
      [title, type, price, pubId, authorId]
    );

    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute(
      `SELECT b.Id, b.Title, b.Type, b.Price, b.PubId, b.AuthorId, a.Id as AuthorId, a.FName as AuthorFName, a.LName as AuthorLName, a.Country as AuthorCountry, a.City as AuthorCity, a.Address as AuthorAddress, p.Id as PubId, p.PName as PublisherName, p.City as PublisherCity
       FROM \`Book\` b
       LEFT JOIN \`Author\` a ON b.AuthorId = a.Id
       LEFT JOIN \`Publisher\` p ON b.PubId = p.Id`
    );

    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT b.Id, b.Title, b.Type, b.Price, b.PubId, b.AuthorId, a.Id as AuthorId, a.FName as AuthorFName, a.LName as AuthorLName, a.Country as AuthorCountry, a.City as AuthorCity, a.Address as AuthorAddress, p.Id as PubId, p.PName as PublisherName, p.City as PublisherCity
       FROM \`Book\` b
       LEFT JOIN \`Author\` a ON b.AuthorId = a.Id
       LEFT JOIN \`Publisher\` p ON b.PubId = p.Id
       WHERE b.Id = ?`,
      [id]
    );

    return rows[0];
  }

  static async findByTitle(title) {
    const [rows] = await db.execute(
      `SELECT b.Id, b.Title, b.Type, b.Price, b.PubId, b.AuthorId, a.FName as AuthorFName, a.LName as AuthorLName, p.PName as PublisherName
       FROM \`Book\` b
       LEFT JOIN \`Author\` a ON b.AuthorId = a.Id
       LEFT JOIN \`Publisher\` p ON b.PubId = p.Id
       WHERE b.Title LIKE ?`,
      [`%${title}%`]
    );

    return rows;
  }
  static async deleteAll() {
    const [result] = await db.execute("DELETE FROM `Book`");
    return result;
  }
}

module.exports = Book;
