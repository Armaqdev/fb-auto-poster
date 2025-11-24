import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

export async function postToFacebook(message, imageBuffer) {
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!pageId || !accessToken) {
        console.error("Missing Facebook credentials in .env");
        return false;
    }

    try {
        if (imageBuffer) {
            // Simple direct upload with caption - this should appear on timeline
            const url = `https://graph.facebook.com/v19.0/${pageId}/photos`;
            const formData = new FormData();
            formData.append('caption', message);  // Use 'caption' instead of 'message' for photos
            formData.append('source', imageBuffer, { filename: 'image.jpg' });
            formData.append('access_token', accessToken);

            const response = await axios.post(url, formData, {
                headers: formData.getHeaders()
            });

            if (response.data && response.data.id) {
                console.log(`Successfully posted photo to Facebook! Photo ID: ${response.data.id}`);
                console.log(`Post should be visible at: https://www.facebook.com/${response.data.id}`);
                return true;
            }
        } else {
            // Post Text Only
            const url = `https://graph.facebook.com/v19.0/${pageId}/feed`;
            const response = await axios.post(url, {
                message: message,
                access_token: accessToken
            });

            if (response.data && response.data.id) {
                console.log(`Successfully posted to Facebook! ID: ${response.data.id}`);
                return true;
            }
        }
    } catch (error) {
        console.error("Error posting to Facebook:", error.response ? error.response.data : error.message);
        return false;
    }
}
