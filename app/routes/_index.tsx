import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {
  PRODUCT_LANDING_QUERY,
  INGREDIENTS_QUERY,
  TESTIMONIAL_VIDEOS_QUERY,
  mapProductLanding,
  pickVideoSource,
  type ProductLandingQueryData,
  type IngredientsQueryData,
  type TestimonialVideosQueryData,
  type TithyIngredient,
} from '~/lib/tithy-queries';
import {richTextToPlainText} from '~/lib/richText';
import {ProductGallery} from '~/components/tithy/ProductGallery';
import {ProductInfo} from '~/components/tithy/ProductInfo';
import {ProductStory} from '~/components/tithy/ProductStory';
import {Ingredients} from '~/components/tithy/Ingredients';
import {HowToUse} from '~/components/tithy/HowToUse';
import {TestimonialVideo} from '~/components/tithy/TestimonialVideo';

export const meta: Route.MetaFunction = ({data}) => {
  const product = data?.product;
  return [
    {title: product ? `${product.title} | Tithyco` : 'Tithyco'},
    {
      name: 'description',
      content: product?.shortDescription ?? 'Premium product landing page',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const {storefront, env} = context;
  const handle = env.PUBLIC_HOME_PRODUCT_HANDLE;

  const [productData, ingredientsData, testimonialsData] = await Promise.all([
    storefront.query<ProductLandingQueryData>(PRODUCT_LANDING_QUERY, {
      variables: {handle},
    }),
    storefront.query<IngredientsQueryData>(INGREDIENTS_QUERY),
    storefront.query<TestimonialVideosQueryData>(TESTIMONIAL_VIDEOS_QUERY),
  ]);

  const product = mapProductLanding(productData);

  const ingredients: TithyIngredient[] = ingredientsData.metaobjects.nodes.map(
    (n) => ({
      heading: n.heading?.value ?? '',
      text: richTextToPlainText(n.text?.value),
      icon: n.icon?.value ?? '',
    }),
  );

  const testimonialVideos = testimonialsData.metaobjects.nodes
    .map((n) => pickVideoSource(n.video?.reference?.sources ?? []))
    .filter((url): url is string => url !== null);

  return {product, ingredients, testimonialVideos};
}

export default function Homepage() {
  const {product, ingredients, testimonialVideos} =
    useLoaderData<typeof loader>();

  if (!product) {
    return (
      <div className="p-8">Product not found — check the product handle.</div>
    );
  }

  return (
    // Cancels the `body > main { margin: 0 1rem 1rem 1rem }` stock reset so
    // this fully custom, Tailwind-driven page can go truly edge-to-edge.
    <div className="-mx-4 -mb-4">
      <section className="pt-4 pb-4 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto px-3 md:px-4">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
      </section>
      <TestimonialVideo videos={testimonialVideos} />
      <Ingredients items={ingredients} />
      <ProductStory />
      <HowToUse />
    </div>
  );
}
