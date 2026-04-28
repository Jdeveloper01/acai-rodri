import { useReveal } from "@/hooks/use-reveal";
import splash from "@/assets/acai-splash.jpg";
import { Leaf, Award, Heart } from "lucide-react";

const values = [
  { icon: Leaf, title: "100% natural", desc: "Polpa pura de açaí da Amazônia, sem corantes." },
  { icon: Award, title: "Premiado", desc: "Eleito o melhor açaí gourmet da região por 2 anos." },
  { icon: Heart, title: "Feito à mão", desc: "Cada copo é montado com cuidado artesanal." },
];

export function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="sobre" className="relative py-24 sm:py-32 overflow-hidden">
      <div ref={ref} className="container relative mx-auto px-4 reveal">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-elegant">
              <img
                src={splash}
                alt="Splash de açaí roxo vibrante"
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-acai-deep/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block glass-strong rounded-2xl p-6 shadow-glow max-w-xs">
              <div className="font-display text-3xl font-bold text-gradient-primary">2019</div>
              <div className="text-sm text-muted-foreground">
                desde o nosso primeiro copo, mantemos o mesmo padrão obsessivo de qualidade.
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-widest text-acai-glow">
              Sobre a marca
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              <span className="text-gradient">Açaí premium,</span>{" "}
              <span className="text-gradient-primary">sem atalhos.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nasceu em 2019 com uma única missão: levar o melhor açaí do Brasil até você,
              com obsessão por qualidade, frescor e estética. Cada detalhe importa — da
              polpa selecionada à temperatura do copo.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {values.map((v) => (
                <div key={v.title} className="glass rounded-2xl p-5">
                  <v.icon className="h-6 w-6 text-acai-glow mb-3" />
                  <div className="font-semibold mb-1">{v.title}</div>
                  <div className="text-xs text-muted-foreground">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}