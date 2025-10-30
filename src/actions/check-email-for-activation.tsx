"use server";

import { ActivationType } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function checkEmailForActivation({
   orderReference,
   email,
}: {
   orderReference: string;
   email?: string;
}) {
   const result = await prisma.activation.findUnique({
      where: {
         orderReference_type: {
            type: ActivationType.FOR_SELF,
            orderReference,
         },
      },
   });

   if (result?.email === email) {
      throw new Error(
         "Et voi aktivoida kaverille tarkoitettua kurssia itsellesi."
      );
   }
   return result;
}
