import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { agatConfig, whatsappLink } from "@/lib/agat-config";

function falarComAgat() {
  const link = whatsappLink(`Olá, ${agatConfig.nome}! Gostaria de mais informações.`);
  if (!link) {
    toast.error("WhatsApp ainda não configurado", {
      description: "Informe o número da loja nas configurações do site.",
    });
    return;
  }
  window.open(link, "_blank", "noopener,noreferrer");
}

export function Contato() {
  const horarios = agatConfig.horarios.filter((h) => h.dias || h.horario);

  return (
    <section id="contato" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
      <h2 className="text-2xl font-semibold sm:text-3xl">Contato</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Fale com a gente e monte seu pedido do seu jeito.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-primary">
            <Phone className="h-4 w-4" />
            <span className="text-xs tracking-widest uppercase">Telefones</span>
          </div>
          <ul className="mt-3 space-y-2">
            {agatConfig.telefones.map((t) => (
              <li key={t}>
                <a
                  href={`tel:${t.replace(/\D/g, "")}`}
                  className="text-lg font-semibold transition-colors hover:text-primary"
                >
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          {agatConfig.endereco && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4" />
                <span className="text-xs tracking-widest uppercase">Endereço</span>
              </div>
              <p className="mt-2 text-sm">{agatConfig.endereco}</p>
            </div>
          )}

          {horarios.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-4 w-4" />
                <span className="text-xs tracking-widest uppercase">Horários</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {horarios.map((h) => (
                  <li key={h.dias + h.horario} className="flex flex-wrap gap-x-2">
                    <span className="font-medium">{h.dias}</span>
                    <span className="text-muted-foreground">{h.horario}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {agatConfig.instagram && (
            <a
              href={`https://instagram.com/${agatConfig.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary"
            >
              <Instagram className="h-4 w-4 text-primary" />
              <span className="text-sm">@{agatConfig.instagram}</span>
            </a>
          )}

          <Button size="lg" onClick={falarComAgat}>
            <MessageCircle className="mr-2 h-4 w-4" /> Falar com a {agatConfig.nome} no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display text-base font-bold text-foreground">
            {agatConfig.nome}
          </span>{" "}
          — {agatConfig.slogan}
        </p>
        <p>{agatConfig.telefones.join(" · ")}</p>
      </div>
    </footer>
  );
}
