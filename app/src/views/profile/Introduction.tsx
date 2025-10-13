import { Introduction as IntroductionModel } from '@/models/profile';

interface IntroductionProps {
  introduction: IntroductionModel | null;
}

export function Introduction({ introduction }: IntroductionProps) {
  if (!introduction) return null; // Or a loading skeleton

  return (
    <section>
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Introduction</h2>
      <h3 className="text-4xl font-bold">{introduction.title}</h3>
      <p className="mt-4 text-gray-400 whitespace-pre-line">
        {introduction.body}
      </p>
    </section>
  );
}
