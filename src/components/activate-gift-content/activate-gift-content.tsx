"use client";

import { type getActivation } from "@/lib/black-friday-2025/get-activation";
import { use } from "react";
import { ActivateGiftForm } from "./activate-gift-form";
import { redirect } from "next/navigation";
import { BLACK_FRIDAY_GIFT_CLAIMED_PAGE } from "@/lib/black-friday-2025/config";

export function ActivateGiftContent({
   activationPromise,
}: {
   activationPromise: ReturnType<typeof getActivation>;
}) {
   const activation = use(activationPromise);

   if (activation.status !== "PENDING") {
      redirect(BLACK_FRIDAY_GIFT_CLAIMED_PAGE);
   }

   return <ActivateGiftForm />;
}
