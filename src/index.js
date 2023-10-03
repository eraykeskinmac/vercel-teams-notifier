
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const TEAMS_WEBHOOK_URL = "https://oplog.webhook.office.com/webhookb2/c57c5dd1-678c-48a3-a470-e7bbbe845199@6a11f161-dc77-42b2-ba0a-26b6aff4adf0/IncomingWebhook/204f0570f30842958b2065c168e6457f/34fb4abf-89ff-4673-b62f-4150ff2bc60f"; 

app.use(bodyParser.json());

app.post('/vercel-to-teams', async (req, res) => {
    const deployInfo = req.body;

    const message = {
        "@context": "https://schema.org/extensions",
        "@type": "MessageCard",
        "themeColor": deployInfo.deployment.state === 'READY' ? "0076D7" : "FF0000",
        "title": "Vercel Deployment Bilgisi",
        "text": `Proje: ${deployInfo.deployment.url} durumda: ${deployInfo.deployment.state}`
    };

    try {
        await axios.post(TEAMS_WEBHOOK_URL, message);
        res.status(200).send('Bilgi başarıyla Teams\'e gönderildi.');
    } catch (error) {
        console.error('Teams\'e mesaj gönderilirken hata:', error);
        res.status(500).send('Bir hata oluştu.');
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
