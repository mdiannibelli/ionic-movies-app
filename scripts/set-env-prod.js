const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Leer las variables de entorno
const apiKey = process.env.API_KEY || "";

// Generar el contenido del archivo environment.prod.ts
const environmentContent = `export const environment = {
  production: true,
  apiKey: '${apiKey}',
};
`;

// Escribir el archivo environment.prod.ts
const environmentPath = path.resolve(
  __dirname,
  "../src/environments/environment.prod.ts"
);
fs.writeFileSync(environmentPath, environmentContent, "utf8");

console.log(
  "✅ Variables de entorno cargadas correctamente en environment.prod.ts"
);
