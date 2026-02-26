export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["es", "en"];

const translations = {
  es: {
    header: {
      schoolOfManagement: "Escuela de Administración",
      schoolSubtitle:
        "Servir a la sociedad y contribuir al bien común formando profesionales",
      navInicio: "Inicio",
      navExplorar: "Explorar",
      openSearch: "Abrir buscador",
      selectLanguage: "Seleccionar idioma",
      spanish: "Español",
      english: "English",
      hubLink: "MBA UC / HUB",
      myProfile: "Mi perfil",
      agenda: "Agenda",
      admin: "Admin",
      signOut: "Cerrar sesión",
      joinHub: "Unirme al Hub",
      escAdministracion: "Esc. Administración",
      search: "Buscar",
      searchPlaceholder: "Buscar en el sitio…",
      go: "Ir",
    },
    footer: {
      universityName: "Pontificia Universidad Católica de Chile",
      schoolMba: "Escuela de Administración – MBA UC",
      followUs: "Síguenos en:",
      centralDesk: "MESA CENTRAL",
      centralDeskDesc:
        "Teléfono para comunicarse con las distintas áreas de la Universidad.",
      emergencies: "EMERGENCIAS UC",
      emergenciesDesc:
        "Teléfono en caso de accidente o situación que ponga en riesgo tu vida dentro de algún campus.",
      emergenciesLink: "Ir al sitio de Emergencias",
      discrimination: "DISCRIMINACIÓN Y VIOLENCIA",
      discriminationDesc:
        "Orientación y apoyo en casos de discriminación, violencia de género o violencia sexual.",
      contactSupport: "Contacto para apoyo",
      moreInfo: "Más orientación",
      mediation: "MEDIACIÓN UNIVERSITARIA",
      mediationDesc:
        "Teléfonos para orientación y consejo si se ha vulnerado alguno de tus derechos en la universidad.",
      ombudsLink: "Ir a la Oficina de Ombuds UC",
    },
    landing: {
      heroTitle: "Conecta experiencia ejecutiva con emprendimiento con impacto",
      heroSubtitle:
        "El espacio del MBA UC que articula trayectoria empresarial e innovación para que despegues tu siguiente paso.",
      exclusiveBadge: "Exclusivo MBA UC",
      targetAudienceText:
        "El Hub está dirigido a alumnos y exalumnos del MBA UC que quieren activar innovación y emprendimiento con impacto.",
      ctaJoin: "Unirme al Hub",
      ctaWhatsApp: "Unirse al grupo de WhatsApp",
      whatsappTooltip: "Únete al grupo del HUB",
      ctaExploreExperts: "Explorar expertos",
      ctaSecondary: "Ver expertos",
      ecosystemBadge: "Ecosistema MBA UC",
      ecosystemTitle: "Un ecosistema que potencia tu transición",
      ecosystemDesc:
        "Accede a mentores de industria, agenda sesiones one-on-one y conecta con una red de ejecutivos y emprendedores MBA UC.",
      cardExperts: "Red de expertos",
      cardExpertsText:
        "Mentores con experiencia en retail, minería, fintech, salud, energía y más.",
      cardSessions: "Sesiones a tu medida",
      cardSessionsText:
        "Agenda reuniones con expertos según tu objetivo: mentoría, inversión o cofounder.",
      cardResources: "Recursos y eventos",
      cardResourcesText:
        "Workshops, guías y eventos para acelerar tu proyecto o carrera.",
      profilesTitle: "El Hub es para",
      profile1Title: "Quiero emprender desde cero",
      profile1Desc:
        "Tengo una idea en etapa inicial y necesito guía para validarla y convertirla en un proyecto real.",
      profile2Title: "Ya estoy emprendiendo y quiero escalar",
      profile2Desc:
        "Tengo tracción o un negocio en marcha y busco herramientas, mentoría y red para crecer.",
      profile3Title: "Trabajo (o quiero involucrarme) en innovación",
      profile3Desc:
        "Estoy dentro de una organización y quiero impulsar innovación, intraemprendimiento y nuevos negocios.",
      profile4Title: "Quiero un cambio de carrera para emprender",
      profile4Desc:
        "Estoy en transición y quiero diseñar mi próximo paso para salir del mundo corporativo y emprender.",
      benefitsTitle: "¿Qué significa ser parte del Hub?",
      benefitsSubtitle: "Beneficios concretos para transformar ideas en acción.",
      benefit1: "Acceso a mentoría con expertos y founders.",
      benefit2:
        "Red activa de alumnos y exalumnos MBA UC para conectar y colaborar.",
      benefit3:
        "Validación y feedback para tu idea o negocio (pitch, hipótesis, tracción).",
      benefit4:
        "Espacios prácticos: sesiones, talleres y actividades para pasar de idea a acción.",
      benefitsCtaText: "Conecta con la red MBA UC y da el siguiente paso.",
      forWhoTitle: "Para quién es el Hub",
      forWhoSubtitle: "Diseñado para quienes buscan dar el siguiente paso con impacto.",
      innovator: "Innovador corporativo",
      innovatorDesc:
        "Lideras o quieres impulsar innovación dentro de tu empresa y buscas metodologías y conexiones.",
      entrepreneur: "Emprendedor en transición",
      entrepreneurDesc:
        "Estás dando el salto de lo corporativo al emprendimiento y necesitas mentoría y red.",
      founder: "Founder senior",
      founderDesc:
        "Ya tienes un proyecto en marcha y buscas escalar, inversión o socios estratégicos.",
      howItWorksTitle: "Cómo funciona",
      howItWorksSubtitle: "Tres pasos para conectar con la red y acelerar tu camino.",
      step1Title: "Únete",
      step1Text: "Regístrate con tu cuenta Google y completa tu perfil.",
      step2Title: "Explora",
      step2Text: "Revisa expertos, eventos y recursos según tu objetivo.",
      step3Title: "Conecta",
      step3Text: "Agenda sesiones con expertos y participa en actividades.",
      expertsTitle: "Expertos del Hub",
      expertsBadge: "Red MBA UC",
      seeAllExperts: "Ver todos los expertos",
      eventsTitle: "Próximos eventos",
      eventsBadge: "Agenda",
      seeMore: "Ver más",
      useCasesTitle: "Casos de uso",
      useCasesSubtitle: "Lo que puedes hacer desde el primer día en el Hub.",
      useCases: [
        "Agenda una sesión con un experto para validar tu modelo de negocio.",
        "Encuentra un cofundador o socio complementario en la red de participantes.",
        "Accede a recursos y guías para tu pitch o búsqueda de inversión.",
        "Participa en eventos y workshops para seguir aprendiendo.",
      ],
      ctaFinalTitle: "¿Listo para sumarte?",
      ctaFinalDesc:
        "Únete al HUB Innovación y Emprendimiento y conecta con la red MBA UC.",
    },
    ctaStrip: {
      title: "¡Súmate al HUB Innovación y Emprendimiento!",
      joinHub: "Unirme al Hub",
      exploreExperts: "Explorar expertos",
    },
  },
  en: {
    header: {
      schoolOfManagement: "School of Management",
      schoolSubtitle:
        "Serving society and contributing to the common good by training professionals",
      navInicio: "Home",
      navExplorar: "Explore",
      openSearch: "Open search",
      selectLanguage: "Select language",
      spanish: "Español",
      english: "English",
      hubLink: "MBA UC / HUB",
      myProfile: "My profile",
      agenda: "Agenda",
      admin: "Admin",
      signOut: "Sign out",
      joinHub: "Join the Hub",
      escAdministracion: "School of Mgmt",
      search: "Search",
      searchPlaceholder: "Search the site…",
      go: "Go",
    },
    footer: {
      universityName: "Pontificia Universidad Católica de Chile",
      schoolMba: "School of Management – MBA UC",
      followUs: "Follow us:",
      centralDesk: "MAIN DESK",
      centralDeskDesc:
        "Phone number to contact the different areas of the University.",
      emergencies: "UC EMERGENCIES",
      emergenciesDesc:
        "Phone number in case of accident or situation that puts your life at risk on any campus.",
      emergenciesLink: "Go to Emergencies site",
      discrimination: "DISCRIMINATION AND VIOLENCE",
      discriminationDesc:
        "Guidance and support in cases of discrimination, gender-based violence or sexual violence.",
      contactSupport: "Contact for support",
      moreInfo: "More information",
      mediation: "UNIVERSITY MEDIATION",
      mediationDesc:
        "Phone numbers for guidance and advice if your rights have been violated at the university.",
      ombudsLink: "Go to Ombuds Office UC",
    },
    landing: {
      heroTitle: "Connect executive experience with entrepreneurship and impact",
      heroSubtitle:
        "The MBA UC space that connects business trajectory and innovation so you can take your next step.",
      exclusiveBadge: "Exclusive MBA UC",
      targetAudienceText:
        "The Hub is for current and former MBA UC students who want to activate innovation and entrepreneurship with impact.",
      ctaJoin: "Join the Hub",
      ctaWhatsApp: "Join the WhatsApp group",
      whatsappTooltip: "Join the HUB group",
      ctaExploreExperts: "Explore experts",
      ctaSecondary: "See experts",
      ecosystemBadge: "MBA UC Ecosystem",
      ecosystemTitle: "An ecosystem that powers your transition",
      ecosystemDesc:
        "Access industry mentors, schedule one-on-one sessions, and connect with a network of MBA UC executives and entrepreneurs.",
      cardExperts: "Expert network",
      cardExpertsText:
        "Mentors with experience in retail, mining, fintech, health, energy and more.",
      cardSessions: "Sessions tailored to you",
      cardSessionsText:
        "Schedule meetings with experts according to your goal: mentoring, investment or cofounder.",
      cardResources: "Resources and events",
      cardResourcesText:
        "Workshops, guides and events to accelerate your project or career.",
      profilesTitle: "The Hub is for",
      profile1Title: "Want to start a venture from scratch",
      profile1Desc:
        "I have an early-stage idea and need guidance to validate it and turn it into a real project.",
      profile2Title: "Are already building and want to scale",
      profile2Desc:
        "I have traction or a business running and I'm looking for tools, mentoring and network to grow.",
      profile3Title: "Work (or want to get involved) in innovation",
      profile3Desc:
        "I'm inside an organization and want to drive innovation, intrapreneurship and new ventures.",
      profile4Title: "Want a career shift into entrepreneurship",
      profile4Desc:
        "I'm in transition and want to design my next step to move from the corporate world into entrepreneurship.",
      benefitsTitle: "What does it mean to be part of the Hub?",
      benefitsSubtitle: "Concrete benefits to turn ideas into action.",
      benefit1: "Access to mentoring with experts and founders.",
      benefit2:
        "Active network of MBA UC students and alumni to connect and collaborate.",
      benefit3:
        "Validation and feedback for your idea or business (pitch, hypothesis, traction).",
      benefit4:
        "Hands-on spaces: sessions, workshops and activities to go from idea to action.",
      benefitsCtaText: "Connect with the MBA UC network and take the next step.",
      forWhoTitle: "Who is the Hub for",
      forWhoSubtitle: "Designed for those looking to take the next step with impact.",
      innovator: "Corporate innovator",
      innovatorDesc:
        "You lead or want to drive innovation within your company and are looking for methodologies and connections.",
      entrepreneur: "Entrepreneur in transition",
      entrepreneurDesc:
        "You're making the leap from corporate to entrepreneurship and need mentoring and network.",
      founder: "Senior founder",
      founderDesc:
        "You already have a project underway and are looking to scale, investment or strategic partners.",
      howItWorksTitle: "How it works",
      howItWorksSubtitle: "Three steps to connect with the network and accelerate your path.",
      step1Title: "Join",
      step1Text: "Sign up with your Google account and complete your profile.",
      step2Title: "Explore",
      step2Text: "Browse experts, events and resources according to your goals.",
      step3Title: "Connect",
      step3Text: "Schedule sessions with experts and take part in activities.",
      expertsTitle: "Hub experts",
      expertsBadge: "MBA UC Network",
      seeAllExperts: "See all experts",
      eventsTitle: "Upcoming events",
      eventsBadge: "Agenda",
      seeMore: "See more",
      useCasesTitle: "Use cases",
      useCasesSubtitle: "What you can do from day one on the Hub.",
      useCases: [
        "Schedule a session with an expert to validate your business model.",
        "Find a cofounder or complementary partner in the participant network.",
        "Access resources and guides for your pitch or fundraising.",
        "Join events and workshops to keep learning.",
      ],
      ctaFinalTitle: "Ready to join?",
      ctaFinalDesc:
        "Join the Innovation and Entrepreneurship HUB and connect with the MBA UC network.",
    },
    ctaStrip: {
      title: "Join the Innovation and Entrepreneurship HUB!",
      joinHub: "Join the Hub",
      exploreExperts: "Explore experts",
    },
  },
};

