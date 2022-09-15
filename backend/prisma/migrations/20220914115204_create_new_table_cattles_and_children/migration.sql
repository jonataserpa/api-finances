-- CreateTable
CREATE TABLE `childrens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date_born` DATETIME(3) NOT NULL,
    `namefather` VARCHAR(191) NOT NULL,
    `proprietary` VARCHAR(191) NOT NULL,
    `observacion` VARCHAR(191) NOT NULL,
    `cattlesId` INTEGER NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cattles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date_born` DATETIME(3) NOT NULL,
    `namefather` VARCHAR(191) NOT NULL,
    `proprietary` VARCHAR(191) NOT NULL,
    `observacion` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    INDEX `cattles_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `childrens` ADD CONSTRAINT `childrens_cattlesId_fkey` FOREIGN KEY (`cattlesId`) REFERENCES `cattles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
