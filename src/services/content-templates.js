/**
 * Content templates for varied Facebook posts
 * Each template defines a different type of post to ensure variety
 */

export const contentTemplates = [
    {
        type: 'product_showcase',
        weight: 2,
        prompt: `
Crea una publicación destacando las características y beneficios del producto en la imagen, utilizando principios de neuromarketing para maximizar el engagement.
Enfócate en:
- Emociones: Haz que el lector sienta la satisfacción de usar el equipo
- Escasez: Menciona disponibilidad limitada o temporada
- Prueba social: Incluye cómo otros constructores lo recomiendan
- Beneficios emocionales: Seguridad, ahorro de tiempo, orgullo profesional

Ejemplo de estructura:
"🚀 ¡IMAGINA el poder de [producto] en tus manos! Nuestro [modelo/tipo] no solo es duradero, sino que te da esa sensación de CONTROL TOTAL en la obra. 
Miles de constructores en Playa del Carmen ya lo eligen porque saben que significa MENOS ESFUERZO, MÁS RESULTADOS. 
¿Listo para elevar tu trabajo? ¡Oferta limitada esta semana!
📍 Visítanos en [ubicación] o llama al [teléfono] #ConstruccionProfesional"
`
    },
    {
        type: 'usage_tip',
        weight: 3,
        prompt: `
Genera un TIP PRÁCTICO de uso o mantenimiento del equipo mostrado en la imagen, aplicando neuromarketing para crear curiosidad y urgencia.
Debe ser:
- Emocional: Haz que el lector sienta el alivio de evitar errores
- Curiosidad: Empieza con una pregunta o dato sorprendente
- Autoridad: Posiciónate como experto confiable
- Acción inmediata: Incluye un llamado a probarlo ahora

Ejemplo de estructura:
"💡 ¿Sabías que un simple TIP puede salvarte horas de trabajo? Como expertos en Playa del Carmen, te decimos: [Consejo específico sobre el equipo]. 
Imagina el estrés que evitas y la admiración de tus colegas. ¡Miles ya lo aplican con éxito!
¿Necesitas este equipo? Ven HOY y descubre por qué somos los #1.
📍 [ubicación] | 📞 [teléfono]"
`
    },
    {
        type: 'safety_advice',
        weight: 2,
        prompt: `
Crea una publicación sobre SEGURIDAD en el uso del equipo mostrado, usando neuromarketing para generar miedo controlado y confianza.
Incluye:
- Emoción de miedo: Describe consecuencias reales pero sin alarmismo
- Confianza: Muestra cómo ARMAQ protege a los profesionales
- Prueba social: Menciona casos reales o estadísticas
- Urgencia: Invita a priorizar la seguridad ahora

Ejemplo de estructura:
"⚠️ ¿Estás arriesgando TU VIDA en cada obra? Imagina el terror de un accidente evitable. Nuestro consejo: [Consejo de seguridad]. 
Miles de constructores en Playa del Carmen confían en nosotros porque sabemos que la SEGURIDAD es lo primero. ¡No esperes al 'qué pasaría si'!
En ARMAQ, equipos certificados para tu tranquilidad.
📍 [ubicación] | 📞 [teléfono] #SeguridadEnConstruccion"
`
    },
    {
        type: 'problem_solution',
        weight: 2,
        prompt: `
Presenta un PROBLEMA COMÚN en construcción y cómo el equipo de la imagen lo resuelve, utilizando neuromarketing para crear empatía y deseo.
Estructura:
- Empatía: Haz que el lector sienta el dolor del problema
- Contraste: Muestra la transformación dramática
- Prueba social: Incluye cómo otros han resuelto lo mismo
- Call to action urgente

Ejemplo:
"🤯 ¿Frustrado con [Problema común] que te roba tiempo y dinero? 
Siente el alivio: Con nuestro [equipo], todo cambia. [Solución mágica]. Miles en Playa del Carmen ya viven esto. 
¡No sufras más! Disponible AHORA.
📍 [ubicación] | 📞 [teléfono] #SolucionesConstruccion"
`
    },
    {
        type: 'did_you_know',
        weight: 2,
        prompt: `
Comparte un dato interesante o poco conocido sobre el equipo en la imagen, aplicando neuromarketing para despertar curiosidad y autoridad.
Debe:
- Curiosidad: Empieza con "¿Sabías que...?" para enganchar
- Sorprendente: Revela algo inesperado que cambia la percepción
- Confianza: Posiciónate como fuente experta
- Conexión emocional: Haz que el lector quiera saber más

Ejemplo:
"🤓 ¿SABÍAS QUE [Dato sorprendente sobre el equipo]? Esto cambia todo lo que pensabas sobre construcción profesional. 
Como líderes en Playa del Carmen, te aseguramos que [beneficio]. Miles lo descubren y transforman su trabajo.
¿Quieres ser el próximo? Ven y averígualo.
📍 [ubicación] | 📞 [teléfono] #CuriosidadesConstruccion"
`
    },
    {
        type: 'seasonal_promo',
        weight: 1,
        prompt: `
Crea una publicación promocional relacionando el equipo con la temporada o necesidad actual, usando neuromarketing para crear urgencia y exclusividad.
Considera:
- Temporada de construcción y emociones asociadas (éxito, progreso)
- Escasez: Oferta por tiempo limitado
- Prueba social: Cómo otros aprovechan la temporada
- Beneficios emocionales: Sentimiento de estar preparado

Ejemplo:
"🏗️ ¡Esta temporada de [temporada] es TU MOMENTO! Siente la emoción de proyectos exitosos con nuestro [equipo], ideal para [aplicación]. 
Miles ya lo tienen y ven resultados increíbles. ¡Oferta especial solo por esta semana!
📍 Visítanos: [ubicación] | 📞 [teléfono] #TemporadaConstruccion"
`
    },
    {
        type: 'comparison_benefit',
        weight: 2,
        prompt: `
Compara el método tradicional vs usar el equipo profesional de la imagen, aplicando neuromarketing para resaltar la transformación y deseo.
Muestra:
- Dolor del método antiguo (emocional)
- Placer del nuevo método (beneficio inmediato)
- Prueba social: Cómo otros han cambiado
- Urgencia: Invita a la acción ahora

Ejemplo:
"⏱️ ANTES: Sudor, tiempo perdido y frustración con [método antiguo]. 
✅ AHORA: Con nuestro [equipo], sientes el PODER y la EFICIENCIA que todos en Playa del Carmen elogian. 
Miles han transformado su trabajo. ¿Tú cuándo?
📍 [ubicación] | 📞 [teléfono] #TrabajaInteligente"
`
    },
    {
        type: 'customer_scenario',
        weight: 2,
        prompt: `
Describe un escenario real donde un cliente necesitaría este equipo, usando neuromarketing para crear identificación emocional y aspiración.
Incluye:
- Empatía: Haz que el lector se vea en la situación
- Aspiración: Muestra el éxito y satisfacción
- Prueba social: Historias similares de clientes
- Urgencia: Invita a vivirlo ahora

Ejemplo:
"🏗️ IMAGINA: Estás en [escenario específico], sintiendo la presión de entregar a tiempo. Nuestro [equipo] te da el CONTROL y la CONFIANZA que necesitas. 
Miles de constructores en Playa del Carmen ya viven este éxito diario. ¿Quieres ser el próximo héroe de tu obra?
¡Tenemos lo que necesitas HOY!
📍 [ubicación] | 📞 [teléfono] #ExitoEnConstruccion"
`
    }
];

