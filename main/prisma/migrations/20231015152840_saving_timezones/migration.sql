-- AlterTable
ALTER TABLE "account" ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "group" ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "operation" ADD COLUMN     "at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "tag_key" ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "tag_value" ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "transfer" ADD COLUMN     "at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at_timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updated_at_timezone" TEXT NOT NULL DEFAULT 'UTC';
