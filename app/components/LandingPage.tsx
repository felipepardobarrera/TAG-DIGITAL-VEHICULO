"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "../site-config";
import { trackEvent } from "../lib/analytics";

const icons: Record<string, string> = {
  shield:
    "M12 3 5 6v5c0 4.7 2.9 8 7 10 4.1-2 7-5.3 7-10V6l-7-3Zm-2.5 9 1.7 1.7 3.7-4",
  file: "M6 2h8l4 4v16H6V2Zm8 0v5h5M9 12h6M9 16h6",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  car: "M5 16l2-7h10l2 7M3 14h18M6 16l-1 3h2l1-2h8l1 2h2l-1-3",
  wrench:
    "M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-2.4 2.4-2.1-2.1a4 4 0 0 0 5 5L20 16.4 16.4 20l-7.7-7.7",
  qr: "M3 3h6v6H3V3Zm12 0h6v6h-6V3ZM3 15h6v6H3v-6Zm12 0h2v2h-2m4-2h2v6h-6v-2",
  link: "M10 13a5 5 0 0 0 7.1.1l2-2A5 5 0 0 0 12 4l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1",
  check: "m5 12 4 4L19 6",
  arrow: "M5 12h14m-6-6 6 6-6 6",
};
function I({ n, s = 22 }: { n: string; s?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icons[n]} />
    </svg>
  );
}
function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <i />
    </span>
  );
}
function Brand() {
  return (
    <span className="brand">
      <Mark />
      <b>{siteConfig.brandName || siteConfig.brandDescriptor}</b>
    </span>
  );
}
const Button = ({
  children,
  event = "hero_primary_cta_clicked",
}: {
  children: React.ReactNode;
  event?: Parameters<typeof trackEvent>[0];
}) => (
  <a className="button" href="#participar" onClick={() => trackEvent(event)}>
    {children}
    <I n="arrow" s={18} />
  </a>
);

function Phone() {
  return (
    <div
      className="phone-scene"
      aria-label="Demostración del panel de un vehículo"
    >
      <div className="nfc">
        <Mark />
        <small>ACCESO NFC</small>
        <b>•••• 2048</b>
      </div>
      <div className="phone">
        <div className="phone-status">
          9:41 <span>● ● ▰</span>
        </div>
        <div className="phone-head">
          <Mark />
          <i>FP</i>
        </div>
        <small>MI VEHÍCULO</small>
        <h3>SUV de ejemplo</h3>
        <em>LX •• 24</em>
        <div className="safe">
          <I n="shield" />
          <span>
            <b>Perfil protegido</b>
            <small>Acceso mediante PIN</small>
          </span>
        </div>
        <div className="phone-cards">
          <div>
            <I n="file" />
            <small>Documentos</small>
            <b>4 vigentes</b>
          </div>
          <div>
            <I n="bell" />
            <small>Próximo vence</small>
            <b>18 sep.</b>
          </div>
        </div>
        <div className="phone-row">
          <I n="wrench" />
          <span>
            <small>Última mantención</small>
            <b>60.000 km · Ejemplo</b>
          </span>
        </div>
        <nav>
          <span>
            ⌂<small>Inicio</small>
          </span>
          <span>
            ▤<small>Documentos</small>
          </span>
          <span>
            ⚙<small>Accesos</small>
          </span>
        </nav>
      </div>
      <div className="qr">
        <span className="qr-grid" />
        <span>
          <b>Acceso seguro</b>
          <small>Escanea para abrir</small>
        </span>
      </div>
    </div>
  );
}

