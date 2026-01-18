const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let latest = {
  gas: 0,
  temperature: 0,
  water: 0,
  ts: Date.now()
};

app.post("/update", (req, res) => {
  const { gas, temperature, water } = req.body || {};
  if (
    typeof gas !== "number" ||
    typeof temperature !== "number" ||
    typeof water !== "number"
  ) {
    return res.status(400).json({ ok: false });
  }
  latest = { gas, temperature, water, ts: Date.now() };
  res.json({ ok: true });
});

app.get("/data", (req, res) => {
  res.json(latest);
});

app.get("/", (req, res) => res.send("AeroReGen API running"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Running on", port));
