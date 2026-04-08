"use client";

import { useState, useMemo } from "react";
import { MODELS } from "@/lib/models";
import { estimateTokens, estimateCost } from "@/lib/tokens";

const OUTPUT_RATIO = 0.3; // estimated output = 30% of input tokens

function formatCost(usd) {
  if (usd === 0) return "$0.00";
  if (usd < 0.0001) return "< $0.0001";
  return `$${usd.toFixed(4)}`;
}

export default function CostEstimator() {
  const [text, setText] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(MODELS[0].id);

  const model = MODELS.find((m) => m.id === selectedModelId);

  const stats = useMemo(() => {
    if (!text.trim()) return null;
    const inputTokens = estimateTokens(text);
    const outputTokens = Math.ceil(inputTokens * OUTPUT_RATIO);
    const inputCost = estimateCost(inputTokens, model.inputPricePer1kTokens);
    const outputCost = estimateCost(outputTokens, model.outputPricePer1kTokens);
    const exceedsContext = inputTokens > model.maxContextTokens;
    return { inputTokens, outputTokens, inputCost, outputCost, exceedsContext };
  }, [text, model]);

  return (
    <div className="rounded-lg border bg-gray-50 p-6">
      <h3 className="mb-1 text-lg font-semibold">Token &amp; Cost Estimator</h3>
      <p className="mb-5 text-sm text-gray-500">
        Paste your prompt below to estimate token count and API cost.
      </p>

      {/* Model selector */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">Model</label>
        <select
          value={selectedModelId}
          onChange={(e) => setSelectedModelId(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — ${m.inputPricePer1kTokens}/1k in · ${m.outputPricePer1kTokens}/1k out
            </option>
          ))}
        </select>
      </div>

      {/* Textarea */}
      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-gray-700">Your prompt</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your prompt here..."
          rows={6}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-y"
        />
      </div>

      {/* Results */}
      {stats ? (
        <div className="space-y-3">
          {stats.exceedsContext && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              ⚠️ Input exceeds {model.name}'s context limit of {model.maxContextTokens.toLocaleString()} tokens.
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Input tokens" value={stats.inputTokens.toLocaleString()} />
            <Stat label="Est. output tokens" value={stats.outputTokens.toLocaleString()} sub="(~30% of input)" />
            <Stat label="Input cost" value={formatCost(stats.inputCost)} />
            <Stat label="Est. output cost" value={formatCost(stats.outputCost)} />
          </div>

          <div className="rounded-md border border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total estimated cost</span>
            <span className="text-base font-semibold">
              {formatCost(stats.inputCost + stats.outputCost)}
            </span>
          </div>

          <p className="text-xs text-gray-400">
            Token count uses the ~4 chars/token heuristic. Actual usage may vary.
            Output tokens are estimated at 30% of input.
          </p>
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-400">
          Results will appear here once you enter some text.
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white px-4 py-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}
