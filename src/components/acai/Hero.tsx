import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-acai.jpg";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero pt-32 pb-20">
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-glow opacity-70 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-glow opacity-50 blur-3xl"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-widest text-acai-glow">
              <Sparkles className="h-3.5 w-3.5" />
              Açaí artesanal premium
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="text-gradient">Monte seu</span>
              <br />
              <span className="text-gradient-primary">açaí perfeito</span>
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground sm:text-xl">
              Cremoso, encorpado e cheio de personalidade. Escolha o tamanho, a base e os
              toppings — e veja seu copo dos sonhos ganhar vida.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="group h-14 rounded-full bg-gradient-primary px-8 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:shadow-elegant"
              >
                <a href="#montar">
                  Começar pedido
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-14 rounded-full border border-border px-8 text-base hover:bg-primary/10"
              >
                <a href="#combos">Ver combos</a>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              {[
                { v: "12k+", l: "Copos servidos" },
                { v: "30min", l: "Entrega rápida" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-gradient-primary">
                    {s.v}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div
              className="relative mx-auto aspect-square max-w-xl"
              style={{ transform: `translateY(${scrollY * -0.08}px)` }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-glow blur-3xl animate-pulse-glow" />
              <img
                src={heroImg}
                alt="Tigela de açaí premium com granola, banana, morango e mirtilo"
                width={1536}
                height={1024}
                className="relative z-10 h-full w-full rounded-full object-cover shadow-elegant animate-float"
              />
              <div className="absolute -bottom-4 left-1/2 z-0 h-12 w-3/4 -translate-x-1/2 rounded-full bg-acai-deep/60 blur-2xl" />
            </div>

            {/* Floating cards */}
            <div
              className="absolute -left-2 top-10 hidden md:block glass-strong rounded-2xl p-4 shadow-card animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Topping favorito
              </div>
              <div className="font-display text-lg font-semibold">Leite condensado</div>
            </div>
            <div
              className="absolute -right-2 bottom-10 hidden md:block glass-strong rounded-2xl p-4 shadow-card animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Mais pedido
              </div>
              <div className="font-display text-lg font-semibold">700ml Tropical</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}