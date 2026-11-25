import { useState, useEffect } from "react";
import queEsImagen from "./assets/public/que-es.jpg";
import epidemiologiaImagen from "./assets/public/epidemiologia.jpg";
import diagnosticoImagen from "./assets/public/diagnostico.jpg";
import fisiopatologia1Imagen from "./assets/public/fisiopatologia1.jpg";
import fisiopatologia2Imagen from "./assets/public/fisiopatologia2.jpg";
import fisiopatologia3Imagen from "./assets/public/fisiopatologia3.jpg";
import tratamientoImagen from "./assets/public/tratamiento.jpg";
import sintomasImagen from "./assets/public/sintomas-y-senales.jpg";
import prevencionImagen from "./assets/public/prevencion-y-estilo.jpg";

const SITIO = {
  tema: "Dengue: información para cuidarte",
  alumno: "Leslie Castro Hernández.",
  institucion: "Facultad de Medicina, Universidad Autónoma del Estado de Morelos (UAEM).",
  descripcion: "Conoce los síntomas, formas de prevención y medidas de atención ante el dengue para cuidar tu salud y la de tu familia."
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla, vestibulum id ligula porta felis euismod semper.";
const LOREM_CORTO =
  "Cras mattis consectetur purus sit amet fermentum. Nullam quis risus eget urna mollis ornare vel eu leo.";

const SECCIONES = [
  {
    id: "pacientes",
    corto: "Pacientes",
    etiqueta: "Sección 01",
    titulo: "Público general y pacientes",
    resumen:
      "Información clara y accesible para comprender, prevenir y convivir con el padecimiento. ",
    subtemas: [
      { id: "que-es", titulo: "¿Qué es?", icono: "◌", descripcion: "Conoce qué causa el dengue, cómo se transmite y por qué representa un problema de salud pública." },
      { id: "factores-riesgo", titulo: "Factores de riesgo", icono: "◍", descripcion: "Identifica las condiciones y antecedentes que pueden aumentar la exposición o la gravedad del dengue." },
      { id: "sintomas", titulo: "Síntomas y señales de alarma", icono: "◎", descripcion: "Reconoce las manifestaciones iniciales y las señales que requieren atención médica inmediata." },
      { id: "prevencion", titulo: "Prevención y estilo de vida", icono: "◐", descripcion: "Aprende medidas prácticas para proteger tu hogar, evitar criaderos y prevenir nuevas picaduras." },
      { id: "mitos", titulo: "Mitos y realidades", icono: "◑", descripcion: "Aclara dudas comunes y distingue información científica correcta sobre el dengue." },
    ],
  },
  {
    id: "personal",
    corto: "Personal de salud",
    etiqueta: "Sección 02",
    titulo: "Personal de salud",
    resumen:
      "Contenido técnico basado en evidencia, normas oficiales y guías de práctica clínica.",
    subtemas: [
      { id: "epidemiologia", titulo: "Epidemiología", icono: "◇", descripcion: "Analiza la distribución mundial y nacional del dengue y los factores que favorecen su propagación." },
      { id: "fisiopatologia", titulo: "Fisiopatología", icono: "◈", descripcion: "Comprende la replicación viral, la respuesta inmunitaria y los mecanismos que producen dengue grave." },
      { id: "diagnostico", titulo: "Diagnóstico y criterios", icono: "◆", descripcion: "Revisa la valoración clínica, las pruebas de laboratorio y el diagnóstico diferencial." },
      { id: "tratamiento", titulo: "Tratamiento", icono: "◊", descripcion: "Consulta los principios de manejo, la hidratación, los medicamentos y las medidas de seguimiento." },
      { id: "normatividad", titulo: "NOM y Guías de Práctica Clínica", icono: "▢", descripcion: "Consulta las normas, protocolos y guías oficiales que respaldan la vigilancia y atención del dengue." },
    ],
  },
];

const REFERENCIAS = [
  { tipo: "Artículo científico · PMC", texto: "Orthoflaviviral inhibitors in clinical trials, preclinical in vivo efficacy targeting NS2B-NS3 and cellular antiviral activity via competitive protease inhibition. PMC; 2024.", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11396989/" },
  { tipo: "Artículo científico · Frontiers", texto: "Dengue virus neutralizing antibody: a review of targets, cross-reactivity, and antibody-dependent enhancement. Frontiers in Immunology; 2023.", link: "https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2023.1200195/full" },
  { tipo: "Recurso científico", texto: "Endothelial dysfunction in dengue virus pathology. Laboratorio de Patología Molecular de Virus, KU Leuven.", link: "https://rega.kuleuven.be/cmt/cmt_sl/pathogenesis-of-dengue-virus-denv/scheme-endothelial-dysfunction-in-denv-pathology" },
  { tipo: "Norma Oficial Mexicana", texto: "NOM-032-SSA2-2014. Para la vigilancia epidemiológica, promoción, prevención y control de las enfermedades transmitidas por vectores. Publicada en el Diario Oficial de la Federación el 16 de abril de 2015.", link: "https://sidof.segob.gob.mx/notas/docFuente/5389045" },
  { tipo: "Norma Oficial Mexicana", texto: "NOM-017-SSA2-2012. Para la vigilancia epidemiológica.", link: "https://www.gob.mx/salud/documentos/manuales-para-la-vigilancia-epidemiologica-102563" },
  { tipo: "Norma Oficial Mexicana", texto: "NOM-004-SSA3-2012. Expediente clínico: documentación de la atención, evolución y tratamiento." },
  { tipo: "Norma Oficial Mexicana", texto: "NOM-087-SEMARNAT-SSA1-2002. Manejo de residuos peligrosos biológico-infecciosos." },
  { tipo: "Norma Oficial Mexicana", texto: "NOM-253-SSA1-2012. Disposición de sangre humana y sus componentes con fines terapéuticos." },
  { tipo: "Protocolo nacional", texto: "Secretaría de Salud y Consejo de Salubridad General. PRONAM Dengue. Protocolo Nacional de Atención Médica de Dengue, primera edición, 2026.", link: "https://pronamsalud.csg.gob.mx/pronam-dengue.pdf" },
  { tipo: "Datos epidemiológicos", texto: "Dirección General de Epidemiología, Secretaría de Salud. Panorama Epidemiológico de Dengue 2026, corte hasta la semana epidemiológica 43.", link: "https://www.gob.mx/salud/documentos/panorama-epidemiologico-de-dengue-2026" },
  { tipo: "Organización Mundial de la Salud", texto: "Organización Mundial de la Salud. Dengue y dengue grave: hoja informativa sobre transmisión, síntomas, prevención y atención.", link: "https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue" },
  { tipo: "Organización Panamericana de la Salud", texto: "Organización Panamericana de la Salud. Algoritmos regionales para el manejo clínico de casos de dengue.", link: "https://www.paho.org/sites/default/files/2024-02/2020-cde-algorithms-dengue-regional.pdf" },
  { tipo: "Guía clínica · CDC", texto: "Centros para el Control y la Prevención de Enfermedades. Diagnóstico y pruebas de laboratorio para dengue.", link: "https://www.cdc.gov/dengue/hcp/diagnosis-testing/" },
  { tipo: "Guía clínica · CDC", texto: "Centros para el Control y la Prevención de Enfermedades. Atención clínica del dengue.", link: "https://www.cdc.gov/dengue/hcp/clinical-care/" },
  { tipo: "Protocolo nacional · CENAPRECE", texto: "Secretaría de Salud. Protocolo de atención médica para casos de infección por virus dengue. CENAPRECE, 2024.", link: "https://www.gob.mx/cms/uploads/attachment/file/937281/2024.08.11_Protocolo_atencion_medica_dengue_Cenaprece.pdf" },
];

const todosLosSubtemas = SECCIONES.flatMap((s) =>
  s.subtemas.map((t) => ({ ...t, seccion: s }))
);

/* Clases reutilizables */
const eyebrow = "mb-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-azul2";
const contenedor = "mx-auto max-w-6xl px-7";
const btnBase = "inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300";
const btnPrimario = `${btnBase} bg-tinta text-white hover:bg-azul2`;
const btnSecundario = `${btnBase} border border-linea bg-white hover:border-azul hover:bg-pastel`;

function ImagenModal({ src, alt }) {
  const [expandida, setExpandida] = useState(false);

  useEffect(() => {
    if (!expandida) return undefined;

    const cerrarConEscape = (evento) => {
      if (evento.key === "Escape") setExpandida(false);
    };

    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [expandida]);

  return (
    <>
      <figure className="my-7">
        <button
          type="button"
          onClick={() => setExpandida(true)}
          className="group block w-full overflow-hidden rounded-2xl border border-linea bg-fondo text-left shadow-sm"
          aria-label={`Ampliar imagen: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className="h-[220px] w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-[280px]"
          />
          <span className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-azul2">
            <span aria-hidden="true">⌕</span>
            Haz clic en la imagen para expandirla
          </span>
        </button>
      </figure>

      {expandida && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setExpandida(false)}
          className="fixed inset-0 z-[70] grid place-items-center bg-tinta/85 p-4 backdrop-blur-md md:p-8"
        >
          <button
            type="button"
            onClick={() => setExpandida(false)}
            aria-label="Cerrar imagen ampliada"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-tinta shadow-lg hover:bg-pastel md:right-7 md:top-7"
          >
            ✕
          </button>
          <figure
            onClick={(evento) => evento.stopPropagation()}
            className="flex max-h-[92vh] max-w-[92vw] flex-col items-center"
          >
            <img
              src={src}
              alt={alt}
              className="max-h-[82vh] max-w-[92vw] rounded-xl object-contain shadow-[0_30px_90px_-20px_rgba(0,0,0,0.65)]"
            />
            <figcaption className="mt-4 text-center text-sm font-medium text-white">
              {alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

/* ============================================================
   COMPONENTES
   ============================================================ */
function Marca() {
  return (
    <span className="flex items-center gap-2.5 font-serif text-2xl">
      
      {SITIO.tema}
    </span>
  );
}

function Nav({ onAbrir }) {
  const [abierto, setAbierto] = useState(null);
  const [movil, setMovil] = useState(false);
  const cerrarTodo = () => { setAbierto(null); setMovil(false); };
  const enlace = "rounded-full px-3.5 py-2 text-sm text-suave transition hover:bg-pastel hover:text-tinta";

  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-fondo/80 backdrop-blur-xl">
      <div className={`${contenedor} flex h-[68px] items-center justify-between`}>
        <a href="#inicio" onClick={cerrarTodo}><Marca /></a>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Abrir menú"
          onClick={() => setMovil(!movil)}
        >
          <span className="h-px w-5 bg-tinta" /><span className="h-px w-5 bg-tinta" />
        </button>

        <nav
          className={`${movil ? "flex" : "hidden"} absolute inset-x-0 top-[68px] flex-col gap-1 border-b border-linea bg-white px-5 pb-5 pt-3
                      md:static md:flex md:flex-row md:items-center md:gap-1.5 md:border-0 md:bg-transparent md:p-0`}
        >
          <a href="#inicio" className={enlace} onClick={cerrarTodo}>Inicio</a>

          {SECCIONES.map((s) => (
            <div
              key={s.id}
              className="relative"
              onMouseEnter={() => setAbierto(s.id)}
              onMouseLeave={() => setAbierto(null)}
            >
              <button
                className={`${enlace} w-full text-left`}
                onClick={() => setAbierto(abierto === s.id ? null : s.id)}
              >
                {s.corto} 
              </button>

              <div
                className={`${abierto === s.id ? "block md:visible md:translate-y-0 md:opacity-100" : "hidden md:invisible md:-translate-y-1.5 md:opacity-0"}
                            pl-3 md:absolute md:left-0 md:top-full md:block md:min-w-[270px] md:pl-0 md:pt-1.5 md:transition md:duration-200`}
              >
                <div className="md:rounded-2xl md:border md:border-linea md:bg-white md:p-2 md:shadow-[0_20px_50px_-20px_rgba(31,52,80,0.25)]">
                  {s.subtemas.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { onAbrir(t.id); cerrarTodo(); }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-pastel"
                    >
                   
                      {t.titulo}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <a href="#referencias" className={enlace} onClick={cerrarTodo}>Referencias</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden py-[70px] md:pb-[120px] md:pt-[110px]">
      <div aria-hidden="true">
        <div className="absolute -right-20 -top-28 h-[460px] w-[460px] rounded-full bg-pastel2 opacity-70 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-80 w-80 rounded-full bg-[#E8F1FA] opacity-70 blur-3xl" />
        <div className="absolute left-[45%] top-[40%] h-52 w-52 rounded-full bg-[#D9E8F6] opacity-70 blur-3xl" />
      </div>

      <div className={`${contenedor} relative grid items-center gap-11 md:grid-cols-[1.25fr_0.85fr] md:gap-16`}>
        <div>
          <h1 className="font-serif text-5xl font-normal leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.8rem]">
            {SITIO.tema}
            <em className="block text-azul2">con conocimiento que protege.</em>
          </h1>
          <p className="mt-6 max-w-[520px] text-[1.05rem] text-suave">{SITIO.descripcion}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#pacientes" className={btnPrimario}>Soy paciente</a>
            <a href="#personal" className={btnSecundario}>Soy personal de salud</a>
          </div>
        </div>

      

      </div>
    </section>
  );
}

function Etiqueta({ children, className = "" }) {
  return (
    <p className={`mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-azul2 ${className}`}>
      {children}
    </p>
  );
}

function Cabecera({ etiqueta, titulo, resumen }) {
  return (
    <div className="mb-14 max-w-[620px]">
      <p className={eyebrow}>{etiqueta}</p>
      <h2 className="font-serif text-4xl font-normal leading-[1.1] md:text-[3.2rem]">{titulo}</h2>
      <p className="mt-4 text-suave">{resumen}</p>
    </div>
  );
}

function Seccion({ seccion, onAbrir, alt }) {
  return (
    <section
      id={seccion.id}
      className={`scroll-mt-20 py-20 md:py-28 ${alt ? "bg-gradient-to-b from-white to-fondo" : ""}`}
    >
      <div className={contenedor}>
        <Cabecera {...seccion} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seccion.subtemas.map((t, i) => (
            <button
              key={t.id}
              onClick={() => onAbrir(t.id)}
              className="group relative flex min-h-[250px] flex-col rounded-[20px] border border-linea bg-white p-7 text-left transition duration-300
                         hover:-translate-y-1 hover:border-pastel2 hover:shadow-[0_26px_50px_-30px_rgba(94,141,191,0.5)]"
            >
              <span className="absolute right-7 top-6 text-xs text-azul">{String(i + 1).padStart(2, "0")}</span>
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-pastel text-xl text-azul2 transition group-hover:bg-pastel2">
                {t.icono}
              </span>
              <span className="mb-2.5 font-serif text-2xl leading-tight">{t.titulo}</span>
              <span className="flex-1 text-sm text-suave">{t.descripcion}</span>
              <span className="mt-5 text-sm font-semibold text-azul2">
                Abrir subtema <span className="inline-block transition group-hover:translate-x-1">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Referencias() {
  return (
    <section id="referencias" className="scroll-mt-20 py-20 md:py-28">
      <div className={contenedor}>
        <Cabecera
          etiqueta="Bibliografía"
          titulo="Referencias científicas"
          resumen="Artículos de PubMed y NCBI, Normas Oficiales Mexicanas, Guías de Práctica Clínica y libros consultados."
        />
        <ol className="border-t border-linea">
          {REFERENCIAS.map((r, i) => (
            <li key={i} className="grid gap-1.5 border-b border-linea py-5 md:grid-cols-[220px_1fr] md:gap-6">
              <span className="pt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-azul2">{r.tipo}</span>
              {r.link ? (
                <a
                  href={r.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.95rem] text-suave underline decoration-pastel2 underline-offset-4 hover:text-azul2"
                >
                  {r.texto}
                </a>
              ) : (
                <span className="text-[0.95rem] text-suave">{r.texto}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Ventana de subtema: se abre dentro de la misma página */
function Ventana({ subtema, onCerrar, onAbrir }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onCerrar]);

  const hermanos = subtema.seccion.subtemas;
  const idx = hermanos.findIndex((t) => t.id === subtema.id);
  const siguiente = hermanos[(idx + 1) % hermanos.length];
  const parrafo = "mb-3.5 max-w-[640px] text-suave";
  const h4 = "mb-3 mt-9 font-serif text-2xl font-normal";

  return (
    <div
      onClick={onCerrar}
      className="fixed inset-0 z-50 grid animate-aparece place-items-center bg-tinta/30 p-4 backdrop-blur-sm md:p-6"
    >
      <article
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex h-[min(86vh,820px)] w-full max-w-5xl animate-sube flex-col overflow-hidden rounded-xl bg-white shadow-[0_40px_100px_-30px_rgba(31,52,80,0.45)]"
      >
        {/* Barra de la ventana */}
        <div className="flex items-center gap-4 border-b border-linea bg-fondo px-5 py-3.5">
          
          <span className="ml-2 flex-1 truncate text-xs text-suave">
            {subtema.seccion.titulo} / {subtema.titulo}
          </span>
          <button
            onClick={onCerrar}
            aria-label="Cerrar"
            className="grid h-8 w-8 place-items-center rounded-full text-sm text-suave hover:bg-pastel hover:text-tinta"
          >
            ✕
          </button>
        </div>

        <div className="grid min-h-0 flex-1 md:grid-cols-[240px_1fr]">
          {/* Índice lateral */}
          <aside className="hidden flex-col gap-0.5 overflow-y-auto border-r border-linea px-4 py-7 md:flex">
            <Etiqueta className="px-3 pb-2">{subtema.seccion.titulo}</Etiqueta>
            {hermanos.map((t) => (
              <button
                key={t.id}
                onClick={() => onAbrir(t.id)}
                className={`rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  t.id === subtema.id ? "bg-pastel font-semibold text-tinta" : "text-suave hover:bg-fondo"
                }`}
              >
                {t.titulo}
              </button>
            ))}
          </aside>

          {/* Contenido */}
          <div key={subtema.id} className="animate-aparece overflow-y-auto px-6 py-8 md:px-14 md:py-12">
            <p className={eyebrow}>{subtema.seccion.etiqueta}</p>
            <h3 className="mb-4 font-serif text-4xl font-normal leading-[1.1] md:text-[2.6rem]">{subtema.titulo}</h3>
            {subtema.id === "que-es" ? (
              <div className="max-w-[640px]">
                <ImagenModal src={queEsImagen} alt="Representación del mosquito transmisor del dengue" />
                <p className="mb-3.5 text-lg text-tinta">
                  El dengue es una enfermedad infecciosa de origen viral que representa uno de los principales problemas de salud pública en las regiones tropicales y subtropicales del mundo.
                </p>
                <p className={parrafo}>
                  Se transmite principalmente mediante la picadura de mosquitos hembra infectados del género{" "}
                  <em>Aedes</em>, especialmente <em>Aedes aegypti</em>.
                </p>
                <p className={parrafo}>
                  La enfermedad es causada por el virus del dengue (DENV), perteneciente al género{" "}
                  <em>Flavivirus</em> y a la familia <em>Flaviviridae</em>. Se reconocen cuatro serotipos
                  antigénicamente diferentes: DENV-1, DENV-2, DENV-3 y DENV-4.
                </p>
                <div className="my-6 rounded-r-2xl bg-pastel px-5 py-4 text-[0.94rem]">
                  <strong>Importante:</strong> La infección por cualquiera de los serotipos puede producir
                  desde manifestaciones asintomáticas o cuadros febriles leves hasta enfermedad grave,
                  caracterizada por extravasación de plasma, hemorragias importantes y daño orgánico.
                </div>
              </div>
            ) : subtema.id === "fisiopatologia" ? (
              <div className="max-w-[640px]">
                <ImagenModal src={fisiopatologia1Imagen} alt="Ilustración sobre entrada y replicación del virus del dengue" />
                <p className="mb-6 text-lg text-tinta">
                  La fisiopatología del dengue comprende los mecanismos mediante los cuales el virus
                  ingresa al organismo, se replica, interactúa con el sistema inmunitario y produce
                  alteraciones vasculares y orgánicas.
                </p>
                <p className={parrafo}>
                  Es especialmente importante comprender la extravasación plasmática, porque constituye
                  uno de los principales mecanismos relacionados con el desarrollo del dengue grave.
                </p>

                <h4 className={h4}>Entrada y replicación viral</h4>
                <p className={parrafo}>
                  Después de la picadura de un mosquito infectado, el virus ingresa a la piel y puede
                  infectar células dendríticas, monocitos y macrófagos. Posteriormente:
                </p>
                <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>El virus se une a receptores celulares mediante su proteína E.</li>
                  <li>Ingresa a la célula por endocitosis.</li>
                  <li>Se libera el ARN viral en el citoplasma.</li>
                  <li>El ARN se traduce y produce una poliproteína viral.</li>
                  <li>Se sintetizan nuevas copias del genoma.</li>
                  <li>Se ensamblan nuevas partículas virales.</li>
                  <li>Los viriones maduros salen de la célula e infectan otras células.</li>
                </ol>
                <p className={parrafo}>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11396989/" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                    Revisar artículo científico sobre inhibidores y actividad antiviral
                  </a>
                </p>

                <h4 className={h4}>Respuesta inmunitaria</h4>
                <p className={parrafo}>
                  El organismo reconoce la presencia del virus mediante mecanismos de inmunidad innata y adaptativa.
                </p>
                <h5 className="mb-2 font-semibold text-tinta">Inmunidad innata</h5>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Activación de receptores de reconocimiento de patrones.</li>
                  <li>Producción de interferones tipo I.</li>
                  <li>Activación de células NK.</li>
                  <li>Liberación de citocinas y quimiocinas.</li>
                  <li>Activación de mecanismos inflamatorios.</li>
                </ul>
                <h5 className="mb-2 font-semibold text-tinta">Inmunidad adaptativa</h5>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Activación de linfocitos T CD4+ y CD8+.</li>
                  <li>Producción de anticuerpos por linfocitos B.</li>
                  <li>Formación de células de memoria inmunológica.</li>
                  <li>Neutralización de partículas virales.</li>
                </ul>
                <p className={parrafo}>
                  Aunque esta respuesta es fundamental para controlar la infección, una respuesta
                  inmunitaria desregulada puede contribuir al daño vascular y a la gravedad de la enfermedad.
                </p>

                <ImagenModal src={fisiopatologia2Imagen} alt="Ilustración de la respuesta inmunitaria en el dengue" />
                <h4 className={h4}>Potenciación dependiente de anticuerpos (ADE)</h4>
                <p className={parrafo}>
                  Uno de los mecanismos inmunológicos más estudiados en el dengue grave es la potenciación
                  dependiente de anticuerpos (<em>Antibody-Dependent Enhancement</em>, ADE).
                </p>
                <p className={parrafo}>Puede ocurrir durante una infección secundaria por un serotipo diferente.</p>
                <h5 className="mb-2 font-semibold text-tinta">¿Cómo sucede?</h5>
                <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Durante la primera infección, el organismo produce anticuerpos contra un serotipo específico.</li>
                  <li>Si ocurre una segunda infección por otro serotipo, algunos anticuerpos previos pueden reconocer al nuevo virus, pero no neutralizarlo eficazmente.</li>
                  <li>Los complejos virus-anticuerpo pueden facilitar la entrada del virus a determinadas células que expresan receptores Fcγ.</li>
                  <li>Esto puede aumentar la infección de células susceptibles y contribuir a una respuesta inmunitaria alterada.</li>
                </ol>
                <p className={parrafo}>
                  <a href="https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2023.1200195/full" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                    Revisar revisión científica sobre anticuerpos neutralizantes y ADE
                  </a>
                </p>
                <p className={parrafo}>
                  Este fenómeno ayuda a explicar por qué determinadas infecciones secundarias pueden
                  asociarse con mayor riesgo de dengue grave. Sin embargo, no todas las infecciones secundarias producen complicaciones.
                </p>

                <h4 className={h4}>Alteración de la permeabilidad vascular</h4>
                <p className={parrafo}>
                  La complicación fisiopatológica central del dengue grave es el aumento de la permeabilidad
                  de los vasos sanguíneos.
                </p>
                <ImagenModal src={fisiopatologia3Imagen} alt="Esquema de la alteración vascular en el dengue grave" />
                <p className={parrafo}>Durante la fase crítica pueden intervenir:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Mediadores inflamatorios.</li>
                  <li>Alteraciones funcionales del endotelio vascular.</li>
                  <li>Proteínas virales como NS1.</li>
                  <li>Activación del complemento.</li>
                  <li>Disfunción de la barrera endotelial.</li>
                </ul>
                <p className={parrafo}>
                  Como consecuencia, la parte líquida de la sangre, denominada plasma, puede salir del
                  espacio intravascular hacia los tejidos y cavidades corporales.
                </p>
                <p className={parrafo}>Esto ocasiona:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Hemoconcentración.</li>
                  <li>Derrame pleural.</li>
                  <li>Ascitis.</li>
                  <li>Disminución del volumen circulante efectivo.</li>
                  <li>Hipotensión.</li>
                  <li>Choque hipovolémico en casos graves.</li>
                </ul>
                <p className={parrafo}>
                  <a href="https://rega.kuleuven.be/cmt/cmt_sl/pathogenesis-of-dengue-virus-denv/scheme-endothelial-dysfunction-in-denv-pathology" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                    Consultar esquema sobre disfunción endotelial en dengue
                  </a>
                </p>

                <h4 className={h4}>Trombocitopenia y alteraciones hemorrágicas</h4>
                <p className={parrafo}>La disminución de plaquetas puede producirse por diferentes mecanismos:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Supresión transitoria de la médula ósea.</li>
                  <li>Destrucción inmunitaria de plaquetas.</li>
                  <li>Activación y consumo plaquetario.</li>
                  <li>Alteraciones de la función plaquetaria.</li>
                </ul>
                <p className={parrafo}>
                  La trombocitopenia puede coexistir con alteraciones de la coagulación y daño vascular,
                  aumentando el riesgo de sangrado.
                </p>
                <div className="my-6 rounded-r-2xl bg-pastel px-5 py-4 text-[0.94rem]">
                  <strong>Importante:</strong> Un recuento bajo de plaquetas, por sí solo, no determina
                  que un paciente presente dengue grave ni constituye una indicación automática de transfusión plaquetaria.
                </div>

                <h4 className={h4}>Afectación de órganos</h4>
                <p className={parrafo}>En los casos graves puede presentarse daño en distintos órganos:</p>
                <div className="overflow-x-auto rounded-xl border border-linea">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-pastel text-tinta">
                      <tr><th className="px-4 py-3">Órgano o sistema</th><th className="px-4 py-3">Alteración</th></tr>
                    </thead>
                    <tbody className="divide-y divide-linea text-suave">
                      <tr><td className="px-4 py-3 font-semibold">Hígado</td><td className="px-4 py-3">Elevación de transaminasas y hepatitis; excepcionalmente insuficiencia hepática.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Corazón</td><td className="px-4 py-3">Miocarditis y alteraciones del ritmo.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Sistema nervioso</td><td className="px-4 py-3">Encefalopatía, encefalitis y otras manifestaciones neurológicas.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Riñones</td><td className="px-4 py-3">Lesión renal aguda.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Sistema hematológico</td><td className="px-4 py-3">Trombocitopenia y alteraciones de la coagulación.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Sistema vascular</td><td className="px-4 py-3">Extravasación plasmática y choque.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : subtema.id === "diagnostico" ? (
              <div className="max-w-[640px]">
                <ImagenModal src={diagnosticoImagen} alt="Ilustración sobre el diagnóstico clínico y de laboratorio del dengue" />
                <p className="mb-6 text-lg text-tinta">
                  El diagnóstico del dengue comienza con la valoración clínica y epidemiológica del paciente.
                  No debe depender exclusivamente de una prueba de laboratorio, ya que el tratamiento y
                  la clasificación de gravedad deben iniciarse ante la sospecha clínica.
                </p>

                <h4 className={h4 + " mt-0"}>Definición de caso sospechoso</h4>
                <p className={parrafo}>
                  De acuerdo con el PRONAM de Dengue 2026, se considera sospechosa una persona que vive
                  o ha viajado durante los últimos 14 días a una zona con transmisión de dengue y presenta
                  fiebre, habitualmente de 2 a 7 días de evolución, acompañada de dos o más manifestaciones como:
                </p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Náuseas o vómitos.</li>
                  <li>Exantema.</li>
                  <li>Cefalea o dolor retroocular.</li>
                  <li>Mialgias o artralgias.</li>
                  <li>Petequias.</li>
                </ul>
                <p className={parrafo}>
                  En niños también debe considerarse un cuadro febril agudo sin foco infeccioso aparente
                  cuando existe antecedente epidemiológico compatible.
                </p>

                <h4 className={h4}>Historia clínica</h4>
                <p className={parrafo}>El personal de salud debe investigar:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Fecha de inicio de los síntomas y duración de la fiebre.</li>
                  <li>Presencia de dolor abdominal y vómitos.</li>
                  <li>Antecedentes de dengue.</li>
                  <li>Residencia o viajes recientes a zonas endémicas.</li>
                  <li>Contacto con mosquitos.</li>
                  <li>Enfermedades crónicas y embarazo.</li>
                  <li>Medicamentos utilizados.</li>
                  <li>Presencia de sangrado y estado de hidratación.</li>
                </ul>

                <h4 className={h4}>Exploración física</h4>
                <p className={parrafo}>Se deben evaluar:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Temperatura, frecuencia cardiaca y respiratoria.</li>
                  <li>Presión arterial y presión de pulso.</li>
                  <li>Saturación de oxígeno y estado de conciencia.</li>
                  <li>Llenado capilar y pulsos periféricos.</li>
                  <li>Diuresis y dolor abdominal.</li>
                  <li>Hepatomegalia y datos de sangrado.</li>
                  <li>Edema y acumulación de líquidos.</li>
                </ul>
                <p className={parrafo}>La valoración hemodinámica es fundamental para identificar tempranamente el choque.</p>

                <h4 className={h4}>Diagnóstico de laboratorio</h4>
                <p className={parrafo}>Las principales pruebas utilizadas para el diagnóstico del dengue son:</p>
                <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Reacción en cadena de la polimerasa con transcripción inversa (RT-PCR).</li>
                  <li>Detección del antígeno NS1.</li>
                  <li>Detección de anticuerpos IgM.</li>
                  <li>Detección de anticuerpos IgG en muestras pareadas, cuando está indicada.</li>
                </ol>

                <h4 className={h4}>RT-PCR</h4>
                <p className={parrafo}>
                  Detecta el material genético del virus mediante amplificación del ARN viral. Se utiliza
                  principalmente durante la fase aguda y puede detectar el virus desde los primeros días
                  de enfermedad. Permite identificar los serotipos DENV-1, DENV-2, DENV-3 y DENV-4,
                  dependiendo del ensayo. Un resultado positivo confirma la presencia de ARN viral,
                  mientras que uno negativo no descarta completamente la infección.
                </p>

                <h4 className={h4}>Antígeno NS1</h4>
                <p className={parrafo}>
                  La proteína no estructural 1 (NS1) puede detectarse en sangre durante la fase temprana
                  de la infección. Tiene mayor utilidad durante los primeros días y puede detectarse desde
                  el primer día de síntomas. Un resultado positivo es indicativo de infección aguda;
                  uno negativo no descarta dengue, especialmente en infecciones secundarias.
                </p>

                <h4 className={h4}>Anticuerpos IgM</h4>
                <p className={parrafo}>Suelen detectarse a partir del quinto día aproximadamente.</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Son indicativos de infección reciente.</li>
                  <li>Se utilizan principalmente después de los primeros días de enfermedad.</li>
                  <li>Una sola muestra positiva se interpreta como infección presuntamente reciente.</li>
                  <li>Pueden persistir durante varias semanas o meses.</li>
                </ul>

                <h4 className={h4}>Anticuerpos IgG</h4>
                <p className={parrafo}>Pueden aparecer durante la respuesta inmunitaria y permanecer durante años.</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>En infecciones primarias suelen elevarse posteriormente.</li>
                  <li>En infecciones secundarias pueden aumentar rápidamente.</li>
                  <li>Una sola muestra positiva no confirma una infección aguda.</li>
                  <li>Su interpretación puede complicarse por reacciones cruzadas con otros flavivirus.</li>
                </ul>

                <h4 className={h4}>¿Qué prueba solicitar según el día de enfermedad?</h4>
                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-linea p-4">
                    <p className="font-semibold text-tinta">Días 1–5: fase aguda</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-suave marker:text-azul">
                      <li>RT-PCR.</li>
                      <li>Antígeno NS1.</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-linea p-4">
                    <p className="font-semibold text-tinta">Desde el día 6: respuesta inmunitaria</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-suave marker:text-azul">
                      <li>IgM mediante ELISA.</li>
                      <li>Considerar pruebas moleculares o NS1 según evolución y protocolo.</li>
                    </ul>
                  </div>
                </div>
                <p className={parrafo}>
                  En situaciones seleccionadas pueden utilizarse muestras pareadas para evaluar
                  seroconversión o interpretar IgG en muestras de diferentes momentos. La selección
                  definitiva depende del día de evolución, disponibilidad de pruebas y lineamientos de vigilancia.
                </p>

                <h4 className={h4}>Biometría hemática</h4>
                <p className={parrafo}>Es fundamental para evaluar la evolución del paciente.</p>
                <div className="overflow-x-auto rounded-xl border border-linea">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-pastel text-tinta">
                      <tr><th className="px-4 py-3">Parámetro</th><th className="px-4 py-3">Hallazgo posible</th><th className="px-4 py-3">Importancia</th></tr>
                    </thead>
                    <tbody className="divide-y divide-linea text-suave">
                      <tr><td className="px-4 py-3 font-semibold">Leucocitos</td><td className="px-4 py-3">Leucopenia</td><td className="px-4 py-3">Hallazgo frecuente en dengue.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Plaquetas</td><td className="px-4 py-3">Trombocitopenia</td><td className="px-4 py-3">Puede aumentar el riesgo hemorrágico.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Hematocrito</td><td className="px-4 py-3">Elevación progresiva</td><td className="px-4 py-3">Puede indicar extravasación plasmática.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Hemoglobina</td><td className="px-4 py-3">Puede aumentar por hemoconcentración</td><td className="px-4 py-3">Debe interpretarse junto con el hematocrito y el estado clínico.</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="my-6 rounded-r-2xl bg-pastel px-5 py-4 text-[0.94rem]">
                  <strong>Interpretación importante:</strong> un incremento progresivo del hematocrito
                  acompañado de una disminución rápida de plaquetas es un signo de alarma que requiere valoración médica.
                </div>

                <h4 className={h4}>Otros estudios complementarios</h4>
                <p className={parrafo}>Dependiendo de la gravedad y las manifestaciones clínicas pueden solicitarse:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Química sanguínea, electrolitos séricos y creatinina/urea.</li>
                  <li>Pruebas de función hepática y albúmina sérica.</li>
                  <li>Tiempos de coagulación y gasometría arterial o venosa.</li>
                  <li>Lactato y electrocardiograma.</li>
                  <li>Ultrasonido para identificar ascitis o derrame pleural.</li>
                </ul>
                <p className={parrafo}>Estos estudios permiten identificar complicaciones y valorar la función de diferentes órganos.</p>

                <h4 className={h4}>Diagnóstico diferencial</h4>
                <p className={parrafo}>El dengue comparte manifestaciones con otras enfermedades infecciosas y no infecciosas.</p>
                <div className="overflow-x-auto rounded-xl border border-linea">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-pastel text-tinta">
                      <tr><th className="px-4 py-3">Enfermedad</th><th className="px-4 py-3">Características para diferenciarla</th></tr>
                    </thead>
                    <tbody className="divide-y divide-linea text-suave">
                      <tr><td className="px-4 py-3 font-semibold">Chikungunya</td><td className="px-4 py-3">Dolor articular intenso y persistente.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Zika</td><td className="px-4 py-3">Exantema, conjuntivitis no purulenta y fiebre generalmente leve.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Influenza</td><td className="px-4 py-3">Síntomas respiratorios predominantes.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">COVID-19</td><td className="px-4 py-3">Manifestaciones respiratorias y sistémicas variables.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Rickettsiosis</td><td className="px-4 py-3">Fiebre, cefalea, exantema y antecedentes de exposición a garrapatas.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Paludismo</td><td className="px-4 py-3">Fiebre y antecedentes de exposición en zonas endémicas.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Leptospirosis</td><td className="px-4 py-3">Fiebre, mialgias, posible ictericia y exposición a agua contaminada.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Fiebre tifoidea</td><td className="px-4 py-3">Fiebre prolongada y síntomas gastrointestinales.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">Hepatitis viral</td><td className="px-4 py-3">Ictericia y elevación de enzimas hepáticas.</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className={parrafo}>
                  Es especialmente importante diferenciar dengue de rickettsiosis y otras infecciones
                  que requieren tratamientos específicos.
                </p>
              </div>
            ) : subtema.id === "tratamiento" ? (
              <div className="max-w-[640px]">
                <ImagenModal src={tratamientoImagen} alt="Ilustración sobre el tratamiento y seguimiento del dengue" />
                <p className="mb-6 text-lg text-tinta">
                  Actualmente no existe un antiviral específico de uso rutinario que elimine el virus del dengue.
                  El tratamiento es principalmente de soporte y depende de la clasificación clínica y del estado
                  hemodinámico del paciente.
                </p>

                <p className={parrafo}>Sus objetivos son:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Mantener una hidratación adecuada.</li>
                  <li>Evitar la progresión hacia choque.</li>
                  <li>Detectar oportunamente los signos de alarma.</li>
                  <li>Controlar los síntomas.</li>
                  <li>Identificar y tratar las complicaciones.</li>
                  <li>Mantener una vigilancia clínica y de laboratorio adecuada.</li>
                </ul>

                <h4 className={h4}>Tratamiento no farmacológico</h4>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Reposo relativo.</li>
                  <li>Hidratación oral cuando el paciente pueda tolerarla.</li>
                  <li>Uso de soluciones de rehidratación oral cuando estén indicadas.</li>
                  <li>Alimentación según tolerancia.</li>
                  <li>Vigilancia de la diuresis.</li>
                  <li>Seguimiento de los signos de alarma.</li>
                  <li>Evitar nuevas picaduras de mosquitos.</li>
                </ul>

                <h4 className={h4}>Tratamiento farmacológico</h4>
                <p className={parrafo}>
                  El PRONAM contempla paracetamol o metamizol como opciones para el control sintomático,
                  de acuerdo con la valoración médica y las características del paciente.
                </p>

                <div className="my-6 rounded-r-2xl border-l-4 border-azul2 bg-pastel px-5 py-5">
                  <h5 className="mb-3 font-semibold text-tinta">No automedicarse con estos fármacos</h5>
                  <ul className="list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                    <li>Ácido acetilsalicílico (aspirina).</li>
                    <li>Ibuprofeno.</li>
                    <li>Naproxeno.</li>
                    <li>Otros antiinflamatorios no esteroideos (AINE).</li>
                    <li>Corticoesteroides sin indicación específica.</li>
                  </ul>
                  <p className="mt-4 text-[0.94rem] text-suave">
                    <strong>¿Por qué?</strong> Los antiinflamatorios no esteroideos y el ácido acetilsalicílico
                    pueden aumentar el riesgo de sangrado. Los corticoesteroides no son tratamiento rutinario del dengue.
                  </p>
                </div>

                <p className={parrafo}>
                  Las dosis y los medicamentos deben individualizarse; esta página no constituye una receta médica.
                </p>
              </div>
            ) : subtema.id === "normatividad" ? (
              <div className="max-w-[640px]">
                <h4 className={h4 + " mt-0"}>Normas Oficiales Mexicanas relacionadas con el dengue</h4>
                <p className={parrafo}>
                  Estas normas son indispensables para la vigilancia, prevención y atención del dengue
                  desde la perspectiva de salud pública.
                </p>

                <div className="mb-7 rounded-2xl border border-linea p-5">
                  <p className="font-serif text-2xl text-tinta">NOM-032-SSA2-2014</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-azul2">Vigente</p>
                  <p className="mt-3 font-semibold text-tinta">
                    Para la vigilancia epidemiológica, promoción, prevención y control de las enfermedades transmitidas por vectores.
                  </p>
                  <p className={parrafo + " mt-3"}>
                    Es la norma principal para abordar el dengue desde la salud pública. Establece
                    criterios y procedimientos para:
                  </p>
                  <ul className="mb-4 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                    <li>Vigilancia epidemiológica.</li>
                    <li>Prevención y promoción de la salud.</li>
                    <li>Control de vectores.</li>
                    <li>Identificación de factores de riesgo.</li>
                    <li>Acciones de intervención sanitaria.</li>
                  </ul>
                  <p className="mb-3 text-sm text-suave">Publicada en el Diario Oficial de la Federación el 16 de abril de 2015.</p>
                  <a href="https://sidof.segob.gob.mx/notas/docFuente/5389045" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                    Consultar texto oficial de la NOM-032-SSA2-2014
                  </a>
                </div>

                <div className="mb-7 rounded-2xl border border-linea p-5">
                  <p className="font-serif text-2xl text-tinta">NOM-017-SSA2-2012</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-azul2">Referencia normativa</p>
                  <p className="mt-3 font-semibold text-tinta">Para la vigilancia epidemiológica.</p>
                  <p className={parrafo + " mt-3"}>
                    Establece criterios y lineamientos para la operación de la vigilancia epidemiológica
                    en el territorio nacional. Su relación con el dengue incluye:
                  </p>
                  <ul className="mb-4 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                    <li>Registro de casos.</li>
                    <li>Notificación epidemiológica.</li>
                    <li>Recolección de información.</li>
                    <li>Análisis de datos.</li>
                    <li>Seguimiento de brotes.</li>
                    <li>Coordinación de los servicios de salud.</li>
                  </ul>
                  <a href="https://www.gob.mx/salud/documentos/manuales-para-la-vigilancia-epidemiologica-102563" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                    Consultar documentos oficiales de vigilancia epidemiológica
                  </a>
                </div>

                <h4 className={h4}>Otras normas relacionadas</h4>
                <div className="mb-7 overflow-x-auto rounded-xl border border-linea">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-pastel text-tinta">
                      <tr><th className="px-4 py-3">Norma</th><th className="px-4 py-3">Relación con el proyecto</th></tr>
                    </thead>
                    <tbody className="divide-y divide-linea text-suave">
                      <tr><td className="px-4 py-3 font-semibold">NOM-004-SSA3-2012</td><td className="px-4 py-3">Expediente clínico: documentación de la atención, evolución y tratamiento.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">NOM-087-SEMARNAT-SSA1-2002</td><td className="px-4 py-3">Manejo de residuos peligrosos biológico-infecciosos durante la atención y toma de muestras.</td></tr>
                      <tr><td className="px-4 py-3 font-semibold">NOM-253-SSA1-2012</td><td className="px-4 py-3">Disposición de sangre humana y sus componentes con fines terapéuticos.</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mb-8 rounded-r-2xl bg-pastel px-5 py-4 text-[0.94rem]">
                  <strong>Aclaración:</strong> estas normas son complementarias y no sustituyen la NOM-032
                  ni el PRONAM. Conviene verificar su vigencia y modificaciones en el catálogo oficial
                  antes de citarlas como normativa vigente.
                </div>

                <h4 className={h4}>Protocolo Nacional de Atención Médica (PRONAM) de Dengue 2026</h4>
                <p className={parrafo}>
                  El Protocolo Nacional de Atención Médica de Dengue, primera edición, fue aprobado por
                  el Consejo de Salubridad General durante su Primera Sesión Ordinaria del 6 de marzo de 2026.
                  Establece recomendaciones para la valoración, clasificación, tratamiento, referencia,
                  seguimiento y alta de pacientes con dengue en México.
                </p>
                <p className={parrafo}>Entre sus contenidos destacan:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Definición de caso sospechoso y epidemiología nacional.</li>
                  <li>Fases clínicas y clasificación de gravedad.</li>
                  <li>Fisiopatología y diagnóstico de laboratorio.</li>
                  <li>Diagnóstico diferencial.</li>
                  <li>Grupos de tratamiento A, B1, B2 y C.</li>
                  <li>Manejo de líquidos y criterios de referencia.</li>
                  <li>Criterios de egreso seguro y ficha de seguimiento domiciliario.</li>
                </ul>
                <div className="mb-8 rounded-2xl border border-pastel2 p-5">
                  <p className="font-semibold text-tinta">PRONAM Dengue — Primera edición, 2026</p>
                  <p className="mb-3 text-sm text-suave">Secretaría de Salud · Consejo de Salubridad General</p>
                  <a href="https://pronamsalud.csg.gob.mx/pronam-dengue.pdf" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                    Abrir y descargar PRONAM de Dengue
                  </a>
                </div>
                <p className={parrafo}>
                  Es especialmente importante utilizar este documento como fuente principal para los
                  apartados de diagnóstico y tratamiento, porque corresponde al protocolo nacional aprobado en 2026.
                </p>

                <h4 className={h4}>Guías y documentos científicos complementarios</h4>
                <ol className="space-y-4 text-[0.95rem] text-suave marker:text-azul">
                  <li>
                    <strong className="text-tinta">Organización Mundial de la Salud (OMS):</strong>{" "}
                    Dengue y dengue grave.{" "}
                    <a href="https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">Consultar OMS</a>.
                  </li>
                  <li>
                    <strong className="text-tinta">Organización Panamericana de la Salud (OPS):</strong>{" "}
                    Algoritmos para el manejo clínico de casos de dengue.{" "}
                    <a href="https://www.paho.org/sites/default/files/2024-02/2020-cde-algorithms-dengue-regional.pdf" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">Consultar algoritmos</a>.
                  </li>
                  <li>
                    <strong className="text-tinta">Centros para el Control y la Prevención de Enfermedades (CDC):</strong>{" "}
                    diagnóstico y atención clínica.{" "}
                    <a href="https://www.cdc.gov/dengue/hcp/diagnosis-testing/" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">Diagnóstico</a>{" "}
                    y{" "}
                    <a href="https://www.cdc.gov/dengue/hcp/clinical-care/" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">atención clínica</a>.
                  </li>
                  <li>
                    <strong className="text-tinta">CENAPRECE:</strong> Protocolo de atención médica para casos de infección por virus dengue, 2024.{" "}
                    <a href="https://www.gob.mx/cms/uploads/attachment/file/937281/2024.08.11_Protocolo_atencion_medica_dengue_Cenaprece.pdf" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">Consultar protocolo de 2024</a>.
                  </li>
                </ol>
              </div>
            ) : subtema.id === "sintomas" ? (
              <div className="max-w-[640px]">
                <ImagenModal src={sintomasImagen} alt="Ilustración de síntomas y señales de alarma del dengue" />
                <h4 className={h4 + " mt-0"}>¡Cuidado con los signos de alarma!</h4>
                <p className="mb-4 font-semibold text-tinta">Acude inmediatamente a un servicio médico si aparece alguno de estos signos:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Dolor abdominal intenso.</li>
                  <li>Vómitos persistentes.</li>
                  <li>Sangrado de nariz o encías.</li>
                  <li>Sangre en vómito o evacuaciones.</li>
                  <li>Somnolencia excesiva o irritabilidad.</li>
                  <li>Desmayos.</li>
                  <li>Dificultad para respirar.</li>
                  <li>Hinchazón o acumulación de líquidos.</li>
                </ul>
                <div className="my-6 rounded-r-2xl border-l-4 border-azul2 bg-pastel px-5 py-4 text-[0.94rem]">
                  <strong>Recuerda:</strong> si la fiebre desaparece, pero aparece alguno de estos
                  síntomas, no significa que la enfermedad haya terminado. Puede estar comenzando la fase más peligrosa.
                </div>

                <h4 className={h4}>¿Qué debo hacer si sospecho que tengo dengue?</h4>
                <ol className="list-decimal space-y-2.5 pl-5 text-suave marker:font-semibold marker:text-azul">
                  <li>Acude a una unidad de salud para recibir valoración.</li>
                  <li>Mantente hidratado de acuerdo con las indicaciones médicas.</li>
                  <li>Descansa.</li>
                  <li>No te automediques.</li>
                  <li>Evita aspirina, ibuprofeno y naproxeno.</li>
                  <li>Utiliza repelente y mosquiteros para evitar nuevas picaduras.</li>
                  <li>Vigila la aparición de signos de alarma.</li>
                </ol>
              </div>
            ) : subtema.id === "prevencion" ? (
              <div className="max-w-[640px]">
                <ImagenModal src={prevencionImagen} alt="Ilustración de prevención del dengue en el hogar" />
                <h4 className={h4 + " mt-0"}>Recomendaciones para proteger a tu familia</h4>
                <p className="mb-6 text-lg text-tinta">
                  La prevención del dengue comienza en el hogar y requiere eliminar los criaderos del
                  mosquito, protegerse de sus picaduras y mantener una vigilancia comunitaria permanente.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-linea p-5">
                    <h5 className="mb-3 font-semibold text-tinta">Elimina criaderos de mosquitos</h5>
                    <ul className="list-disc space-y-1.5 pl-5 text-sm text-suave marker:text-azul">
                      <li>Inspecciona semanalmente patios y azoteas.</li>
                      <li>Tapa depósitos y cisternas de agua.</li>
                      <li>Voltea cubetas, macetas y recipientes.</li>
                      <li>Retira llantas, basura y objetos innecesarios.</li>
                      <li>Desecha recipientes que acumulen agua.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-linea p-5">
                    <h5 className="mb-3 font-semibold text-tinta">Cuida los espacios con agua</h5>
                    <ul className="list-disc space-y-1.5 pl-5 text-sm text-suave marker:text-azul">
                      <li>Cambia frecuentemente el agua de los floreros.</li>
                      <li>Lava con cepillo bebederos y recipientes de mascotas.</li>
                      <li>Limpia canaletas y áreas que acumulen humedad.</li>
                      <li>Mantén cerradas las mangueras y drenajes posibles.</li>
                    </ul>
                  </div>
                </div>

                <h4 className={h4}>Protección personal</h4>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Utiliza repelente siguiendo las indicaciones del producto y la edad del usuario.</li>
                  <li>Coloca mosquiteros en camas y ventanas.</li>
                  <li>Usa ropa que cubra brazos y piernas durante las horas con mayor actividad del mosquito.</li>
                  <li>Instala pantallas y sellado en puertas y ventanas.</li>
                  <li>Evita acumular ropa o objetos cerca de zonas donde el mosquito pueda descansar.</li>
                </ul>

                <h4 className={h4}>Prevención comunitaria</h4>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Participa en las jornadas y campañas de prevención de tu comunidad.</li>
                  <li>Comparte la eliminación de criaderos con vecinos y familiares.</li>
                  <li>Permite la inspección y fumigación autorizada cuando sea indicada por las autoridades.</li>
                  <li>Reporta acumulaciones de agua o posibles criaderos en áreas públicas.</li>
                </ul>

                <div className="my-6 rounded-r-2xl border-l-4 border-azul2 bg-pastel px-5 py-4 text-[0.94rem]">
                  <strong>La estrategia ABCD:</strong> elimina agua acumulada, revisa recipientes
                  regularmente, protege a las personas con mosquiteros y repelentes, y participa
                  junto con tu comunidad.
                </div>

                <h4 className={h4}>Rutina semanal de prevención</h4>
                <ol className="list-decimal space-y-2 pl-5 text-suave marker:font-semibold marker:text-azul">
                  <li>Realiza una revisión completa del hogar y patio una vez por semana.</li>
                  <li>Limpia o tapa todo recipiente que pueda almacenar agua.</li>
                  <li>Renueva el agua de floreros y bebederos de mascotas.</li>
                  <li>Revisa regularmente repelentes, mosquiteros y ropa protectora.</li>
                  <li>Busca atención médica si una persona presenta fiebre o síntomas compatibles con dengue.</li>
                </ol>
              </div>
            ) : subtema.id === "factores-riesgo" ? (
              <div className="max-w-[640px]">
                <h4 className={h4 + " mt-0"}>Factores de riesgo</h4>
                <p className="mb-6 text-lg text-tinta">
                  Los factores de riesgo pueden aumentar la probabilidad de adquirir la infección
                  o de desarrollar complicaciones.
                </p>
                <div className="overflow-x-auto rounded-xl border border-linea">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-pastel text-tinta">
                      <tr>
                        <th className="px-4 py-3">Factor</th>
                        <th className="px-4 py-3">Importancia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-linea text-suave">
                      <tr>
                        <td className="px-4 py-3 font-semibold">Vivir en zonas endémicas</td>
                        <td className="px-4 py-3">Mayor exposición al vector.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Antecedente de dengue</td>
                        <td className="px-4 py-3">Una segunda infección por otro serotipo puede aumentar el riesgo de dengue grave.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Embarazo</td>
                        <td className="px-4 py-3">Requiere vigilancia y valoración especial.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Extremos de edad</td>
                        <td className="px-4 py-3">Lactantes y adultos mayores requieren atención particular.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Enfermedades crónicas</td>
                        <td className="px-4 py-3">Pueden complicar el manejo clínico.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Obesidad</td>
                        <td className="px-4 py-3">Puede asociarse con mayor complejidad clínica.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Acceso limitado a servicios médicos</td>
                        <td className="px-4 py-3">Puede retrasar la detección y atención de complicaciones.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : subtema.id === "mitos" ? (
              <div className="max-w-[640px]">
                <h4 className={h4 + " mt-0"}>Mitos y realidades sobre el dengue</h4>
                <p className={parrafo}>
                  Conocer la información correcta ayuda a prevenir infecciones y a buscar atención
                  médica a tiempo.
                </p>
                <div className="overflow-x-auto rounded-xl border border-linea">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-pastel text-tinta">
                      <tr>
                        <th className="px-4 py-3">Mito</th>
                        <th className="px-4 py-3">Realidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-linea text-suave">
                      <tr>
                        <td className="px-4 py-3 font-semibold">El dengue se contagia por abrazar a alguien.</td>
                        <td className="px-4 py-3">Su principal transmisión es mediante mosquitos infectados.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Si desaparece la fiebre, ya estoy curado.</td>
                        <td className="px-4 py-3">Puede comenzar la fase crítica, por lo que deben vigilarse los signos de alarma.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Solo hay dengue cuando llueve.</td>
                        <td className="px-4 py-3">Puede existir transmisión durante todo el año en zonas con presencia del vector.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Todos los mosquitos transmiten dengue.</td>
                        <td className="px-4 py-3">Principalmente lo transmiten hembras de determinadas especies de <em>Aedes</em> infectadas.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">La fumigación elimina todos los mosquitos.</td>
                        <td className="px-4 py-3">No sustituye la eliminación de criaderos ni el control integral del vector.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">Tener dengue una vez significa que no volveré a enfermar.</td>
                        <td className="px-4 py-3">Existen cuatro serotipos y es posible reinfectarse con uno diferente.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : subtema.id === "epidemiologia" ? (
              <div className="max-w-[640px]">
                <ImagenModal src={epidemiologiaImagen} alt="Ilustración sobre la distribución epidemiológica del dengue" />
                <p className="mb-6 text-lg text-tinta">
                  El dengue representa un importante problema de salud pública mundial. Su distribución
                  está relacionada con factores ambientales, climáticos, demográficos y sociales que
                  favorecen la presencia del mosquito vector.
                </p>

                <h4 className={h4 + " mt-0"}>Distribución mundial</h4>
                <p className={parrafo}>Se presenta principalmente en regiones tropicales y subtropicales de:</p>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>América</li>
                  <li>Sudeste asiático</li>
                  <li>Pacífico occidental</li>
                  <li>África</li>
                  <li>Mediterráneo oriental</li>
                </ul>
                <p className={parrafo}>
                  La OMS estima que aproximadamente la mitad de la población mundial vive en zonas con
                  riesgo de dengue. La carga real de enfermedad es difícil de determinar debido a
                  infecciones asintomáticas, subdiagnóstico y diferencias en los sistemas de vigilancia.
                </p>

                <h4 className={h4}>Situación epidemiológica en México</h4>
                <p className={parrafo}>
                  En México, el dengue es una enfermedad de notificación y vigilancia epidemiológica.
                  La circulación del mosquito vector y la transmisión del virus se favorecen en diversas
                  entidades por las condiciones climáticas, la urbanización y la acumulación de agua.
                </p>
                <p className={parrafo}>
                  Para tu sitio web es importante utilizar datos oficiales y especificar siempre el año
                  y la semana epidemiológica.
                </p>

                <div className="my-6 rounded-2xl border border-pastel2 bg-pastel px-6 py-7">
                  <p className="font-serif text-5xl font-normal text-azul2">9,456</p>
                  <p className="mt-2 font-semibold text-tinta">
                    Casos confirmados acumulados en México hasta la semana epidemiológica 43 de 2026.
                  </p>
                  <p className="mt-3 text-sm text-suave">
                    Incluye 4,757 casos de dengue no grave y 4,699 casos de dengue con signos de alarma
                    y dengue grave. Fuente: Dirección General de Epidemiología, Secretaría de Salud,
                    informe semanal de 2026.
                  </p>
                  <p className="mt-2 text-sm font-semibold text-tinta">Gobierno de México</p>
                </div>

                <p className={parrafo}>
                  Este dato es un corte histórico, no el cierre anual. Para actualizarlo antes de entregar,
                  consulta el último informe disponible.
                </p>
                <p className={parrafo}>
                  <a
                    href="https://www.gob.mx/salud/documentos/panorama-epidemiologico-de-dengue-2026"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4"
                  >
                    Panorama Epidemiológico de Dengue 2026
                  </a>
                  {" "}— Fuente oficial para consultar cifras actualizadas.
                </p>

                <h4 className={h4}>Factores que favorecen su propagación</h4>
                <h5 className="mb-2 font-semibold text-tinta">Factores ambientales</h5>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Temperaturas elevadas</li>
                  <li>Lluvias intensas</li>
                  <li>Humedad ambiental</li>
                  <li>Almacenamiento de agua</li>
                  <li>Acumulación de recipientes</li>
                </ul>

                <h5 className="mb-2 font-semibold text-tinta">Factores sociales</h5>
                <ul className="mb-5 list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Urbanización desorganizada</li>
                  <li>Deficiencias en servicios de agua potable</li>
                  <li>Manejo inadecuado de residuos</li>
                  <li>Falta de educación sanitaria</li>
                  <li>Movilidad de la población</li>
                </ul>

                <h5 className="mb-2 font-semibold text-tinta">Factores biológicos</h5>
                <ul className="list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Presencia del mosquito vector</li>
                  <li>Circulación de diferentes serotipos</li>
                  <li>Personas susceptibles a la infección</li>
                  <li>Antecedentes de infección por otro serotipo</li>
                </ul>
              </div>
            ) : (
              <>
                <p className="mb-3.5 max-w-[640px] text-lg text-tinta">{LOREM_CORTO}</p>
                <p className={parrafo}>{LOREM}</p>

                <div className="my-6 max-w-[640px] rounded-r-2xl bg-pastel px-5 py-4 text-[0.94rem]">
                  <strong>Punto clave si quieres info aquí.</strong> {LOREM_CORTO}
                </div>

                <h4 className={h4}>Subtítulo de prueba</h4>
                <p className={parrafo}>{LOREM}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-suave marker:text-azul">
                  <li>Elemento de lista de prueba número uno.</li>
                  <li>Elemento de lista de prueba número dos.</li>
                  <li>Elemento de lista de prueba número tres.</li>
                </ul>

                <div className="my-8 grid h-52 place-items-center rounded-2xl border-[1.5px] border-dashed border-pastel2 text-sm text-azul">
                  IMG
                </div>

                <h4 className={h4}>Referencias de este subtema</h4>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-suave">
                  <li>
                    <a href="https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                      Organización Mundial de la Salud. Dengue y dengue grave.
                    </a>
                  </li>
                  <li>
                    <a href="https://pronamsalud.csg.gob.mx/pronam-dengue.pdf" target="_blank" rel="noreferrer" className="font-semibold text-azul2 underline decoration-pastel2 underline-offset-4">
                      Secretaría de Salud y Consejo de Salubridad General. PRONAM Dengue 2026.
                    </a>
                  </li>
                </ol>
              </>
            )}

          
          </div>
        </div>
      </article>
    </div>
  );
}

function Pie() {
  return (
    <footer className="border-t border-linea bg-white py-12">
      <div className={`${contenedor} flex flex-wrap justify-between gap-8`}>
        <div>
          <Marca />
          <p className="mt-2 max-w-md text-sm text-suave">
            Trabajo elaborado para la UA de Informática Médica · Licenciatura en Médico Cirujano.
          </p>
        </div>
        <p className="max-w-md text-sm text-suave">
          {SITIO.alumno} · {new Date().getFullYear()}
          <br />
          La información de este sitio tiene fines educativos y no sustituye la consulta médica.
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const leerHash = () => {
    const h = window.location.hash.replace("#", "");
    return todosLosSubtemas.some((t) => t.id === h) ? h : null;
  };
  const [activo, setActivo] = useState(leerHash);

  useEffect(() => {
    const alCambiar = () => setActivo(leerHash());
    window.addEventListener("hashchange", alCambiar);
    return () => window.removeEventListener("hashchange", alCambiar);
  }, []);

  const abrir = (id) => {
    setActivo(id);
    try { history.replaceState(null, "", "#" + id); } catch (e) {}
  };
  const cerrar = () => {
    setActivo(null);
    try { history.replaceState(null, "", window.location.pathname); } catch (e) {}
  };

  const subtema = todosLosSubtemas.find((t) => t.id === activo);

  return (
    <div className="min-h-screen bg-fondo font-sans leading-relaxed text-tinta antialiased">
      <Nav onAbrir={abrir} />
      <main>
        <Hero />
        <Seccion seccion={SECCIONES[0]} onAbrir={abrir} alt />
        <Seccion seccion={SECCIONES[1]} onAbrir={abrir} />
        <Referencias />
      </main>
      <Pie />
      {subtema && <Ventana subtema={subtema} onCerrar={cerrar} onAbrir={abrir} />}
    </div>
  );
}