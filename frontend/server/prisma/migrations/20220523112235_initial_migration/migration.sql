-- CreateTable
CREATE TABLE "Notification" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" STRING,
    "read" BOOL NOT NULL,
    "profileId" INT8 NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "postalCode" STRING,
    "firstName" STRING,
    "lastName" STRING,
    "userId" INT8 NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "email" STRING(255),
    "did" STRING NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_profileId_key" ON "Notification"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_did_key" ON "User"("did");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
