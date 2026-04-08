import CostEstimator from "@/components/CostEstimator";

export const metadata = {
  title: "Token & Cost Estimator — AI Integration Cookbook",
  description: "Estimate token count and API cost for any prompt across supported models.",
};

export default function CostEstimatorPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="mb-2 text-2xl font-semibold">Token &amp; Cost Estimator</h2>
      <p className="mb-8 text-gray-600">
        Paste a prompt to estimate how many tokens it uses and what it will cost across different models.
      </p>
      <CostEstimator />
    </div>
  );
}
