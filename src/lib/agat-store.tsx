import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const CART_KEY = "agat:carrinho";
const FAV_KEY = "agat:favoritos";

type CartItem = { id: string; qtd: number };

type StoreValue = {
  carrinho: CartItem[];
  favoritos: string[];
  totalItens: number;
  adicionar: (id: string) => void;
  definirQtd: (id: string, qtd: number) => void;
  remover: (id: string) => void;
  limpar: () => void;
  alternarFavorito: (id: string) => void;
  ehFavorito: (id: string) => boolean;
};

const StoreContext = createContext<StoreValue | null>(null);

function ler<T>(chave: string, padrao: T): T {
  try {
    const raw = localStorage.getItem(chave);
    return raw ? (JSON.parse(raw) as T) : padrao;
  } catch {
    return padrao;
  }
}

export function AgatStoreProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setCarrinho(ler<CartItem[]>(CART_KEY, []));
    setFavoritos(ler<string[]>(FAV_KEY, []));
    setPronto(true);
  }, []);

  useEffect(() => {
    if (pronto) localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
  }, [carrinho, pronto]);

  useEffect(() => {
    if (pronto) localStorage.setItem(FAV_KEY, JSON.stringify(favoritos));
  }, [favoritos, pronto]);

  const adicionar = useCallback((id: string) => {
    setCarrinho((atual) =>
      atual.some((i) => i.id === id)
        ? atual.map((i) => (i.id === id ? { ...i, qtd: i.qtd + 1 } : i))
        : [...atual, { id, qtd: 1 }],
    );
  }, []);

  const definirQtd = useCallback((id: string, qtd: number) => {
    setCarrinho((atual) =>
      qtd <= 0
        ? atual.filter((i) => i.id !== id)
        : atual.map((i) => (i.id === id ? { ...i, qtd } : i)),
    );
  }, []);

  const remover = useCallback((id: string) => {
    setCarrinho((atual) => atual.filter((i) => i.id !== id));
  }, []);

  const limpar = useCallback(() => setCarrinho([]), []);

  const alternarFavorito = useCallback((id: string) => {
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id],
    );
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      carrinho,
      favoritos,
      totalItens: carrinho.reduce((s, i) => s + i.qtd, 0),
      adicionar,
      definirQtd,
      remover,
      limpar,
      alternarFavorito,
      ehFavorito: (id: string) => favoritos.includes(id),
    }),
    [carrinho, favoritos, adicionar, definirQtd, remover, limpar, alternarFavorito],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAgatStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAgatStore precisa estar dentro de AgatStoreProvider");
  return ctx;
}
