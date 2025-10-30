"use client";

import { type getActivation } from "@/lib/black-friday-2025/get-activation";
import { use } from "react";
import { ActivateForSelfForm } from "./activate-for-self-form";
import { redirect, useParams } from "next/navigation";

export function ActivateForSelfContent({
   activationPromise,
}: {
   activationPromise: ReturnType<typeof getActivation>;
}) {
   const { orderReference } = useParams<{ orderReference: string }>();
   const activation = use(activationPromise);

   if (activation.status !== "PENDING") {
      redirect(`/aktivoi/${orderReference}/itse/valmis`);
   }

   if (!activation.email || !activation.name) {
      return (
         <div>
            <h1>
               Tapahtui virhe. Ota yhteyttä asiakaspalveluun aktivoidaksesi
               kurssin.
            </h1>
            <p>info@hyvinvointiheimo.fi</p>
         </div>
      );
   }

   return (
      <ActivateForSelfForm email={activation.email} name={activation.name} />
   );
}
