const Book = require("../models/book.model");

// إضافة كتاب جديد
exports.addBook = async (req, res) => {
  try {
    const { title, type, price, pubId, authorId } = req.body;

    const bookId = await Book.create({
      title,
      type,
      price,
      pubId,
      authorId,
    });

    res.status(201).json({
      message: "تم إضافة الكتاب بنجاح",
      bookId,
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على جميع الكتب
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على كتاب بواسطة المعرف
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "الكتاب غير موجود" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// البحث عن كتاب بواسطة العنوان
exports.searchBooksByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: "يرجى تقديم عنوان للبحث" });
    }

    const books = await Book.findByTitle(title);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// حذف جميع الكتب
exports.deleteAllBooks = async (req, res) => {
  try {
    const books = await Book.deleteAll();
    res.status(200).json({ message: "تم حذف جميع الكتب بنجاح", deletedCount: books.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};
