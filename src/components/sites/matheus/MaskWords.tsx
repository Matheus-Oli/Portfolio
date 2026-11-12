/**
 * Splits text into masked words for the on-load mask reveal: each word sits in an
 * overflow-hidden wrapper and its inner span rises from translateY(105%) (see motion.css).
 * Server-rendered, so the split exists before hydration and nothing reflows.
 */
export function MaskWords({ text, className = "word" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <span key={i}>
      <span className={className}>
        <span>{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}
