import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generatePostContent(imageBuffer = null, mimeType = null) {
  try {
    // Use gemini-2.0-flash which is available in your account
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

    const prompt = `
      Actúa como el Community Manager experto de "ARMAQ", una empresa líder en VENTA de maquinaria ligera y andamios en Playa del Carmen.
      
      ${imagePart ? "ANALIZA LA IMAGEN PROPORCIONADA. Es un producto o situación de construcción." : ""}
      
      Genera una publicación para Facebook atractiva, profesional y corta (máximo 3 oraciones) ${imagePart ? "basada en lo que ves en la imagen" : "sobre maquinaria ligera"}.
      
      Temas posibles (si no hay imagen o para complementar):
      - Venta de maquinaria ligera (revolvedoras, bailarinas, vibradores).
      - Venta de andamios y accesorios.
      - Tips de construcción o seguridad en obra.
      - Frase motivacional para constructores/arquitectos.

      Datos obligatorios a incluir sutilmente o al final:
      - Ubicación: 50 Avenida Nte. Col. Luis Donaldo Colosio, Playa del Carmen.
      - Teléfono: 984 801 8317
      
      Estilo:
      - Usa emojis de construcción 🏗️🚜🔨.
      - Tono: Amigable, experto y local (Playa del Carmen).
      - Hashtags: #ARMAQ #PlayaDelCarmen #Construcción #MaquinariaLigera #VentaDeMaquinaria
      
      IMPORTANTE: Solo dame el texto de la publicación, nada más.
    `;

    const parts = imagePart ? [prompt, imagePart] : [prompt];
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("Error generating AI content:", error);
    return null;
  }
}
