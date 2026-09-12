import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { agatConfig, whatsappLink } from "@/lib/agat-config";
import { useAgatStore } from "@/lib/agat-store";

export function SiteHeader({
  onAbrirCarrinho,
  somenteFavoritos,
  onAlternarFavoritos,
}: {
  onAbrirCarrinho: () => void;
  somenteFavoritos: boolean;
  onAlternarFavoritos: () => void;
}) {
  const { totalItens, favoritos } = useAgatStore();

  const falarComAgat = () => {
    const link = whatsappLink(`Olá, ${agatConfig.nome}! Gostaria de mais informações.`);
    if (!link) {
      toast.error("WhatsApp ainda não configurado", {
        description: "Informe o número da loja nas configurações do site.",
      });
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <a href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary">
            <Heart className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl leading-none font-bold">
              {agatConfig.nome}
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">
              {agatConfig.slogan}
            </span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant={somenteFavoritos ? "default" : "outline"}
            size="icon"
            aria-label="Ver favoritos"
            onClick={onAlternarFavoritos}
            className="relative"
          >
            <Heart className={`h-4 w-4 ${somenteFavoritos ? "fill-current" : ""}`} />
            {favoritos.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {favoritos.length}
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Abrir carrinho"
            onClick={onAbrirCarrinho}
            className="relative"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItens > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalItens}
              </span>
            )}
          </Button>

          <Button onClick={falarComAgat} className="hidden sm:inline-flex">
            <MessageCircle className="mr-1 h-4 w-4" /> Falar com a {agatConfig.nome}
          </Button>
        </div>
      </div>
    </header>
  );
}
