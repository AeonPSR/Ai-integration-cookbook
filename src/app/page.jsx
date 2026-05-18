import { Suspense } from "react";
import { getRecipes } from "@/lib/recipes";
import Home from "./Home";

export default function Page() {
  const recipes = getRecipes();

  return (
    <Suspense fallback={<p className="text-gray-500">Loading recipes...</p>}>
      <Home recipes={recipes} />
    </Suspense>
  );
}
