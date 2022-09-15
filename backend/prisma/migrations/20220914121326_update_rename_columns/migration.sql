/*
  Warnings:

  - You are about to drop the column `date_born` on the `cattles` table. All the data in the column will be lost.
  - You are about to drop the column `date_born` on the `childrens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cattles` DROP COLUMN `date_born`,
    ADD COLUMN `dateborn` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `childrens` DROP COLUMN `date_born`,
    ADD COLUMN `dateborn` DATETIME(3) NULL;
