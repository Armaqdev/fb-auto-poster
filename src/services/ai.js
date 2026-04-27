import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { getRandomTemplate, equipmentTips } from './content-templates.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_FALLBACKS = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-2.5-flash",
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithRetry(parts, retries = 3, delayMs = 5000) {
  for (const modelName of MODEL_FALLBACKS) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🤖 Trying model: ${modelName} (attempt ${attempt}/${retries})`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(parts);
        const response = await result.response;
        console.log(`✅ Model ${modelName} succeeded.`);
        return response.text();
      } catch (err) {
        const is503 = err.status === 503 || (err.message && err.message.includes('503'));
        if (is503 && attempt < retries) {
          console.warn(`⚠️ ${modelName} returned 503. Retrying in ${delayMs / 1000}s...`);
          await sleep(delayMs);
        } else if (is503) {
          console.warn(`❌ ${modelName} failed after ${retries} attempts. Trying next model...`);
          break;
        } else {
          throw err;
        }
      }
    }
  }
  throw new Error("All models failed to generate content.");
}

export async function generatePostContent(imageBuffer = null, mimeType = null) {
  try {
    let imagePart = null;
    if (imageBuffer) {
      imagePart = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: mimeType || "image/jpeg",
        },
      };
    }

    const template = getRandomTemplate();
    console.log(`📝 Using template type: ${template.type}`);

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
    const text = await generateWithRetry(parts);

    return text.trim();
  } catch (error) {
    console.error("Error generating AI content:", error);
    return null;
  }
}
