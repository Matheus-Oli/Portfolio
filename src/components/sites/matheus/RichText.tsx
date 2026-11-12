/** Renders `**bold**` segments as <strong>; everything else stays plain text. */
export function RichText({ text }: { text: string }) {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
    );
}
