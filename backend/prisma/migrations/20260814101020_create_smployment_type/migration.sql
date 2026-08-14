-- AlterTable
ALTER TABLE `employee` ADD COLUMN `employmentTypeId` INTEGER NULL;

-- CreateTable
CREATE TABLE `EmploymentType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EmploymentType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_employmentTypeId_fkey` FOREIGN KEY (`employmentTypeId`) REFERENCES `EmploymentType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
