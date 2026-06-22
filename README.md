# Zero Spoiler

Aplicación HTML/TypeScript para ver resúmenes recientes de canales de YouTube autorizados sin exponer resultados finales.

## Cómo usarla

```bash
npm start
```

Luego abrí:

```text
http://127.0.0.1:4173
```

## Archivo único para compartir

El proyecto puede generar un paquete autónomo:

```text
zero-spoiler-single.js
```

Después de generarlo, basta con compartir ese archivo. La otra persona debe tener Node.js instalado y ejecutarlo así:

```bash
node zero-spoiler-single.js
```

Luego debe abrir:

```text
http://127.0.0.1:4173
```

El archivo incluye servidor, HTML, estilos y JavaScript de la interfaz. No necesita instalar dependencias, pero sí necesita conexión a internet para leer las fuentes de YouTube.

Si hacés cambios en la app, podés regenerarlo con:

```bash
npm run pack:single
```

## Apps para doble click

También se pueden compartir paquetes de escritorio que no requieren instalar Node.js.

Para macOS Apple Silicon:

```text
dist/Zero Spoiler macOS Apple Silicon.zip
```

La persona debe descomprimir el ZIP y abrir `Zero Spoiler.app` con doble click. Esta versión incluye Node.js dentro del paquete, por lo que no necesita instalar nada adicional. Al abrirse, levanta el servidor local y abre:

```text
http://127.0.0.1:4173
```

Si macOS muestra una advertencia por ser una app no firmada, se puede abrir desde Finder con clic derecho, `Abrir`, y confirmar. Para regenerar este paquete:

```bash
npm run pack:mac
```

Para Windows x64:

```text
dist/Zero Spoiler Windows x64.zip
```

La persona debe descomprimir el ZIP y hacer doble click en `Iniciar Zero Spoiler.cmd`. El paquete incluye `node.exe`, por lo que tampoco necesita instalar Node.js. Para regenerarlo:

```bash
npm run pack:windows
```

Para regenerar ambos paquetes:

```bash
npm run pack:desktop
```

## Regla de seguridad

La app lista los videos publicados durante las últimas 24 horas por estas fuentes, siempre que el título original incluya la palabra `RESUMEN`:

- `https://www.youtube.com/@dsportsok`
- `https://www.youtube.com/@ESPNFans`

Antes de mostrarlos, elimina títulos originales, elimina miniaturas, usa rótulos neutrales y verifica que YouTube permita reproducir el video dentro del navegador embebido.

Si YouTube bloquea la reproducción embebida, la app no ofrece abrir el video en YouTube, porque esa página puede mostrar el resultado en el título, miniatura, descripción, comentarios o recomendaciones.
