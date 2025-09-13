/*
  Warnings:

  - A unique constraint covering the columns `[user_id,question_id]` on the table `user_question_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_question_progress_user_id_question_id_key" ON "public"."user_question_progress"("user_id", "question_id");
