import { useState, useEffect } from "react";

const SITIO = {
  tema: "Lorem Ipsum",
  alumno: "Nombre completo del alumno",
  descripcion:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
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
      "Información clara y accesible para comprender, prevenir y convivir con el padecimiento. Texto de prueba.",
    subtemas: [
      { id: "que-es", titulo: "¿Qué es?", icono: "◌" },
      { id: "factores-riesgo", titulo: "Factores de riesgo", icono: "◍" },
      { id: "sintomas", titulo: "Síntomas y señales de alarma", icono: "◎" },
      { id: "prevencion", titulo: "Prevención y estilo de vida", icono: "◐" },
      { id: "mitos", titulo: "Mitos y realidades", icono: "◑" },
    ],
  },
  {
    id: "personal",
    corto: "Personal de salud",
    etiqueta: "Sección 02",
    titulo: "Personal de salud",
    resumen:
      "Contenido técnico basado en evidencia, normas oficiales y guías de práctica clínica. Texto de prueba.",
    subtemas: [
      { id: "epidemiologia", titulo: "Epidemiología", icono: "◇" },
      { id: "fisiopatologia", titulo: "Fisiopatología", icono: "◈" },
      { id: "diagnostico", titulo: "Diagnóstico y criterios", icono: "◆" },
      { id: "tratamiento", titulo: "Tratamiento", icono: "◊" },
      { id: "normatividad", titulo: "NOM y Guías de Práctica Clínica", icono: "▢" },
    ],
  },
];

const REFERENCIAS = [
  { tipo: "Artículo · PubMed", texto: "Apellido A, Apellido B. Título del artículo de prueba. Nombre de la revista. 2024;00(0):000-000. doi:00.0000/xxxx" },
  { tipo: "Artículo · NCBI", texto: "Apellido C, et al. Título del artículo de prueba. Nombre de la revista. 2023;00:000-000. PMID: 00000000" },
  { tipo: "Norma Oficial Mexicana", texto: "NOM-000-SSA0-0000. Título de la norma oficial de prueba. Diario Oficial de la Federación; 0000." },
  { tipo: "Guía de Práctica Clínica", texto: "Guía de Práctica Clínica: título de prueba. México: Secretaría de Salud / CENETEC; 0000." },
  { tipo: "Libro", texto: "Apellido D. Título del libro de prueba. 00.ª ed. Ciudad: Editorial; 0000." },
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
            <em className="block text-azul2">información que cuida.</em>
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
              <span className="flex-1 text-sm text-suave">{LOREM_CORTO}</span>
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
              <span className="text-[0.95rem] text-suave">{r.texto}</span>
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
            <p className="mb-3.5 max-w-[640px] text-lg text-tinta">{LOREM_CORTO}</p>
            <p className={parrafo}>{LOREM}</p>

            <div className="my-6 max-w-[640px] rounded-r-2xl  bg-pastel px-5 py-4 text-[0.94rem]">
              <strong>Punto clave si quieres info aqui.</strong> {LOREM_CORTO}
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
              <li>Apellido A, et al. Título del artículo de prueba. Revista. 2024;0:000. doi:00.0000/xxxx</li>
              <li>NOM-000-SSA0-0000. Título de la norma de prueba. DOF; 0000.</li>
            </ol>

          
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