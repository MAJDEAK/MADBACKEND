const Publisher = require("../models/publisher.model");

// إضافة ناشر جديد
exports.addPublisher = async (req, res) => {
  try {
    const { pname, city } = req.body;

    const publisherId = await Publisher.create({
      pname,
      city,
    });

    res.status(201).json({
      message: "تم إضافة الناشر بنجاح",
      publisherId,
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على جميع الناشرين
exports.getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.findAll();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على ناشر بواسطة المعرف
exports.getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: "الناشر غير موجود" });
    }
    res.json(publisher);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// البحث عن ناشر بواسطة الاسم
exports.searchPublishersByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "يرجى تقديم اسم للبحث" });
    }

    const publishers = await Publisher.findByName(name);
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// الحصول على كتب ناشر معين
exports.getPublisherBooks = async (req, res) => {
  try {
    const books = await Publisher.getPublisherBooks(req.params.id);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};


// حذف جميع الناشرين
exports.deleteAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.deleteAll();
    res.status(200).json({ message: "تم حذف جميع الناشرين بنجاح", deletedCount: publishers.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};
