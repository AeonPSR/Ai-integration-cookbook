"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ListOrdered } from "lucide-react";

const LANGUAGE_LABELS = {
  bash: "curl",
  curl: "curl",
  javascript: "Node.js",
  js: "Node.js",
  node: "Node.js",
  python: "Python",
};

// Convertit les noms techniques des langages en libelles affiches.
function languageLabel(language = "text") {
  return LANGUAGE_LABELS[language] || language.toUpperCase();
}

export default function CodeBlock({
  code = "",
  language = "text",
  snippets,
  showLineNumbers = false,
}) {
  const items = useMemo(() => {
    if (snippets?.length) return snippets;
    return [{ code, language }];
  }, [code, language, snippets]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lineNumbers, setLineNumbers] = useState(showLineNumbers);
  const [copied, setCopied] = useState(false);

  const active = items[activeIndex] || items[0];
  const lines = active.code.split("\n");

  // Copie le code selectionne et affiche brievement le succes.
  async function copyCode() {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-800 bg-gray-950 text-sm shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-3 py-2">
        {/* Onglets des langages */}
        <div className="flex flex-wrap gap-1">
          {items.map((item, index) => (
            <button
              key={`${item.language}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={
                index === activeIndex
                  ? "rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-950"
                  : "rounded-md px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
              }
            >
              {languageLabel(item.language)}
            </button>
          ))}
        </div>

        {/* Actions: afficher les lignes et copier le code */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLineNumbers((value) => !value)}
            className="rounded-md p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            aria-label="Afficher les numeros de lignes"
            title="Afficher les numeros de lignes"
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            onClick={copyCode}
            className="rounded-md p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            aria-label="Copier le code"
            title="Copier le code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="flex max-h-[36rem] overflow-auto">
        {lineNumbers && (
          <div className="select-none border-r border-gray-800 bg-gray-900 px-3 py-4 text-right font-mono text-xs leading-6 text-gray-500">
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        )}
        <pre className="m-0 min-w-0 flex-1 overflow-visible bg-transparent p-4 text-gray-100">
          <code>{active.code}</code>
        </pre>
      </div>
    </div>
  );
}
