-- AlterTable
ALTER TABLE `cattles` MODIFY `date_born` DATETIME(3) NULL,
    MODIFY `namefather` VARCHAR(191) NULL,
    MODIFY `proprietary` VARCHAR(191) NULL,
    MODIFY `observacion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `childrens` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `date_born` DATETIME(3) NULL,
    MODIFY `namefather` VARCHAR(191) NULL,
    MODIFY `proprietary` VARCHAR(191) NULL,
    MODIFY `observacion` VARCHAR(191) NULL;
