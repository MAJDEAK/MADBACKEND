-- FIXED DATABASE FOR FREESQLDATABASE
-- Run this in phpMyAdmin for sql12786241

-- Create Users Table (renamed from User to avoid conflicts)
CREATE TABLE IF NOT EXISTS `Users` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Username` VARCHAR(50) UNIQUE NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `FName` VARCHAR(50) NOT NULL,
    `LName` VARCHAR(50) NOT NULL,
    `IsAdmin` BOOLEAN DEFAULT FALSE,
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Authors Table
CREATE TABLE IF NOT EXISTS `Author` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `FName` VARCHAR(50) NOT NULL,
    `LName` VARCHAR(50) NOT NULL,
    `Country` VARCHAR(50),
    `City` VARCHAR(50),
    `Address` VARCHAR(255),
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Publishers Table
CREATE TABLE IF NOT EXISTS `Publisher` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `PName` VARCHAR(100) NOT NULL,
    `City` VARCHAR(50),
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Books Table
CREATE TABLE IF NOT EXISTS `Book` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Title` VARCHAR(255) NOT NULL,
    `Type` VARCHAR(50),
    `Price` DECIMAL(10, 2),
    `PubId` INT,
    `AuthorId` INT,
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`PubId`) REFERENCES `Publisher`(`Id`) ON DELETE SET NULL,
    FOREIGN KEY (`AuthorId`) REFERENCES `Author`(`Id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Admin User (password: admin123 hashed with bcrypt)
INSERT INTO `Users` (`Username`, `Password`, `FName`, `LName`, `IsAdmin`) VALUES
('admin', '$2b$10$u2aIEKmLT2CbIdq4aDCHjeFntBb.7ZhUknitJRFyweMAXY1RTktnG', 'Admin', 'User', TRUE);

-- Insert Publishers
INSERT INTO `Publisher` (`PName`, `City`) VALUES 
('Dar Al Shorouk', 'Cairo'),
('Lebanon Publishers', 'Beirut'),
('Dar Al Adab', 'Beirut'),
('Arab Foundation', 'Beirut');

-- Insert Authors
INSERT INTO `Author` (`FName`, `LName`, `Country`, `City`, `Address`) VALUES 
('Naguib', 'Mahfouz', 'Egypt', 'Cairo', 'Gamaliya'),
('Ahmed Khaled', 'Tawfik', 'Egypt', 'Tanta', 'Republic St'),
('Ghada', 'Al-Samman', 'Syria', 'Damascus', 'Mazza'),
('Abdul Rahman', 'Munif', 'Saudi Arabia', 'Riyadh', 'Malaz');

-- Insert Books
INSERT INTO `Book` (`Title`, `Type`, `Price`, `PubId`, `AuthorId`) VALUES 
('Palace Walk', 'Novel', 45.00, 1, 1),
('Palace of Desire', 'Novel', 40.00, 1, 1),
('Sugar Street', 'Novel', 42.00, 1, 1),
('Utopia', 'Novel', 35.00, 2, 2),
('Ma Waraa Al Tabi3a', 'Novel', 30.00, 2, 2),
('Beirut 75', 'Novel', 38.00, 3, 3),
('Cities of Salt', 'Novel', 55.00, 4, 4);

-- Show success message
SELECT 'Database setup completed successfully!' as Status;
