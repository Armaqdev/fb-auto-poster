import Anthropic from "@anthropic-ai/sdk";
import dotenv from 'dotenv';
import { getRandomTemplate, equipmentTips } from './content-templates.js';

dotenv.config();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generatePostContent(imageBuffer = null, mimeType = null) {
  try {
    const template = getRandomTemplate();
    console.log(`📝 Using template type: ${template.type}`);

    const randomTips = Object.values(equipmentTips).flat();
    const selectedTip = randomTips[Math.floor(Math.random() * randomTips.length)];

    const textPrompt = `
      Actúa como el Community Manager experto de "ARMAQ", una empresa líder en VENTA de maquinaria ligera y andamios en Playa del Carmen.
      
      ${imageBuffer ? "ANALIZA LA IMAGEN PROPORCIONADA. Identifica el equipo o producto mostrado." : ""}
      
      TIPO DE PUBLICACIÓN: ${template.type}
      
      ${template.prompt}
      
      CONTEXTO DE ARMAQ:
      - Vendemos: Revolvedoras, bailarinas, vibradores de concreto, andamios, accesorios de construcción
      - Somos expertos locales en Playa del Carmen
      - Ofrecemos equipos de calidad profesional
      
      TIP DE REFERENCIA (úsalo si aplica al tipo de publicación):
      "${selectedTip}"
      
      INFORMACIÓN DE CONTACTO (incluir al final):
      📍 50 Avenida Nte. Col. Luis Donaldo Colosio, Playa del Carmen
      📞 984 801 8317
      
      ESTILO:
      - Máximo 4-5 oraciones (conciso y directo)
      - Usa emojis relevantes: 🏗️🚜🔨⚡💡🛠️✅⚠️
      - Tono: Profesional pero cercano, experto y útil
      - Incluye hashtags al final: #ARMAQ #PlayaDelCarmen #Construcción #MaquinariaLigera
      
      IMPORTANTE: 
      - Solo dame el texto de la publicación, sin comillas ni explicaciones adicionales
      - Varía el estilo y estructura para que no se repita el formato
      - Sé creativo pero mantén la profesionalidad
    `;

    const content = [];

    if (imageBuffer) {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: mimeType || "image/jpeg",
          data: imageBuffer.toString("base64"),
        },
      });
    }

    content.push({ type: "text", text: textPrompt });

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content }],
    });

    const text = response.content[0].text;
    console.log(`✅ Claude generated content successfully.`);
    return text.trim();

  } catch (error) {
    console.error("Error generating AI content:", error.message);
    console.error("Error details:", JSON.stringify(error.error, null, 2));
    return null;
  }
}