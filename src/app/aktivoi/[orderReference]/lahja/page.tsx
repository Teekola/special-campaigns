import { ActivateGiftContent } from "@/components/activate-gift-content";
import { ActivationType } from "@/generated/prisma";
import { getActivation } from "@/lib/black-friday-2025/get-activation";
import { Suspense, use } from "react";

export default function AktivoiItsePage({
   params,
}: PageProps<"/aktivoi/[orderReference]/lahja">) {
   const { orderReference } = use(params);

   const activationPromise = getActivation(orderReference, ActivationType.GIFT);

   return (
      <div className="max-w-md mx-auto">
         <Suspense
            fallback={
               <div className="grid place-items-center h-[417.75px] animate-pulse">
                  Tarkistetaan, onko aktivointi saatavilla...
               </div>
            }
         >
            <ActivateGiftContent activationPromise={activationPromise} />
         </Suspense>
      </div>
   );
}
