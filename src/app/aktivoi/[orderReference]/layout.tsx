import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
   return (
      <div className="mx-auto w-full space-y-12">
         <div className="h-20 flex items-center justify-center border-b">
            <p className="font-bold">Black Friday 2025</p>
         </div>
         <div className="p-4">{children}</div>
      </div>
   );
}
