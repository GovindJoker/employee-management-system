/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Made the column `employmentTypeId` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_employmentTypeId_fkey`;

-- DropIndex
DROP INDEX `Employee_employmentTypeId_fkey` ON `employee`;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `dateOfBirth` DATETIME(3) NULL,
    ADD COLUMN `emergencyContactName` VARCHAR(191) NULL,
    ADD COLUMN `emergencyContactPhone` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `hrId` INTEGER NULL,
    ADD COLUMN `postalCode` VARCHAR(191) NULL,
    ADD COLUMN `reportsToId` INTEGER NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    MODIFY `employmentTypeId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_email_key` ON `Employee`(`email`);

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_employmentTypeId_fkey` FOREIGN KEY (`employmentTypeId`) REFERENCES `EmploymentType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_reportsToId_fkey` FOREIGN KEY (`reportsToId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_hrId_fkey` FOREIGN KEY (`hrId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
