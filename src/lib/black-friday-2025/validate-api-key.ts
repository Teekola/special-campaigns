import { env } from "@/env";
import { ApiError } from "@/lib/error";

export function validateApiKey(request: Request) {
   const receivedApiKey = request.headers.get("X-Api-Key");
   if (receivedApiKey !== env.API_KEY) {
      throw new ApiError({
         name: "INVALID_API_KEY",
         message: "Provided API key was invalid or missing.",
         status: 401,
      });
   }
}
