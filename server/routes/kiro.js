import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const {input, agentConfig} = req.body;

  // Mock response for now (replace with real Kiro API call)
  const reply = `(${agentConfig.role}) You said: ${input}`;
  res.json({reply});
});

export default router;
