import { ActivateForSelfContent } from "@/components/activate-for-self-content";
import { ActivationType } from "@/generated/prisma";
import { getActivation } from "@/lib/black-friday-2025/get-activation";
import { Suspense, use } from "react";

export default function AktivoiItsePage({
   params,
}: PageProps<"/aktivoi/[orderReference]/itse">) {
   const { orderReference } = use(params);

   const activationPromise = getActivation(
      orderReference,
      ActivationType.FOR_SELF
   );

   return (
      <div className="max-w-md mx-auto">
         <Suspense
            fallback={
               <div className="grid place-items-center h-[227.25px] animate-pulse">
                  Tarkistetaan, onko aktivointi saatavilla...
               </div>
            }
         >
            <ActivateForSelfContent activationPromise={activationPromise} />
         </Suspense>
      </div>
   );
}
