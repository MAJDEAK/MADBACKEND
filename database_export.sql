-- تصدير قاعدة بيانات المكتبة الإلكترونية
-- E-Library Database Export for FreeSQLDatabase

-- استخدام قاعدة البيانات الموجودة (لا نحتاج إنشاء جديدة)
-- USE sql12786241;

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS User (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FName VARCHAR(50) NOT NULL,
    LName VARCHAR(50) NOT NULL,
    IsAdmin BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول المؤلفين
CREATE TABLE IF NOT EXISTS Author (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FName VARCHAR(50) NOT NULL,
    LName VARCHAR(50) NOT NULL,
    Country VARCHAR(50),
    City VARCHAR(50),
    Address VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول الناشرين
CREATE TABLE IF NOT EXISTS Publisher (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    PName VARCHAR(100) NOT NULL,
    City VARCHAR(50),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول الكتب
CREATE TABLE IF NOT EXISTS Book (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Type VARCHAR(50),
    Price DECIMAL(10, 2),
    PubId INT,
    AuthorId INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PubId) REFERENCES Publisher(Id) ON DELETE SET NULL,
    FOREIGN KEY (AuthorId) REFERENCES Author(Id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- إدراج البيانات الافتراضية

-- مستخدم مدير
INSERT INTO User (Username, Password, FName, LName, IsAdmin) VALUES 
('admin', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'مدير', 'النظام', TRUE);

-- ناشرين
INSERT INTO Publisher (PName, City) VALUES 
('دار الشروق', 'القاهرة'),
('مكتبة لبنان ناشرون', 'بيروت'),
('دار الآداب', 'بيروت'),
('المؤسسة العربية للدراسات والنشر', 'بيروت');

-- مؤلفين
INSERT INTO Author (FName, LName, Country, City, Address) VALUES 
('نجيب', 'محفوظ', 'مصر', 'القاهرة', 'حي الجمالية'),
('أحمد خالد', 'توفيق', 'مصر', 'طنطا', 'شارع الجمهورية'),
('غادة', 'السمان', 'سوريا', 'دمشق', 'حي المزة'),
('عبد الرحمن', 'منيف', 'السعودية', 'الرياض', 'حي الملز');

-- كتب
INSERT INTO Book (Title, Type, Price, PubId, AuthorId) VALUES 
('بين القصرين', 'رواية', 45.00, 1, 1),
('قصر الشوق', 'رواية', 40.00, 1, 1),
('السكرية', 'رواية', 42.00, 1, 1),
('أرض السافلين', 'رواية', 35.00, 2, 2),
('يوتوبيا', 'رواية', 30.00, 2, 2),
('بيروت 75', 'رواية', 38.00, 3, 3),
('مدن الملح', 'رواية', 55.00, 4, 4);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_book_title ON Book(Title);
CREATE INDEX idx_book_author ON Book(AuthorId);
CREATE INDEX idx_book_publisher ON Book(PubId);
CREATE INDEX idx_author_name ON Author(FName, LName);
CREATE INDEX idx_publisher_name ON Publisher(PName);
CREATE INDEX idx_user_username ON User(Username);

-- عرض إحصائيات
SELECT 'Database Setup Complete' as Status;
SELECT COUNT(*) as TotalUsers FROM User;
SELECT COUNT(*) as TotalAuthors FROM Author;
SELECT COUNT(*) as TotalPublishers FROM Publisher;
SELECT COUNT(*) as TotalBooks FROM Book;
