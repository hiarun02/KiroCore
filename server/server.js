import express from "express";
const app = express();

app.use(express.json());
app.use("/kiro");

const PORT = 4000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
