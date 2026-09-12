export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  detalhes: string[];
  imagem: string;
};

export const categorias = [
  "Roupas",
  "Acessórios",
  "Buquês",
  "Cestas",
  "Café da manhã",
  "Presentes",
  "Xerox / Impressões",
  "Outros",
] as const;

export const produtos: Produto[] = [
  {
    id: "roupas-01",
    nome: "Vestidos e blusas",
    categoria: "Roupas",
    descricao: "Peças femininas para o dia a dia e ocasiões especiais.",
    detalhes: ["Vários modelos e tamanhos", "Consulte disponibilidade de cores"],
    imagem: "/assets/agat/produtos/roupas-01.jpg",
  },
  {
    id: "roupas-02",
    nome: "Roupas em geral",
    categoria: "Roupas",
    descricao: "Coleção variada de roupas femininas, masculinas e infantis.",
    detalhes: ["Novidades toda semana", "Atendimento personalizado na loja"],
    imagem: "/assets/agat/loja/fachada.png",
  },
  {
    id: "acessorios-01",
    nome: "Acessórios",
    categoria: "Acessórios",
    descricao: "Bolsas, colares, brincos e óculos para completar o look.",
    detalhes: ["Peças selecionadas", "Ótimos para presente"],
    imagem: "/assets/agat/produtos/acessorios-01.jpg",
  },
  {
    id: "buque-01",
    nome: "Buquê de rosas",
    categoria: "Buquês",
    descricao: "Buquê de rosas vermelhas com embalagem elegante e laço.",
    detalhes: ["Montado no dia", "Cartão com mensagem opcional"],
    imagem: "/assets/agat/produtos/buque-01.jpg",
  },
  {
    id: "cesta-01",
    nome: "Cesta de chocolates com pelúcia",
    categoria: "Cestas",
    descricao: "Cesta recheada de chocolates variados com urso de pelúcia.",
    detalhes: ["Tamanhos P, M e G", "Personalize os chocolates"],
    imagem: "/assets/agat/produtos/cesta-01.png",
  },
  {
    id: "cafe-01",
    nome: "Cesta de café da manhã",
    categoria: "Café da manhã",
    descricao: "Pães, frutas, sucos, café e acompanhamentos para surpreender.",
    detalhes: ["Entrega combinada por WhatsApp", "Itens podem variar"],
    imagem: "/assets/agat/produtos/cafe-01.jpg",
  },
  {
    id: "presentes-01",
    nome: "Presentes especiais",
    categoria: "Presentes",
    descricao: "Caixas de presente montadas com pelúcia, chocolates e mimos.",
    detalhes: ["Embalagem para presente", "Monte do seu jeito"],
    imagem: "/assets/agat/produtos/presentes-01.jpg",
  },
  {
    id: "mensagem-01",
    nome: "Mensagem ao vivo e pelo telefone",
    categoria: "Outros",
    descricao: "Serenata e mensagens declamadas ao vivo ou por telefone.",
    detalhes: ["Ao vivo ou por telefone", "Combine data e horário"],
    imagem: "/assets/agat/produtos/mensagem-01.jpg",
  },
  {
    id: "xerox-01",
    nome: "Xerox e impressões",
    categoria: "Xerox / Impressões",
    descricao: "Cópias, impressões e serviços de papelaria.",
    detalhes: ["Preto e branco ou colorido", "Impressão de documentos e fotos"],
    imagem: "/assets/agat/produtos/xerox-01.jpg",
  },
];
