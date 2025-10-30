import { CheckCircle2Icon } from "lucide-react";

export default function SelfActivationReadyPage() {
   return (
      <div className="max-w-md mx-auto text-center grid place-items-center space-y-4">
         <CheckCircle2Icon className="size-14 text-primary" />
         <h1 className="text-2xl">Kurssi aktivoitu!</h1>
         <p>Saat pian sähköpostiisi tiedon kurssin aktivoitumisesta.</p>
      </div>
   );
}
