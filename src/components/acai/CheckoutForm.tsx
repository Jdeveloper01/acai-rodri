import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { items, total } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    specifications: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.address.trim()) newErrors.address = "Endereço é obrigatório";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const lines = items.map(
      (i) => `• ${i.quantity}x ${i.name} (${i.description}) — R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")}`
    );
    const customerInfo = `\n\nDados do cliente:\nNome: ${formData.name}\nEndereço: ${formData.address}\nTelefone: ${formData.phone}${formData.specifications ? `\nEspecificações: ${formData.specifications}` : ""}`;
    const msg = encodeURIComponent(
      `Olá! Quero fazer um pedido no Dois Amores:\n\n${lines.join("\n")}\n\nTotal: R$ ${total.toFixed(2).replace(".", ",")}${customerInfo}`
    ); // Changed "Roxo Premium" to "Dois Amores"
    window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Seu nome completo"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="address">Endereço *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Seu endereço completo"
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="specifications">Especificações</Label>
            <Textarea
              id="specifications"
              value={formData.specifications}
              onChange={(e) => handleInputChange("specifications", e.target.value)}
              placeholder="Instruções especiais (opcional)"
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Enviar Pedido
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}