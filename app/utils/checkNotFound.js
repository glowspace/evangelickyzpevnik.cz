export default function checkNotFound(item) {
  if (item == null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      fatal: true,
    });
  }
}
