"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/lib/zodSchemas";
import { requireUser } from "@/lib/hooks";
import prisma from "@/lib/db";

export async function onboardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchema({
      async isUsernameUnique() {
        const exisitngSubDirectory = await prisma.user.findUnique({
          where: {
            username: formData.get("username") as string,
          },
        });
        return !exisitngSubDirectory;
      },
    }),

    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      username: submission.value.username,
      name: submission.value.fullName,
    },
  });

  redirect("/dashboard");
}