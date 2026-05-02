import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

const links = [
  { href: "#montar", label: "Montar Açaí" },
  { href: "#combos", label: "Combos" },
  { href: "#sobre", label: "Sobre" },
];

export function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`container mx-auto px-4`}>
        <nav
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-elegant" : "glass"
          }`}
        >
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold" onClick={closeMenu}>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
              <span className="font-display text-lg text-primary-foreground">R</span>
            </span>
            <span className="hidden sm:inline text-gradient">Roxo Premium</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-primary after:transition-all hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsOpen(true)}
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-primary/10"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-primary px-1 text-[10px] font-bold text-primary-foreground shadow-glow animate-scale-in">
                  {count}
                </span>
              )}
            </Button>
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 mx-4">
            <div className="glass-strong rounded-2xl p-6 shadow-elegant">
              <ul className="flex flex-col gap-4">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={closeMenu}
                      className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}