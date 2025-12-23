import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Partners - Saltcrew',
  description: 'Our sponsors and partners who support Saltcrew',
};

interface Partner {
  name: string;
  logo: string;
  url: string;
  description: string;
}

const partners: Partner[] = [
  // Add partners here
  // Example:
  // {
  //   name: 'Partner Name',
  //   logo: '/images/partners/partner-logo.png',
  //   url: 'https://partner-website.com',
  //   description: 'Brief description of the partnership',
  // },
];

export default function PartnersPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 uppercase">Our Partners</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            We&apos;re proud to work with amazing sponsors and partners who support our competitive journey
          </p>
        </div>

        {partners.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-accent/50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">No Partners Yet</h3>
              <p className="text-foreground/60">
                We&apos;re actively seeking partnerships. Interested in supporting Saltcrew?
              </p>
            </div>
          </div>
        ) : (
          /* Partners Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 group"
              >
                {/* Partner Logo */}
                <div className="h-48 bg-background flex items-center justify-center p-8 group-hover:bg-accent/5 transition-all">
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Partner Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Partnership Info Section */}
        <div className="mt-16 bg-card rounded-lg border border-border p-8 md:p-12">
          <h2 className="text-3xl font-bold text-accent mb-6 uppercase text-center">
            Interested in Partnering?
          </h2>
          <p className="text-foreground/80 text-center max-w-3xl mx-auto leading-relaxed">
            We&apos;re always looking for partnerships that align with our team values and competitive goals.
            If you&apos;re interested in supporting Saltcrew or exploring collaboration opportunities,
            we&apos;d love to hear from you.
          </p>
          <div className="flex justify-center mt-8">
            <a
              href="https://twitter.com/saltcrewgg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded transition-colors uppercase tracking-wider"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
