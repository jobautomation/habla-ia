import { ITemplate } from "./types"
import { pv, pvAttr } from "./promptVariable"

const ROLES: Array<string> = [
    "Contable Experto",
    "Redactor Experto en SEO",
    "Ingeniero de Inteligencia Artificial (IA)",
    "Consultor Ambiental",
    "Oficial de Privacidad de Datos",
    "Analista de Ciberseguridad",
    "Desarrollador de Software Profesional",
    "Profesor con Experiencia",
    "Representante de Ventas Exitoso",
    "Gerente de Proyecto Competente",
    "Abogado Eficiente",
    "Ingeniero Calificado",
    "Arquitecto Experimentado",
    "Gerente de Marketing Competente",
    "Analista Financiero Profesional",
    "Diseñador Gráfico",
    "Creativo Publicitario",
    "Gerente de Recursos Humanos con Experiencia",
    "Consultor Financiero",
    "Doctor Competente",
    "Psicólogo Licenciado",
    "Investigador Dedicado",
    "Analista de Datos Minucioso",
    "Economista Perspicaz",
    "Reportero Periodista",
    "Farmacéutico Profesional",
    "Trabajador Social Compasivo",
    "Especialista TI conocedor de Tecnología",
    "Analista de Negocios Profesional",
    "Gerente de Operaciones con Experiencia",
    "Planificador de Eventos Estratégico",
    "Agente de Bienes Raíces Experto",
    "Banquero de Inversiones con Experiencia",
    "Desarrollador Web Eficiente",
    "Entrenador de Fitness Certificado",
    "Coach Ejecutivo Profesional",
    "Scrum Master",
    "Informático Experto",
    "Investigador de Experiencia de Usuario (UX)",
    "Desarrollador de Blockchain",
    "Desarrollador de Realidad Virtual (VR)",
    "Hacker Ético",
];

const FORMATS: Array<string> = [
    "texto plano",
    "formato bien estructurado",
    "JSON",
    "CSV",
    "HTML",
    "XML",
    "Markdown",
    "PDF"
];

export const PROMPT_TEMPLATE: ITemplate = {
    name: "Main Template",
    id: crypto.randomUUID(),
    promptVariableAttributes: {
        role: pvAttr(null, "Selecciona un rol:", "[Especifica un rol]", ROLES, null),
        needs: pvAttr(null, "Qué necesitas?", "[Qué necesitas?]", null, null),
        details: pvAttr(null, "Detalles:", "[Escribe detalles]", null, null),
        exclusion: pvAttr(null, "Exclusiones:", "[Escribe exclusiones]", null, null),
        format: pvAttr(null, "Selecciona formato:", "[Selecciona formato]", FORMATS, null),
        example: pvAttr(null, "Ejemplo:", "[Escribe ejemplo de respuesta]", null, null)
    },
    sourceTemplate: "[Eres un $ROLE, <br>][necesito $NEEDS, <br>][en el proceso deberías $DETAILS, <br>][por favor $EXCLUSION, <br>][ingresa el resultado final en $FORMAT, <br>][aquí hay un ejemplo: $EXAMPLE]",
    template: [
        ["Eres un ", pv("role"), ",", "<br/>"],
        ["necesito ", pv("needs"), ", ", "<br/>"],
        [" tu tarea será ", pv("details"), ", ", "<br/>"],
        ["por favor ", pv("exclusion"), ", ", "<br/>"],
        ["ingresa el resultado final en ", pv("format"), ", ", "<br/>"],
        ["aquí hay un ejemplo: ", pv("example")]
    ],
    examples: [
        {
            name: "Ejemplo Completo",
            id: crypto.randomUUID(),
            values: {
                role: "Redactor Experto en SEO",
                needs: "investigar palabras clave e incorporarlas de manera natural en el contenid",
                details: "concentrarse en la legibilidad, relevancia y la colocación adecuada de palabras clave",
                exclusion: "evitar el relleno de palabras clave o la sobreoptimización",
                format: "formato bien estructurado",
                example: "título \"Los 10 mejores consejos para una escritura SEO efectiva: Potencia la visibilidad de tu contenido\""
            }
        },
        {
            name: "Ejemplo Simple",
            id: crypto.randomUUID(),
            values: {
                role: "Redactor Experto en SEO",
                needs: "investigar palabras clave e incorporarlas de manera natural en el contenid",
                details: "concentrarse en la legibilidad, relevancia y la colocación adecuada de palabras clave",
                format: "formato bien estructurado"
            }
        }
    ]
};
