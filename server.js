const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

function gradePoint(marks) {
  if (marks >= 91) return 10;
  if (marks >= 81) return 9;
  if (marks >= 71) return 8;
  if (marks >= 61) return 7;
  if (marks >= 51) return 6;
  if (marks >= 45) return 5;
  if (marks >= 40) return 4;
  return 0;
}

app.post("/calculate-sgpa", (req, res) => {
  const subjects = req.body.subjects;
  let totalCredits = 0;
  let weightedSum = 0;

  subjects.forEach(sub => {
    const gp = gradePoint(Number(sub.marks));
    weightedSum += gp * sub.credits;
    totalCredits += sub.credits;
  });

  res.json({
    sgpa: (weightedSum / totalCredits).toFixed(2)
  });
});

// Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
