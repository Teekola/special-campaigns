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
}) {
   const result = await prisma.activation.update({
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
   return result;
}
