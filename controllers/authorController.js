const Author = require("../models/author.model");

// إضافة مؤلف جديد
exports.addAuthor = async (req, res) => {
  try {
    const { fname, lname, country, city, address } = req.body;

    const authorId = await Author.create({
      fname,
      lname,
      country,
      city,
      address,
    });

    res.status(201).json({
      message: "تم إضافة المؤلف بنجاح",
      authorId,
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على جميع المؤلفين
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على مؤلف بواسطة المعرف
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "المؤلف غير موجود" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// البحث عن مؤلف بواسطة الاسم
exports.searchAuthorsByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "يرجى تقديم اسم للبحث" });
    }

    const authors = await Author.findByName(name);
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على كتب مؤلف معين
exports.getAuthorBooks = async (req, res) => {
  try {
    const books = await Author.getAuthorBooks(req.params.id);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};


// حذف جميع المؤلفين
exports.deleteAllAuthors = async (req, res) => {
  try {
    const authors = await Author.deleteAll();
    res.status(200).json({ message: "تم حذف جميع المؤلفين بنجاح", deletedCount: authors.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};