const benefits = [
  [
    "file",
    "Documentos centralizados.",
    "Consulta los documentos de cada vehículo desde un único lugar.",
  ],
  [
    "bell",
    "Avisos de vencimiento.",
    "Recibe avisos antes de que un documento venza.",
  ],
  [
    "wrench",
    "Mantenciones registradas.",
    "Consulta las mantenciones realizadas y programa el próximo servicio.",
  ],
  [
    "car",
    "Varios vehículos en una cuenta.",
    "Administra cada vehículo sin mezclar su información.",
  ],
  [
    "qr",
    "Acceso mediante QR o NFC.",
    "Abre la información autorizada mediante un código QR, tarjeta o llavero NFC.",
  ],
  [
    "shield",
    "Información bajo tu autorización.",
    "Selecciona los documentos que otras personas podrán consultar.",
  ],
  [
    "link",
    "Enlaces temporales.",
    "Genera accesos que se desactivan automáticamente.",
  ],
  [
    "shield",
    "Tarjetas desactivables.",
    "Desactiva una tarjeta perdida e impide nuevos accesos.",
  ],
];
function DemoRow({
  icon,
  title,
  text,
  onOpen,
}: {
  icon: string;
  title: string;
  text: string;
  onOpen?: (title: string, text: string) => void;
}) {
  return (
    <button
      type="button"
      className="demo-row"
      onClick={() => onOpen?.(title, text)}
      aria-label={`Ver información de ${title}`}
    >
      <span>
        <I n={icon} />
      </span>
      <p>
        <b>{title}</b>
        <small>{text}</small>
      </p>
      <em>→</em>
    </button>
  );
}
function Demo() {
  const [tab, setTab] = useState("Resumen"),
    [detail, setDetail] = useState<{ title: string; body: string } | null>(
      null,
    );
  const rows: Record<string, React.ReactNode> = {
    Resumen: (
      <>
        <div className="stats">
          <div>
            <small>DOCUMENTOS</small>
            <b>4 vigentes</b>
            <em>Todo al día</em>
          </div>
          <div>
            <small>PRÓXIMO VENCIMIENTO</small>
            <b>18 sep. 2026</b>
            <span>Permiso · Demo</span>
          </div>
        </div>
        <DemoRow
          icon="wrench"
          title="Servicio 60.000 km"
          text="Última mantención · 12 jun."
          onOpen={(title) =>
            setDetail({
              title,
              body: "Aquí podrás consultar la fecha, kilometraje, taller y observaciones de cada mantención registrada.",
            })
          }
        />
      </>
    ),
    Documentos: (
      <>
        {[
          "Permiso de circulación",
          "Revisión técnica",
          "Seguro obligatorio",
        ].map((x) => (
          <DemoRow
            key={x}
            icon="file"
            title={x}
            text="Documento demostrativo · Vigente"
            onOpen={(title) =>
              setDetail({
                title,
                body: "En la billetera podrás revisar el archivo, su fecha de vencimiento y el estado de vigencia sin buscarlo entre correos o fotografías.",
              })
            }
          />
        ))}
      </>
    ),
    Mantenciones: (
      <>
        {["Servicio 60.000 km", "Cambio de aceite"].map((x) => (
          <DemoRow
            key={x}
            icon="wrench"
            title={x}
            text="Registro ilustrativo"
            onOpen={(title) =>
              setDetail({
                title,
                body: "Cada registro reúne fecha, kilometraje y antecedentes útiles para mantener la continuidad del cuidado del vehículo.",
              })
            }
          />
        ))}
      </>
    ),
    Accesos: (
      <>
        <DemoRow
          icon="qr"
          title="Tarjeta NFC principal"
          text="Activa · Requiere PIN"
          onOpen={(title) =>
            setDetail({
              title,
              body: "El accesorio abre un acceso controlado. No guarda documentos en su interior y puede desactivarse si se pierde.",
            })
          }
        />
        <DemoRow
          icon="link"
          title="Enlace temporal"
          text="Solo información autorizada"
          onOpen={(title) =>
            setDetail({
              title,
              body: "El enlace permite mostrar únicamente los documentos seleccionados y puede expirar automáticamente.",
            })
          }
        />
      </>
    ),
  };
  return (
    <div className="demo">
      <div className="demo-title">
        <div>
          <small>VEHÍCULO DE EJEMPLO</small>
          <h3>
            SUV familiar <em>LX •• 24</em>
          </h3>
        </div>
        <span>
          <I n="shield" s={17} /> Protegido
        </span>
      </div>
      <div className="tabs" role="tablist">
        {Object.keys(rows).map((x) => (
          <button
            key={x}
            role="tab"
            aria-selected={tab === x}
            onClick={() => {
              setTab(x);
              trackEvent("vehicle_profile_selected", { tab: x });
            }}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        {rows[tab]}
      </div>
      {detail && (
        <InfoModal
          title={detail.title}
          body={detail.body}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}

function InfoModal({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div
      className="info-modal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="info-title">
        <button
          className="info-close"
          onClick={onClose}
          aria-label="Cerrar información"
        >
          ×
        </button>
        <p className="eyebrow">INFORMACIÓN RÁPIDA</p>
        <h2 id="info-title">{title}</h2>
        <p>{body}</p>
        <Link className="button" href="/beta">
          Probar en la beta <I n="arrow" s={18} />
        </Link>
      </section>
    </div>
  );
}

function VideoModal({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div
      className="video-modal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="video-title">
        <button
          className="info-close"
          onClick={onClose}
          aria-label="Cerrar video"
        >
          ×
        </button>
        <p className="eyebrow">GUÍA PASO A PASO</p>
        <h2 id="video-title">{title}</h2>
        <video controls autoPlay playsInline preload="metadata">
          <source src={src} type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
        <p>
          La demostración utiliza información ficticia. WhatsApp continúa en
          preparación.
        </p>
        <Link className="button" href="/beta">
          Comenzar mi registro <I n="arrow" s={18} />
        </Link>
      </section>
    </div>
  );
}

function Form() {
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">(
      "idle",
    ),
    [msg, setMsg] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      f.reportValidity();
      setState("error");
      setMsg("Revisa los campos marcados para continuar.");
      trackEvent("founder_form_error");
      return;
    }
    if (!siteConfig.founderFormEndpoint) {
      setState("error");
      setMsg(
        "El registro en línea aún no está habilitado. Vuelve pronto para enviar tu solicitud.",
      );
      trackEvent("founder_form_error", { reason: "endpoint_not_configured" });
      return;
    }
    setState("loading");
    try {
      const r = await fetch(siteConfig.founderFormEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(Object.fromEntries(new FormData(f))),
      });
      if (r.type !== "opaque" && !r.ok) throw 0;
      setState("success");
      setMsg(
        "Recibimos tu solicitud. Te enviaremos una confirmación al correo indicado; revisa también la carpeta de spam.",
      );
      trackEvent("founder_form_submitted");
      f.reset();
    } catch {
      setState("error");
      setMsg("No pudimos enviar tu solicitud. Intenta nuevamente más tarde.");
      trackEvent("founder_form_error");
    }
  }
  return (
    <form
      onSubmit={submit}
      onFocusCapture={() => trackEvent("founder_form_started")}
      noValidate
    >
      <Field id="name" label="Nombre">
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Tu nombre"
        />
      </Field>
      <Field id="email" label="Correo electrónico">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="tu@correo.cl"
        />
      </Field>
      <Field id="phone" label="Teléfono">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          pattern="[+0-9 ()-]{8,20}"
          placeholder="+56 9 1234 5678"
        />
      </Field>
      <Field id="region" label="Región">
        <select id="region" name="region" required defaultValue="">
          <option value="" disabled>
            Selecciona
          </option>
          {[
            "Arica y Parinacota",
            "Tarapacá",
            "Antofagasta",
            "Atacama",
            "Coquimbo",
            "Valparaíso",
            "Metropolitana",
            "O’Higgins",
            "Maule",
            "Ñuble",
            "Biobío",
            "La Araucanía",
            "Los Ríos",
            "Los Lagos",
            "Aysén",
            "Magallanes",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Field>
      <Field id="vehicles" label="Cantidad de vehículos">
        <select id="vehicles" name="vehicles" required defaultValue="">
          <option value="" disabled>
            Selecciona
          </option>
          {["1", "2", "3", "4 o más"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Field>
      <Field id="type" label="Tipo de usuario">
        <select id="type" name="type" required defaultValue="">
          <option value="" disabled>
            Selecciona
          </option>
          {[
            "Particular",
            "Familia",
            "Conductor profesional",
            "Automovilismo",
            "Taller",
            "Club",
            "Flota",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Field>
      <Field id="problem" label="¿Qué necesidad deseas resolver?" wide>
        <textarea
          id="problem"
          name="problem"
          required
          minLength={10}
          rows={3}
          placeholder="Por ejemplo: recibir avisos de vencimiento y centralizar los documentos."
        />
      </Field>
      <input
        type="hidden"
        name="policyVersion"
        value={siteConfig.privacyPolicyVersion}
      />
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          He leído la{" "}
          <Link href="/privacidad">política de tratamiento de datos</Link> y
          autorizo el uso de mis datos para evaluar mi postulación y contactarme
          sobre el programa. Puedo retirar mi consentimiento en cualquier
          momento.
        </span>
      </label>
      <div className="form-action">
        <button className="button" disabled={state === "loading"}>
          {state === "loading" ? "Enviando…" : "Enviar postulación"}
          <I n="arrow" s={18} />
        </button>
        <small>
          Las personas seleccionadas tendrán acceso gratuito durante el programa
          piloto.
        </small>
      </div>
      {msg && (
        <p className={`form-message ${state}`} role="status">
          {msg}
        </p>
      )}
    </form>
  );
}
function Field({
  label,
  id,
  wide = false,
  children,
}: {
  label: string;
  id: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`field ${wide ? "wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

const faqs = [
  [
    "¿Qué es una billetera digital vehicular?",
    "Es una plataforma web para organizar los documentos, vencimientos y mantenciones de uno o más vehículos.",
  ],
  [
    "¿Qué es NFC y cómo se utiliza?",
    "NFC es una tecnología de comunicación por proximidad. Al acercar una tarjeta o llavero a un teléfono compatible, se abre el acceso autorizado del vehículo.",
  ],
  [
    "¿La tarjeta almacena mis documentos?",
    "No. La tarjeta NFC y el código QR permiten abrir un acceso protegido. Los archivos permanecen almacenados en tu Billetera Vehicular.",
  ],
  [
    "¿Qué ocurre si pierdo la tarjeta?",
    "Puedes desactivarla en cualquier momento para impedir nuevos accesos y vincular una tarjeta de reemplazo.",
  ],
  [
    "¿Funciona en cualquier celular?",
    "La plataforma funciona en navegadores modernos. El código QR utiliza la cámara y el NFC requiere un teléfono compatible con esta tecnología.",
  ],
  [
    "¿Necesito instalar una aplicación?",
    "No. Puedes utilizar la plataforma desde el navegador de tu celular o computador. En el futuro proyectamos incorporar una aplicación para ampliar las opciones de acceso y consulta.",
  ],
  [
    "¿Puedo registrar más de un vehículo?",
    "Sí. Puedes registrar varios vehículos en una misma cuenta, de acuerdo con el plan seleccionado.",
  ],
  [
    "¿Puedo compartir información?",
    "Sí. Puedes generar un enlace temporal y seleccionar los documentos que estarán disponibles para su consulta.",
  ],
  [
    "¿Qué documentos puedo cargar?",
    "Puedes cargar copias de documentos vehiculares en formato PDF, JPG, PNG o WebP, como el permiso de circulación, SOAP, revisión técnica y padrón.",
  ],
  [
    "¿Los archivos cargados reemplazan los documentos originales?",
    "No. Billetera Vehicular permite organizar y consultar copias digitales. La obligación de presentar un documento original o emitido oficialmente depende de la normativa aplicable.",
  ],
  [
    "¿Cómo se protege mi información?",
    "Mediante un PIN de seguridad, accesos temporales y autorización de los documentos disponibles. Puedes finalizar un acceso o desactivar una tarjeta en cualquier momento.",
  ],
  [
    "¿Tiene costo?",
    "Sí. Puedes elegir entre Solo QR o QR con accesorio NFC, según tus necesidades y cantidad de vehículos. Las personas seleccionadas para el programa piloto tendrán acceso gratuito.",
  ],
  [
    "¿Cómo participo en el programa piloto?",
    "Completa el formulario de postulación. Revisaremos las solicitudes y contactaremos a las personas seleccionadas.",
  ],
];
const profiles = [
  [
    "Mi auto",
    "Administra los documentos, vencimientos y mantenciones de tu vehículo.",
  ],
  [
    "Mi familia",
    "Administra varios vehículos del grupo familiar y comparte el acceso con personas autorizadas.",
  ],
  [
    "Conductores profesionales",
    "Organiza los documentos y mantenciones del vehículo que utilizas para trabajar.",
  ],
  [
    "Automovilismo",
    "Registra antecedentes técnicos y mantenciones para cada actividad en pista.",
  ],
  [
    "Talleres y clubes",
    "Comparte documentos específicos mediante accesos temporales.",
  ],
  [
    "Flotas de vehículos",
    "Centraliza vehículos, documentos, responsables y vencimientos desde una misma cuenta.",
  ],
];
const profileDetails: Record<string, string> = {
  "Mi auto":
    "Guarda documentos, controla vencimientos y registra mantenciones de un vehículo en un espacio privado.",
  "Mi familia":
    "Organiza hasta cuatro vehículos, separa sus alertas y permite accesos para conductores autorizados.",
  "Conductores profesionales":
    "Mantén disponibles los antecedentes del vehículo de trabajo y recibe avisos antes de los vencimientos.",
  Automovilismo:
    "Reúne documentos, mantenciones y antecedentes técnicos para acompañar cada salida a pista.",
  "Talleres y clubes":
    "Comparte información autorizada mediante accesos temporales, sin entregar el control completo de la cuenta.",
  "Flotas de vehículos":
    "Administra flotas desde cinco vehículos, asigna responsables y centraliza documentos, vencimientos y mantenciones. La propuesta puede escalar a 20 vehículos o más.",
};

export function LandingPage() {
  const [banner, setBanner] = useState(true),
    [menu, setMenu] = useState(false),
    [scroll, setScroll] = useState(false),
    [modality, setModality] = useState<"qr" | "nfc">("qr"),
    [info, setInfo] = useState<{ title: string; body: string } | null>(null),
    [video, setVideo] = useState<{ src: string; title: string } | null>(null);
  useEffect(() => {
    const f = () => setScroll(window.scrollY > 20);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      {banner && (
        <div className="topbar">
          <p>
            Estamos seleccionando a los primeros conductores que probarán una
            nueva forma de organizar su vehículo.
          </p>
          <button onClick={() => setBanner(false)} aria-label="Cerrar aviso">
            ×
          </button>
        </div>
      )}
      <header className={scroll ? "scrolled" : ""}>
        <div className="container nav">
          <a href="#inicio">
            <Brand />
          </a>
          <nav className={menu ? "open" : ""}>
            {[
              ["Cómo funciona", "#como"],
              ["Guía rápida", "#tutoriales"],
              ["Beneficios", "#beneficios"],
              ["Planes", "#precios"],
              ["Seguridad", "#seguridad"],
              ["Preguntas frecuentes", "#faq"],
            ].map((x) => (
              <a key={x[1]} href={x[1]} onClick={() => setMenu(false)}>
                {x[0]}
              </a>
            ))}
          </nav>
          <Link className="nav-cta" href="/beta">
            Entrar a la beta
          </Link>
          <button
            className="hamb"
            aria-label="Abrir menú"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero hero-image" id="inicio">
          <div className="container hero-art-wrap">
            <img
              className="hero-art"
              src="/billetera-vehicular-hero-v2.png"
              width="1731"
              height="909"
              alt="Automóvil, teléfono con documentos digitales, código QR y tarjeta NFC"
            />
            <div className="hero-live-copy">
              <p className="hero-brand-title">
                Billetera
                <br />
                Vehicular
              </p>
              <i />
              <p>
                Tu auto. Tus documentos.
                <br />
                Todo bajo control.
              </p>
            </div>
            <div className="hero-art-actions">
              <Button>Quiero acceso anticipado</Button>
              <button
                className="hero-info-button"
                onClick={() => {
                  setVideo({
                    src: "/videos/01-tutorial-rapido-billetera-vehicular.mp4",
                    title: "Cómo comenzar con tu billetera",
                  });
                  trackEvent("hero_demo_clicked");
                }}
              >
                <i>▶</i> Ver cómo funciona
              </button>
            </div>
            <div className="hero-art-trust">
              <span>
                <I n="shield" s={18} />
                Acceso protegido
              </span>
              <span>
                <I n="check" s={18} />
                Controlado por ti
              </span>
              <span>
                <I n="car" s={18} />
                Diseñado para Chile
              </span>
            </div>
          </div>
        </section>
        <section className="section problem">
          <div className="container">
            <p className="eyebrow">DOCUMENTOS Y FECHAS EN DISTINTOS LUGARES</p>
            <h2>La información de tu vehículo necesita una organización clara.</h2>
            <div className="problem-grid">
              <div
                className="papers"
                aria-label="Historia animada de documentos desordenados"
              >
                <span>
                  REV. TÉCNICA <b>Documento sin identificar</b>
                </span>
                <span>
                  MANTENCIÓN <b>Antecedentes incompletos</b>
                </span>
                <span>
                  VENCIMIENTO <b>Renovación pendiente</b>
                </span>
              </div>
              <div className="problem-story">
                <p>
                  <b>La revisión técnica</b> puede quedar distribuida entre fotografías y correos.
                </p>
                <p>
                  <b>La mantención</b> pierde continuidad cuando sus antecedentes no quedan registrados.
                </p>
                <p>
                  <b>El vencimiento</b> requiere una fecha visible y avisos oportunos.
                </p>
                <button
                  onClick={() =>
                    setInfo({
                      title: "De información dispersa a antecedentes organizados",
                      body: "La billetera reúne cada documento con su categoría, vehículo y fecha de vencimiento. Cuando una renovación reemplaza un documento vencido, el estado y los recordatorios se actualizan.",
                    })
                  }
                >
                  Ver cómo lo resolvemos →
                </button>
              </div>
            </div>
            <h3 className="closing">
              Centraliza los antecedentes y consulta cada documento cuando lo necesites.
            </h3>
          </div>
        </section>
        <section className="section how" id="como">
          <div className="container">
            <Heading
              kicker="ASÍ DE SIMPLE"
              title="Organiza la información de tu vehículo en tres pasos."
              text="Registra el vehículo, carga sus antecedentes y autoriza cada acceso."
            />
            <div className="steps">
              {[
                [
                  "01",
                  "Registra tu vehículo",
                  "Agrega sus datos y crea un espacio propio.",
                  "car",
                ],
                [
                  "02",
                  "Carga y organiza",
                  "Sube documentos, fechas y mantenciones.",
                  "file",
                ],
                [
                  "03",
                  "Accede con QR o NFC",
                  "Acerca tu tarjeta o escanea el código.",
                  "qr",
                ],
              ].map((x) => (
                <article key={x[0]}>
                  <b>{x[0]}</b>
                  <span>
                    <I n={x[3]} />
                  </span>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                </article>
              ))}
            </div>
            <div className="sequence">
              <div>
                <Mark />
                <small>ACCESO NFC</small>
              </div>
              <b>)))</b>
              <div>
                <span>••••</span>
                <strong>Acceso autorizado</strong>
                <small>Documentos autorizados</small>
              </div>
            </div>
          </div>
        </section>
        <section className="section tutorials" id="tutoriales">
          <div className="container">
            <Heading
              kicker="GUÍA DE USO"
              title="Conoce el proceso desde el primer paso."
              text="Elige una guía rápida o visualiza el registro completo. Conoce el acceso, el registro del vehículo, la carga de documentos y la configuración de recordatorios."
            />
            <div className="tutorial-grid">
              <article>
                <div className="video-preview">
                  <video muted playsInline preload="metadata">
                    <source
                      src="/videos/01-tutorial-rapido-billetera-vehicular.mp4#t=3"
                      type="video/mp4"
                    />
                  </video>
                  <button
                    onClick={() =>
                      setVideo({
                        src: "/videos/01-tutorial-rapido-billetera-vehicular.mp4",
                        title: "Tutorial rápido de Billetera Vehicular",
                      })
                    }
                    aria-label="Reproducir tutorial rápido"
                  >
                    ▶
                  </button>
                  <span>36 segundos</span>
                </div>
                <small>GUÍA RÁPIDA</small>
                <h3>Registra y configura tu Billetera Vehicular.</h3>
                <p>
                  Registro de cuenta, datos del vehículo, documentos y
                  recordatorios.
                </p>
                <button
                  className="tutorial-link"
                  onClick={() =>
                    setVideo({
                      src: "/videos/01-tutorial-rapido-billetera-vehicular.mp4",
                      title: "Tutorial rápido de Billetera Vehicular",
                    })
                  }
                >
                  Visualizar guía rápida <I n="arrow" s={18} />
                </button>
              </article>
              <article>
                <div className="video-preview">
                  <video muted playsInline preload="metadata">
                    <source
                      src="/videos/02-registro-interactivo-billetera-vehicular.mp4#t=8"
                      type="video/mp4"
                    />
                  </video>
                  <button
                    onClick={() =>
                      setVideo({
                        src: "/videos/02-registro-interactivo-billetera-vehicular.mp4",
                        title: "Proceso completo de registro",
                      })
                    }
                    aria-label="Reproducir demostración completa"
                  >
                    ▶
                  </button>
                  <span>43 segundos</span>
                </div>
                <small>DEMOSTRACIÓN COMPLETA</small>
                <h3>Visualiza el proceso completo.</h3>
                <p>
                  Conoce cómo acceder a la plataforma, registrar un vehículo y
                  cargar sus documentos.
                </p>
                <button
                  className="tutorial-link"
                  onClick={() =>
                    setVideo({
                      src: "/videos/02-registro-interactivo-billetera-vehicular.mp4",
                      title: "Proceso completo de registro",
                    })
                  }
                >
                  Visualizar demostración <I n="arrow" s={18} />
                </button>
              </article>
            </div>
            <p className="tutorial-note">
              Los datos mostrados son ficticios. WhatsApp se encuentra en
              preparación.
            </p>
          </div>
        </section>
        <section className="section reminder-story" id="recordatorios">
          <div className="container">
            <Heading
              kicker="AVISOS DE VENCIMIENTO"
              title="Seis avisos para facilitar la renovación de tus documentos."
            />
            <div className="reminder-timeline">
              {[
                ["30", "Planificación"],
                ["14", "Preparación"],
                ["7", "Renovación recomendada"],
                ["1", "Último aviso"],
                ["0", "Vence hoy"],
                ["+", "Continúa vencido"],
              ].map((x, i) => (
                <article key={x[1]} className={i === 5 ? "late" : ""}>
                  <b>{x[0]}</b>
                  <small>
                    {i < 4 ? "DÍAS ANTES" : i === 4 ? "HOY" : "DESPUÉS"}
                  </small>
                  <span>{x[1]}</span>
                </article>
              ))}
            </div>
            <div className="reminder-channels">
              <div>
                <span>@</span>
                <p>
                  <b>Correo electrónico</b>
                  <small>
                    Cada aviso identificará el documento, indicará los días
                    restantes y permitirá acceder a su actualización.
                  </small>
                </p>
                <em>PRIMERA ETAPA</em>
              </div>
              <div>
                <span>▣</span>
                <p>
                  <b>Calendario personal</b>
                  <small>
                    Guarda el vencimiento en Google Calendar, Outlook o Apple
                    Calendar desde tu billetera.
                  </small>
                </p>
                <em>DISPONIBLE</em>
              </div>
              <div className="disabled">
                <span>W</span>
                <p>
                  <b>WhatsApp</b>
                  <small>
                    Recibirá el mismo aviso cuando finalice la integración con
                    WhatsApp Business.
                  </small>
                </p>
                <em>EN PREPARACIÓN</em>
              </div>
            </div>
            <p className="reminder-honesty">
              El envío automático por correo se activará al completar la
              conexión del proveedor de mensajería. Las fechas y la opción de
              calendario están disponibles en el panel.
            </p>
          </div>
        </section>
        <section className="section explore-product">
          <div className="container">
            <Heading
              kicker="CONOCE EL PRODUCTO"
              title="Conoce cada función de tu Billetera Vehicular."
              text="Tienes acceso a guías específicas para conocer el funcionamiento de cada servicio."
            />
            <div className="explore-grid">
              <Link href="/productos">
                <span>▦</span>
                <h3>QR, tarjeta y llavero</h3>
                <p>Modalidades, disponibilidad y precios estimados.</p>
                <b>Ver productos →</b>
              </Link>
              <Link href="/documentos">
                <span>▤</span>
                <h3>Documentos admitidos</h3>
                <p>Catálogo, vencimientos y uso responsable.</p>
                <b>Ver documentos →</b>
              </Link>
              <Link href="/fiscalizacion/guia">
                <span>◎</span>
                <h3>Proceso de fiscalización</h3>
                <p>Cómo generar, mostrar y finalizar un acceso temporal.</p>
                <b>Ver la guía →</b>
              </Link>
              <Link href="/flotas">
                <span>▥</span>
                <h3>Flotas y responsables</h3>
                <p>Vehículos, responsables, mantenciones y alertas.</p>
                <b>Explorar flotas →</b>
              </Link>
              <Link href="/buscar-vehiculo">
                <span>⌕</span>
                <h3>Buscar mi vehículo</h3>
                <p>Acceso seguro mediante código temporal.</p>
                <b>Próximamente →</b>
              </Link>
              <Link href="/como-funciona">
                <span>▶</span>
                <h3>Guía completa</h3>
                <p>Registro, documentos, avisos y demostraciones.</p>
                <b>Cómo funciona →</b>
              </Link>
            </div>
          </div>
        </section>
        <section className="section benefits" id="beneficios">
          <div className="container">
            <Heading
              kicker="INFORMACIÓN VEHICULAR CENTRALIZADA"
              title="Funciones para organizar y consultar la información de tus vehículos."
            />
            <div className="benefit-grid">
              {benefits.map((x) => (
                <button
                  className="benefit-card"
                  key={x[1]}
                  onClick={() => setInfo({ title: x[1], body: x[2] })}
                >
                  <span>
                    <I n={x[0]} />
                  </span>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                  <em>Ver detalle →</em>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="section product">
          <div className="container product-grid">
            <div>
              <p className="eyebrow green">DEMOSTRACIÓN DE LA PLATAFORMA</p>
              <h2>Consulta la información de cada vehículo con claridad.</h2>
              <p className="lead">
                Visualiza una demostración elaborada con información ficticia.
              </p>
              <ul className="checks">
                <li>✓ Consulta documentos y vencimientos</li>
                <li>✓ Revisa la información detallada de cada vehículo</li>
                <li>✓ Selecciona quién puede consultar los documentos</li>
              </ul>
            </div>
            <Demo />
          </div>
        </section>
        <section className="section comparison">
          <div className="container">
            <div className="center">
              <p className="eyebrow">INFORMACIÓN ORGANIZADA</p>
              <h2>Centraliza los antecedentes de tus vehículos.</h2>
            </div>
            <div className="compare">
              <article>
                <small>SIN LA PLATAFORMA</small>
                <h3>La información permanece distribuida.</h3>
                {[
                  "Documentos en distintos lugares",
                  "Fechas difíciles de controlar",
                  "Información difícil de compartir",
                  "Mantenciones sin registro",
                  "Dependencia de una sola persona",
                ].map((x) => (
                  <p key={x}>
                    <i>×</i>
                    {x}
                  </p>
                ))}
              </article>
              <b>→</b>
              <article>
                <small>CON BILLETERA VEHICULAR</small>
                <h3>
                  Consulta documentos, fechas y accesos desde un solo lugar.
                </h3>
                {[
                  "Documentos centralizados",
                  "Avisos de vencimiento",
                  "Acceso temporal mediante QR",
                  "Mantenciones registradas",
                  "Tú decides quién consulta la información",
                ].map((x) => (
                  <p key={x}>
                    <i>✓</i>
                    {x}
                  </p>
                ))}
              </article>
            </div>
          </div>
        </section>
        <section className="section profiles" id="perfiles">
          <div className="container">
            <Heading
              kicker="SOLUCIONES SEGÚN TUS NECESIDADES"
              title="Selecciona la opción que representa el uso de tus vehículos."
              text="Consulta las funciones disponibles para uso personal, familiar, profesional o empresarial."
            />
            <div className="profile-grid">
              {profiles.map((x, i) => (
                <article key={x[0]}>
                  <small>0{i + 1}</small>
                  <h3>{x[0]}</h3>
                  <p>{x[1]}</p>
                  <button
                    onClick={() => {
                      setInfo({ title: x[0], body: profileDetails[x[0]] });
                      trackEvent("vehicle_profile_selected", { profile: x[0] });
                    }}
                  >
                    Consultar funciones →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section motorsport">
          <div className="container motorsport-grid">
            <div>
              <p className="eyebrow green">AUTOMOVILISMO</p>
              <h2>Información técnica para vehículos utilizados en pista.</h2>
              <p>
                Organiza documentos, mantenciones y antecedentes técnicos
                asociados a cada vehículo.
              </p>
              <div className="available">
                <small>DISPONIBLE EN LA VERSIÓN BETA</small>
                <b>✓ Documentos, mantenciones y accesos temporales.</b>
              </div>
            </div>
            <div className="future">
              <small>FUNCIONES PLANIFICADAS</small>
              <h3>Nuevas herramientas para uso técnico.</h3>
              <div>
                {[
                  "Actividades en pista",
                  "Historial técnico",
                  "Neumáticos y componentes",
                  "Configuraciones de circuito",
                  "Fotografías",
                  "Contactos de emergencia",
                  "Preparadores y clubes",
                  "Perfil de competición",
                ].map((x) => (
                  <span key={x}>{x} ↗</span>
                ))}
              </div>
              <p>Estas funciones todavía no se encuentran disponibles.</p>
            </div>
          </div>
        </section>
        <section className="section security" id="seguridad">
          <div className="container security-grid">
            <div className="shield-visual">
              <span>
                <I n="shield" s={60} />
              </span>
              <div>
                <small>ESTADO DEL ACCESO</small>
                <b>● Protegido con PIN</b>
                <p>Solo se consulta la información autorizada.</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">PROTECCIÓN DE LA INFORMACIÓN</p>
              <h2>Tú decides qué información puede consultarse.</h2>
              <p>
                El código QR y la tarjeta NFC no almacenan documentos ni datos
                personales. Permiten abrir un acceso temporal y protegido
                únicamente a la información que hayas autorizado.
              </p>
              <ul className="checks">
                {[
                  "Seleccionas los documentos disponibles.",
                  "El acceso requiere un PIN de seguridad.",
                  "Los enlaces se desactivan al finalizar su vigencia.",
                  "Puedes desactivar una tarjeta perdida.",
                  "Puedes finalizar cualquier acceso activo.",
                ].map((x) => (
                  <li key={x}>✓ {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <aside className="legal">
          <div className="container">
            <I n="file" />
            <p>
              <b>Importante:</b> Esta plataforma ayuda a organizar, respaldar y
              consultar información vehicular. La obligación de portar
              documentos y su aceptación en formato digital depende de la
              normativa aplicable y del tipo de documento.
            </p>
          </div>
        </aside>
        <section className="section pricing" id="precios">
          <div className="container">
            <div className="pricing-head">
              <div>
                <p className="eyebrow">MODALIDADES DE ACCESO</p>
                <h2>
                  Comienza con acceso QR o incorpora una{" "}
                  <em>tarjeta o llavero NFC.</em>
                </h2>
                <p>
                  Elige entre acceso exclusivamente digital o acceso digital
                  complementado con un accesorio físico.
                </p>
              </div>
              <div
                className="billing-toggle"
                role="group"
                aria-label="Modalidad del servicio"
              >
                <button
                  className={modality === "qr" ? "active" : ""}
                  onClick={() => setModality("qr")}
                >
                  Solo QR <small>Acceso digital</small>
                </button>
                <button
                  className={modality === "nfc" ? "active" : ""}
                  onClick={() => setModality("nfc")}
                >
                  QR + accesorio NFC
                </button>
              </div>
            </div>
            <div className="nfc-definition">
              <b>¿Qué es NFC?</b>
              <span>
                Es una tecnología de proximidad. Al acercar una tarjeta o
                llavero a un teléfono compatible, se abre el acceso autorizado
                del vehículo.
              </span>
            </div>
            <div className="modality-explainer">
              <div>
                <span>
                  <I n="qr" />
                </span>
                <p>
                  <b>Solo QR</b>
                  <small>
                    Genera desde tu cuenta un código temporal para presentar los
                    documentos autorizados durante una fiscalización.
                  </small>
                </p>
              </div>
              <div>
                <span>
                  <I n="link" />
                </span>
                <p>
                  <b>QR + accesorio NFC</b>
                  <small>
                    Permite abrir el acceso autorizado acercando una tarjeta o
                    llavero a un teléfono compatible, sin ingresar previamente a
                    la cuenta del propietario.
                  </small>
                </p>
              </div>
            </div>
            <div className="pricing-grid">
              <article>
                <span className="plan-icon">
                  <I n="car" />
                </span>
                <small>1 VEHÍCULO</small>
                <h3>Mi Auto</h3>
                <p>Organiza y protege la información de un vehículo.</p>
                <div className="price">
                  <b>{modality === "qr" ? "$5.990" : "$10.990"}</b>
                  <span>{modality === "qr" ? "/año" : "/primer año"}</span>
                </div>
                {modality === "qr" && (
                  <em className="monthly-option">
                    También disponible por $690/mes
                  </em>
                )}
                {modality === "nfc" && (
                  <em className="monthly-option">
                    Incluye una tarjeta o llavero · Renovación $5.990/año
                  </em>
                )}
                <ul>
                  <li>✓ 1 vehículo</li>
                  <li>✓ Documentos y fechas organizadas</li>
                  <li>✓ Avisos de vencimiento</li>
                  <li>✓ Historial de mantenciones</li>
                  <li>✓ Acceso QR protegido</li>
                  {modality === "nfc" && <li>✓ Un accesorio NFC a elección</li>}
                </ul>
                <a
                  href="#participar"
                  onClick={() =>
                    trackEvent("pricing_plan_selected", {
                      plan: "Mi Auto",
                      modality,
                    })
                  }
                >
                  Seleccionar plan
                </a>
              </article>
              <article className="featured">
                <div className="popular">MEJOR VALOR</div>
                <span className="plan-icon">
                  <I n="shield" />
                </span>
                <small>HASTA 4 VEHÍCULOS</small>
                <h3>Familiar</h3>
                <p>Administra vehículos familiares y accesos autorizados.</p>
                <div className="price">
                  <b>{modality === "qr" ? "$12.990" : "$19.990"}</b>
                  <span>{modality === "qr" ? "/año" : "/primer año"}</span>
                </div>
                {modality === "qr" && (
                  <em className="monthly-option">
                    También disponible por $1.490/mes
                  </em>
                )}
                {modality === "nfc" && (
                  <em className="monthly-option">
                    Incluye hasta 4 accesorios · Renovación $12.990/año
                  </em>
                )}
                <ul>
                  <li>✓ Hasta 4 vehículos</li>
                  <li>✓ Funciones de Mi Auto</li>
                  <li>✓ Accesos para conductores autorizados</li>
                  <li>✓ Avisos separados por vehículo</li>
                  <li>✓ Atención prioritaria</li>
                  {modality === "nfc" && (
                    <li>✓ Accesorios de reemplazo por $3.990 c/u</li>
                  )}
                </ul>
                <a
                  href="#participar"
                  onClick={() =>
                    trackEvent("pricing_plan_selected", {
                      plan: "Familiar",
                      modality,
                    })
                  }
                >
                  Seleccionar plan Familiar
                </a>
              </article>
              <article>
                <span className="plan-icon">
                  <I n="wrench" />
                </span>
                <small>DESDE 5 VEHÍCULOS</small>
                <h3>Flota</h3>
                <p>
                  Administración escalable para empresas, talleres y clubes.
                </p>
                <div className="price">
                  <b>{modality === "qr" ? "$2.990" : "$6.990"}</b>
                  <span>
                    {modality === "qr"
                      ? "/vehículo al año"
                      : "/vehículo primer año"}
                  </span>
                </div>
                {modality === "nfc" && (
                  <em className="monthly-option">
                    Un accesorio por vehículo · Renovación $2.990/vehículo
                  </em>
                )}
                <ul>
                  <li>✓ Desde 5 vehículos</li>
                  <li>✓ Panel centralizado planificado</li>
                  <li>✓ Usuarios y accesos por función</li>
                  <li>✓ Configuración asistida</li>
                  <li>✓ Precio por volumen</li>
                </ul>
                <a
                  href="#participar"
                  onClick={() =>
                    trackEvent("pricing_plan_selected", {
                      plan: "Flota",
                      modality,
                    })
                  }
                >
                  Solicitar cotización
                </a>
              </article>
            </div>
            <div className="pricing-note">
              <b>Precios de lanzamiento estimados.</b>
              <span>
                Valores referenciales en CLP. Durante el programa piloto, el
                despacho del accesorio NFC estará incluido para las personas
                seleccionadas. Las condiciones definitivas se informarán antes
                de cualquier cobro.
              </span>
            </div>
          </div>
        </section>
        <section className="section founders" id="participar">
          <div className="container founder-grid">
            <div>
              <p className="eyebrow green">PROGRAMA PILOTO</p>
              <h2>
                Participa en la construcción de una nueva experiencia vehicular.
              </h2>
              <p>
                Prueba la plataforma y comparte tu experiencia. Tu opinión nos
                ayudará a desarrollar una solución práctica para conductores en
                Chile.
              </p>
              <div className="founder-list">
                {[
                  "Acceso anticipado",
                  "Configuración asistida",
                  "Participación en las mejoras",
                  "Condiciones preferentes de lanzamiento",
                  "Prioridad para probar tarjeta NFC",
                  "Contacto directo con el equipo inicial",
                ].map((x) => (
                  <span key={x}>✓ {x}</span>
                ))}
              </div>
            </div>
            <div className="form-card">
              <small>POSTULACIÓN AL PROGRAMA PILOTO</small>
              <h3>Ingresa tus datos de contacto.</h3>
              <p>Completar el formulario toma cerca de dos minutos.</p>
              <Form />
            </div>
          </div>
        </section>
        <section className="section faq" id="faq">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">PREGUNTAS FRECUENTES</p>
              <h2>Información importante sobre el servicio.</h2>
              <p>
                Consulta las respuestas sobre documentos, seguridad,
                compatibilidad, modalidades y participación en el programa
                piloto.
              </p>
            </div>
            <div>
              {faqs.map((x) => (
                <details
                  key={x[0]}
                  onToggle={(e) => {
                    if (e.currentTarget.open)
                      trackEvent("faq_opened", { question: x[0] });
                  }}
                >
                  <summary>
                    {x[0]}
                    <span>+</span>
                  </summary>
                  <p>{x[1]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="final">
          <div className="container">
            <Mark />
            <h2>
              Documentos, vencimientos y mantenciones{" "}
              <em>desde un solo lugar.</em>
            </h2>
            <p>
              Centraliza la información de tus vehículos y controla los accesos
              que generas.
            </p>
            <Button event="final_cta_clicked">
              Postular al programa piloto
            </Button>
            <small>
              Las personas seleccionadas tendrán acceso gratuito durante el
              programa piloto.
            </small>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>
              {siteConfig.brandTagline}
              <br />
              Una plataforma diseñada para conductores en Chile.
            </p>
          </div>
          <div>
            <b>Producto</b>
            <a href="#como">Cómo funciona</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#seguridad">Seguridad</a>
          </div>
          <div>
            <b>Información</b>
            <Link href="/terminos">Términos y condiciones</Link>
            <Link href="/privacidad">Política de privacidad</Link>
            <Link href="/eliminacion-de-datos">Eliminación de datos</Link>
            <Link href="/aviso-legal">Aviso legal</Link>
          </div>
          <div>
            <b>Contacto</b>
            <a href="#participar">Formulario de contacto y postulación</a>
            <p className="corporate-email-note">
              Correo corporativo en configuración.
            </p>
          </div>
        </div>
        <div className="container copyright">
          © {new Date().getFullYear()} {siteConfig.brandDescriptor}.{" "}
          <span>Tu información vehicular, siempre contigo.</span>
        </div>
      </footer>
      {info && (
        <InfoModal
          title={info.title}
          body={info.body}
          onClose={() => setInfo(null)}
        />
      )}{" "}
      {video && (
        <VideoModal
          src={video.src}
          title={video.title}
          onClose={() => setVideo(null)}
        />
      )}{" "}
      {siteConfig.whatsappEnabled && siteConfig.whatsappNumber ? (
        <a
          className="whatsapp"
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
        >
          WhatsApp
        </a>
      ) : null}
    </>
  );
}
function Heading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="heading">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}
