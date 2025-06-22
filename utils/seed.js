const path = require('path');
const db = require(path.resolve(__dirname, '../models/db'));
const Book = require(path.resolve(__dirname, '../models/book.model'));
const Author = require(path.resolve(__dirname, '../models/author.model'));
const Publisher = require(path.resolve(__dirname, '../models/publisher.model'));

const seedData = async () => {
  try {
    // Clear existing data
    await Book.deleteAll();
    await Author.deleteAll();
    await Publisher.deleteAll();

    console.log("Existing data cleared.");

    // Add default authors
    const author1Id = await Author.create({
      fname: "نجيب",
      lname: "محفوظ",
      country: "مصر",
      city: "القاهرة",
      address: "شارع النيل",
    });
    const author2Id = await Author.create({
      fname: "أحمد",
      lname: "مراد",
      country: "مصر",
      city: "الجيزة",
      address: "شارع الهرم",
    });
    const author3Id = await Author.create({
      fname: "غادة",
      lname: "السمان",
      country: "سوريا",
      city: "دمشق",
      address: "شارع الحمراء",
    });

    console.log("Default authors added.");

    // Add default publishers
    const publisher1Id = await Publisher.create({
      pname: "دار الشروق",
      city: "القاهرة",
    });
    const publisher2Id = await Publisher.create({
      pname: "الدار المصرية اللبنانية",
      city: "القاهرة",
    });
    const publisher3Id = await Publisher.create({
      pname: "منشورات ضفاف",
      city: "بيروت",
    });

    console.log("Default publishers added.");

    // Add default books
    await Book.create({
      title: "أولاد حارتنا",
      type: "رواية",
      price: 50.0,
      pubId: publisher1Id,
      authorId: author1Id,
    });
    await Book.create({
      title: "تراب الماس",
      type: "رواية بوليسية",
      price: 65.0,
      pubId: publisher2Id,
      authorId: author2Id,
    });
    await Book.create({
      title: "يا مالكاً قلبي",
      type: "شعر",
      price: 40.0,
      pubId: publisher3Id,
      authorId: author3Id,
    });
    await Book.create({
      title: "زقاق المدق",
      type: "رواية",
      price: 45.0,
      pubId: publisher1Id,
      authorId: author1Id,
    });
    await Book.create({
      title: "1919",
      type: "رواية تاريخية",
      price: 70.0,
      pubId: publisher2Id,
      authorId: author2Id,
    });

    console.log("Default books added.");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedData();
