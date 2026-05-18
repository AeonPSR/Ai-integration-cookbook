"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import RecipeCard from "@/components/RecipeCard";
import SearchFilter from "@/components/SearchFilter";

const PARAM_KEY_MAP = {
  q: "search",
  category: "selectedCategory",
  difficulty: "selectedDifficulty",
  model: "selectedModel",
};

function readFiltersFromSearchParams(searchParams) {
  return {
    search: searchParams.get("q") || "",
    selectedCategory: searchParams.get("category") || "",
    selectedDifficulty: searchParams.get("difficulty") || "",
    selectedModel: searchParams.get("model") || "",
  };
}

function buildFilterQueryString(filters) {
  const params = new URLSearchParams();

  if (filters.search) params.set("q", filters.search);
  if (filters.selectedCategory) params.set("category", filters.selectedCategory);
  if (filters.selectedDifficulty) params.set("difficulty", filters.selectedDifficulty);
  if (filters.selectedModel) params.set("model", filters.selectedModel);

  return params.toString();
}

function areFiltersEqual(left, right) {
  return (
    left.search === right.search &&
    left.selectedCategory === right.selectedCategory &&
    left.selectedDifficulty === right.selectedDifficulty &&
    left.selectedModel === right.selectedModel
  );
}

export default function Home({ recipes }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => readFiltersFromSearchParams(searchParams));

  const allModels = useMemo(
    () => [...new Set(recipes.flatMap((recipe) => recipe.models || []))].sort(),
    [recipes]
  );

  const { search, selectedCategory, selectedDifficulty, selectedModel } = filters;

  useEffect(() => {
    const fromUrl = readFiltersFromSearchParams(searchParams);
    setFilters((current) => (areFiltersEqual(current, fromUrl) ? current : fromUrl));
  }, [searchParams]);

  useEffect(() => {
    const nextQuery = buildFilterQueryString(filters);
    const currentQuery = searchParams.toString();

    if (nextQuery === currentQuery) return;

    const href = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(href, { scroll: false });
  }, [filters, pathname, router, searchParams]);

  const setParam = useCallback((key, value) => {
    setFilters((current) => ({
      ...current,
      [PARAM_KEY_MAP[key]]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      selectedCategory: "",
      selectedDifficulty: "",
      selectedModel: "",
    });
  }, []);

  const filteredRecipes = useMemo(() => {
    const query = search.toLowerCase();

    return recipes.filter((recipe) => {
      if (selectedCategory && recipe.category !== selectedCategory) return false;
      if (selectedDifficulty && recipe.difficulty !== selectedDifficulty) return false;
      if (selectedModel && !(recipe.models || []).includes(selectedModel)) return false;

      if (query) {
        const tags = Array.isArray(recipe.tags) ? recipe.tags.join(" ") : "";
        const haystack = `${recipe.title} ${recipe.description} ${tags}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [recipes, search, selectedCategory, selectedDifficulty, selectedModel]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Recipes</h2>
      <p className="mb-8 text-gray-600">
        Browse copy-paste AI recipes. Pick a category or scroll through all recipes.
      </p>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <a
            key={category.id}
            href={`/categories/${category.id}`}
            className="block rounded-lg border p-5 transition hover:shadow-md"
          >
            <span className="text-3xl">{category.icon}</span>
            <h3 className="mt-2 font-semibold">{category.label}</h3>
            <p className="mt-1 text-sm text-gray-600">{category.description}</p>
          </a>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-semibold">All Recipes</h2>
      <SearchFilter
        categories={CATEGORIES}
        search={search}
        onSearchChange={(value) => setParam("q", value)}
        selectedCategory={selectedCategory}
        onCategoryChange={(value) => setParam("category", value)}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={(value) => setParam("difficulty", value)}
        selectedModel={selectedModel}
        onModelChange={(value) => setParam("model", value)}
        models={allModels}
        onClear={clearFilters}
      />

      {filteredRecipes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No recipes match your filters.</p>
      )}
    </div>
  );
}
