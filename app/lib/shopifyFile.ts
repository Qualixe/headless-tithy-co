const SHOPIFY_FILES_BASE =
  'https://cdn.shopify.com/s/files/1/0697/9056/4429/files';

export function shopifyFileUrl(filename: string) {
  return `${SHOPIFY_FILES_BASE}/${filename}`;
}
