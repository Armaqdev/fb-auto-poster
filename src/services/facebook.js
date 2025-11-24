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
        let url;
        let data;
        let headers = {};

        if (imageBuffer) {
            // Post Photo
            url = `https://graph.facebook.com/v19.0/${pageId}/photos`;
            const formData = new FormData();
            formData.append('message', message);
            formData.append('access_token', accessToken);
            formData.append('source', imageBuffer, { filename: 'image.jpg' }); // Filename is required by FormData

            data = formData;
            headers = formData.getHeaders();
        } else {
            // Post Text Only
            url = `https://graph.facebook.com/v19.0/${pageId}/feed`;
            data = {
                message: message,
                access_token: accessToken
            };
        }

        const response = await axios.post(url, data, { headers: headers });

        if (response.data && (response.data.id || response.data.post_id)) {
            console.log(`Successfully posted to Facebook! ID: ${response.data.id || response.data.post_id}`);
            return true;
        }
    } catch (error) {
        console.error("Error posting to Facebook:", error.response ? error.response.data : error.message);
        return false;
    }
}
