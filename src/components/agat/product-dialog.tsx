import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAgatStore } from "@/lib/agat-store";
import type { Produto } from "@/lib/products";

export function ProductDialog({
  produto,
  onClose,
}: {
  produto: Produto | null;
  onClose: () => void;
}) {
  const { adicionar, alternarFavorito, ehFavorito } = useAgatStore();

  return (
    <Dialog open={!!produto} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {produto && (
          <>
            <img
              src={produto.imagem}
              alt={produto.nome}
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full rounded-xl object-cover"
            />
            <DialogHeader>
              <span className="text-[11px] tracking-widest text-primary uppercase">
                {produto.categoria}
              </span>
              <DialogTitle className="text-xl">{produto.nome}</DialogTitle>
              <DialogDescription>{produto.descricao}</DialogDescription>
            </DialogHeader>

            <ul className="space-y-1 text-sm text-muted-foreground">
              {produto.detalhes.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-primary">•</span>
                  {d}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  adicionar(produto.id);
                  onClose();
                }}
              >
                <Plus className="mr-1 h-4 w-4" /> Adicionar ao carrinho
              </Button>
              <Button variant="outline" onClick={() => alternarFavorito(produto.id)}>
                <Heart
                  className={`mr-1 h-4 w-4 ${
                    ehFavorito(produto.id) ? "fill-primary text-primary" : ""
                  }`}
                />
                Favorito
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
