import { Star } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const reviews = [
  {
    name: "Marina S.",
    role: "Cliente desde 2023",
    text: "Simplesmente o melhor açaí da cidade. A cremosidade é absurda e os toppings são sempre frescos. Virei cliente fiel!",
    rating: 5,
  },
  {
    name: "Lucas R.",
    role: "Atleta",
    text: "Peço o tamanho 1L com base zero açúcar depois do treino. Energia, sabor e nada de culpa. Recomendo demais.",
    rating: 5,
  },
  {
    name: "Ana Paula",
    role: "Foodie",
    text: "O Nutellatto é uma experiência. A apresentação é linda, o sabor é perfeito. Parece açaí de restaurante chique.",
    rating: 5,
  },
];

export function Reviews() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="avaliacoes" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-acai-deep/15 to-transparent" />
      <div ref={ref} className="container relative mx-auto px-4 reveal">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-widest text-acai-glow mb-4">
            Avaliações reais
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-gradient">Quem prova,</span>{" "}
            <span className="text-gradient-primary">não esquece.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className="glass-strong rounded-3xl p-8 shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-glow"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}