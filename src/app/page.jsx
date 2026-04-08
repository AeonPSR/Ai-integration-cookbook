"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { RECIPES } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import SearchFilter from "@/components/SearchFilter";

// Deduplicated sorted list of all models across all recipes
const ALL_MODELS = [...new Set(RECIPES.flatMap((r) => r.models))].sort();

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current filter values from URL
  const search = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedDifficulty = searchParams.get("difficulty") || "";
  const selectedModel = searchParams.get("model") || "";

  // Update a single query param while keeping the others intact
  const setParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.replace("/", { scroll: false });
  }, [router]);

  // Client-side filtering
  const filteredRecipes = useMemo(() => {
    const q = search.toLowerCase();
    return RECIPES.filter((recipe) => {
      if (selectedCategory && recipe.category !== selectedCategory) return false;
      if (selectedDifficulty && recipe.difficulty !== selectedDifficulty) return false;
      if (selectedModel && !recipe.models.includes(selectedModel)) return false;
      if (q) {
        const haystack = `${recipe.title} ${recipe.description} ${recipe.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedCategory, selectedDifficulty, selectedModel]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Recipes</h2>
      <p className="mb-8 text-gray-600">
        Browse copy-paste AI recipes. Pick a category or scroll through all recipes.
      </p>

      {/* Category grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="block rounded-lg border p-5 transition hover:shadow-md"
          >
            <span className="text-3xl">{cat.icon}</span>
            <h3 className="mt-2 font-semibold">{cat.label}</h3>
            <p className="mt-1 text-sm text-gray-600">{cat.description}</p>
          </a>
        ))}
      </div>

      {/* Search & filters */}
      <h2 className="mb-4 text-xl font-semibold">All Recipes</h2>
      <SearchFilter
        categories={CATEGORIES}
        search={search}
        onSearchChange={(v) => setParam("q", v)}
        selectedCategory={selectedCategory}
        onCategoryChange={(v) => setParam("category", v)}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={(v) => setParam("difficulty", v)}
        selectedModel={selectedModel}
        onModelChange={(v) => setParam("model", v)}
        models={ALL_MODELS}
        onClear={clearFilters}
      />

      {/* Recipe grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No recipes match your filters.</p>
      )}
    </div>
  );
}
