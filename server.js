const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post('/api/v1/lead-hook', async (req, res) => {
  const { name, phone, serviceNeeded } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Missing critical lead information' });
  }

  try {

    const discordEmbedPayload = {
      embeds: [{
        title: "⚡ LEAD VELOCITY ALERT",
        color: 16750848, // Premium Orange Hex Variable Code (Color theme)
        description: `👤 **CLIENT:** ${name}\n📞 **PHONE:** [${phone}](tel:${phone.replace(/\s+/g, '')})\n🛠️ **SERVICE:** ${serviceNeeded || 'Not Specified'}`,
        footer: { text: "👉 Tap the phone number above to call them back instantly!" }
      }]
    };
    
    const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordEmbedPayload) 
    });

    if (!discordResponse.ok) {
      throw new Error(`Discord API responded with status ${discordResponse.status}`)
    }

    console.log("\n=== 🚀 AUTOMATION ENGINE INTERCEPTED LEAD ===");
    console.log(`👤 CLIENT: ${name} | 📞 PHONE: ${phone}`);
    console.log("=============================================\n");

    return res.status(200).json({ success: true, message: 'Lead intercepted and formatted successfully!' });
  } catch (error) {
    console.error('❌ DISCORD GATEWAY ERROR:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to deliver push notification alert' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Automation Pipeline live on port ${PORT}`);
});
