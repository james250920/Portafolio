import { ref } from 'vue';

export type Lang = 'es' | 'en';

const currentLang = ref<Lang>('es');

const translations: Record<string, Record<Lang, string>> = {
  // ===================== NAV =====================
  'nav.home': { es: 'home', en: 'home' },
  'nav.about': { es: 'Sobre mí', en: 'About me' },
  'nav.projects': { es: 'proyectos', en: 'projects' },
  'nav.education': { es: 'educación', en: 'education' },
  'nav.contact': { es: 'contacto', en: 'contact' },

  // ===================== HERO / HOME =====================
  'hero.status': { es: 'Listo para nuevos desafíos', en: 'Ready for new challenges' },
  'hero.contact': { es: 'Contactar', en: 'Contact' },
  'hero.title': { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
  'hero.top': { es: 'Inicio', en: 'Top' },

  // ===================== ABOUT =====================
  'about.title': { es: 'About.me', en: 'About.me' },
  'about.subtitle': {
    es: 'Full Stack Software Engineer especializado en Angular, .NET y FastAPI, con experiencia en desarrollo web y mobile, despliegues cloud en AWS y Azure, testing automatizado y arquitectura orientada a escalabilidad y calidad.',
    en: 'Full Stack Software Engineer specialized in Angular, .NET, and FastAPI, with experience in web and mobile development, cloud deployments on AWS and Azure, automated testing, and architecture focused on scalability and quality.',
  },
  'about.bio': {
    es: 'Full Stack Software Engineer con más de {n}+ años de experiencia en el desarrollo de software y cloud.',
    en: 'Full Stack Software Engineer with {n}+ years of software development and cloud experience.',
  },
  'about.years': { es: 'Años', en: 'Years' },
  'about.projects': { es: 'Proyectos', en: 'Projects' },
  'about.currentFocus1': {
    es: 'Desarrollo de aplicaciones web y móviles',
    en: 'Web and mobile application development',
  },
  'about.currentFocus2': {
    es: 'Aprendiendo tecnologías de vanguardia',
    en: 'Learning cutting-edge technologies',
  },
  'about.currentFocus3': {
    es: 'Mejorando habilidades en QA y seguridad',
    en: 'Improving QA and security skills',
  },
  'about.expTitle': { es: 'Experiencia Profesional', en: 'Professional Experience' },
  'about.ctaTitle': {
    es: 'Construyamos Algo Increíble Juntos',
    en: "Let's Build Something Amazing Together",
  },
  'about.ctaContact': { es: 'Contáctame', en: 'Contact Me' },
  'about.ctaProjects': { es: 'Ver Proyectos', en: 'View Projects' },

  // About - Career Timeline
  'about.timeline.2018': {
    es: 'Inició mi viaje en la programación',
    en: 'Started my programming journey',
  },
  'about.timeline.2019': {
    es: 'Exploré desarrollo web básico',
    en: 'Explored basic web development',
  },
  'about.timeline.2021': { es: 'Inicio de carrera universitaria', en: 'Started university career' },
  'about.timeline.2022': {
    es: 'Aprendí sobre desarrollo web',
    en: 'Learned about web development',
  },
  'about.timeline.2023': {
    es: 'Aprendí sobre desarrollo móvil',
    en: 'Learned about mobile development',
  },
  'about.timeline.2024': {
    es: 'Desarrollador Full-Stack en prácticas',
    en: 'Full-Stack Developer Intern',
  },
  'about.timeline.2025': {
    es: 'Actualización de habilidades y conocimientos',
    en: 'Upgrading skills and knowledge',
  },
  'about.timeline.2026': { es: 'En proceso...', en: 'In progress...' },

  // About - Experiences
  'about.exp1.title': { es: 'Desarrollador Web - Prácticas', en: 'Web Developer - Internship' },
  'about.exp1.company': { es: 'Corporación Evly', en: 'Corporación Evly' },
  'about.exp1.period': { es: '2024 - 2025 (1 año)', en: '2024 - 2025 (1 year)' },
  'about.exp1.desc': {
    es: 'Implementé funcionalidades backend en .NET Core y PostgreSQL para aplicaciones internas y para la Municipalidad de Comas. Desarrollé componentes frontend con Angular, integrando diseños UX/UI y consumiendo APIs REST. Gestioné control de versiones con Git.',
    en: 'Implemented backend features in .NET Core and PostgreSQL for internal applications and for the Municipality of Comas. Developed frontend components with Angular, integrating UX/UI designs and consuming REST APIs. Managed version control with Git.',
  },
  'about.exp2.title': {
    es: 'Área de Arquitectura TI - Prácticas',
    en: 'IT Architecture Area - Internship',
  },
  'about.exp2.company': { es: 'Aenza', en: 'Aenza' },
  'about.exp2.period': { es: '2025 - 2025 (3 meses)', en: '2025 - 2025 (3 months)' },
  'about.exp2.desc': {
    es: 'Recopilé y documenté información de los sistemas de la organización para facilitar la gobernanza de TI. Apoyé en la implementación de la metodología TIME para estandarizar procesos y mejorar la eficiencia operativa. Realicé validación de datos y análisis para la toma de decisiones técnicas.',
    en: 'Collected and documented organizational system information to support IT governance. Assisted in implementing the TIME methodology to standardize processes and improve operational efficiency. Performed data validation and analysis for technical decision-making.',
  },
  'about.exp3.title': { es: 'Operador Informático - Voluntariado', en: 'IT Operator - Volunteer' },
  'about.exp3.company': { es: 'Pronabec', en: 'Pronabec' },
  'about.exp3.period': { es: '2024 - 2024', en: '2024 - 2024' },
  'about.exp3.desc': {
    es: 'Examen Nacional de Preselección del concurso Beca de Excelencia Académica para Hijos de Docentes, convocatoria 2024.',
    en: "National Pre-selection Exam for the Academic Excellence Scholarship for Teachers' Children, 2024 call.",
  },

  // ===================== PROJECTS =====================
  'projects.title': { es: 'Proyectos.portafolio', en: 'Projects.portfolio' },
  'projects.subtitle': { es: 'Una muestra de mis trabajos.', en: 'A showcase of my work.' },
  'projects.filterPlaceholder': { es: 'Filtrar por tecnología', en: 'Filter by technology' },
  'projects.viewDetails': { es: 'Ver Detalles', en: 'View Details' },
  'projects.liveDemo': { es: 'Demo en Vivo', en: 'Live Demo' },
  'projects.sourceCode': { es: 'Código Fuente', en: 'Source Code' },
  'projects.loadMore': { es: 'Cargar Más Proyectos', en: 'Load More Projects' },
  'projects.cat.all': { es: 'Todos', en: 'All' },
  'projects.cat.web': { es: 'Web', en: 'Web' },
  'projects.cat.mobile': { es: 'Móvil', en: 'Mobile' },
  'projects.cat.apis': { es: 'APIs', en: 'APIs' },
  'projects.cat.tools': { es: 'Herramientas', en: 'Tools' },
  'projects.p1.title': {
    es: 'Plataforma E-Commerce WEb | Mobile',
    en: 'E-Commerce Platform Web | Mobile',
  },
  'projects.p1.desc': {
    es: 'Solución de comercio electrónico full-stack con características avanzadas e interfaz moderna.',
    en: 'Full-stack e-commerce solution with advanced features and modern interface.',
  },
  'projects.p1.fullDesc': {
    es: 'Una plataforma de comercio electrónico integral construida con tecnologías modernas. Las características incluyen autenticación de usuarios, catálogo de productos, carrito de compras, integración de pagos, gestión de pedidos y panel de administración.',
    en: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product catalog, shopping cart, payment integration, order management, and admin panel.',
  },
  'projects.p1.f1': {
    es: 'Autenticación y autorización de usuarios',
    en: 'User authentication and authorization',
  },
  'projects.p1.f2': {
    es: 'Catálogo de productos con búsqueda y filtros',
    en: 'Product catalog with search and filters',
  },
  'projects.p1.f3': {
    es: 'Carrito de compras y proceso de pago',
    en: 'Shopping cart and checkout process',
  },
  'projects.p1.f4': { es: 'Integración de pagos con Stripe', en: 'Stripe payment integration' },
  'projects.p1.f5': { es: 'Sistema de gestión de pedidos', en: 'Order management system' },
  'projects.p1.f6': {
    es: 'Panel de administración para gestión de inventario',
    en: 'Admin panel for inventory management',
  },
  'projects.p2.desc': {
    es: 'Herramienta de gestio educativo para estudiantes universitarios.',
    en: 'Educational management tool for university students.',
  },
  'projects.p3.desc': {
    es: 'Aplicación móvil para organización de herramientas y recursos de estudio.',
    en: 'Mobile app for organizing study tools and resources.',
  },
  'projects.p4.desc': {
    es: 'Aplicación móvil para el seguimiento de denuncias ciudadanas.',
    en: 'Mobile app for tracking citizen reports.',
  },
  'projects.p5.desc': {
    es: 'Aplicación web educativa para aprendizaje interactivo.',
    en: 'Educational web app for interactive learning.',
  },

  // ===================== EDUCATION =====================
  'education.title': { es: 'Education.academic', en: 'Education.academic' },
  'education.subtitle': {
    es: 'Mi trayectoria académica y certificaciones profesionales.',
    en: 'My academic journey and professional certifications.',
  },
  'education.certifications': { es: 'Certificaciones', en: 'Certifications' },
  'education.achievements': { es: 'Logros destacados:', en: 'Key achievements:' },
  'education.verifyCert': { es: 'Verificar Certificado', en: 'Verify Certificate' },
  'education.coursesTitle': {
    es: 'Cursos y Formación Continua',
    en: 'Courses & Continuous Learning',
  },
  'education.courses': { es: 'cursos', en: 'courses' },
  'education.edu1.degree': {
    es: 'Ingeniería de Tecnologías de Información y Sistemas',
    en: 'Information Technology and Systems Engineering',
  },
  'education.edu1.institution': { es: 'Universidad ESAN', en: 'ESAN University' },
  'education.edu1.period': { es: 'Mar 2021 - Presente', en: 'Mar 2021 - Present' },
  'education.edu1.status': { es: 'en-curso', en: 'in-progress' },
  'education.edu1.desc': {
    es: 'Formación integral en desarrollo de software, arquitectura de sistemas, bases de datos, y gestión de proyectos tecnológicos. Enfoque en desarrollo web, móvil y aseguramiento de calidad con énfasis en innovación tecnológica.',
    en: 'Comprehensive training in software development, system architecture, databases, and technology project management. Focus on web/mobile development and quality assurance with emphasis on technological innovation.',
  },
  'education.edu1.a1': {
    es: 'Desarrollo de aplicaciones full-stack con tecnologías modernas',
    en: 'Full-stack application development with modern technologies',
  },
  'education.edu1.a2': {
    es: 'Implementación de metodologías ágiles en proyectos académicos',
    en: 'Implementation of agile methodologies in academic projects',
  },
  'education.edu1.a3': {
    es: 'Participación en proyectos de desarrollo de software empresarial',
    en: 'Participation in enterprise software development projects',
  },
  'education.edu2.degree': { es: 'AWS Cloud Developing', en: 'AWS Cloud Developing' },
  'education.edu2.institution': { es: 'AWS Academy', en: 'AWS Academy' },
  'education.edu2.period': { es: 'Sep 2025 - Nov 2025', en: 'Sep 2025 - Nov 2025' },
  'education.edu2.desc': {
    es: 'Formación especializada en servicios de computación en la nube de Amazon Web Services. Aprendizaje de arquitecturas cloud, implementación de servicios y mejores prácticas en desarrollo cloud-native.',
    en: 'Specialized training in Amazon Web Services cloud computing. Cloud architecture learning, service implementation and best practices in cloud-native development.',
  },
  'education.edu2.a1': {
    es: 'Dominio de servicios principales de AWS (EC2, S3, Lambda, RDS)',
    en: 'Mastery of core AWS services (EC2, S3, Lambda, RDS)',
  },
  'education.edu2.a2': {
    es: 'Implementación de arquitecturas escalables en la nube',
    en: 'Implementation of scalable cloud architectures',
  },
  'education.edu2.a3': {
    es: 'Gestión de bases de datos y almacenamiento en AWS',
    en: 'AWS database and storage management',
  },
  'education.edu2.a4': {
    es: 'Desarrollo de aplicaciones serverless',
    en: 'Serverless application development',
  },
  'education.cert.awsDev': { es: 'En preparación', en: 'In preparation' },
  'education.cert.dataAnalysis': {
    es: 'Análisis de Datos con Excel',
    en: 'Data Analysis with Excel',
  },
  'education.cert.sqlServer': { es: 'Actualización SQL Server 2022', en: 'SQL Server 2022 Update' },
  'education.courseCat.webDev': { es: 'Desarrollo Web', en: 'Web Development' },

  // ===================== CONTACT =====================
  'contact.title': { es: 'Contact.exe', en: 'Contact.exe' },
  'contact.subtitle': {
    es: '¿Listo para colaborar? Construyamos algo increíble juntos.',
    en: "Ready to collaborate? Let's build something amazing together.",
  },
  'contact.send': { es: 'Enviar Mensaje', en: 'Send Message' },
  'contact.name': { es: 'Nombre', en: 'Name' },
  'contact.email': { es: 'Email', en: 'Email' },
  'contact.subject': { es: 'Asunto', en: 'Subject' },
  'contact.message': { es: 'Mensaje', en: 'Message' },
  'contact.namePlaceholder': { es: 'Tu nombre', en: 'Your name' },
  'contact.emailPlaceholder': { es: 'tu.email@ejemplo.com', en: 'your.email@example.com' },
  'contact.subjectPlaceholder': { es: 'Selecciona un asunto', en: 'Select a subject' },
  'contact.messagePlaceholder': {
    es: 'Cuéntame sobre tu proyecto...',
    en: 'Tell me about your project...',
  },
  'contact.available': { es: 'DISPONIBLE', en: 'AVAILABLE' },
  'contact.location': { es: 'Disponible', en: 'Available' },
  'contact.readyProjects': { es: 'Nuevos proyectos', en: 'New projects' },
  'contact.openOpportunities': { es: 'Abierto a Oportunidades', en: 'Open to Opportunities' },

  'contact.nameRequired': { es: 'El nombre es requerido', en: 'Name is required' },
  'contact.emailRequired': { es: 'El email es requerido', en: 'Email is required' },
  'contact.emailInvalid': { es: 'El email debe ser válido', en: 'Email must be valid' },
  'contact.subjectRequired': { es: 'Debes seleccionar un asunto', en: 'You must select a subject' },
  'contact.messageRequired': { es: 'El mensaje es requerido', en: 'Message is required' },
  'contact.respectful': {
    es: 'Por favor, mantén un lenguaje respetuoso y profesional',
    en: 'Please keep a respectful and professional language',
  },
  'contact.sending': { es: 'Enviando mensaje...', en: 'Sending message...' },
  'contact.success': { es: '¡Mensaje enviado exitosamente!', en: 'Message sent successfully!' },
  'contact.successCaption': { es: 'Te responderé pronto.', en: 'I will reply soon.' },
  'contact.error': { es: 'Error al enviar el mensaje', en: 'Error sending message' },
  'contact.errorCaption': {
    es: 'Por favor, intenta de nuevo más tarde.',
    en: 'Please try again later.',
  },
  'contact.opt.collaboration': { es: 'Colaboración en Proyecto', en: 'Project Collaboration' },
  'contact.opt.job': { es: 'Oportunidad Laboral', en: 'Job Opportunity' },
  'contact.opt.freelance': { es: 'Trabajo Freelance', en: 'Freelance Work' },
};

export function useLanguage() {
  const t = (key: string, params?: Record<string, string | number>): string => {
    let result = translations[key]?.[currentLang.value] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, String(v));
      });
    }
    return result;
  };

  const toggleLang = () => {
    currentLang.value = currentLang.value === 'es' ? 'en' : 'es';
  };

  return { currentLang, t, toggleLang };
}
