// Storefront API documents that power the single-product landing page
// (ported from the Next.js app's hand-rolled `src/lib/shopify.ts` client).

export type Money = {amount: string; currencyCode: string};

export type TithyProductImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type TithyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: {name: string; value: string}[];
};

export type TithyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: TithyProductImage[];
  variants: TithyVariant[];
  subtitle: string | null;
  shortDescription: string | null;
  logoUrl: string | null;
};

export type ProductLandingQueryData = {
  product: Omit<TithyProduct, 'images' | 'variants' | 'subtitle' | 'shortDescription' | 'logoUrl'> & {
    images: {nodes: TithyProductImage[]};
    variants: {nodes: TithyVariant[]};
  } | null;
  productSubtitle: {
    subtitle: {value: string} | null;
    shortDescription: {value: string} | null;
    logo: {reference: {image: {url: string} | null} | null} | null;
  } | null;
};

export function mapProductLanding(
  data: ProductLandingQueryData,
): TithyProduct | null {
  if (!data.product) return null;
  return {
    ...data.product,
    images: data.product.images.nodes,
    variants: data.product.variants.nodes,
    subtitle: data.productSubtitle?.subtitle?.value ?? null,
    shortDescription: data.productSubtitle?.shortDescription?.value ?? null,
    logoUrl: data.productSubtitle?.logo?.reference?.image?.url ?? null,
  };
}

export type IngredientsQueryData = {
  metaobjects: {
    nodes: {
      heading: {value: string} | null;
      text: {value: string} | null;
      icon: {value: string} | null;
    }[];
  };
};

export type TithyIngredient = {heading: string; text: string; icon: string};

export type TestimonialVideosQueryData = {
  metaobjects: {
    nodes: {
      video: {
        reference: {sources: {url: string; mimeType: string}[]} | null;
      } | null;
    }[];
  };
};

export const PRODUCT_LANDING_QUERY = `#graphql
  query ProductLanding($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      variants(first: 25) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    productSubtitle: metaobject(
      handle: {handle: "hydrocolloid-bandage", type: "hydrocolloid_bandage"}
    ) {
      subtitle: field(key: "subtitle") {
        value
      }
      shortDescription: field(key: "short_description") {
        value
      }
      logo: field(key: "logo") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
` as const;

export const INGREDIENTS_QUERY = `#graphql
  query Ingredients {
    metaobjects(type: "ingredients", first: 20) {
      nodes {
        heading: field(key: "heading") {
          value
        }
        text: field(key: "text") {
          value
        }
        icon: field(key: "icon") {
          value
        }
      }
    }
  }
` as const;

export const TESTIMONIAL_VIDEOS_QUERY = `#graphql
  query TestimonialVideos {
    metaobjects(type: "customers_say", first: 20) {
      nodes {
        video: field(key: "video") {
          reference {
            ... on Video {
              sources {
                url
                mimeType
              }
            }
          }
        }
      }
    }
  }
` as const;

// Site-wide brand logo, sourced from the `hydrocolloid_bandage` metaobject
// (used across the Header/Footer, which render on every route) rather than
// the Shop object's own brand logo.
export const LOGO_QUERY = `#graphql
  query Logo {
    metaobject(handle: {handle: "hydrocolloid-bandage", type: "hydrocolloid_bandage"}) {
      logo: field(key: "logo") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
` as const;

export type LogoQueryData = {
  metaobject: {
    logo: {reference: {image: {url: string} | null} | null} | null;
  } | null;
};

export function mapLogoUrl(data: LogoQueryData): string | null {
  return data.metaobject?.logo?.reference?.image?.url ?? null;
}

export const SHOP_POLICIES_QUERY = `#graphql
  query ShopPolicies {
    shop {
      privacyPolicy {
        title
        url
      }
      refundPolicy {
        title
        url
      }
      termsOfService {
        title
        url
      }
      shippingPolicy {
        title
        url
      }
      subscriptionPolicy {
        title
        url
      }
    }
  }
` as const;

export type ShopPoliciesQueryData = {
  shop: {
    privacyPolicy: {title: string; url: string} | null;
    refundPolicy: {title: string; url: string} | null;
    termsOfService: {title: string; url: string} | null;
    shippingPolicy: {title: string; url: string} | null;
    subscriptionPolicy: {title: string; url: string} | null;
  };
};

export type ShopPolicyLink = {title: string; url: string};

export function mapShopPolicies(data: ShopPoliciesQueryData): ShopPolicyLink[] {
  return Object.values(data.shop).filter(
    (p): p is ShopPolicyLink => p !== null,
  );
}

export function pickVideoSource(
  sources: {url: string; mimeType: string}[],
): string | null {
  const mp4Sources = sources.filter((s) => s.mimeType === 'video/mp4');
  return (
    mp4Sources.find((s) => s.url.includes('720p'))?.url ??
    mp4Sources[0]?.url ??
    sources[0]?.url ??
    null
  );
}
