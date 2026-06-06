# SaloneAssist AI Chatbot Integration Guide

## Overview
This admin panel provides a fully functional AI chatbot powered by NVIDIA's Llama 3.1 70B model. You can integrate this chatbot into your main SaloneAssist application in three ways.

## Prerequisites
✅ NVIDIA API Key configured in admin settings
✅ Meta WhatsApp access token configured (for WhatsApp integration)
✅ Admin panel deployed at: https://v0-saloneassistadmin.vercel.app

---

## Integration Method 1: Public API (Recommended for Custom UIs)

### Endpoint
\`\`\`
POST https://v0-saloneassistadmin.vercel.app/api/public/chat
\`\`\`

### Request Format
\`\`\`javascript
{
  "message": "User's question or message",
  "sessionId": "unique-session-identifier", // Optional
  "conversationHistory": [ // Optional
    {
      "role": "user",
      "content": "Previous user message"
    },
    {
      "role": "assistant",
      "content": "Previous AI response"
    }
  ]
}
\`\`\`

### Response Format
\`\`\`javascript
{
  "success": true,
  "response": "AI assistant's response text",
  "sessionId": "session_1234567890",
  "timestamp": "2025-01-10T12:34:56.789Z"
}
\`\`\`

### Example Implementation (React/Next.js)
\`\`\`javascript
async function sendMessage(userMessage) {
  const response = await fetch('https://v0-saloneassistadmin.vercel.app/api/public/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Optional: Add API key for security
      // 'x-api-key': 'your-api-key'
    },
    body: JSON.stringify({
      message: userMessage,
      sessionId: localStorage.getItem('chatSessionId'),
      conversationHistory: []
    })
  });

  const data = await response.json();
  return data.response;
}
\`\`\`

---

## Integration Method 2: Embed Widget (Easiest Setup)

### Full-Screen Embed
Add this iframe to any page in your main app:

\`\`\`html
<iframe
  src="https://v0-saloneassistadmin.vercel.app/embed/chat"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999;"
  class="md:w-[400px] md:h-[600px] md:bottom-4 md:right-4 md:rounded-lg"
  title="SaloneAssist AI Chat"
></iframe>
\`\`\`

### Floating Chat Widget
\`\`\`html
<iframe
  src="https://v0-saloneassistadmin.vercel.app/embed/chat"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; z-index: 9999; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);"
  title="SaloneAssist AI Chat"
></iframe>
\`\`\`

---

## Integration Method 3: Script Tag (One-Line Installation)

Add this single script tag at the bottom of your HTML (before closing `</body>` tag):

\`\`\`html
<script>
(function() {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://v0-saloneassistadmin.vercel.app/embed/chat';
  iframe.style.cssText = 'position:fixed;bottom:20px;right:20px;width:400px;height:600px;border:none;z-index:9999;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.2);';
  iframe.setAttribute('title', 'SaloneAssist AI Chat');
  document.body.appendChild(iframe);
})();
</script>
\`\`\`

---

## WhatsApp Integration Status

### Current Setup
✅ Webhook URL configured: `https://v0-saloneassistadmin.vercel.app/api/webhook/whatsapp`
✅ Verify Token: `saloneassist_webhook_token_2024`
✅ Access Token: Configured in admin settings
✅ Phone Number ID: `812246008649774`

### Testing Without Business Verification
While your business verification is pending, you can:
1. Use Meta's test phone number for development
2. Test message sending/receiving functionality
3. Demonstrate the chatbot to potential investors/funders
4. Build and refine your integration

### What You Can Do Now
- ✅ Send messages to test numbers
- ✅ Receive responses from the AI chatbot
- ✅ Test the full conversation flow
- ✅ Show demos to investors/funders

### What Requires Business Verification
- ❌ Use your own business phone number
- ❌ Send messages to non-test numbers
- ❌ Scale to production users
- ❌ Access advanced WhatsApp features

### Next Steps for Production
1. Complete Meta business verification
2. Submit required business documents
3. Once verified, your own phone number will be activated
4. Users can then message your business number and get AI responses automatically

---

## Security Considerations

### Optional API Key Authentication
To secure the public API endpoint, uncomment these lines in `/app/api/public/chat/route.ts`:

\`\`\`typescript
const apiKey = request.headers.get("x-api-key")
const expectedApiKey = process.env.PUBLIC_CHATBOT_API_KEY || "saloneassist_chatbot_key_2024"

if (apiKey !== expectedApiKey) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
\`\`\`

Then add the header in your main app requests:
\`\`\`javascript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'saloneassist_chatbot_key_2024'
}
\`\`\`

---

## Funding/Investor Demo Strategy

### What You Can Show Without Business Documents
1. **Live AI Chatbot**: Demonstrate the working chatbot in test mode
2. **Multi-Channel Integration**: Show web chat + WhatsApp capability
3. **Admin Dashboard**: Display management interface with settings, training data, analytics
4. **Technical Infrastructure**: Show API endpoints, integration options, scalability

### Recommended Demo Flow
1. Start with the admin dashboard overview
2. Show the test chatbot interface responding in real-time
3. Demonstrate training data management
4. Show WhatsApp integration setup (explain business verification is in progress)
5. Display the integration guide showing how easily it can be added to the main app
6. Highlight that the technical work is complete - just awaiting business verification

### Key Selling Points
- ✅ Fully functional AI chatbot using enterprise-grade NVIDIA/Llama model
- ✅ Multi-channel support (Web + WhatsApp)
- ✅ Easy integration (3 methods provided)
- ✅ Scalable infrastructure ready for production
- ✅ Training data management system
- ✅ Complete admin panel for management
- ✅ Only barrier is business verification (not technical)

---

## Support

For integration help, visit the Integration Guide in your admin dashboard:
https://v0-saloneassistadmin.vercel.app/dashboard/chatbot/integration
