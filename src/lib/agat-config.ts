/**
 * Configurações da loja AGAT.
 * Edite os valores abaixo para atualizar contatos, endereço, Instagram e horários.
 */
export const agatConfig = {
  nome: "ÁGAT",
  slogan: "Mensagens ao vivo e pelo telefone",
  descricao:
    "Roupas em geral, buquês de rosas, cestas, café da manhã, presentes, Xerox e muito mais.",

  // Telefones informados pela loja
  telefones: ["9628-1419", "3623-1419", "8893-1419"],

  // CONFIGURÁVEL: número usado nos botões de WhatsApp (formato internacional, só dígitos)
  whatsapp: "",

  // CONFIGURÁVEL: endereço da loja
  endereco: "",

  // CONFIGURÁVEL: usuário do Instagram (sem @) — deixe vazio para esconder
  instagram: "",

  // CONFIGURÁVEL: horários de atendimento
  horarios: [
    { dias: "", horario: "" },
  ] as { dias: string; horario: string }[],
};

/** Monta o link do WhatsApp; retorna null quando o número não está configurado. */
export function whatsappLink(mensagem: string): string | null {
  const numero = agatConfig.whatsapp.replace(/\D/g, "");
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
