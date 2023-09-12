-- CreateTable
CREATE TABLE "Entries" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "sealNumber" TEXT NOT NULL,
    "blNumber" TEXT NOT NULL,
    "containerNumbers" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "comments" TEXT,
    "containerCuantity" TEXT,
    "active" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Containers" (
    "id" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blNumber" TEXT NOT NULL,

    CONSTRAINT "Containers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entries_userId_key" ON "Entries"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Entries_sealNumber_key" ON "Entries"("sealNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Entries_blNumber_key" ON "Entries"("blNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Containers_ruc_key" ON "Containers"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Containers_blNumber_key" ON "Containers"("blNumber");
