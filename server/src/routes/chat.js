import express from "express";
import {generateGeminiResponse} from "../services/gemini-service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {message, appType, conversationHistory = []} = req.body;

    if (!message || !appType) {
      return res.status(400).json({error: "Missing message or appType"});
    }

    const response = await generateGeminiResponse({
      appType,
      message,
      conversationHistory,
    });

    res.json({
      success: true,
      response: response.content,
      appType,
      source: response.source,
      timestamp: response.timestamp,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get AI response",
      details: error.message,
    });
  }
});

export {router as chatRouter};
