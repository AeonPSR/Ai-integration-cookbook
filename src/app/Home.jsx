"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import RecipeCard from "@/components/RecipeCard";
import SearchFilter from "@/components/SearchFilter";

export default function Home({ recipes }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allModels = useMemo(
    () => [...new Set(recipes.flatMap((recipe) => recipe.models))].sort(),
    [recipes]
  );

  const search = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedDifficulty = searchParams.get("difficulty") || "";
  const selectedModel = searchParams.get("model") || "";

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

  const filteredRecipes = useMemo(() => {
    const query = search.toLowerCase();

    return recipes.filter((recipe) => {
      if (selectedCategory && recipe.category !== selectedCategory) return false;
      if (selectedDifficulty && recipe.difficulty !== selectedDifficulty) return false;
      if (selectedModel && !recipe.models.includes(selectedModel)) return false;

      if (query) {
        const haystack = `${recipe.title} ${recipe.description} ${recipe.tags.join(" ")}`.toLowerCase();
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
