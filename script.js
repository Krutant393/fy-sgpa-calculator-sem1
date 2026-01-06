import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ---------- UTIL FUNCTIONS ---------- */

function theoryTotal(att, internals, insem, ese) {
  return (
    Number(att || 0) +
    Number(internals || 0) +
    Number(insem || 0) +
    Number(ese || 0)
  );
}

function labTo100(marks, max) {
  return (Number(marks || 0) / max) * 100;
}

function marksToGradePoint(marks) {
  if (marks >= 91) return 10;
  if (marks >= 81) return 9;
  if (marks >= 71) return 8;
  if (marks >= 61) return 7;
  if (marks >= 51) return 6;
  if (marks >= 41) return 5;
  return 0;
}

/* ---------- MAIN LOGIC ---------- */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("sgpaForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* ---- NAME VALIDATION ---- */
    const name = document.getElementById("studentName").value.trim();
    if (name === "") {
      alert("Please enter your name before calculating SGPA");
      return;
    }

    /* ---- SUBJECT DATA ---- */
    const subjects = [
      { name: "LAC",  marks: theoryTotal(lac_att.value, lac_int.value, lac_insem.value, lac_ese.value), credits: 3 },
      { name: "CST",  marks: theoryTotal(cst_att.value, cst_int.value, cst_insem.value, cst_ese.value), credits: 2 },
      { name: "CGD",  marks: theoryTotal(cgd_att.value, cgd_int.value, cgd_insem.value, cgd_ese.value), credits: 2 },
      { name: "CPPS", marks: theoryTotal(cpps_att.value, cpps_int.value, cpps_insem.value, cpps_ese.value), credits: 2 },
      { name: "ESE",  marks: theoryTotal(ese_att.value, ese_int.value, ese_insem.value, ese_ese.value), credits: 2 },

      { name: "LAC Lab",  marks: labTo100(lacLab.value, 25), credits: 1 },
      { name: "CST Lab",  marks: labTo100(cstLab.value, 25), credits: 1 },
      { name: "CGD Lab",  marks: labTo100(cgdLab.value, 25), credits: 1 },
      { name: "CPPS Lab", marks: labTo100(cppsLab.value, 25), credits: 1 },
      { name: "IIDTL",    marks: labTo100(iidtl.value, 50), credits: 1 },
      { name: "Soft Skills", marks: labTo100(ss.value, 25), credits: 2 },
      { name: "CCA", marks: labTo100(cca.value, 25), credits: 1 }
    ];

    /* ---- SGPA CALCULATION ---- */
    let totalCredits = 0;
    let weightedPoints = 0;

    subjects.forEach(sub => {
      const gp = marksToGradePoint(sub.marks);
      weightedPoints += gp * sub.credits;
      totalCredits += sub.credits;
    });

    const finalSGPA = (weightedPoints / totalCredits).toFixed(2);

    /* ---- UI RESULT ---- */
    document.getElementById("result").innerHTML =
      `🎯 <b>${name}, your SGPA is ${finalSGPA}</b>`;

    /* ---- FIRESTORE SAVE ---- */
    try {
      await addDoc(collection(db, "sgpa_records"), {
        name: name,
        sgpa: Number(finalSGPA),
        subjects: subjects,
        createdAt: serverTimestamp()
      });

      console.log("✅ Data saved to Firestore");

    } catch (error) {
      console.error("❌ Firestore Error:", error);
      alert("Failed to save data. Please try again.");
    }
  });
});