export type Translations = (typeof translations)["es"];

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.es;
}

export type FooterColumnItem = { tipo: "tel" | "link"; label: string; href: string };

export function getFooterColumns(locale: Locale): {
  titulo: string;
  descripcion: string;
  items: FooterColumnItem[];
}[] {
  const t = getTranslations(locale).footer;
  return [
    {
      titulo: t.centralDesk,
      descripcion: t.centralDeskDesc,
      items: [{ tipo: "tel" as const, label: "+56 95504 4000", href: "tel:+56955044000" }],
    },
    {
      titulo: t.emergencies,
      descripcion: t.emergenciesDesc,
      items: [
        { tipo: "tel" as const, label: "+56 95504 5000", href: "tel:+56955045000" },
        { tipo: "link" as const, label: t.emergenciesLink, href: "https://infraestructura.uc.cl/seguridad" },
      ],
    },
    {
      titulo: t.discrimination,
      descripcion: t.discriminationDesc,
      items: [
        { tipo: "link" as const, label: t.contactSupport, href: "https://noviolenciaydiscriminacion.uc.cl/contacto/contactos-de-emergencia-y-denuncia/" },
        { tipo: "link" as const, label: t.moreInfo, href: "https://noviolenciaydiscriminacion.uc.cl/" },
      ],
    },
    {
      titulo: t.mediation,
      descripcion: t.mediationDesc,
      items: [
        { tipo: "tel" as const, label: "+56 95504 1691", href: "tel:+56955041691" },
        { tipo: "tel" as const, label: "+56 95504 1247", href: "tel:+56955041247" },
        { tipo: "link" as const, label: t.ombudsLink, href: "https://ombuds.uc.cl/" },
      ],
    },
  ];
}
