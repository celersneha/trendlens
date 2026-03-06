import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: FiGithub,
      href: "https://github.com/celersneha",
      ariaLabel: "Visit our GitHub profile",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      href: "https://linkedin.com/celersneha",
      ariaLabel: "Connect on LinkedIn",
    },
    {
      name: "Twitter",
      icon: FiTwitter,
      href: "https://x.com/celersneha",
      ariaLabel: "Follow us on Twitter",
    },
    {
      name: "Email",
      icon: FiMail,
      href: "mailto:celersneha@gmail.com",
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
        </div>
      </div>
    </footer>
  );
}
