"use server";

import { ActivationStatus, ActivationType } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function updateActivation({
   orderReference,
   type,
   status,
   name,
   email,
   course,
}: {
   orderReference: string;
   type: ActivationType;
   status: ActivationStatus;
   name?: string;
   email?: string;
   course?: string;
}): Promise<{ error: string } | undefined> {
   try {
      await prisma.activation.update({
         where: {
            orderReference_type: {
               type,
               orderReference,
            },
         },
         data: {
            status,
            name,
            email,
            course,
         },
      });
   } catch (error) {
      console.error(error);
      return {
         error: "Aktivoinnin tilan päivitys epäonnistui. Yritä myöhemmin uudelleen.",
      };
   }
}
