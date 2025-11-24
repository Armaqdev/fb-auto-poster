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
            // Post Photo - access_token in URL
            url = `https://graph.facebook.com/v19.0/${pageId}/photos?access_token=${accessToken}`;
            const formData = new FormData();
            formData.append('message', message);
            formData.append('source', imageBuffer, { filename: 'image.jpg' });

            data = formData;
            headers = formData.getHeaders();
        } else {
            // Post Text Only - access_token in URL
            url = `https://graph.facebook.com/v19.0/${pageId}/feed?access_token=${accessToken}`;
            data = {
                message: message
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
