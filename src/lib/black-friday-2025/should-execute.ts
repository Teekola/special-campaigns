export function shouldExecute(products: { variantId: string }[]) {
   const campaignVariantIds = new Set<string>([
      "685807b8fe8aa8a56b756130",
      "68580807e818f7de505546b8",
      "68580812e818f7de505546b9",
      "6858081ce818f7de505546ba",
      "68580829e818f7de505546bb",
      "68580834e818f7de505546bc",
      "68580854e818f7de505546be",
      "6858087ee818f7de505546c1",
      "68580888e818f7de505546c2",
      "685808aae818f7de505546c3",
      "685807c7fe8aa8a56b756133",
      "685807d5fe8aa8a56b756134",
      "685807e0fe8aa8a56b756135",
      "685807fce818f7de505546b7",
      "685821357896a1ab43f60e0f",
      "686f710229046afd3c47b26d",
      "687b89cd4533577098821bfb",
      "68837aec04277c6873055d7a",
      "68c9994fc7522752257561bc",
      "68c99e0bc7522752257561bf",
      "68c99f02c7522752257561c2",
      "68c9a03dc7522752257561c5",
      "68c9a2a3c7522752257561ce",
      "68c9a41fc7522752257561d3",
      "68c9a4c2c7522752257561d6",
   ]);

   const hasMatch = products.some((product) =>
      campaignVariantIds.has(product.variantId)
   );

   return hasMatch;
}
