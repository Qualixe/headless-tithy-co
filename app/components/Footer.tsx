import {Suspense} from 'react';
import {Await} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {ShopPolicyLink} from '~/lib/tithy-queries';

interface FooterProps {
  header: HeaderQuery;
  publicStoreDomain: string;
  policies: Promise<ShopPolicyLink[]>;
  logoUrl: string | null;
}

export function Footer({header, policies, logoUrl}: FooterProps) {
  const {shop} = header;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t mb-16">
      <div className="max-w-6xl mx-auto px-3 py-6 text-[13px] text-gray-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="shrink-0">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={shop.name}
                aspectRatio="1841/441"
                width={117}
                height={28}
                className="h-7 w-auto object-contain"
              />
            ) : (
              <span className="font-semibold text-black">{shop.name}</span>
            )}
          </div>

          <p className="whitespace-nowrap text-center text-[13px]">
            © {year} {shop.name}. All rights reserved. Created by{' '}
            <a
              href="https://qualixe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Qualixe
            </a>
          </p>

          <Suspense fallback={null}>
            <Await resolve={policies}>
              {(links) => <FooterPolicyLinks links={links} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </footer>
  );
}

function FooterPolicyLinks({links}: {links: ShopPolicyLink[]}) {
  if (links.length === 0) return <div className="shrink-0" />;

  return (
    <div className="flex flex-wrap justify-center gap-3 shrink-0">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] whitespace-nowrap"
        >
          {link.title}
        </a>
      ))}
    </div>
  );
}
