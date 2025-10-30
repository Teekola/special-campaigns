import { use } from "react";

export default function AktivoiLahjaPage({
   params,
}: PageProps<"/aktivoi/[orderReference]/lahja">) {
   const { orderReference } = use(params);
   return <h1>Lahja {orderReference}</h1>;
}
