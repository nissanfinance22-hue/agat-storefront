import { agatConfig } from "./agat-config";
import { produtos } from "./products";

/** Monta a mensagem do pedido (sem preços) a partir do carrinho. */
export function montarMensagemPedido(itens: { id: string; qtd: number }[]) {
  const linhas = itens.map((item, i) => {
    const p = produtos.find((prod) => prod.id === item.id);
    const nome = p ? p.nome : item.id;
    const categoria = p ? ` (${p.categoria})` : "";
    return `${i + 1}. ${nome}${categoria} — Quantidade: ${item.qtd}`;
  });

  return [
    `Olá, ${agatConfig.nome}! Gostaria de fazer um pedido:`,
    "",
    ...linhas,
    "",
    "Aguardo o retorno com as informações. Obrigado!",
  ].join("\n");
}
