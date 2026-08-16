import { Navbar } from "@/components/acai/Navbar";
import { Hero } from "@/components/acai/Hero";
import { Builder } from "@/components/acai/Builder";
import { Combos } from "@/components/acai/Combos";
import { IceCreams } from "@/components/acai/IceCreams";
import { About } from "@/components/acai/About";
import { Reviews } from "@/components/acai/Reviews";
import { Footer } from "@/components/acai/Footer";
import { CartDrawer } from "@/components/acai/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Builder />
          <Combos />
          <IceCreams />
          <Reviews />
          <About />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Index;
