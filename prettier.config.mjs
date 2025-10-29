/** @type {import("prettier").Config} */
const baseConfig = {
   semi: true,
   singleQuote: false,
   trailingComma: "es5",
   printWidth: 100,
   useTabs: false,
   tabWidth: 3,
   bracketSpacing: true,
   bracketSameLine: false,
   arrowParens: "always",
   endOfLine: "lf",
   plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
   importOrder: ["^server-only$", "^react$", "^next(/.*)?$", "^@?\\w", "^@/*", "^(.*)$"],
   importOrderSeparation: true,
   importOrderSortSpecifiers: true,
};

export default baseConfig;
