# Propuesta gabriel - patinaje

Este template provee lo mínimo necesario para el correcto funcionamiento de un proyecto de electron que usa sequelize como orm, react, tailwind y typescript para funcionar. Está construido sobre vite y también incluye un slint config.

## Información extra de vite

Actualmente, hay 2 plugins oficiales para vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expandir configuración de ESlint

Si tu estás desarrollando una aplicación de producción, se recomienda actualizar la configuración a las reglas habilitadas de type-aware lint:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

También puedes instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para reglas especificas para React:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Configuración de proyecto de electron

En la carpeta de package.json puedes encontrar la configuración referente de la aplicación de electron y los script para la producción en diferentes dispositivos:

```json
{
  "name": "electron-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "main": "dist-electron/main.js",
  "scripts": {
    "dev": "npm-run-all --parallel dev:react dev:electron",
    "dev:react": "vite",
    "dev:electron": "npm run transpile:electron && cross-env NODE_ENV=development electron .",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "transpile:electron": "tsc --project src/electron/tsconfig.json",
    "dist:mac": "npm run transpile:electron && npm run build && electron-builder --mac --arm64",
    "dist:win": "npm run transpile:electron && npm run build && electron-builder --win --x64",
    "dist:linux": "npm run transpile:electron && npm run build && electron-builder --linux --x64"
  },
  "dependencies": {
    //...
  },
  "devDependencies": {
    //...
  }
  //...
}
```

También se incluyen electron-builder.json en donde está la configuración del ejecutable con la versíon y otras características:

```json
{
  "appId": "com.mitha.template",
  "files": ["dist-react", "dist-electron"],
  "extraResources": ["dist-electron/preload.cjs"],
  "icon": "./template.png",
  "mac": {
    "target": "dmg"
  },
  "linux": {
    "target": "AppImage",
    "category": "Utility"
  },
  "win": {
    "target": ["portable", "msi"]
  }
}
```

## Entorno de desarrollo y producción

Para iniciar la aplicación en modo de desarrollo necesitas ejecutar el comando

```console
npm run dev
```

Para crear el ejecutable de la aplicación en un dispositivo específico necesitas ejecutar para windows:

```console
npm run dist:win
```

para linux:

```console
npm run dist:linux
```

para mac:

```console
npm run dist:mac
```
