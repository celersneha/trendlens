import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: FiGithub,
      href: "https://github.com",
      ariaLabel: "Visit our GitHub profile",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      href: "https://linkedin.com",
      ariaLabel: "Connect on LinkedIn",
    },
    {
      name: "Twitter",
      icon: FiTwitter,
      href: "https://twitter.com",
      ariaLabel: "Follow us on Twitter",
    },
    {
      name: "Email",
      icon: FiMail,
      href: "mailto:contact@trendlens.com",
      ariaLabel: "Send us an email",
    },
  ];

  return (
    <footer className="bg-primary border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-gray-400 hover:text-accent transition-colors p-2 hover:scale-110 transform duration-200"
                >
                  <Icon className="text-2xl" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear}{" "}
              <span className="text-accent font-semibold">TrendLens</span>. All
              rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Discover trending repositories and articles
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
