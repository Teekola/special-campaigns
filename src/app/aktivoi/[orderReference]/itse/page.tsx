import { use } from "react";

export default function AktivoiItsePage({
   params,
}: PageProps<"/aktivoi/[orderReference]/itse">) {
   const { orderReference } = use(params);
   return <h1>Itse {orderReference}</h1>;
}
