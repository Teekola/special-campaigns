import { buildAndSendEmail } from "@/lib/black-friday-2025/build-and-send-email";

import { OFFER_END_DATE } from "@/lib/black-friday-2025/config";
import { createPendingActivations } from "@/lib/black-friday-2025/create-pending-activations";
import { shouldExecute } from "@/lib/black-friday-2025/should-execute";
import { validateApiKey } from "@/lib/black-friday-2025/validate-api-key";
import { validateBody } from "@/lib/black-friday-2025/validate-body";
import { ApiError } from "@/lib/error";

export async function POST(request: Request) {
   try {
      // Validate API Key
      validateApiKey(request);

      // Validate body
      const { firstName, email, orderReference, products } = await validateBody(
         request
      );

      // Check if the product variants are part of the campaign
      if (!shouldExecute(products)) {
         return new Response(null, { status: 204 });
      }

      // Store records to database
      await createPendingActivations({
         orderReference,
         email,
         firstName,
      });

      // Build and send the email
      await buildAndSendEmail({
         firstName,
         email,
         orderReference,
         offerEndDate: OFFER_END_DATE,
      });

      return Response.json({ success: true });
   } catch (error) {
      // Handle errors that were thrown by the utility functions
      if (error instanceof ApiError) {
         console.error(error);
         return Response.json(
            { name: error.name, message: error.message },
            { status: error.status }
         );
      }

      // Handle other, unexpected, errors
      const unknownErrorBody = {
         name: "UNKNOWN_ERROR",
         message: "An unknown error occurred.",
      };

      console.error(unknownErrorBody);
      return Response.json(unknownErrorBody, { status: 500 });
   }
}
