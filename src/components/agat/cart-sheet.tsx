import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { whatsappLink } from "@/lib/agat-config";
import { useAgatStore } from "@/lib/agat-store";
import { produtos } from "@/lib/products";
import { montarMensagemPedido } from "@/lib/whatsapp-order";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { carrinho, definirQtd, remover, limpar } = useAgatStore();

  const enviarPedido = () => {
    if (carrinho.length === 0) return;
    const mensagem = montarMensagemPedido(carrinho);
    const link = whatsappLink(mensagem);
    if (!link) {
      toast.error("WhatsApp ainda não configurado", {
        description: "Informe o número da loja nas configurações do site.",
      });
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Meu pedido</SheetTitle>
          <SheetDescription>
            Escolha as quantidades e envie o pedido pelo WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
          {carrinho.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Seu carrinho está vazio.
            </p>
          )}

          {carrinho.map((item) => {
            const p = produtos.find((prod) => prod.id === item.id);
            if (!p) return null;
            return (
              <div
                key={item.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <img
                  src={p.imagem}
                  alt={p.nome}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.nome}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.categoria}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      onClick={() => definirQtd(item.id, item.qtd - 1)}
                      className="rounded-md border border-border p-1"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.qtd}</span>
                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      onClick={() => definirQtd(item.id, item.qtd + 1)}
                      className="rounded-md border border-border p-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Remover ${p.nome}`}
                  onClick={() => remover(item.id)}
                  className="shrink-0 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="space-y-2 border-t border-border p-4">
          <Button
            className="w-full"
            size="lg"
            onClick={enviarPedido}
            disabled={carrinho.length === 0}
          >
            ENVIAR PEDIDO PELO WHATSAPP
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={limpar}
            disabled={carrinho.length === 0}
          >
            Limpar carrinho
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
