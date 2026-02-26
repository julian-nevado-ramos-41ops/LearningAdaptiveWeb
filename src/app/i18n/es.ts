import { Translations } from './translations.type';

export const ES: Translations = {
    /* ── Nav ── */
    nav: [
        { label: 'NOMBRE', link: '#accordion' },
        { label: 'PAPERS', link: '#papers' },
        { label: 'KPIS', link: '#kpis' },
        { label: 'SOBRE NOSOTROS', link: '#horizontal-collapsible' },
        { label: 'PREMIOS', link: '#awards' },
        {
            label: 'EL GRUPO', children: [
                { label: 'SciTheWorld', link: 'https://scitheworld.com' },
                { label: 'Algorithmization', link: 'https://algorithmization.com' },
                { label: 'SystematicMe', link: 'https://systematicme.com' },
                { label: '41OPS', link: 'https://41ops.com' }
            ]
        },
        { label: 'CONTACTO', link: '#contact' }
    ],

    /* ── Hero ── */
    hero: {
        title: 'Oportunidades de inversión propietarias',
        subtitle: 'LEARNING~ADAPTIVE',
    },

    /* ── Part STW ── */
    partStw: {
        titleHtml: 'Parte de <u>SciTheWorld</u>',
        description: `<p>Somos un spin-off de inversión de SciTheWorld:</p>
<ol>
  <li>SciTheWorld fue creado para generar ciencia aplicada, tecnología propietaria y eficiencia extrema. Learning~Adaptive existe para invertir profesionalmente el capital generado por ese esfuerzo, siguiendo la misma disciplina que gobernó su creación.</li>
  <li>Es una inversión venture tech del Grupo: comenzando como family office y —una vez completamente demostrado con capital propio— abriéndose progresivamente a mandatos de terceros.</li>
</ol>`,
    },

    /* ── Accordion ── */
    accordion: {
        sectionTitle: 'EL NOMBRE',
        sectionSubtitle: `El nombre Learning~Adaptive no es simbólico. Es literal.\n`,
        cards: [
            {
                title: 'UNA CARRERA TEMPRANA',
                description: `Se refiere al trabajo pionero de Sergio Álvarez-Teleña en trading algorítmico, formalizado por primera vez en 2012 como libro "Trading 2.0: Learning~Adaptive Machines" —una obra que más tarde se convirtió en la base de su tesis doctoral en University College London (Ciencias de la Computación).\n\nLa tesis fue supervisada dentro de un entorno estrechamente vinculado a los estándares más exigentes de finanzas cuantitativas, incluyendo liderazgo vinculado a Renaissance Technologies —una firma admirada por su rigor y resultados.`,
            },
            {
                title: 'UNA TECNOLOGÍA PRIVILEGIADA',
                description: `El nombre refleja continuidad de pensamiento y un compromiso frío y disciplinado con alcanzar los más altos estándares —perseguido incansablemente desde 2012, obteniendo todo tipo de reconocimientos y premios desde entonces.`,
            }
        ],
    },

    /* ── KPIs ── */
    kpis: {
        title: 'KPIs',
        subtitle: 'UNA PROYECCIÓN COHERENTE PERO AMBICIOSA',
        items: [
            { value: '1 Billón+', description: '   invertido con nuestra tecnología   ' },
            { value: '2 semanas', description: '   tiempo promedio de puesta en producción   ' },
            { value: '2 días', description: '   el menor tiempo de puesta en producción   ' },
            { value: '2 horas', description: '   el tiempo objetivo de puesta en producción   ' },
            { value: '100+', description: '   servicios de formación y asesoramiento, a nivel mundial   ' },
            { value: '10+ horas', description: '   en prime time en televisión   ' },
            { value: '30%', description: '   reducción promedio de costes   ' },
            { value: '5 años', description: '   promedio de anticipación tecnológica   ' },
            { value: '38% y 84%', description: '   rendimientos mientras SciTheWorld se iniciaba sin financiación externa.   ' }
        ],
    },

    /* ── Papers ── */
    papers: {
        title: 'Papers',
        subtitle: 'En lugar de buscar patentes preferimos compartir nuestro conocimiento',
    },

    /* ── Horizontal Sections Structure ── */
    horizontalSectionsStructure: [
        { title: 'Una infraestructura de inversión única', subtitle: '' },
        { title: 'Una infraestructura de inversión única', subtitle: '' },
        { title: 'En una frase', subtitle: '' },
    ],

    /* ── Section quote (collapsible-3) ── */
    sectionQuote: '[ Learning~Adaptive es un vehículo de inversión construido sobre ciencia aplicada e infraestructura AI-native, diseñado para generar capitalización compuesta a largo plazo a través de eficiencia estructural y una creación continua de opcionalidad sobre SciTheWorld Group. ]',

    /* ── Collapsible Lists ── */
    collapsibleList1: [
        {
            title: '1. Mercados públicos — Alpha Dynamics',
            content: `Para los mercados líquidos, Learning~Adaptive se apoya en Alpha Dynamics, la plataforma de inversión nativa en IA de SciTheWorld. Alpha Dynamics abarca:
<ul>
  <li>construcción algorítmica de carteras,</li>
  <li>ejecución algorítmica,</li>
  <li>creación de mercado algorítmica (market making),</li>
  <li>y gestión de riesgos algorítmica,</li>
</ul>
tal y como se formaliza en la trilogía de papers de SciTheWorld sobre gestión moderna de inversiones.
Esto no son herramientas superpuestas a procesos heredados (legacy); es infraestructura de inversión diseñada desde los primeros principios algorítmicos.`,
        },
        {
            title: '2. Mercados privados — Fractal',
            content: `En los mercados privados, Learning~Adaptive va más allá de la asignación de capital.
Aprovechando Fractal, la tecnología corporativa de algoritmia integral (End-to-End) y nativa en IA de SciTheWorld, puede:
<ul>
  <li>impulsar activamente las empresas de la cartera,</li>
  <li>acelerar su transformación nativa en IA,</li>
  <li>y liberar sinergias entre las inversiones dentro de la cartera.</li>
</ul>
Las inversiones privadas no se tratan como posiciones aisladas, sino como componentes interactivos de un sistema.`,
        },
        {
            title: '3. La eficiencia extrema como ventaja estructural',
            content: `Learning~Adaptive hereda la cultura de eficiencia extrema de SciTheWorld:
<ul>
  <li>mínima carga administrativa humana (human overhead),</li>
  <li>operaciones nativas en IA,</li>
  <li>diseño centrado en la arquitectura (architecture-first).</li>
</ul>
Esto permite al vehículo:
<ul>
  <li>reinvertir continuamente en innovación,</li>
  <li>proteger los márgenes del fondo,</li>
  <li>y evitar la inflación de comisiones impulsada por el exceso operativo.</li>
</ul>
La eficiencia no es una táctica de costes; es una ventaja de inversión con efecto compuesto.`,
        },
        {
            title: '4. Arquitectura federada y protección de la propiedad intelectual (IP)',
            content: `La arquitectura federada del Grupo protege la propiedad intelectual frente a la dependencia individual y la rotación de personal, mitigando el clásico "riesgo de estrella" de los equipos de inversión.
El conocimiento se institucionaliza, no se vincula a las personas.
Esto permite la continuidad a largo plazo sin sacrificar la innovación.`,
        },
        {
            title: '5. Colaboración nativa por diseño',
            content: `Una de las consecuencias de estar construido sobre tecnología federada es que Learning~Adaptive está estructuralmente abierto a la colaboración:
<ul>
  <li>con universidades,</li>
  <li>gestores de activos,</li>
  <li>asociaciones sectoriales,</li>
  <li>y partners especializados.</li>
</ul>
El reparto de ingresos y el codesarrollo no son excepciones; son características nativas de la arquitectura.`,
        },
        {
            title: '6. Inteligencia global y prospectiva',
            content: `A través de SciTheWorld, Learning~Adaptive absorbe continuamente señales privilegiadas sobre:
<ul>
  <li>dónde avanza realmente la innovación,</li>
  <li>qué sectores están estructuralmente rezagados,</li>
  <li>y dónde se acumula el riesgo sistémico.</li>
</ul>
Esta perspectiva abarca empresas, sectores y naciones, no solo mercados.`,
        },
    ],

    collapsibleList2: [
        {
            title: '7. Máquinas Aumentadas en la inversión',
            content: `Learning~Adaptive aplica la tecnología de Máquinas Aumentadas:
una combinación disciplinada de señales generadas por máquinas y criterio humano.
Las máquinas optimizan la escala y la precisión.
Los humanos arbitran el contexto, el cambio de régimen y el riesgo.
Esto no es discrecional frente a sistemático; es cooperación estructurada.`,
        },
        {
            title: '8. Carteras a nivel de ecosistema',
            content: `Learning~Adaptive puede construir ecosistemas de empresas nativos en IA:
<ul>
  <li>En los mercados privados, las empresas de la cartera se interconectan para liberar sinergias operativas y estratégicas.</li>
  <li>En los mercados públicos, especialmente en empresas de pequeña capitalización (small caps), los consejos de administración y los directivos pueden recibir formación activa —a menudo en colaboración con SystematicMe— para mejorar la toma de decisiones basada en la innovación.</li>
</ul>
Capital, tecnología y gobernanza interactúan.`,
        },
        {
            title: '9. Agregación de modelos a escala',
            content: `Más allá de las estrategias avanzadas y competidas, Learning~Adaptive también puede explotar un amplio espacio de patrones de bajo riesgo y baja rentabilidad gracias a su capacidad para gestionar modelos de forma eficiente.
Al igual que el trading de alta frecuencia capitaliza pequeñas ventajas a través del volumen, Learning~Adaptive genera un efecto compuesto con múltiples modelos modestos y robustos: un terreno inexplorado al que solo se puede acceder mediante una eficiencia operativa extrema.`,
        },
        {
            title: '10. Colaboración abierta y reparto de ingresos',
            content: `El vehículo puede colaborar con:
<ul>
  <li>gestores externos,</li>
  <li>grupos de investigación,</li>
  <li>partners de la industria,</li>
</ul>
compartiendo ingresos cuando proceda.
Esta flexibilidad es una consecuencia directa de su diseño centrado en la arquitectura.`,
        },
        {
            title: '11. Flujo estratégico procedente de tesorerías algorítmicas',
            content: `A medida que las empresas adoptan la Algoritmización a través de SciTheWorld, los flujos de tesorería algorítmica emergen de forma natural de diversas industrias, creando oportunidades de inversión alineadas y de alta calidad para Learning~Adaptive.`,
        },
        {
            title: '12. ... Y muchos más',
            content: `Derivados de la participación en un Grupo estructurado para actuar como un activo generador de oportunidades a largo plazo.`,
        },
    ],

    /* ── Awards ── */
    awards: {
        title: 'Simplemente Hacemos Nuestro Trabajo...',
        subtitle: '*PERO A VECES NOS DAN PREMIOS POR ELLO',
        items: [
            { name: 'Banking Tech Awards: Mejor Líder Tecnológico', category: 'Finalista', project: 'Nuestra visión prospectiva', year: '2025' },
            { name: 'Finovate: Innovador del Año', category: 'Finalista', project: 'Nuestro trabajo pionero en Agentic AI', year: '2025' },
            { name: 'Banking Tech Awards: Mejor Tech del Futuro: IA y Datos', category: 'Ganador', project: 'Nuestra Plataforma Fractal', year: '2024' },
            { name: 'CogX: Mejor Innovación en Simulación', category: 'Ganador', project: 'Núcleo de nuestra Simulación VR', year: '2020' },
            { name: 'Banking Tech Awards: Mejor Plataforma de Trading', category: 'Ganador', project: 'Tesis Doctoral de Sergio (UCL) en BBVA', year: '2017' }
        ],
    },

    /* ── Footer ── */
    footer: {
        isoText: 'Miembros de ambos grupos: IA y Web3 & Metaverso',
        copyright: 'SciTheWorld. Todos los derechos reservados.',
    },

    /* ── Contact Us ── */
    contactUs: {
        title: 'CONTÁCTANOS',
    },

    /* ── Cookie Banner ── */
    cookieBanner: {
        text: 'Utilizamos cookies para mejorar tu experiencia. Al continuar visitando este sitio, aceptas el uso de cookies.',
        accept: 'Aceptar',
    },

    /* ── Modal ── */
    modal: {
        copyPromptLabel: 'Primero, copia el prompt:',
        copyButton: 'Copiar prompt',
        copiedButton: '¡Copiado!',
        llmLabel: 'Después, comprueba en los diferentes LLMs:',
    },
};
