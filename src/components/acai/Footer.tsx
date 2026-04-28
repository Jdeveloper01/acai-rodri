import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary shadow-glow font-display font-bold text-primary-foreground">
                R
              </span>
              <span className="font-display text-2xl font-bold text-gradient">Roxo Premium</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Açaí artesanal premium, montado do seu jeito e entregue na sua porta.
              Experiência gourmet em cada copo.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-gradient-primary hover:scale-110 transition-all"
                  aria-label="Rede social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#montar" className="hover:text-foreground transition-colors">Montar Açaí</a></li>
              <li><a href="#combos" className="hover:text-foreground transition-colors">Combos</a></li>
              <li><a href="#avaliacoes" className="hover:text-foreground transition-colors">Avaliações</a></li>
              <li><a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Rua das Palmeiras, 123</li>
              <li>São Paulo — SP</li>
              <li>(11) 99999-9999</li>
              <li>contato@roxopremium.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Roxo Premium. Todos os direitos reservados.</p>
          <p>Feito com 💜 para amantes de açaí.</p>
        </div>
      </div>
    </footer>
  );
}