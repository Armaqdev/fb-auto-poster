import cron from 'node-cron';
import { generatePostContent } from './services/ai.js';
import { postToFacebook } from './services/facebook.js';
import { getRandomImageFromDrive } from './services/drive.js';
import dotenv from 'dotenv';

dotenv.config();

console.log("Starting Facebook Auto-Poster Service (with Vision)...");

// Schedule task to run every hour
cron.schedule('0 * * * *', async () => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] Triggering scheduled post...`);

    try {
        // 1. Get Image from Drive
        console.log("Fetching random image from Drive...");
        const image = await getRandomImageFromDrive();

        if (!image) {
            console.warn("No image found or error fetching. Proceeding with text only (or skipping if desired).");
        }

        // 2. Generate Content (with Vision if image exists)
        console.log("Generating content with AI...");
        const content = await generatePostContent(image ? image.buffer : null, image ? image.mimeType : null);

        if (!content) {
            console.error("Failed to generate content. Skipping this cycle.");
            return;
        }

        console.log(`Generated Content: "${content}"`);

        // 3. Post to Facebook
        console.log("Posting to Facebook...");
        const success = await postToFacebook(content, image ? image.buffer : null);

        if (success) {
            console.log("Cycle completed successfully.");
        } else {
            console.error("Failed to post to Facebook.");
        }

    } catch (error) {
        console.error("Unexpected error in scheduler:", error);
    }
});
