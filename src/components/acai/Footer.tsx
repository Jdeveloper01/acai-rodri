import { Instagram, MessageCircle } from "lucide-react";

const footerLinks = [
  { href: "#montar", label: "Montar Açaí" },
  { href: "#combos", label: "Combos" },
  { href: "#sorvetes", label: "Sorvetes" },
  { href: "#sobre", label: "Sobre" },
];

export function Footer() {
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary shadow-glow font-display font-bold text-primary-foreground">
                D
              </span>
              <span className="font-display text-2xl font-bold text-gradient">Dois Amores</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Açaí artesanal premium, montado do seu jeito e entregue na sua porta.
              Experiência gourmet em cada copo.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/acai.2amores__?igsh=b3puamZwZ2tkNjln", label: "Instagram" },
                { Icon: MessageCircle, href: "https://wa.me/5585992744728", label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-gradient-primary hover:scale-110 transition-all"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleScroll(event, link.href)}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Rua Erineu Ramos 2027</li>
              <li>WhatsApp: (85) 9 92744728</li>
              <li>Instagram: @doisamores</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Dois Amores. Todos os direitos reservados.</p>
          <p>Feito com 💜 para amantes de açaí.</p>
        </div>
      </div>
    </footer>
  );
}