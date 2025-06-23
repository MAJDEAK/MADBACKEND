-- FINAL DATABASE SETUP FOR FREESQLDATABASE
-- Database: sql12786241
-- IMPORTANT: Run this in phpMyAdmin

-- Drop existing tables if they exist
DROP TABLE IF EXISTS `Book`;
DROP TABLE IF EXISTS `Author`;
DROP TABLE IF EXISTS `Publisher`;
DROP TABLE IF EXISTS `Users`;

-- Create Users Table
CREATE TABLE `Users` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Username` VARCHAR(50) UNIQUE NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `FName` VARCHAR(50) NOT NULL,
    `LName` VARCHAR(50) NOT NULL,
    `IsAdmin` BOOLEAN DEFAULT FALSE,
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Authors Table
CREATE TABLE `Author` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `FName` VARCHAR(50) NOT NULL,
    `LName` VARCHAR(50) NOT NULL,
    `Country` VARCHAR(50),
    `City` VARCHAR(50),
    `Address` VARCHAR(255),
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Publishers Table
CREATE TABLE `Publisher` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `PName` VARCHAR(100) NOT NULL,
    `City` VARCHAR(50),
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Books Table
CREATE TABLE `Book` (
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

-- Insert Admin User with CORRECT bcrypt hash for 'admin123'
INSERT INTO `Users` (`Username`, `Password`, `FName`, `LName`, `IsAdmin`) VALUES 
('admin', '$2b$10$u2aIEKmLT2CbIdq4aDCHjeFntBb.7ZhUknitJRFyweMAXY1RTktnG', 'Admin', 'User', TRUE);

-- Insert Test User
INSERT INTO `Users` (`Username`, `Password`, `FName`, `LName`, `IsAdmin`) VALUES 
('user1', '$2b$10$u2aIEKmLT2CbIdq4aDCHjeFntBb.7ZhUknitJRFyweMAXY1RTktnG', 'Test', 'User', FALSE);

-- Insert Publishers
INSERT INTO `Publisher` (`PName`, `City`) VALUES 
('Dar Al Shorouk', 'Cairo'),
('Lebanon Publishers', 'Beirut'),
('Dar Al Adab', 'Beirut'),
('Arab Foundation', 'Beirut'),
('Modern Library', 'Dubai');

-- Insert Authors
INSERT INTO `Author` (`FName`, `LName`, `Country`, `City`, `Address`) VALUES 
('Naguib', 'Mahfouz', 'Egypt', 'Cairo', 'Gamaliya District'),
('Ahmed Khaled', 'Tawfik', 'Egypt', 'Tanta', 'Republic Street'),
('Ghada', 'Al-Samman', 'Syria', 'Damascus', 'Mazza District'),
('Abdul Rahman', 'Munif', 'Saudi Arabia', 'Riyadh', 'Malaz District'),
('Tayeb', 'Salih', 'Sudan', 'Khartoum', 'Central District');

-- Insert Books
INSERT INTO `Book` (`Title`, `Type`, `Price`, `PubId`, `AuthorId`) VALUES 
('Palace Walk', 'Novel', 45.00, 1, 1),
('Palace of Desire', 'Novel', 40.00, 1, 1),
('Sugar Street', 'Novel', 42.00, 1, 1),
('Utopia', 'Novel', 35.00, 2, 2),
('Ma Waraa Al Tabi3a', 'Novel', 30.00, 2, 2),
('Beirut 75', 'Novel', 38.00, 3, 3),
('Cities of Salt', 'Novel', 55.00, 4, 4),
('Season of Migration to the North', 'Novel', 32.00, 5, 5),
('The Wedding of Zein', 'Novel', 28.00, 5, 5),
('Children of Gebelawi', 'Novel', 48.00, 1, 1);

-- Create Indexes for Performance
CREATE INDEX idx_book_title ON `Book`(`Title`);
CREATE INDEX idx_book_author ON `Book`(`AuthorId`);
CREATE INDEX idx_book_publisher ON `Book`(`PubId`);
CREATE INDEX idx_author_name ON `Author`(`FName`, `LName`);
CREATE INDEX idx_publisher_name ON `Publisher`(`PName`);
CREATE INDEX idx_user_username ON `Users`(`Username`);

-- Verify data insertion
SELECT 'Database setup completed!' as Status;
SELECT COUNT(*) as TotalUsers FROM `Users`;
SELECT COUNT(*) as TotalAuthors FROM `Author`;
SELECT COUNT(*) as TotalPublishers FROM `Publisher`;
SELECT COUNT(*) as TotalBooks FROM `Book`;

-- Test admin user
SELECT `Username`, `FName`, `LName`, `IsAdmin` FROM `Users` WHERE `Username` = 'admin';
