export default function generateHead(title, description) {
  return {
    title: title,
    meta: [
      { property: 'og:title', content: title },
      { name: 'description', content: description },
      { property: 'og:description', content: description },
    ],
  };
}
