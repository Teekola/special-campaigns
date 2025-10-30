import { ActivationType } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getActivation(
   orderReference: string,
   activationType: ActivationType
) {
   const activation = await prisma.activation.findUnique({
      where: {
         orderReference_type: {
            orderReference,
            type: activationType,
         },
      },
   });

   // If activation is not found, it is invalid orderReference
   if (!activation) {
      return notFound();
   }

   // If activation is already completed,
   return activation;
}
