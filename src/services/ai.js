import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { getRandomTemplate, equipmentTips } from './content-templates.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generatePostContent(imageBuffer = null, mimeType = null) {
  try {
    // Use gemini-2.5-flash which is available in your account
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let imagePart = null;
    if (imageBuffer) {
      imagePart = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: mimeType || "image/jpeg",
        },
      };
    }

    // Get a random content template for variety
    const template = getRandomTemplate();
    console.log(`📝 Using template type: ${template.type}`);

    // Select random equipment tips
    const randomTips = Object.values(equipmentTips).flat();
    const selectedTip = randomTips[Math.floor(Math.random() * randomTips.length)];

    const basePrompt = `
      Actúa como el Community Manager experto de "ARMAQ", una empresa líder en VENTA de maquinaria ligera y andamios en Playa del Carmen.
      
      ${imagePart ? "ANALIZA LA IMAGEN PROPORCIONADA. Identifica el equipo o producto mostrado." : ""}
      
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

    const parts = imagePart ? [basePrompt, imagePart] : [basePrompt];
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("Error generating AI content:", error);
    return null;
  }
}
