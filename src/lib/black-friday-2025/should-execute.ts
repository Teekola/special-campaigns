export function shouldExecute(products: { variantId: string }[]) {
   // TODO: Add REAL campaign variants!
   const campaignVariantIds = new Set<string>(["689497e55a8835ae69ed0fbb"]);

   const hasMatch = products.some((product) =>
      campaignVariantIds.has(product.variantId)
   );

   return hasMatch;
}
