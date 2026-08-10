type RichTextNode = {
  type: string;
  value?: string;
  children?: RichTextNode[];
};

function extractText(node: RichTextNode): string {
  if (node.type === 'text') return node.value ?? '';
  if (node.children) return node.children.map(extractText).join('');
  return '';
}

export function richTextToPlainText(json: string | null | undefined): string {
  if (!json) return '';
  try {
    const doc = JSON.parse(json) as RichTextNode;
    return (doc.children ?? []).map(extractText).join('\n');
  } catch {
    return '';
  }
}
