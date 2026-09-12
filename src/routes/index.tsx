import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CartSheet } from "@/components/agat/cart-sheet";
import { Contato, SiteFooter } from "@/components/agat/contato-footer";
import { HeroCarousel } from "@/components/agat/hero-carousel";
import { ProductCard } from "@/components/agat/product-card";
import { ProductDialog } from "@/components/agat/product-dialog";
import { SiteHeader } from "@/components/agat/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agatConfig } from "@/lib/agat-config";
import { AgatStoreProvider, useAgatStore } from "@/lib/agat-store";
import { categorias, produtos, type Produto } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ÁGAT — Roupas, buquês, cestas e presentes" },
      {
        name: "description",
        content:
          "Loja ÁGAT: roupas, acessórios, buquês de rosas, cestas, café da manhã, presentes, Xerox e mensagens ao vivo. Faça seu pedido pelo WhatsApp.",
      },
      { property: "og:title", content: "ÁGAT — Roupas, buquês, cestas e presentes" },
      {
        property: "og:description",
        content:
          "Catálogo da loja ÁGAT com roupas, buquês, cestas, café da manhã, presentes e Xerox. Pedido rápido pelo WhatsApp.",
      },
    ],
  }),
  component: () => (
    <AgatStoreProvider>
      <Home />
    </AgatStoreProvider>
  ),
});

function Home() {
  const { favoritos } = useAgatStore();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<string>("Todos");
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);
  const [detalhe, setDetalhe] = useState<Produto | null>(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((p) => {
      const casaBusca =
        !termo ||
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo);
      const casaCategoria = categoria === "Todos" || p.categoria === categoria;
      const casaFavorito = !somenteFavoritos || favoritos.includes(p.id);
      return casaBusca && casaCategoria && casaFavorito;
    });
  }, [busca, categoria, somenteFavoritos, favoritos]);

  return (
    <div className="min-h-screen">
      <SiteHeader
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
        somenteFavoritos={somenteFavoritos}
        onAlternarFavoritos={() => setSomenteFavoritos((v) => !v)}
      />

      <main>
        <section className="surface-red">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
            <h1 className="font-display text-3xl leading-tight font-bold sm:text-5xl">
              <span className="text-gradient-red">{agatConfig.nome}</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {agatConfig.descricao}
            </p>
            <div className="mt-6">
              <HeroCarousel />
            </div>
          </div>
        </section>

        <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
          <div className="grid gap-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar produto ou serviço..."
                aria-label="Buscar no catálogo"
                className="h-12 pl-9"
              />
              {busca && (
                <button
                  type="button"
                  aria-label="Limpar busca"
                  onClick={() => setBusca("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              {["Todos", ...categorias].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategoria(c)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                    categoria === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {somenteFavoritos && (
              <div className="flex items-center justify-between rounded-xl border border-primary/50 bg-card px-4 py-3 text-sm">
                <span>Mostrando apenas favoritos</span>
                <Button size="sm" variant="outline" onClick={() => setSomenteFavoritos(false)}>
                  Ver tudo
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p) => (
              <ProductCard key={p.id} produto={p} onDetalhes={setDetalhe} />
            ))}
          </div>

          {lista.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Nenhum item encontrado. Tente outra busca ou categoria.
            </p>
          )}
        </section>

        <Contato />
      </main>

      <SiteFooter />

      <ProductDialog produto={detalhe} onClose={() => setDetalhe(null)} />
      <CartSheet open={carrinhoAberto} onOpenChange={setCarrinhoAberto} />
    </div>
  );
}
