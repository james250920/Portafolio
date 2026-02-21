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
  'hero.services': { es: 'Mis Servicios', en: 'My Services' },
  'hero.top': { es: 'Inicio', en: 'Top' },
  'stack.title': { es: 'Stack Portafolio', en: 'Portfolio Stack' },

  // ===================== ABOUT =====================
  'about.title': { es: 'About.me', en: 'About.me' },
  'about.subtitle': {
    es: 'Estudiante de Ingeniería en TI enfocado en el desarrollo de software, con una mentalidad orientada a la calidad de software (QA) y la seguridad para crear soluciones robustas y eficientes.',
    en: 'IT Engineering student focused on software development, with a quality-oriented (QA) and security-first mindset to build robust and efficient solutions.',
  },
  'about.bio': {
    es: 'Desarrollador en formación con {n}+ años de experiencia en el desarrollo de software.',
    en: 'Developer in training with {n}+ years of software development experience.',
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
  'contact.networking': {
    es: 'Networking profesional y oportunidades',
    en: 'Professional networking and opportunities',
  },
  'contact.checkCode': {
    es: 'Revisa mi código y contribuciones',
    en: 'Check my code and contributions',
  },
  'contact.active': { es: 'Activo', en: 'Active' },
  'contact.updatedFrequently': { es: 'Actualizado frecuentemente', en: 'Updated frequently' },
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

  // ===================== SERVICES =====================
  'services.back': { es: 'Volver', en: 'Back' },
  'services.title': { es: 'SERVICIOS', en: 'SERVICES' },
  'services.subtitle': { es: 'Soluciones digitales a tu medida', en: 'Custom digital solutions' },
  'services.request': { es: 'Solicitar', en: 'Request' },
  'services.ctaTitle': { es: '¿Tienes un proyecto en mente?', en: 'Have a project in mind?' },
  'services.ctaSubtitle': {
    es: 'Transformemos tu idea en realidad con tecnología de vanguardia',
    en: "Let's turn your idea into reality with cutting-edge technology",
  },
  'services.ctaWhatsapp': { es: 'Hablemos por WhatsApp', en: "Let's talk on WhatsApp" },
  'services.ctaEmail': { es: 'Enviar Email', en: 'Send Email' },
  'services.building': { es: 'Construyendo experiencia...', en: 'Building experience...' },
  'services.loading': { es: '// Recopilando datos...', en: '// Gathering data...' },
  'services.modalTitle': { es: 'Enviar Mensaje', en: 'Send Message' },
  'services.modalSubtitle': {
    es: '// Cuéntame sobre tu proyecto',
    en: '// Tell me about your project',
  },
  'services.formName': { es: '> Nombre', en: '> Name' },
  'services.formEmail': { es: '> Email', en: '> Email' },
  'services.formService': { es: '> Servicio', en: '> Service' },
  'services.formMessage': { es: '> Mensaje', en: '> Message' },
  'services.formNamePlaceholder': { es: 'Tu nombre', en: 'Your name' },
  'services.formEmailPlaceholder': { es: 'tu.email@ejemplo.com', en: 'your.email@example.com' },
  'services.formSelectService': { es: 'Selecciona un servicio', en: 'Select a service' },
  'services.formMsgPlaceholder': {
    es: 'Cuéntame sobre tu proyecto...',
    en: 'Tell me about your project...',
  },
  'services.cancel': { es: 'Cancelar', en: 'Cancel' },
  'services.submit': { es: 'Enviar', en: 'Send' },
  'services.nameRequired': { es: 'El nombre es requerido', en: 'Name is required' },
  'services.emailRequired': { es: 'El email es requerido', en: 'Email is required' },
  'services.emailInvalid': { es: 'Email inválido', en: 'Invalid email' },
  'services.serviceRequired': { es: 'Selecciona un servicio', en: 'Select a service' },
  'services.messageRequired': { es: 'El mensaje es requerido', en: 'Message is required' },
  'services.success': { es: '¡Mensaje enviado exitosamente!', en: 'Message sent successfully!' },
  'services.successCaption': {
    es: 'Te responderé lo antes posible',
    en: 'I will reply as soon as possible',
  },
  'services.errorSend': { es: 'Error al enviar el mensaje', en: 'Error sending message' },
  'services.errorCaption': { es: 'Por favor, intenta de nuevo', en: 'Please try again' },
  'services.sendingMsg': { es: 'Enviando mensaje...', en: 'Sending message...' },
  'services.codeClient': { es: 'Tú', en: 'You' },
  'services.codeDev': { es: 'James', en: 'James' },
  'services.codeStatus': { es: 'Listo para iniciar', en: 'Ready to start' },
  'services.s1.name': { es: 'Desarrollo Web', en: 'Web Development' },
  'services.s1.desc': {
    es: 'Aplicaciones web modernas, rápidas y escalables con las mejores tecnologías del mercado.',
    en: 'Modern, fast, and scalable web applications with the best technologies on the market.',
  },
  'services.s1.f1': { es: 'Vue.js / Angular / Flask', en: 'Vue.js / Angular / Flask' },
  'services.s1.f2': { es: 'Diseño Responsivo', en: 'Responsive Design' },
  'services.s1.f3': { es: 'SEO Optimizado', en: 'SEO Optimized' },
  'services.s1.f4': { es: 'Alto Rendimiento', en: 'High Performance' },
  'services.s2.name': { es: 'Desarrollo Móvil', en: 'Mobile Development' },
  'services.s2.desc': {
    es: 'Aplicaciones nativas Android con Kotlin y multiplataforma con Flutter para llegar a más usuarios.',
    en: 'Native Android apps with Kotlin and cross-platform with Flutter to reach more users.',
  },
  'services.s2.f1': { es: 'Kotlin / Jetpack Compose', en: 'Kotlin / Jetpack Compose' },
  'services.s2.f2': { es: 'Flutter Multiplataforma', en: 'Flutter Cross-platform' },
  'services.s2.f3': { es: 'UI/UX Moderno', en: 'Modern UI/UX' },
  'services.s2.f4': { es: 'Publicación en Stores', en: 'Store Publishing' },
  'services.s3.name': { es: 'Backend & APIs', en: 'Backend & APIs' },
  'services.s3.desc': {
    es: 'Arquitecturas robustas y APIs escalables para potenciar tus aplicaciones.',
    en: 'Robust architectures and scalable APIs to power your applications.',
  },
  'services.s3.f1': { es: '.NET / FastAPI / Express', en: '.NET / FastAPI / Express' },
  'services.s3.f2': { es: 'Bases de Datos SQL/NoSQL', en: 'SQL/NoSQL Databases' },
  'services.s3.f3': { es: 'APIs RESTful & GraphQL', en: 'RESTful & GraphQL APIs' },
  'services.s3.f4': { es: 'Microservicios', en: 'Microservices' },
  'services.s4.name': { es: 'QA & Testing', en: 'QA & Testing' },
  'services.s4.desc': {
    es: 'Asegura la calidad de tu software con pruebas automatizadas y manuales.',
    en: 'Ensure your software quality with automated and manual testing.',
  },
  'services.s4.f1': { es: 'Cypress / Selenium / Appium', en: 'Cypress / Selenium / Appium' },
  'services.s4.f2': { es: 'Pruebas E2E y Unitarias', en: 'E2E & Unit Testing' },
  'services.s4.f3': { es: 'Performance con K6', en: 'Performance with K6' },
  'services.s4.f4': { es: 'CI/CD Integration', en: 'CI/CD Integration' },
  'services.s6.name': { es: 'Soluciones Digitales', en: 'Digital Solutions' },
  'services.s6.desc': {
    es: 'Transformación digital completa para llevar tu negocio al siguiente nivel.',
    en: 'Complete digital transformation to take your business to the next level.',
  },
  'services.s6.f1': { es: 'Automatización de Procesos', en: 'Process Automation' },
  'services.s6.f2': { es: 'Integración de Sistemas', en: 'System Integration' },
  'services.s6.f3': { es: 'Dashboards & Analytics', en: 'Dashboards & Analytics' },
  'services.s6.f4': { es: 'Soluciones Cloud', en: 'Cloud Solutions' },
  'services.opt.webDev': { es: 'Desarrollo Web', en: 'Web Development' },
  'services.opt.mobileDev': { es: 'Desarrollo Móvil', en: 'Mobile Development' },
  'services.opt.backend': { es: 'Backend & APIs', en: 'Backend & APIs' },
  'services.opt.qa': { es: 'QA & Testing', en: 'QA & Testing' },
  'services.opt.digital': { es: 'Soluciones Digitales', en: 'Digital Solutions' },
  'services.matrix.projects': { es: 'Proyectos', en: 'Projects' },
  'services.matrix.clients': { es: 'Clientes', en: 'Clients' },
  'services.matrix.tech': { es: 'Tecnologías', en: 'Technologies' },
  'services.matrix.experience': { es: 'Experiencia', en: 'Experience' },
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
