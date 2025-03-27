-- CreateTable
CREATE TABLE "EWasteClassification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageBase64" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "result" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EWasteClassification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EWasteClassification" ADD CONSTRAINT "EWasteClassification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
