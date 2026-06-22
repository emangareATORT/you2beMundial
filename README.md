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

## Regla de seguridad

La app lista los videos publicados durante las últimas 24 horas por estas fuentes, siempre que el título original incluya la palabra `RESUMEN`:

- `https://www.youtube.com/@dsportsok`
- `https://www.youtube.com/@ESPNFans`

Antes de mostrarlos, elimina títulos originales, elimina miniaturas, usa rótulos neutrales y verifica que YouTube permita reproducir el video dentro del navegador embebido.

La lista puede mostrar la duración total del video y permite alternar audio silenciado/activado desde el reproductor seguro.

Si YouTube bloquea la reproducción embebida, la app no ofrece abrir el video en YouTube, porque esa página puede mostrar el resultado en el título, miniatura, descripción, comentarios o recomendaciones.
