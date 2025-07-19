import { Feature } from "@/lib/data/features";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-lemon-dark">
        <feature.icon className="h-8 w-8 text-green-deep" />
      </div>
      <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
      <p className="text-gray-100">{feature.description}</p>
    </div>
  );
}
