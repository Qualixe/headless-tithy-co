import type {TithyIngredient} from '~/lib/tithy-queries';
import {IngredientCard} from './IngredientCard';

const HEADING = 'Hydrocolloid-এর ভিতরে কী থাকে?';
const SUBHEADING = 'সাধারণ Hydrocolloid dressing formulation-এ থাকতে পারে:';

export function Ingredients({items}: {items: TithyIngredient[]}) {
  if (items.length === 0) return null;

  return (
    <section id="ingredients" className="scroll-mt-16 py-3 md:py-16">
      <div className="max-w-6xl mx-auto px-3">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-3xl font-semibold mb-1">{HEADING}</h2>
          <p className="text-gray-500 mt-1 md-4 md:mb-8">{SUBHEADING}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <IngredientCard
              key={item.heading}
              heading={item.heading}
              text={item.text}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
