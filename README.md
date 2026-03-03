## Test Angular



## Tecnologías y Versiones

Para este Test utilizé las versiones:

| Herramienta | Versión |
| :--- | :--- |
| **Angular CLI** | 17.3.17 |
| **Angular Core** | 17.3.12 |
| **Node.js** | 20.20.0 (LTS) |
| **TypeScript** | 5.4.5 |
| **Package Manager** | npm 10.8.2 |

### Pasos para instalación 

Instalar las dependencias: `npm install`

Levantar el servidor de desarrollo: `npm start` o `ng serve`

Una vez que la terminal indique que el bundle está listo, abre el navegador en: `http://localhost:4200`

### Resultado del Test con Jest

<details>
  <summary>Ver reporte detallado de cobertura</summary>

  -------------------------------------|---------|----------|---------|---------|-------------------
File                                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------------|---------|----------|---------|---------|-------------------
All files                            |     100 |    92.85 |     100 |     100 |                   
 app                                 |     100 |      100 |     100 |     100 |                   
  app.component.html                 |     100 |      100 |     100 |     100 |                   
  app.component.ts                   |     100 |      100 |     100 |     100 |                   
 app/core/interceptors               |     100 |      100 |     100 |     100 |                   
  error.interceptor.ts               |     100 |      100 |     100 |     100 |                   
 app/core/services                   |     100 |      100 |     100 |     100 |                   
  product.service.ts                 |     100 |      100 |     100 |     100 |                   
 app/core/validators                 |     100 |      100 |     100 |     100 |                   
  date.validator.ts                  |     100 |      100 |     100 |     100 |                   
  id-exists.validator.ts             |     100 |      100 |     100 |     100 |                   
 app/pages/product-form              |     100 |    95.23 |     100 |     100 |                   
  product-form.component.html        |     100 |      100 |     100 |     100 |                   
  product-form.component.ts          |     100 |    95.23 |     100 |     100 | 62                
 app/pages/product-list              |     100 |    71.42 |     100 |     100 |                   
  product-list.component.html        |     100 |      100 |     100 |     100 |                   
  product-list.component.ts          |     100 |    71.42 |     100 |     100 | 38-55             
 app/shared/components/confirm-modal |     100 |      100 |     100 |     100 |                   
  confirm-modal.component.html       |     100 |      100 |     100 |     100 |                   
  confirm-modal.component.ts          |     100 |      100 |     100 |     100 |                   
-------------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 8 passed, 8 total
Tests:       38 passed, 38 total
Snapshots:   0 total
Time:        5.258 s

</details>
