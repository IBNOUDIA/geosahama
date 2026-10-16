import { Fragment } from "react";

// Gemini answers in light Markdown (**bold**, "* " / "- " bullets). Render
// just that subset as React elements — no HTML injection — so visitors never
// see raw asterisks.
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function ChatMessageText({ text }: { text: string }) {
  const blocks: Array<{ type: "p"; text: string } | { type: "ul"; items: string[] }> = [];

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    const bullet = line.match(/^[*-]\s+(.*)$/);
    const last = blocks[blocks.length - 1];
    if (bullet) {
      if (last?.type === "ul") last.items.push(bullet[1]);
      else blocks.push({ type: "ul", items: [bullet[1]] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, i) =>
        block.type === "ul" ? (
          <ul key={i} className="list-disc pl-4 space-y-1">
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{renderInline(block.text)}</p>
        )
      )}
    </div>
  );
}

// Plain-text version for speech synthesis (no asterisks read aloud).
export function stripMarkdown(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/^\s*[*-]\s+/gm, "").replace(/[*_#`]/g, "");
}
