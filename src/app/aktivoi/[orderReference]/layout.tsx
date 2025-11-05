import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
   return (
      <div className="mx-auto w-full space-y-12 flex-1 flex flex-col">
         <div className="h-20 flex items-center justify-center border-b">
            <p className="font-bold">Black Friday 2025</p>
         </div>
         <div className="p-4">{children}</div>
         <footer className="max-w-md mx-auto text-muted-foreground text-sm space-y-4 w-full py-8">
            <section>
               <p>Tarvitsetko apua? Ota yhteys asiakaspalveluun:</p>
               <a
                  href="mailto:info@hyvinvointiheimo.fi"
                  className="text-primary/80"
               >
                  info@hyvinvointiheimo.fi
               </a>
            </section>

            <section className="space-y-1">
               <p className="font-semibold">Yrityksen tiedot</p>
               <p>HyvinvointiHeimo Oy</p>
               <p>3382275-6</p>
               <p>Retkentinkuja 5, 21290 RUSKO</p>
               <a
                  href="https://www.hyvinvointiheimo.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline block w-fit"
               >
                  https://www.hyvinvointiheimo.fi/
               </a>
               <a
                  href="https://www.hyvinvointiheimo.fi/tietosuojaseloste"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline block w-fit"
               >
                  Tietosuojaseloste
               </a>
            </section>

            <p className="mt-6">© 2025 HyvinvointiHeimo</p>
         </footer>
      </div>
   );
}
