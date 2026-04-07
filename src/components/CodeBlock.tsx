/**
 * Syntax-highlighted code block with copy-to-clipboard.
 * Supports language tabs (Python, Node.js, curl).
 */

interface CodeBlockProps {
  code: string;
  language: "python" | "javascript" | "bash";
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
      <code>{code}</code>
      {/* TODO: syntax highlighting + copy button */}
    </pre>
  );
}
