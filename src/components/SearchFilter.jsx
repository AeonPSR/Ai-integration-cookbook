/**
 * Search bar + filter controls for browsing recipes.
 * Stateless — all values and callbacks come from the parent.
 *
 * Props:
 *   categories       - array of { id, label, icon }
 *   search           - current search string
 *   onSearchChange   - callback(string)
 *   selectedCategory - currently selected category id (or "")
 *   onCategoryChange - callback(categoryId)
 *   selectedDifficulty - currently selected difficulty (or "")
 *   onDifficultyChange - callback(difficulty)
 *   selectedModel    - currently selected model (or "")
 *   onModelChange    - callback(model)
 *   models           - array of model name strings available across all recipes
 *   onClear          - callback() to reset all filters
 */

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

export default function SearchFilter({
  categories = [],
  search = "",
  onSearchChange = () => {},
  selectedCategory = "",
  onCategoryChange = () => {},
  selectedDifficulty = "",
  onDifficultyChange = () => {},
  selectedModel = "",
  onModelChange = () => {},
  models = [],
  onClear = () => {},
}) {
  const hasActiveFilters =
    search || selectedCategory || selectedDifficulty || selectedModel;

  return (
    <div className="mb-8 rounded-lg border bg-gray-50 px-4 py-4 flex flex-wrap items-center gap-3">
      {/* Text search */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-52 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      />

      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.icon} {cat.label}
          </option>
        ))}
      </select>

      {/* Difficulty filter */}
      <select
        value={selectedDifficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      >
        <option value="">All difficulties</option>
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </option>
        ))}
      </select>

      {/* Model filter */}
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      >
        <option value="">All models</option>
        {models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="ml-auto rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm hover:text-gray-900 hover:bg-red-300 transition"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
