/**
 * Content templates for varied Facebook posts
 * Each template defines a different type of post to ensure variety
 */

export const contentTemplates = [
    {
        type: 'product_showcase',
        weight: 2,
        prompt: `
Crea una publicación destacando las características y beneficios del producto en la imagen.
Enfócate en:
- Calidad y durabilidad del equipo
- Aplicaciones prácticas en obra
- Por qué elegir este producto

Ejemplo de estructura:
"[Emoji] ¿Necesitas [producto]? Nuestro [modelo/tipo] es perfecto para [uso]. 
[Beneficio clave]. 
📍 Visítanos en [ubicación] o llama al [teléfono]"
`
    },
    {
        type: 'usage_tip',
        weight: 3,
        prompt: `
Genera un TIP PRÁCTICO de uso o mantenimiento del equipo mostrado en la imagen.
Debe ser:
- Consejo útil y específico
- Fácil de aplicar
- Que demuestre experiencia

Ejemplo de estructura:
"💡 TIP PROFESIONAL: [Consejo específico sobre el equipo]
[Explicación breve de por qué es importante]
[Beneficio de seguir el tip]

¿Necesitas este equipo? Encuéntralo en ARMAQ 🏗️
📍 [ubicación] | 📞 [teléfono]"
`
    },
    {
        type: 'safety_advice',
        weight: 2,
        prompt: `
Crea una publicación sobre SEGURIDAD en el uso del equipo mostrado.
Incluye:
- Medida de seguridad importante
- Consecuencia de no seguirla
- Cómo ARMAQ ayuda con equipos seguros

Ejemplo de estructura:
"⚠️ SEGURIDAD PRIMERO: [Consejo de seguridad]
[Por qué es crucial]
En ARMAQ te ofrecemos equipos certificados y en óptimas condiciones.
📍 [ubicación] | 📞 [teléfono]"
`
    },
    {
        type: 'problem_solution',
        weight: 2,
        prompt: `
Presenta un PROBLEMA COMÚN en construcción y cómo el equipo de la imagen lo resuelve.
Estructura:
- Problema que enfrentan los constructores
- Cómo este equipo es la solución
- Call to action

Ejemplo:
"¿[Problema común]? 🤔
Con nuestro [equipo] puedes [solución]. [Beneficio adicional].
¡Disponible ahora en ARMAQ!
📍 [ubicación] | 📞 [teléfono]"
`
    },
    {
        type: 'did_you_know',
        weight: 2,
        prompt: `
Comparte un dato interesante o poco conocido sobre el equipo en la imagen.
Debe:
- Empezar con "¿Sabías que...?"
- Educar al cliente
- Conectar con el producto disponible

Ejemplo:
"🤓 ¿SABÍAS QUE...? [Dato interesante sobre el equipo o su uso]
[Cómo esto beneficia al usuario]
Encuentra este y más equipos en ARMAQ
📍 [ubicación] | 📞 [teléfono]"
`
    },
    {
        type: 'seasonal_promo',
        weight: 1,
        prompt: `
Crea una publicación promocional relacionando el equipo con la temporada o necesidad actual.
Considera:
- Temporada de construcción
- Proyectos típicos de la época
- Urgencia suave

Ejemplo:
"🏗️ [Relación con temporada/proyecto típico]
Nuestro [equipo] es ideal para [aplicación específica].
[Beneficio o característica destacada]
📍 Visítanos: [ubicación] | 📞 [teléfono]"
`
    },
    {
        type: 'comparison_benefit',
        weight: 2,
        prompt: `
Compara el método tradicional vs usar el equipo profesional de la imagen.
Muestra:
- Forma antigua/difícil de hacer algo
- Cómo el equipo facilita el trabajo
- Ahorro de tiempo/esfuerzo

Ejemplo:
"⏱️ ANTES: [Método antiguo/difícil]
✅ AHORA: Con nuestro [equipo], [beneficio y facilidad]
Trabaja más inteligente, no más duro.
📍 [ubicación] | 📞 [teléfono]"
`
    },
    {
        type: 'customer_scenario',
        weight: 2,
        prompt: `
Describe un escenario real donde un cliente necesitaría este equipo.
Incluye:
- Situación específica de construcción
- Por qué este equipo es necesario
- Resultado positivo

Ejemplo:
"🏗️ IMAGINA: [Escenario de construcción específico]
Nuestro [equipo] te permite [solución/beneficio].
[Resultado positivo]
¡Tenemos lo que necesitas!
📍 [ubicación] | 📞 [teléfono]"
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
