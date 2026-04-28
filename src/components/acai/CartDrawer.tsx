import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, total, clear } = useCart();

  const handleWhatsapp = () => {
    const lines = items.map(
      (i) => `• ${i.quantity}x ${i.name} (${i.description}) — R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")}`
    );
    const msg = encodeURIComponent(
      `Olá! Quero fazer um pedido no Roxo Premium:\n\n${lines.join("\n")}\n\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`
    );
    window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="glass-strong border-l border-border/50 flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Seu pedido
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-20">
              <ShoppingBag className="h-12 w-12 mb-4 opacity-30" />
              <p>Seu carrinho está vazio.</p>
              <p className="text-xs mt-2">Que tal montar seu açaí perfeito?</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="glass rounded-2xl p-4 flex flex-col gap-3 animate-fade-in"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-semibold leading-tight">{item.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full glass"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full glass"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-display font-bold text-gradient-primary">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 px-6 py-5 space-y-4 glass-strong">
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-3xl font-bold text-gradient-primary">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <Button
              onClick={handleWhatsapp}
              size="lg"
              className="w-full h-14 rounded-full bg-gradient-primary text-base font-semibold shadow-glow hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Finalizar via WhatsApp
            </Button>
            <button
              onClick={clear}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}