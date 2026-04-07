/**
 * Search bar + filter controls for browsing recipes.
 * Filters: category, difficulty, model.
 *
 * Props:
 *   categories       - array of { id, label, icon }
 *   selectedCategory - currently selected category id (or "")
 *   onCategoryChange - callback(categoryId)
 */

export default function SearchFilter({
  categories = [],
  selectedCategory = "",
  onCategoryChange = () => {},
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded border px-3 py-1.5 text-sm"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.icon} {cat.label}
          </option>
        ))}
      </select>

      {/* TODO: search input, difficulty dropdown, model filter */}
    </div>
  );
}
