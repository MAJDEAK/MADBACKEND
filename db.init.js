const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

async function initializeDatabase() {
  // إنشاء اتصال بدون تحديد قاعدة بيانات
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    // إنشاء قاعدة البيانات إذا لم تكن موجودة
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`تم إنشاء قاعدة البيانات ${process.env.DB_NAME}`);

    // استخدام قاعدة البيانات
    await connection.query(`USE ${process.env.DB_NAME}`);

    // إنشاء جدول المستخدمين
    await connection.query(`
      CREATE TABLE IF NOT EXISTS User (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(50) UNIQUE NOT NULL,
        Password VARCHAR(255) NOT NULL,
        FName VARCHAR(50) NOT NULL,
        LName VARCHAR(50) NOT NULL,
        IsAdmin BOOLEAN DEFAULT FALSE
      )
    `);
    console.log("تم إنشاء جدول المستخدمين");

    // إنشاء جدول المؤلفين
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Author (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        FName VARCHAR(50) NOT NULL,
        LName VARCHAR(50) NOT NULL,
        Country VARCHAR(50),
        City VARCHAR(50),
        Address VARCHAR(255)
      )
    `);
    console.log("تم إنشاء جدول المؤلفين");

    // إنشاء جدول الناشرين
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Publisher (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        PName VARCHAR(100) NOT NULL,
        City VARCHAR(50)
      )
    `);
    console.log("تم إنشاء جدول الناشرين");

    // إنشاء جدول الكتب
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Book (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Title VARCHAR(255) NOT NULL,
        Type VARCHAR(50),
        Price DECIMAL(10, 2),
        PubId INT,
        AuthorId INT,
        FOREIGN KEY (PubId) REFERENCES Publisher(Id),
        FOREIGN KEY (AuthorId) REFERENCES Author(Id)
      )
    `);
    console.log("تم إنشاء جدول الكتب");

    // إضافة بيانات افتراضية للناشرين
    const [publisherRows] = await connection.query("SELECT * FROM Publisher");
    if (publisherRows.length === 0) {
      await connection.query("INSERT INTO Publisher (PName, City) VALUES (?, ?)", ["دار الشروق", "القاهرة"]);
      await connection.query("INSERT INTO Publisher (PName, City) VALUES (?, ?)", ["مكتبة لبنان ناشرون", "بيروت"]);
      console.log("تم إضافة بيانات الناشرين الافتراضية");
    }

    // إضافة بيانات افتراضية للمؤلفين
    const [authorRows] = await connection.query("SELECT * FROM Author");
    if (authorRows.length === 0) {
      await connection.query("INSERT INTO Author (FName, LName, Country, City, Address) VALUES (?, ?, ?, ?, ?)", ["نجيب", "محفوظ", "مصر", "القاهرة", "شارع النيل"]);
      await connection.query("INSERT INTO Author (FName, LName, Country, City, Address) VALUES (?, ?, ?, ?, ?)", ["أحمد", "خالد توفيق", "مصر", "طنطا", "شارع الجامعة"]);
      console.log("تم إضافة بيانات المؤلفين الافتراضية");
    }

    // إضافة بيانات افتراضية للكتب
    const [bookRows] = await connection.query("SELECT * FROM Book");
    if (bookRows.length === 0) {
      // افتراض أن الناشر الأول (دار الشروق) والمؤلف الأول (نجيب محفوظ) لهما Id = 1
      // وافتراض أن الناشر الثاني (مكتبة لبنان ناشرون) والمؤلف الثاني (أحمد خالد توفيق) لهما Id = 2
      await connection.query("INSERT INTO Book (Title, Type, Price, PubId, AuthorId) VALUES (?, ?, ?, ?, ?)", ["بين القصرين", "رواية", 75.00, 1, 1]);
      await connection.query("INSERT INTO Book (Title, Type, Price, PubId, AuthorId) VALUES (?, ?, ?, ?, ?)", ["أرض السافلين", "رواية", 60.00, 2, 2]);
      console.log("تم إضافة بيانات الكتب الافتراضية");
    }

    // التحقق من وجود مستخدم مدير
    const [adminRows] = await connection.query(
      "SELECT * FROM User WHERE Username = ?",
      ["admin"]
    );

    if (adminRows.length === 0) {
      // إنشاء كلمة مرور مشفرة
      const hashedPassword = await bcrypt.hash("admin123", 10);

      // إضافة مستخدم مدير افتراضي
      await connection.query(
        `
        INSERT INTO User (Username, Password, FName, LName, IsAdmin)
        VALUES (?, ?, ?, ?, ?)
      `,
        ["admin", hashedPassword, "Admin", "User", true]
      );

      console.log("تم إضافة مستخدم مدير افتراضي");
    }

    console.log("تم تهيئة قاعدة البيانات بنجاح");
  } catch (error) {
    console.error("خطأ في تهيئة قاعدة البيانات:", error);
  } finally {
    await connection.end();
  }
}

module.exports = initializeDatabase;
