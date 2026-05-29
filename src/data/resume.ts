type ReadonlyDeep<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly (infer U)[]
    ? readonly ReadonlyDeep<U>[]
    : T extends object
      ? { readonly [K in keyof T]: ReadonlyDeep<T[K]> }
      : T;

const deepFreeze = <T>(value: T): ReadonlyDeep<T> => {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }

    Object.freeze(value);
  }

  return value as ReadonlyDeep<T>;
};

export type ResumeDate = {
  readonly year: number;
  readonly month: number;
};

export type ExperienceItem = {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly start: ResumeDate;
  readonly end: ResumeDate | null;
  readonly current: boolean;
  readonly summary: string;
};

export type EducationItem = {
  readonly id: string;
  readonly title: string;
  readonly institution: string;
};

export type SkillCategory =
  | "backend"
  | "frontend"
  | "databases"
  | "infrastructure";

export type SkillGroup = {
  readonly id: SkillCategory;
  readonly label: string;
  readonly items: readonly string[];
};

export type ResumeData = {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly phone: string;
  readonly email: string;
  readonly intro: string;
  readonly profile: readonly string[];
  readonly skills: readonly SkillGroup[];
  readonly certifications: readonly string[];
  readonly education: readonly EducationItem[];
  readonly experience: readonly ExperienceItem[];
  readonly photo?: string;
  readonly social?: {
    readonly github?: string;
    readonly linkedin?: string;
  };
};

const resumeDataSource = {
  name: "Jose Castro Cantillo",
  role: "Desarrollador Full Stack",
  location: "Soledad, Atlantico",
  phone: "301 788 0021",
  email: "ingjoalca@gmail.com",
  intro:
    "Ingeniero de Sistemas con experiencia en desarrollo frontend con Angular, backend con C# y .NET Core, bases de datos SQL Server y administracion de infraestructura Linux/Windows.",
  profile: [
    "Experiencia en desarrollo full stack con foco en Angular, C#, .NET Core y SQL Server.",
    "Conocimiento en infraestructura tecnologica, Active Directory, PBX Issabel y Docker.",
    "Perfil responsable, adaptable y orientado al trabajo en equipo.",
  ],
  skills: [
    {
      id: "backend",
      label: "Backend",
      items: ["C#", ".NET Core"],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: ["Angular", "TypeScript"],
    },
    {
      id: "databases",
      label: "Base de datos",
      items: ["SQL Server", "MySQL"],
    },
    {
      id: "infrastructure",
      label: "Infraestructura",
      items: ["Linux", "Windows", "Git", "Azure", "Docker"],
    },
  ],
  certifications: ["Seguridad Informatica"],
  education: [
    {
      id: "especialista-seguridad-informatica-universidad-americana",
      title: "Especialista en Seguridad Informatica",
      institution: "Universidad Americana",
    },
    {
      id: "ingeniero-sistemas-universidad-magdalena",
      title: "Ingeniero de Sistemas",
      institution: "Universidad de Magdalena",
    },
  ],
  experience: [
    {
      id: "everest-intelligent-software-developer-senior-n3",
      role: "Software Developer Senior N3",
      company: "Everest Intelligent",
      period: "septiembre 2022 - presente",
      start: { year: 2022, month: 9 },
      end: null,
      current: true,
      summary:
        "Desarrollador Full Stack especializado en bots de llamadas y WhatsApp, backend en C#, .NET y SQL Server, creacion y refactorizacion de APIs e integraciones, y soporte frontend en Angular.",
    },
    {
      id: "viva-1a-ips-lider-infraestructura-tecnologia",
      role: "Lider de Infraestructura Tecnologia",
      company: "Viva 1A IPS",
      period: "julio 2019 - agosto 2022",
      start: { year: 2019, month: 7 },
      end: { year: 2022, month: 8 },
      current: false,
      summary:
        "Gestion de infraestructura tecnologica, servidores, redes, sistemas, proyectos y actualizaciones para asegurar disponibilidad y continuidad del servicio.",
    },
    {
      id: "viva-1a-ips-administrador-servidores-telecomunicaciones",
      role: "Administrador de Servidores y Telecomunicaciones",
      company: "Viva 1A IPS",
      period: "enero 2018 - junio 2019",
      start: { year: 2018, month: 1 },
      end: { year: 2019, month: 6 },
      current: false,
      summary:
        "Gestion y mantenimiento de infraestructura fisica y virtual, cuentas, planta telefonica, backups, instalacion de software, monitoreo de red y soporte tecnico.",
    },
    {
      id: "clinica-bautista-programador-apoyo",
      role: "Programador de Apoyo",
      company: "Clinica Bautista",
      period: "diciembre 2015 - septiembre 2017",
      start: { year: 2015, month: 12 },
      end: { year: 2017, month: 9 },
      current: false,
      summary:
        "Implementacion, parametrizacion y soporte de software Seven, capacitacion de usuarios, pruebas, administracion de SQL Server y reportes con Crystal Reports.",
    },
    {
      id: "hsh-santander-herrera-ingeniero-sistemas",
      role: "Ingeniero de Sistemas",
      company: "H.S.H Santander Herrera",
      period: "noviembre 2014 - diciembre 2015",
      start: { year: 2014, month: 11 },
      end: { year: 2015, month: 12 },
      current: false,
      summary:
        "Instalacion y configuracion de software, mantenimiento de equipos y redes, y administracion de sitios web oficiales.",
    },
    {
      id: "alcaldia-pivijay-ingeniero-sistemas",
      role: "Ingeniero de Sistemas",
      company: "Alcaldia Pivijay",
      period: "enero 2014 - junio 2014",
      start: { year: 2014, month: 1 },
      end: { year: 2014, month: 6 },
      current: false,
      summary:
        "Instalacion y configuracion de software y administracion del sitio web oficial de la Secretaria de Cultura y Deporte.",
    },
  ],
  photo: "/images/foto.jpg",
  social: {
    github: undefined,
    linkedin: undefined,
  },
} satisfies ResumeData;

export type ReadonlyResumeData = ReadonlyDeep<ResumeData>;

export const resumeData: ReadonlyResumeData = deepFreeze(resumeDataSource);
