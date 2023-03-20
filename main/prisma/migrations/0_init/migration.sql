-- CreateTable
CREATE TABLE "account" (
    "account_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "initial_amount" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "user_id" UUID NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "operation" (
    "account_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "amount_per_unit" INTEGER NOT NULL,
    "at" TIMESTAMPTZ(6) NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "operation_id" UUID NOT NULL,
    "tags" JSONB NOT NULL DEFAULT '{}',
    "type" TEXT NOT NULL,
    "unit_count" INTEGER,
    "updated_at" TIMESTAMPTZ(6),
    "user_id" UUID NOT NULL,

    CONSTRAINT "operation_pkey" PRIMARY KEY ("operation_id")
);

-- CreateTable
CREATE TABLE "tag_key" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "tag_key_id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "user_id" UUID NOT NULL,

    CONSTRAINT "tag_key_pkey" PRIMARY KEY ("tag_key_id")
);

-- CreateTable
CREATE TABLE "tag_value" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "tag_value_id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "user_id" UUID NOT NULL,

    CONSTRAINT "tag_value_pkey" PRIMARY KEY ("tag_value_id")
);

-- CreateTable
CREATE TABLE "transfer" (
    "amount" INTEGER NOT NULL,
    "at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "from_account_id" UUID NOT NULL,
    "to_account_id" UUID NOT NULL,
    "transfer_id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "user_id" UUID NOT NULL,

    CONSTRAINT "transfer_pkey" PRIMARY KEY ("transfer_id")
);

-- CreateTable
CREATE TABLE "user" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "user_id" UUID NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation" ADD CONSTRAINT "account_id" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tag_key" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tag_value" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "from_account_id" FOREIGN KEY ("from_account_id") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "to_account_id" FOREIGN KEY ("to_account_id") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

