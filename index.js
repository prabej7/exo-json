const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to ExoJson API!" });
});

app.get("/api/data/:points", (req, res) => {
  const data = require("./master_exoplanet_dataset.json");
  const points = parseInt(req.params.points, 10);

  if (isNaN(points) || points < 0) {
    return res.status(400).json({ message: "Invalid points parameter" });
  }

  return res
    .status(200)
    .json({ message: "Success", data: data.slice(0, points) });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
