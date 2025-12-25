const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Leer las variables de entorno
const apiKey = process.env.API_KEY || '';

// Generar el contenido del archivo environment.ts
const environmentContent = `// This file can be replaced during build by using the \`fileReplacements\` array.
// \`ng build\` replaces \`environment.ts\` with \`environment.prod.ts\`.
// The list of file replacements can be found in \`angular.json\`.

export const environment = {
  production: false,
  apiKey: '${apiKey}',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as \`zone.run\`, \`zoneDelegate.invokeTask\`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
`;

// Escribir el archivo environment.ts
const environmentPath = path.resolve(__dirname, '../src/environments/environment.ts');
fs.writeFileSync(environmentPath, environmentContent, 'utf8');

console.log('✅ Variables de entorno cargadas correctamente en environment.ts');

