-- AlterTable
ALTER TABLE "operation" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "transfer" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT true;
