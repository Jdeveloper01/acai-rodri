import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const iceCreams = [
  {
    id: "ice-choco",
    name: "Chocolate Belga",
    description: "Cremosidade intensa com chocolate 70% e raspas de cacau puro.",
    volume: 500,
    price: 18.9,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=768&h=1024",
    badge: "Premium",
  },
  {
    id: "ice-strawberry",
    name: "Morango Silvestre",
    description: "Sorvete artesanal com polpa natural de morango e pedaços da fruta.",
    volume: 500,
    price: 16.9,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=768&h=1024",
    badge: "Novo",
  },
  {
    id: "ice-pistache",
    name: "Pistache Italiano",
    description: "O autêntico sabor do pistache com pedaços torrados e crocantes.",
    volume: 500,
    price: 24.9,
    image: "https://images.unsplash.com/photo-1555529321-30d880499e1c?auto=format&fit=crop&q=80&w=768&h=1024",
  },
  {
    id: "ice-vanilla",
    name: "Baunilha Bourbon",
    description: "Baunilha premium com fios generosos de caramelo salgado artesanal.",
    volume: 500,
    price: 17.9,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=768&h=1024",
  },
];

export function IceCreams() {
  const { addItem } = useCart();
  const ref = useReveal<HTMLDivElement>();
  const isMobile = useIsMobile();

  return (
    <section id="sorvetes" className="relative py-24 sm:py-32 bg-secondary/5">
      <div ref={ref} className="container mx-auto px-4 reveal">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-widest text-acai-glow mb-4">
              Gelatos Artesanais
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl">
              <span className="text-gradient">Nossos</span>{" "}
              <span className="text-gradient-primary">Sorvetes</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A mesma qualidade premium das nossas receitas de açaí, agora em versões geladas inesquecíveis.
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
              {iceCreams.map((item, i) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3">
                  <article
                    className="group relative flex flex-col overflow-hidden rounded-3xl glass-strong shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-glow h-full"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-10" />
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        width={768}
                        height={1024}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {item.badge && (
                        <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-glow">
                          <Star className="h-3 w-3 fill-current" />
                          {item.badge}
                        </span>
                      )}
                      <span className="absolute top-4 right-4 z-20 rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                        {item.volume}ml
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 -mt-2 relative z-10">
                      <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                        {item.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <span className="font-display text-2xl font-bold text-gradient-primary">
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => {
                            addItem({
                              id: item.id,
                              name: item.name,
                              description: `${item.volume}ml`,
                              price: item.price,
                            });
                            toast.success(`${item.name} adicionado!`);
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
            {iceCreams.map((item, i) => (
              <article
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl glass-strong shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-glow"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-10" />
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={768}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {item.badge && (
                    <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-glow">
                      <Star className="h-3 w-3 fill-current" />
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 z-20 rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                    {item.volume}ml
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 -mt-2 relative z-10">
                  <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="font-display text-2xl font-bold text-gradient-primary">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
                        addItem({
                          id: item.id,
                          name: item.name,
                          description: `${item.volume}ml`,
                          price: item.price,
                        });
                        toast.success(`${item.name} adicionado!`);
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