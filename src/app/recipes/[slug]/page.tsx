interface RecipePageProps {
  params: { slug: string };
}

export default function RecipePage({ params }: RecipePageProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Recipe: {params.slug}</h2>
      {/* TODO: load recipe MDX, render CodeBlock, LiveSandbox, CostEstimator */}
    </div>
  );
}
