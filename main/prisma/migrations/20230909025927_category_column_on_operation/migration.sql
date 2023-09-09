/*
  Warnings:

  - Added the required column `category_id` to the `operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "operation" ADD COLUMN     "category_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "operation" ADD CONSTRAINT "category_id" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
