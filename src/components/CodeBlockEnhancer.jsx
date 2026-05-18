"use client";

import { useEffect } from "react";

const LABELS = {
  bash: "curl",
  curl: "curl",
  javascript: "Node.js",
  js: "Node.js",
  node: "Node.js",
  python: "Python",
};

const TAB_HEADINGS = ["python", "node.js", "curl"];

// Transforme un nom de langage technique en libelle lisible.
function labelFor(language = "text") {
  const key = language.toLowerCase().replace("language-", "");
  return LABELS[key] || key.toUpperCase();
}

// Recupere le langage depuis la classe generee par le rendu MDX.
function languageFrom(code, fallback = "text") {
  const className =
    [...code.classList].find((item) => item.startsWith("language-")) || fallback;
  return className.replace("language-", "");
}

// Cree un bouton avec le meme style pour les onglets et les actions.
function makeButton(text) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.className =
    "rounded-md px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white";
  return button;
}

// Genere la colonne des numeros de lignes pour un bloc de code.
function makeLines(code) {
  const lines = document.createElement("div");
  lines.className =
    "hidden select-none border-r border-gray-800 bg-gray-900 px-3 py-4 text-right font-mono text-xs leading-6 text-gray-500";
  lines.innerHTML = code
    .split("\n")
    .map((_, index) => `<div>${index + 1}</div>`)
    .join("");
  return lines;
}

// Remplace le style par defaut du <pre> MDX par le style du composant.
function stylePre(pre) {
  pre.className =
    "m-0 min-w-0 flex-1 overflow-visible bg-transparent p-4 text-gray-100";
}

// Construit l'interface complete: onglets, actions, lignes et contenu du code.
function buildCodeShell(snippets) {
  const shell = document.createElement("div");
  shell.className =
    "my-6 overflow-hidden rounded-lg border border-gray-800 bg-gray-950 text-sm shadow-sm";

  const toolbar = document.createElement("div");
  toolbar.className =
    "flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-3 py-2";

  const tabs = document.createElement("div");
  tabs.className = "flex flex-wrap gap-1";

  const actions = document.createElement("div");
  actions.className = "ml-auto flex items-center gap-1";

  const linesButton = makeButton("Lines");
  const copyButton = makeButton("Copy");
  const body = document.createElement("div");

  let active = 0;
  let linesVisible = false;

  // Chaque snippet devient un panneau; seul le panneau actif est visible.
  const panels = snippets.map((snippet, index) => {
    const tab = makeButton(snippet.label);
    const panel = document.createElement("div");
    const lines = makeLines(snippet.code);

    stylePre(snippet.pre);
    panel.append(lines, snippet.pre);
    panel.className = index === 0 ? "flex max-h-[36rem] overflow-auto" : "hidden";

    // Changement d'onglet: on masque les autres panneaux.
    tab.onclick = () => {
      active = index;
      panels.forEach((item, itemIndex) => {
        item.panel.className =
          itemIndex === active ? "flex max-h-[36rem] overflow-auto" : "hidden";
        item.tab.className =
          itemIndex === active
            ? "rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-950"
            : makeButton("").className;
        item.lines.classList.toggle("hidden", !linesVisible);
      });
    };

    tabs.append(tab);
    body.append(panel);
    return { panel, tab, lines, code: snippet.code };
  });

  panels[0].tab.className =
    "rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-950";

  // Affiche ou cache les numeros de lignes pour tous les onglets.
  linesButton.onclick = () => {
    linesVisible = !linesVisible;
    panels.forEach((item) => item.lines.classList.toggle("hidden", !linesVisible));
  };

  // Copie uniquement le code de l'onglet actif.
  copyButton.onclick = async () => {
    await navigator.clipboard.writeText(panels[active].code);
    copyButton.textContent = "Copied";
    setTimeout(() => (copyButton.textContent = "Copy"), 1500);
  };

  actions.append(linesButton, copyButton);
  toolbar.append(tabs, actions);
  shell.append(toolbar, body);
  return shell;
}

export default function CodeBlockEnhancer({ selector = "[data-recipe-content]" }) {
  useEffect(() => {
    const article = document.querySelector(selector);
    if (!article || article.dataset.codeEnhanced) return;

    const headings = [...article.querySelectorAll("h3")];

    // Regroupe les sections consecutives "Python", "Node.js" et "curl" en onglets.
    headings.forEach((heading) => {
      const snippets = [];
      let current = heading;

      while (current && TAB_HEADINGS.includes(current.textContent.trim().toLowerCase())) {
        const pre = current.nextElementSibling;
        const code = pre?.querySelector("code");
        if (!pre?.matches("pre") || !code) break;

        snippets.push({
          heading: current,
          pre,
          code: code.textContent || "",
          label: labelFor(current.textContent.trim()),
        });

        current = pre.nextElementSibling?.matches("h3") ? pre.nextElementSibling : null;
      }

      if (snippets.length < 2) return;

      // Le premier titre est remplace par le bloc a onglets.
      snippets[0].heading.replaceWith(buildCodeShell(snippets));
      snippets.slice(1).forEach((snippet) => snippet.heading.remove());
    });

    // Les blocs seuls recoivent aussi les boutons Copy et Lines.
    article.querySelectorAll("pre:not([data-single-enhanced])").forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code || pre.closest(".rounded-lg.border-gray-800")) return;

      pre.dataset.singleEnhanced = "true";

      // On utilise un placeholder pour eviter de remplacer un element par son parent.
      const placeholder = document.createComment("code-block");
      pre.replaceWith(placeholder);

      placeholder.replaceWith(
        buildCodeShell([
          {
            pre,
            code: code.textContent || "",
            label: labelFor(languageFrom(code)),
          },
        ])
      );
    });

    article.dataset.codeEnhanced = "true";
  }, [selector]);

  return null;
}
