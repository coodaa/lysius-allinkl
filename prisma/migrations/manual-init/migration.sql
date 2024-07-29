-- This is a baseline migration for the existing database

-- CreateTables
CREATE TABLE IF NOT EXISTS `Play` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `imageUrl` VARCHAR(255),
  `videoUrl` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
