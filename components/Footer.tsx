import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/saltcrew.png"
                alt="Saltcrew"
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-foreground-muted max-w-md mb-6">
              North American Counter-Strike team competing in ESEA leagues. 
              Building champions, creating legends.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://twitter.com/saltcrewgg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-border hover:bg-accent flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-foreground group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://twitch.tv/saltcrewgg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-border hover:bg-accent flex items-center justify-center transition-colors group"
                aria-label="Twitch"
              >
                <svg className="w-5 h-5 text-foreground group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </a>
              <a
                href="https://discord.gg/saltcrew"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-border hover:bg-accent flex items-center justify-center transition-colors group"
                aria-label="Discord"
              >
                <svg className="w-5 h-5 text-foreground group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@SaltcrewGG"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-border hover:bg-accent flex items-center justify-center transition-colors group"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 text-foreground group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold uppercase tracking-wider mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/team', label: 'Team' },
                { href: '/matches', label: 'Results' },
                { href: '/partners', label: 'Partners' },
              ].map(link => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-foreground-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-foreground font-bold uppercase tracking-wider mb-6">External</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://arma.gg/collections/saltcrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent transition-colors flex items-center gap-2"
                >
                  Shop Merch
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.faceit.com/teams/53de7e05-fe37-48ff-a34d-ce456c4d100f/leagues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent transition-colors flex items-center gap-2"
                >
                  FACEIT Team Page
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground-muted text-sm">
              © {new Date().getFullYear()} Saltcrew. All rights reserved.
            </p>
            <p className="text-foreground-muted text-sm">
              Competing in ESEA North America
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
