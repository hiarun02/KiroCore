# KiroCore Backend

Express backend for KiroCore - powered by Google Gemini AI for intelligent chat responses.

## 🚀 Features

- **Google Gemini AI**: Real AI responses using Gemini 2
.5 Flash
- **Multi-Agent Support**: Different AI personalities for each app (StudyBuddy, IdeaForge)
- **Dynamic App Loading**: Reads app configs from `/apps` directory
- **RESTful API**: Clean API endpoints for chat and app management
- **Professional Structure**: Organized `src/` directory structure

## 📡 API Endpoints

### Chat

**POST** `/api/chat` - Send message to AI agent

```json
{
  "message": "Explain React hooks",
  "appType": "study-buddy",
  "conversationHistory": []
}
```

**Response:**

```json
{
  "success": true,
  "response": "AI response here...",
  "appType": "study-buddy",
  "source": "gemini-ai",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```


### Apps

- **GET** `/api/apps` - Get all available apps
- **GET** `/api/apps/:appType` - Get specific app configuration

## ⚡ Quick Setup

1. **Install dependencies** (from root):

   ```bash
   npm install
   ```

2. **Get Gemini API Key**:

   - Visit: https://makersuite.google.com/app/apikey
   - Create free API key

3. **Configure environment**:

   ```bash
   cp server/.env.example server/.env
   ```

   Add your API key to `server/.env`:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run backend**:
   ```bash
   npm run dev:backend
   ```

Backend runs on `http://localhost:3001` 🎉

## 📁 Project Structure

```
server/
├── src/
│   ├── index.js              # Express app entry point
│   ├── routes/
│   │   ├── chat.js          # Chat endpoints
│   │   └── apps.js          # App management endpoints
│   └── services/
│       ├── gemini-service.js # Google Gemini AI integration
│       └── app-service.js    # App config management
├── .env                      # Environment variables (API keys)
├── .env.example              # Environment template
├── GEMINI_SETUP.md          # Detailed setup guide
└── README.md                # This file
```

## 🤖 Google Gemini Integration

The backend uses Google Gemini AI for intelligent responses:

1. **Lazy Initialization**: API initialized only when needed
2. **App-Specific Prompts**: Each app has unique system prompt
3. **Conversation History**: Maintains context across messages
4. **Error Handling**: Graceful fallback with clear error messages

### How It Works

```javascript
// 1. User sends message
POST / api / chat;

// 2. Backend loads app config
const config = await getAppConfig(appType);

// 3. Sends to Gemini with system prompt
const response = await generateGeminiResponse({
  message,
  appType,
  conversationHistory,
});

// 4. Returns AI response
return {response, source: "gemini-ai"};
```

## 🔧 Development

- **Backend Port**: 3001
- **Frontend Port**: 3000
- **CORS**: Enabled for local development
- **Hot Reload**: Restart server after code changes

### Running Tests

```bash
# Test Gemini API connection
npm run dev:backend
# Look for: ✅ Google Gemini AI is connected
```

### Debugging

Enable detailed logging in `src/services/gemini-service.js`:

- Check `[Gemini]` logs for AI processing
- Check `[Chat]` logs for request handling
- Check `[Debug]` logs for API key status

## 🌟 Key Files

- **`src/index.js`** - Server setup, middleware, routes
- **`src/routes/chat.js`** - Chat endpoint logic
- **`src/services/gemini-service.js`** - AI integration
- **`src/services/app-service.js`** - App config loader

## 🚨 Troubleshooting

### "Gemini API not configured"

- Check `.env` file exists in `server/` directory
- Verify `GEMINI_API_KEY` is set
- Restart server after adding key

### "Empty response from Gemini"

- Check API key is valid
- Verify internet connection
- Check API quota at https://makersuite.google.com/

### Port already in use

```bash
# Kill process on port 3001
npx kill-port 3001
```

## 📚 Documentation

- [Gemini Setup Guide](./GEMINI_SETUP.md) - Detailed AI setup
- [Main README](../README.md) - Full project documentation
- [Google Gemini Docs](https://ai.google.dev/docs) - Official API docs

## 🎯 Tech Stack

- **Express.js 5** - Web framework
- **Google Gemini AI** - AI responses
- **Node.js** - Runtime (ES Modules)
- **dotenv** - Environment variables
- **CORS** - Cross-origin support

---

**Built with 💀 using Google Gemini AI**
