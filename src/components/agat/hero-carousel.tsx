import { useEffect, useState } from "react";

const slides = [
  {
    src: "/assets/agat/loja/fachada.png",
    titulo: "Roupas em geral, buquês e cestas",
    texto: "Tudo em um só lugar, com atendimento de verdade.",
  },
  {
    src: "/assets/agat/loja/banner-som.png",
    titulo: "Mensagens ao vivo e pelo telefone",
    texto: "Surpreenda quem você ama com uma serenata.",
  },
  {
    src: "/assets/agat/produtos/cesta-01.png",
    titulo: "Cestas e presentes personalizados",
    texto: "Monte do seu jeito e mande o pedido pelo WhatsApp.",
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[16/10] sm:aspect-[21/9]">
        {slides.map((s, idx) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.titulo}
            width={1600}
            height={900}
            loading={idx === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <h2 className="max-w-2xl text-2xl leading-tight font-semibold sm:text-4xl">
            {slides[i].titulo}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            {slides[i].texto}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.src}
            aria-label={`Ir para imagem ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === i ? "w-7 bg-primary" : "w-2.5 bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
