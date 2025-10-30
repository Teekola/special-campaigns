import { ActivationType } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { ApiError } from "../error";

export async function createPendingActivations({
   orderReference,
   email,
}: {
   orderReference: string;
   email: string;
}) {
   try {
      const createdActivations = await prisma.activation.createMany({
         data: [
            {
               orderReference,
               type: ActivationType.FOR_SELF,
               email,
            },
            {
               orderReference,
               type: ActivationType.FOR_FRIEND,
            },
         ],
      });
      console.log(
         "Created",
         createdActivations.count,
         "activations for order",
         orderReference
      );
   } catch (error) {
      throw new ApiError({
         name: "INTERNAL_SERVER_ERROR",
         message: "Failed to create pending activations.",
         status: 500,
         cause: error,
      });
   }
}