/**
 * Get a random template based on weights
 * Templates with higher weight have more probability of being selected
 */
export function getRandomTemplate() {
    const totalWeight = contentTemplates.reduce((sum, template) => sum + template.weight, 0);
    let random = Math.random() * totalWeight;

    for (const template of contentTemplates) {
        random -= template.weight;
        if (random <= 0) {
            return template;
        }
    }

    return contentTemplates[0]; // Fallback
}

/**
 * Equipment-specific tips database
 */
export const equipmentTips = {
    revolvedora: [
        "Limpia tu revolvedora después de cada uso para evitar que el concreto se endurezca en el tambor",
        "Nunca sobrecargues la revolvedora más del 80% de su capacidad para un mezclado óptimo",
        "Revisa el nivel de aceite del motor antes de cada jornada de trabajo"
    ],
    bailarina: [
        "Compacta en capas de 20-30cm para mejores resultados con tu bailarina",
        "Deja que el motor se caliente 2-3 minutos antes de iniciar trabajos pesados",
        "Usa la bailarina en movimientos rectos y superpuestos para compactación uniforme"
    ],
    vibrador: [
        "Inserta el vibrador verticalmente y retíralo lentamente para evitar burbujas de aire",
        "No uses el vibrador para mover el concreto horizontalmente, solo para compactar",
        "Vibra cada punto por 5-15 segundos, hasta que dejen de salir burbujas"
    ],
    andamio: [
        "Verifica que todas las conexiones estén aseguradas antes de subir al andamio",
        "Nunca excedas la carga máxima recomendada del andamio",
        "Inspecciona diariamente las plataformas en busca de daños o desgaste"
    ],
    general: [
        "El mantenimiento preventivo extiende la vida útil de tu equipo hasta un 40%",
        "Almacena tus equipos en lugares secos y protegidos del sol directo",
        "Lee siempre el manual de operación antes de usar equipo nuevo"
    ]
};
