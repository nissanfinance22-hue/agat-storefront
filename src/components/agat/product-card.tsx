import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgatStore } from "@/lib/agat-store";
import type { Produto } from "@/lib/products";

export function ProductCard({
  produto,
  onDetalhes,
}: {
  produto: Produto;
  onDetalhes: (p: Produto) => void;
}) {
  const { adicionar, alternarFavorito, ehFavorito } = useAgatStore();
  const favorito = ehFavorito(produto.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/60">
      <button
        type="button"
        onClick={() => onDetalhes(produto)}
        className="relative aspect-square overflow-hidden"
        aria-label={`Ver detalhes de ${produto.nome}`}
      >
        <img
          src={produto.imagem}
          alt={produto.nome}
          width={1024}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>


      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
          <div className="min-w-0">
            <span className="text-[11px] tracking-widest text-primary uppercase">
              {produto.categoria}
            </span>
            <h3 className="truncate text-base font-semibold">{produto.nome}</h3>
          </div>
          <button
            type="button"
            onClick={() => alternarFavorito(produto.id)}
            aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={favorito}
            className="shrink-0 rounded-full border border-border p-2 transition-colors hover:border-primary"
          >
            <Heart
              className={`h-4 w-4 ${favorito ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          </button>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{produto.descricao}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          <Button size="sm" className="flex-1" onClick={() => adicionar(produto.id)}>
            <Plus className="mr-1 h-4 w-4" /> Adicionar
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDetalhes(produto)}>
            Detalhes
          </Button>
        </div>
      </div>
    </article>
  );
}
