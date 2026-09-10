"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  BedDouble,
  CalendarDays,
  Check,
  Clock3,
  Coffee,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const WHATSAPP = "5521972803099";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${BASE_PATH}${path}`;
const ADDRESS =
  "Rua Cento e Vinte e Quatro, 42 — Quadra 525, Jardim Atlântico Leste, Itaipuaçu, Maricá — RJ, 24933-115";

type Experience = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  note: string;
  image: string;
};

const experiences: Experience[] = [
  {
    id: "cafes",
    number: "01",
    label: "Da xícara",
    title: "Cafés quentes e gelados",
    description:
      "Café especial torrado no próprio espaço e preparado para diferentes momentos do dia.",
    note: "Opções e valores a confirmar",
    image: asset("/cafe-real-04.jpg"),
  },
  {
    id: "brunch",
    number: "02",
    label: "Da mesa",
    title: "Brunch, croissants e focaccias",
    description:
      "Uma seleção para começar o dia, fazer uma pausa ou estender a conversa à mesa.",
    note: "Cardápio do dia pelo WhatsApp",
    image: asset("/cafe-real-02.jpg"),
  },
  {
    id: "bistro",
    number: "03",
    label: "Da cozinha",
    title: "Bistrô por reserva",
    description:
      "Entradas, pratos e sobremesas em uma experiência com atendimento mais próximo e personalizado.",
    note: "Menu e disponibilidade a confirmar",
    image: asset("/cafe-real-03.jpg"),
  },
  {
    id: "sobremesas",
    number: "04",
    label: "Do afeto",
    title: "Sobremesas e sorvetes artesanais",
    description:
      "Doces, sobremesas e sorvetes para fechar a experiência com calma — ou começar por ela.",
    note: "Sabores a confirmar",
    image: asset("/cafe-real-09.jpg"),
  },
  {
    id: "drinks",
    number: "05",
    label: "Do brinde",
    title: "Chás, sucos, drinks e vinhos",
    description:
      "Bebidas para acompanhar a mesa, do café da manhã ao encontro no fim do dia.",
    note: "Carta atual pelo WhatsApp",
    image: asset("/cafe-real-06.jpg"),
  },
  {
    id: "hospedagem",
    number: "06",
    label: "Da estadia",
    title: "Hospedagem em suíte para casal",
    description:
      "Três suítes, piscina e café da manhã incluso para transformar uma visita em uma pausa completa.",
    note: "Diárias e datas a confirmar",
    image: asset("/cafe-real-10.jpg"),
  },
];

const faqs = [
  {
    question: "Preciso reservar para ir ao café?",
    answer:
      "O café também atende o público nos dias de funcionamento. Para a experiência de bistrô, a reserva antecipada é recomendada. Confirme disponibilidade pelo WhatsApp.",
  },
  {
    question: "Como consulto o cardápio e os valores?",
    answer:
      "Selecione o que deseja conhecer nesta página e envie a lista pelo WhatsApp. A equipe poderá informar o cardápio atualizado, valores e disponibilidade.",
  },
  {
    question: "Como funciona a hospedagem?",
    answer:
      "A casa conta com três suítes para casal e café da manhã incluso. Datas, diárias, regras e disponibilidade devem ser confirmadas diretamente com a equipe.",
  },
  {
    question: "Onde fica o Café Hospedagem?",
    answer:
      "No Jardim Atlântico Leste, em Itaipuaçu, na Rua Cento e Vinte e Quatro, 42 — Quadra 525.",
  },
];

const navItems = [
  ["Experiências", "#experiencias"],
  ["A casa", "#a-casa"],
  ["Hospedagem", "#hospedagem"],
  ["Galeria", "#galeria"],
  ["Visite", "#visite"],
];

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Café Hospedagem — início">
      <span className="brand-mark">
        <img src={asset("/logo-cafe-hospedagem.jpeg")} alt="Símbolo do Café Hospedagem" />
      </span>
      <span>
        <strong>Café</strong>
        <em>Hospedagem</em>
      </span>
    </a>
  );
}

function ExperienceCart({
  selected,
  remove,
}: {
  selected: string[];
  remove: (id: string) => void;
}) {
  const selectedItems = experiences.filter((item) => selected.includes(item.id));
  const message = selectedItems.length
    ? `Olá! Conheci o Café Hospedagem pelo site e gostaria de informações sobre:\n${selectedItems
        .map((item) => `• ${item.title}`)
        .join("\n")}\n\nPodem me enviar opções, valores e disponibilidade?`
    : "Olá! Conheci o Café Hospedagem pelo site e gostaria de saber mais sobre as experiências da casa.";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="cart-button" aria-label={`Abrir seleção com ${selected.length} itens`}>
          <ShoppingBag size={19} />
          <span>Minha seleção</span>
          <b>{selected.length}</b>
        </button>
      </SheetTrigger>
      <SheetContent className="cart-sheet" aria-describedby="cart-description">
        <SheetHeader className="cart-header">
          <p className="eyebrow">Seu roteiro</p>
          <SheetTitle className="cart-title">O que você quer viver por aqui?</SheetTitle>
          <SheetDescription id="cart-description" className="cart-description">
            Monte uma lista sem compromisso. O WhatsApp já abre com tudo organizado.
          </SheetDescription>
        </SheetHeader>

        <div className="cart-list">
          {selectedItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={28} />
              <p>Sua seleção ainda está vazia.</p>
              <span>Adicione cafés, bistrô ou hospedagem para pedir informações.</span>
            </div>
          ) : (
            selectedItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <small>{item.label}</small>
                  <strong>{item.title}</strong>
                  <span>{item.note}</span>
                </div>
                <button onClick={() => remove(item.id)} aria-label={`Remover ${item.title}`}>
                  <Minus size={16} />
                </button>
              </article>
            ))
          )}
        </div>

        <SheetFooter className="cart-footer">
          <p>O envio não confirma pedido ou reserva. A equipe responderá com os detalhes.</p>
          <a
            className="button button-dark button-full"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noreferrer"
          >
            Enviar pelo WhatsApp <ArrowUpRight size={18} />
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedItems = useMemo(
    () => experiences.filter((item) => selected.includes(item.id)),
    [selected],
  );

  function toggleItem(item: Experience) {
    const alreadySelected = selected.includes(item.id);
    setSelected((current) =>
      alreadySelected ? current.filter((id) => id !== item.id) : [...current, item.id],
    );
    toast(alreadySelected ? "Item removido da seleção" : "Adicionado à sua seleção", {
      description: item.title,
    });
  }

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const interest = String(data.get("interest") || "");
    const date = String(data.get("date") || "");
    const note = String(data.get("note") || "");
    const chosen = selectedItems.length
      ? `\nMinha seleção: ${selectedItems.map((item) => item.title).join(", ")}.`
      : "";
    const message = `Olá! Meu nome é ${name}. Gostaria de informações sobre ${interest}.${date ? ` Data desejada: ${date}.` : ""}${chosen}${note ? `\nObservação: ${note}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <main id="inicio">
      <div className="concept-bar">
        <span>Conceito visual não oficial</span>
        <span>JN Santos Web Studio</span>
      </div>

      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="header-reserve"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de consultar disponibilidade no Café Hospedagem.")}`}
            target="_blank"
            rel="noreferrer"
          >
            Reservar <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação para celular">
            {navItems.map(([label, href], index) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span> {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Café • bistrô • hospedagem</p>
          <h1 id="hero-title">
            Café, mesa posta<br />
            <i>e tempo para ficar.</i>
          </h1>
          <p className="hero-intro">
            Um endereço de Itaipuaçu para desacelerar: café especial, comida afetiva,
            encontros à mesa e uma hospedagem pequena, cercada de cuidado.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#experiencias">
              Escolher uma experiência <ArrowDown size={17} />
            </a>
            <a
              className="text-link"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de conhecer as opções do Café Hospedagem.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Falar com a casa <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-facts">
            <div>
              <strong>Em Itaipuaçu</strong>
              <span>Jardim Atlântico Leste</span>
            </div>
            <div>
              <strong>Experiência completa</strong>
              <span>Da xícara à estadia</span>
            </div>
          </div>
        </div>

        <div className="hero-collage" aria-label="Ambientes reais do Café Hospedagem">
          <figure className="hero-main-image">
            <img src={asset("/cafe-real-03.jpg")} alt="Salão do Café Hospedagem com painel tropical colorido" />
            <figcaption>Um café de destino</figcaption>
          </figure>
          <figure className="hero-detail-image">
            <img src={asset("/cafe-real-04.jpg")} alt="Xícara servida no Café Hospedagem" />
            <figcaption>Café torrado aqui</figcaption>
          </figure>
          <div className="hero-seal" aria-hidden="true">
            <span>respire</span>
            <Coffee size={27} />
            <span>aprecie</span>
          </div>
        </div>

        <div className="scroll-note" aria-hidden="true">
          <span>Descubra a casa</span>
          <div />
        </div>
      </section>

      <section className="moment-strip" aria-label="Três formas de viver o Café Hospedagem">
        <div>
          <Coffee size={22} />
          <span>Para uma pausa</span>
          <strong>Café & brunch</strong>
        </div>
        <div>
          <Sparkles size={22} />
          <span>Para um encontro</span>
          <strong>Bistrô por reserva</strong>
        </div>
        <div>
          <BedDouble size={22} />
          <span>Para ficar um pouco mais</span>
          <strong>Suítes & café da manhã</strong>
        </div>
      </section>

      <section className="experiences-section" id="experiencias">
        <div className="section-heading">
          <p className="eyebrow">Monte seu momento</p>
          <h2>O que combina<br />com a sua pausa?</h2>
          <p>
            Selecione o que deseja conhecer e envie tudo organizado pelo WhatsApp.
            Valores e disponibilidade são confirmados diretamente com a equipe.
          </p>
        </div>

        <div className="experience-grid">
          {experiences.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <article className="experience-card" key={item.id}>
                <div className="experience-photo">
                  <img src={item.image} alt={`Imagem relacionada a ${item.title}`} />
                  <span>{item.number}</span>
                </div>
                <div className="experience-copy">
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                  <small>{item.note}</small>
                  <button
                    className={isSelected ? "selected" : ""}
                    onClick={() => toggleItem(item)}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? <Check size={17} /> : <Plus size={17} />}
                    {isSelected ? "Adicionado" : "Adicionar à seleção"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="story-section" id="a-casa">
        <div className="story-visual">
          <img src={asset("/cafe-real-01.jpg")} alt="Sala acolhedora do Café Hospedagem com livros, quadros e plantas" />
          <div className="story-quote">
            <span>“</span>
            <p>Uma casa transformada em destino.</p>
          </div>
        </div>
        <div className="story-copy">
          <p className="eyebrow light">A casa, o café, a história</p>
          <h2>Elegância simples.<br />Cuidado que se sente.</h2>
          <p>
            O projeto nasceu do sonho de Sandra Cardoso e de sua família. A antiga casa
            foi redesenhada para acolher um café, um bistrô e uma pequena pousada — sem
            perder a sensação de estar chegando a um lugar vivido.
          </p>
          <p>
            Quadros, livros, plantas, luz natural e o painel tropical compõem um ambiente
            íntimo. Na cozinha, a proposta valoriza preparos não industrializados e
            ingredientes de fornecedores locais.
          </p>
          <a className="text-link light-link" href="#galeria">
            Percorrer os ambientes <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section className="details-section">
        <div className="section-heading compact">
          <p className="eyebrow">O que torna a visita especial</p>
          <h2>Detalhes que não cabem<br />em uma simples cafeteria.</h2>
        </div>
        <div className="detail-list">
          <article>
            <span>01</span>
            <Coffee />
            <h3>Torrefação no local</h3>
            <p>Parceria com o Café Campolina e café torrado no próprio espaço.</p>
          </article>
          <article>
            <span>02</span>
            <Leaf />
            <h3>Origem próxima</h3>
            <p>Ingredientes comprados de fornecedores locais, fortalecendo a região.</p>
          </article>
          <article>
            <span>03</span>
            <CalendarDays />
            <h3>Atendimento pensado</h3>
            <p>O bistrô trabalha preferencialmente com reserva para personalizar a experiência.</p>
          </article>
          <article>
            <span>04</span>
            <BedDouble />
            <h3>Pausa completa</h3>
            <p>Café, bistrô, três suítes para casal, redário e piscina no mesmo endereço.</p>
          </article>
        </div>
      </section>

      <section className="stay-section" id="hospedagem">
        <div className="stay-copy">
          <p className="eyebrow">Hospedagem</p>
          <h2>Quando uma tarde<br />merece virar estadia.</h2>
          <p>
            A casa dispõe de três suítes para casal, preparadas com cuidado, além de piscina,
            redário e café da manhã incluso. Uma proposta pequena, tranquila e reservada.
          </p>
          <ul>
            <li><Check size={16} /> Três suítes para casal</li>
            <li><Check size={16} /> Café da manhã incluso</li>
            <li><Check size={16} /> Piscina e áreas de descanso</li>
            <li><Check size={16} /> Check-in informado: 14h</li>
            <li><Check size={16} /> Check-out informado: 11h</li>
          </ul>
          <a
            className="button button-brown"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de consultar datas, diárias e regras da hospedagem.")}`}
            target="_blank"
            rel="noreferrer"
          >
            Consultar uma data <ArrowUpRight size={17} />
          </a>
          <small>Datas, valores e regras devem ser confirmados com a equipe.</small>
        </div>
        <div className="stay-images">
          <img className="stay-room" src={asset("/cafe-real-10.jpg")} alt="Suíte para casal no Café Hospedagem" />
          <img className="stay-pool" src={asset("/cafe-real-08.jpg")} alt="Piscina e jardim do Café Hospedagem" />
          <div className="stay-label">
            <span>3</span>
            <p>suítes<br />para casal</p>
          </div>
        </div>
      </section>

      <section className="gallery-section" id="galeria">
        <div className="gallery-heading">
          <p className="eyebrow light">Percorra a casa</p>
          <h2>Um lugar que<br /><i>muda o ritmo.</i></h2>
          <p>Ambientes reais do Café Hospedagem fotografados por Vinícius Manhães.</p>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-a">
            <img src={asset("/cafe-real-07.jpg")} alt="Fachada e varanda do Café Hospedagem" />
            <figcaption>Chegada</figcaption>
          </figure>
          <figure className="gallery-b">
            <img src={asset("/cafe-real-05.jpg")} alt="Equipe no salão do Café Hospedagem" />
            <figcaption>Receber</figcaption>
          </figure>
          <figure className="gallery-c">
            <img src={asset("/cafe-real-02.jpg")} alt="Mesa posta em ambiente com painel tropical" />
            <figcaption>Sentar à mesa</figcaption>
          </figure>
          <figure className="gallery-d">
            <img src={asset("/cafe-real-06.jpg")} alt="Reconhecimento recebido pela equipe do Café Hospedagem" />
            <figcaption>Histórias da casa</figcaption>
          </figure>
          <figure className="gallery-e">
            <img src={asset("/cafe-real-08.jpg")} alt="Piscina do Café Hospedagem" />
            <figcaption>Desacelerar</figcaption>
          </figure>
        </div>
      </section>

      <section className="how-section">
        <div className="section-heading compact">
          <p className="eyebrow">Do site para a mesa</p>
          <h2>Mais simples para você.<br />Mais organizado para a casa.</h2>
        </div>
        <div className="how-steps">
          <article>
            <b>1</b>
            <h3>Escolha</h3>
            <p>Marque as experiências que despertaram seu interesse.</p>
          </article>
          <article>
            <b>2</b>
            <h3>Revise</h3>
            <p>Confira sua seleção, sem pagamento e sem compromisso.</p>
          </article>
          <article>
            <b>3</b>
            <h3>Converse</h3>
            <p>Envie a lista no WhatsApp e receba opções, valores e disponibilidade.</p>
          </article>
        </div>
      </section>

      <section className="visit-section" id="visite">
        <div className="visit-info">
          <p className="eyebrow">Planeje sua visita</p>
          <h2>A pausa tem endereço.</h2>
          <div className="contact-block">
            <MapPin size={22} />
            <div>
              <strong>Café Hospedagem</strong>
              <p>{ADDRESS}</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Hospedagem+Rua+124+42+Itaipua%C3%A7u+Maric%C3%A1"
                target="_blank"
                rel="noreferrer"
              >
                Abrir rota no Google Maps <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="contact-block">
            <Clock3 size={22} />
            <div className="hours">
              <strong>Horários informados</strong>
              <p><span>Quarta e quinta</span><b>9h–12h / 15h–19h</b></p>
              <p><span>Sexta</span><b>9h–12h / 15h–20h</b></p>
              <p><span>Sábado</span><b>8h–20h</b></p>
              <p><span>Domingo</span><b>8h–18h</b></p>
              <small>Confirme o funcionamento no WhatsApp antes da visita.</small>
            </div>
          </div>
          <div className="visit-socials">
            <a href="https://www.instagram.com/cafehospedagem" target="_blank" rel="noreferrer">
              <AtSign size={19} /> @cafehospedagem
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
              <MessageCircle size={19} /> (21) 97280-3099
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleContact}>
          <div className="form-heading">
            <span>Fale com a casa</span>
            <h3>Conte como deseja viver essa experiência.</h3>
          </div>
          <label>
            Seu nome
            <input name="name" placeholder="Como podemos chamar você?" required />
          </label>
          <label>
            Tenho interesse em
            <select name="interest" required defaultValue="">
              <option value="" disabled>Escolha uma opção</option>
              <option>Cafeteria e brunch</option>
              <option>Bistrô por reserva</option>
              <option>Hospedagem</option>
              <option>Mais de uma experiência</option>
            </select>
          </label>
          <label>
            Data desejada <span>(opcional)</span>
            <input name="date" type="date" />
          </label>
          <label>
            Observação <span>(opcional)</span>
            <textarea name="note" placeholder="Ex.: duas pessoas, comemoração, dúvidas sobre o cardápio..." rows={3} />
          </label>
          <button className="button button-dark button-full" type="submit">
            Continuar no WhatsApp <ArrowUpRight size={18} />
          </button>
          <small>Este formulário apenas prepara a mensagem. A conversa continua no WhatsApp.</small>
        </form>
      </section>

      <section className="map-section">
        <iframe
          title="Localização aproximada do Café Hospedagem no Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Caf%C3%A9%20Hospedagem%20Rua%20124%2042%20Itaipua%C3%A7u%20Maric%C3%A1&output=embed"
        />
        <div className="map-overlay">
          <MapPin size={19} />
          <div>
            <small>Jardim Atlântico Leste</small>
            <strong>Itaipuaçu • Maricá</strong>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading compact">
          <p className="eyebrow">Antes de vir</p>
          <h2>Perguntas que ajudam<br />a planejar a pausa.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article className={openFaq === index ? "open" : ""} key={faq.question}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
              >
                <span>0{index + 1}</span>
                <strong>{faq.question}</strong>
                {openFaq === index ? <Minus size={19} /> : <Plus size={19} />}
              </button>
              {openFaq === index && <p>{faq.answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <Brand />
          <p>Um refúgio para café especial, comida afetiva e pausas verdadeiras em Itaipuaçu.</p>
          <a
            className="button button-light"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de planejar uma visita ao Café Hospedagem.")}`}
            target="_blank"
            rel="noreferrer"
          >
            Planejar minha visita <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>Conceito visual não oficial — JN Santos Web Studio</span>
          <span>Informações sujeitas à confirmação da empresa</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>

      <ExperienceCart selected={selected} remove={(id) => setSelected((list) => list.filter((item) => item !== id))} />
      <a
        className="floating-whatsapp"
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Conheci o Café Hospedagem pelo site e gostaria de mais informações.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com o Café Hospedagem pelo WhatsApp"
      >
        <MessageCircle size={21} />
        <span>Falar com a casa</span>
      </a>
      <Toaster position="top-center" />
    </main>
  );
}
