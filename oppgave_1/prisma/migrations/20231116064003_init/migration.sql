-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "num1" REAL NOT NULL,
    "num2" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attempts" INTEGER NOT NULL,
    "taskId" TEXT,
    CONSTRAINT "Answer_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
