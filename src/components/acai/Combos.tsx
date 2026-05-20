import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStoreStatus } from "./use-store-status";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import cupTradicional from "@/assets/Creme de morango.png";
import cupNutella from "@/assets/Gemini_Generated_Image_.png";
import cupTropical from "@/assets/Ninho com nutella.png";
import cupPacoca from "@/assets/açai_napolitano.png";

const combos = [
  {
    id: "classico",
    name: "Açaí com creme de morango",
    description: "Açaí cremoso com toque irresistível de morango.",
    volume: 500,
    price: 22.9,
    image: cupTradicional,
    badge: "Best Seller",
  },
  {
    id: "nutellatto",
    name: "Açaí com creme ninho",
    description: "Açaí + creme de ninho: combinação perfeita de sabor.",
    volume: 500,
    price: 29.9,
    image: cupNutella,
    badge: "Novo",
  },
  {
    id: "tropical",
    name: "Nutellato",
    description: "Açaí cremoso com Nutella: indulgência perfeita.",
    volume: 500,
    price: 31.9,
    image: cupTropical,
  },
  {
    id: "pacoquinha",
    name: "Napolitano",
    description: "Açaí com creme napolitano: três sabores em uma só delícia.",
    volume: 500,
    price: 24.9,
    image: cupPacoca,
  },
];

export function Combos() {
  const { addItem } = useCart();
  const ref = useReveal<HTMLDivElement>();
  const isMobile = useIsMobile();
  const { isOpen } = useStoreStatus();

  return (
    <section id="combos" className="relative py-24 sm:py-32">
      <div ref={ref} className="container mx-auto px-4 reveal">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-widest text-acai-glow mb-4">
              Combos prontos
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl">
              <span className="text-gradient">Receitas</span>{" "}
              <span className="text-gradient-primary">assinadas</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Combinações criadas pelo nosso time gastronômico para quem quer pedir e curtir.
          </p>
        </div>

        {isMobile ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {combos.map((combo, i) => (
                <CarouselItem key={combo.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3">
                  <article
                    className="group relative flex flex-col overflow-hidden rounded-3xl glass-strong shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-glow h-full"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-10" />
                      <img
                        src={combo.image}
                        alt={combo.name}
                        loading="lazy"
                        width={768}
                        height={1024}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {combo.badge && (
                        <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-glow">
                          <Star className="h-3 w-3 fill-current" />
                          {combo.badge}
                        </span>
                      )}
                      <span className="absolute top-4 right-4 z-20 rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                        {combo.volume}ml
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 -mt-2 relative z-10">
                      <h3 className="font-display text-2xl font-bold">{combo.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                        {combo.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <span className="font-display text-2xl font-bold text-gradient-primary">
                          R$ {combo.price.toFixed(2).replace(".", ",")}
                        </span>
                        <Button
                          size="sm"
                          disabled={!isOpen}
                          onClick={() => {
                            addItem({
                              id: combo.id,
                              name: combo.name,
                              description: `${combo.volume}ml`,
                              price: combo.price,
                            });
                            toast.success(`${combo.name} adicionado!`);
                          }}
                          className="rounded-full bg-gradient-primary px-4 shadow-glow hover:scale-110 transition-transform"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {combos.map((combo, i) => (
              <article
                key={combo.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl glass-strong shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-glow"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-10" />
                  <img
                    src={combo.image}
                    alt={combo.name}
                    loading="lazy"
                    width={768}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {combo.badge && (
                    <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-glow">
                      <Star className="h-3 w-3 fill-current" />
                      {combo.badge}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 z-20 rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                    {combo.volume}ml
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 -mt-2 relative z-10">
                  <h3 className="font-display text-2xl font-bold">{combo.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                    {combo.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="font-display text-2xl font-bold text-gradient-primary">
                      R$ {combo.price.toFixed(2).replace(".", ",")}
                    </span>
                    <Button
                      size="sm"
                      disabled={!isOpen}
                      onClick={() => {
                        addItem({
                          id: combo.id,
                          name: combo.name,
                          description: `${combo.volume}ml`,
                          price: combo.price,
                        });
                        toast.success(`${combo.name} adicionado!`);
                      }}
                      className="rounded-full bg-gradient-primary px-4 shadow-glow hover:scale-110 transition-transform"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}