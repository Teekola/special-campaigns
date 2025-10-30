import * as z from "zod";
import { ApiError } from "@/lib/error";

const bodySchema = z.object({
   firstName: z.string(),
   email: z.string(),
   orderReference: z.string(),
   products: z.array(
      z.object({
         variantId: z.string(),
         productId: z.string(),
         productName: z.string(),
      })
   ),
});

export async function validateBody(request: Request) {
   const body = await request.json();
   const result = bodySchema.safeParse(body);

   if (result.error) {
      throw new ApiError({
         name: "BAD_REQUEST",
         message: "Error parsing body",
         status: 400,
         cause: result.error,
      });
   }
   return result.data;
}
