import { useMemo, useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import { useStoreStatus } from "./use-store-status";

const sizes = [
  { id: "300", label: "300ml", price: 14.9 },
  { id: "500", label: "500ml", price: 19.9 },
  { id: "700", label: "700ml", price: 24.9 },
  { id: "1000", label: "1L", price: 32.9 },
];

const bases = [
  { id: "tradicional", label: "Tradicional", desc: "Cremoso e encorpado" },
  { id: "zero", label: "Zero Açúcar", desc: "Pura essência da fruta" },
  { id: "banana", label: "Com Banana", desc: "Mais cremosidade natural" },
  { id: "morango", label: "Com Morango", desc: "Levemente adocicado" },
];

const toppings = [
  { id: "granola", label: "Granola", price: 2, color: "amber" },
  { id: "leite-cond", label: "Leite condensado", price: 2.5, color: "white" },
  { id: "banana", label: "Banana", price: 2, color: "yellow" },
  { id: "morango", label: "Morango", price: 3, color: "red" },
  { id: "pacoca", label: "Paçoca", price: 2.5, color: "tan" },
  { id: "nutella", label: "Nutella", price: 4, color: "brown" },
  { id: "kiwi", label: "Kiwi", price: 3, color: "green" },
  { id: "mirtilo", label: "Mirtilo", price: 4, color: "blue" },
  { id: "amendoim", label: "Amendoim", price: 2, color: "tan" },
];

const toppingColorMap: Record<string, string> = {
  amber: "bg-amber-600",
  white: "bg-stone-100",
  yellow: "bg-yellow-300",
  red: "bg-red-500",
  tan: "bg-amber-300",
  brown: "bg-amber-900",
  green: "bg-green-500",
  blue: "bg-blue-600",
};

export function Builder() {
  const [size, setSize] = useState(sizes[2]);
  const [base, setBase] = useState(bases[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["granola", "leite-cond"]);
  const { addItem } = useCart();
  const ref = useReveal<HTMLDivElement>();
  const { isOpen } = useStoreStatus();

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const total = useMemo(() => {
    const tt = selectedToppings.reduce(
      (sum, id) => sum + (toppings.find((t) => t.id === id)?.price ?? 0),
      0
    );
    return size.price + tt;
  }, [size, selectedToppings]);

  const fillHeight = useMemo(() => {
    const map: Record<string, number> = { "300": 50, "500": 65, "700": 78, "1000": 90 };
    return map[size.id];
  }, [size]);

  const handleAdd = () => {
    const toppingNames = selectedToppings
      .map((id) => toppings.find((t) => t.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    addItem({
      id: `custom-${Date.now()}`,
      name: `Açaí ${size.label} — ${base.label}`,
      description: toppingNames || "Sem toppings",
      price: total,
    });
    toast.success("Açaí adicionado ao carrinho!", {
      description: `${size.label} • ${base.label}`,
    });
  };

  return (
    <section id="montar" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-acai-deep/10 to-transparent" />
      <div ref={ref} className="container relative mx-auto px-4 reveal">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-widest text-acai-glow mb-4">
            Custom Builder
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-gradient">Crie o seu</span>{" "}
            <span className="text-gradient-primary">do seu jeito</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Toque, escolha e veja seu açaí ganhar vida em tempo real.
          </p>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Cup preview */}
          <div className="glass-strong rounded-3xl p-3 sm:p-8 shadow-card flex flex-col items-center justify-between min-h-[280px] sm:min-h-[500px] sticky top-20 sm:top-28 self-start">
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Visualização ao vivo
              </div>
              <div className="font-display text-2xl mt-2">{size.label} • {base.label}</div>
            </div>

            <div className="relative w-48 h-72 my-8">
              {/* Cup */}
              <div className="absolute inset-x-0 bottom-0 mx-auto w-full h-[88%] rounded-b-[40px] rounded-t-3xl border-2 border-border/60 bg-secondary/40 backdrop-blur-sm overflow-hidden shadow-inner">
                {/* Açaí fill */}
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-acai-deep via-primary to-acai-vivid transition-all duration-700 ease-out"
                  style={{ height: `${fillHeight}%` }}
                >
                  <div className="absolute inset-x-0 top-0 h-3 bg-acai-glow/40 blur-sm" />
                </div>
                {/* Toppings */}
                <div
                  className="absolute inset-x-0 flex flex-wrap items-center justify-center gap-1 p-3 transition-all duration-700"
                  style={{ bottom: `${fillHeight - 4}%` }}
                >
                  {selectedToppings.map((id) => {
                    const t = toppings.find((tp) => tp.id === id);
                    if (!t) return null;
                    return (
                      <span
                        key={id}
                        className={`h-3 w-3 rounded-full shadow-sm animate-scale-in ${toppingColorMap[t.color]}`}
                        title={t.label}
                      />
                    );
                  })}
                </div>
              </div>
              {/* Straw */}
              <div className="absolute left-1/2 top-0 h-20 w-2 -translate-x-1/2 -translate-y-2 rounded-full bg-gradient-primary shadow-glow rotate-6" />
              {/* Glow */}
              <div className="absolute -inset-4 -z-10 bg-gradient-glow rounded-full blur-2xl opacity-60" />
            </div>

            <div className="w-full space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-4xl font-bold text-gradient-primary">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <Button
                onClick={() => isOpen ? handleAdd() : toast.error("A loja está fechada no momento.")}
                disabled={!isOpen}
                size="lg"
                className="w-full h-14 rounded-full bg-gradient-primary text-base font-semibold shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:grayscale"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isOpen ? "Adicionar ao carrinho" : "Loja Fechada"}
              </Button>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-8">
            <OptionGroup title="01 — Tamanho">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s)}
                    className={`group relative rounded-2xl p-4 text-left transition-all duration-300 ${
                      size.id === s.id
                        ? "bg-gradient-primary shadow-glow scale-[1.02]"
                        : "glass hover:border-primary/50 hover:scale-[1.02]"
                    }`}
                  >
                    <div className={`font-display text-2xl font-bold ${size.id === s.id ? "text-primary-foreground" : "text-foreground"}`}>
                      {s.label}
                    </div>
                    <div className={`text-xs ${size.id === s.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      R$ {s.price.toFixed(2).replace(".", ",")}
                    </div>
                  </button>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="02 — Base">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bases.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBase(b)}
                    className={`group flex items-center justify-between rounded-2xl p-4 text-left transition-all duration-300 ${
                      base.id === b.id
                        ? "bg-gradient-primary shadow-glow"
                        : "glass hover:border-primary/50"
                    }`}
                  >
                    <div>
                      <div className={`font-semibold ${base.id === b.id ? "text-primary-foreground" : "text-foreground"}`}>
                        {b.label}
                      </div>
                      <div className={`text-xs ${base.id === b.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {b.desc}
                      </div>
                    </div>
                    {base.id === b.id && (
                      <Check className="h-5 w-5 text-primary-foreground animate-scale-in" />
                    )}
                  </button>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="03 — Toppings">
              <div className="flex flex-wrap gap-2">
                {toppings.map((t) => {
                  const active = selectedToppings.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTopping(t.id)}
                      className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-gradient-primary text-primary-foreground shadow-glow scale-105"
                          : "glass hover:border-primary/50 hover:scale-105"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${toppingColorMap[t.color]}`} />
                      {t.label}
                      <span className={`text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        +R$ {t.price.toFixed(2).replace(".", ",")}
                      </span>
                      {active ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />
                      )}
                    </button>
                  );
                })}
              </div>
            </OptionGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

function OptionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}