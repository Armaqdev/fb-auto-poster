import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HISTORY_FILE = path.join(__dirname, '../../data/image-history.json');
const MAX_HISTORY_SIZE = 14;

/**
 * Ensures the data directory and history file exist
 */
function ensureHistoryFile() {
    const dataDir = path.dirname(HISTORY_FILE);

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    if (!fs.existsSync(HISTORY_FILE)) {
        fs.writeFileSync(HISTORY_FILE, JSON.stringify({ publishedImages: [] }, null, 2));
    }
}

/**
 * Get the list of recently published image IDs
 * @returns {string[]} Array of image file IDs
 */
export function getPublishedImageIds() {
    try {
        ensureHistoryFile();
        const data = fs.readFileSync(HISTORY_FILE, 'utf8');
        const history = JSON.parse(data);
        return history.publishedImages || [];
    } catch (error) {
        console.error('Error reading history file:', error.message);
        return [];
    }
}

/**
 * Add a new image ID to the history
 * @param {string} fileId - Google Drive file ID
 * @param {string} fileName - Name of the file
 */
export function addToHistory(fileId, fileName) {
    try {
        ensureHistoryFile();
        const data = fs.readFileSync(HISTORY_FILE, 'utf8');
        const history = JSON.parse(data);

        // Add new entry with timestamp
        const entry = {
            fileId,
            fileName,
            publishedAt: new Date().toISOString()
        };

        history.publishedImages = history.publishedImages || [];
        history.publishedImages.unshift(entry); // Add to beginning

        // Keep only the last MAX_HISTORY_SIZE entries
        if (history.publishedImages.length > MAX_HISTORY_SIZE) {
            history.publishedImages = history.publishedImages.slice(0, MAX_HISTORY_SIZE);
        }

        fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
        console.log(`✅ Added to history: ${fileName} (Total: ${history.publishedImages.length}/${MAX_HISTORY_SIZE})`);

    } catch (error) {
        console.error('Error writing to history file:', error.message);
    }
}

/**
 * Get array of file IDs only (for easy filtering)
 * @returns {string[]} Array of file IDs
 */
export function getRecentFileIds() {
    const history = getPublishedImageIds();
    return history.map(entry => entry.fileId);
}
