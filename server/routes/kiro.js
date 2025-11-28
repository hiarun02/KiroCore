import express from "express";
import {testKiroCLI} from "../services/kiro-service.js";

const router = express.Router();

// GET /api/kiro/status - Check Kiro CLI availability
router.get("/status", async (req, res) => {
  try {
    const available = await testKiroCLI();

    res.json({
      success: true,
      available,
      message: available
        ? "Kiro CLI is available"
        : "Kiro CLI not found - using fallback mode",
    });
  } catch (error) {
    console.error("[Kiro] Status check error:", error);
    res.json({
      success: true,
      available: false,
      message: "Kiro CLI not available",
    });
  }
});

export {router as kiroRouter};
