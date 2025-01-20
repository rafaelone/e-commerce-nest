-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cart_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cart_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
