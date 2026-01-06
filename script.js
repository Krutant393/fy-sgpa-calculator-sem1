function theoryTotal(att, internals, insem, ese) {
  return Number(att || 0) +
         Number(internals || 0) +
         Number(insem || 0) +
         Number(ese || 0);
}

function labTo100(marks, max) {
  return (Number(marks || 0) / max) * 100;
}

function marksToGradePoint(marks) {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 40) return 5;
  return 0;
}

async function saveToGoogleSheet(name, sgpa) {
  await fetch("https://script.google.com/macros/s/AKfycbyl7g_ah3vMi_VRvj-WbJWrXXhO4useWr_AoM3F7tsxpL27qTNoZk5oX7w-04HWyhDfGQ/exec", {
  method: "POST",
  body: JSON.stringify({
    name: name,
    sgpa: finalSGPA
  })
});


document.getElementById("sgpaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ NAME VALIDATION
  const name = document.getElementById("studentName").value.trim();
  if (name === "") {
    alert("Please enter your name first");
    return;
  }

  const subjects = [
    // THEORY
    { marks: theoryTotal(lac_att.value, lac_int.value, lac_insem.value, lac_ese.value), credits: 3 },
    { marks: theoryTotal(cst_att.value, cst_int.value, cst_insem.value, cst_ese.value), credits: 2 },
    { marks: theoryTotal(cgd_att.value, cgd_int.value, cgd_insem.value, cgd_ese.value), credits: 2 },
    { marks: theoryTotal(cpps_att.value, cpps_int.value, cpps_insem.value, cpps_ese.value), credits: 2 },
    { marks: theoryTotal(ese_att.value, ese_int.value, ese_insem.value, ese_ese.value), credits: 2 },

    // LABS
    { marks: labTo100(lacLab.value, 25), credits: 1 },
    { marks: labTo100(cstLab.value, 25), credits: 1 },
    { marks: labTo100(cgdLab.value, 25), credits: 1 },
    { marks: labTo100(cppsLab.value, 25), credits: 1 },
    { marks: labTo100(iidtl.value, 50), credits: 1 },
    { marks: labTo100(ss.value, 25), credits: 2 },
    { marks: labTo100(cca.value, 25), credits: 1 }
  ];

  let totalCredits = 0;
  let weightedPoints = 0;

  subjects.forEach(sub => {
    const gp = marksToGradePoint(sub.marks);
    weightedPoints += gp * sub.credits;
    totalCredits += sub.credits;
  });

  const finalSGPA = (weightedPoints / totalCredits).toFixed(2);

  document.getElementById("result").innerHTML =
    `🎯 <b>${name}, your SGPA is ${finalSGPA}</b>`;

  // ✅ SAVE TO GOOGLE SHEET
  await saveToGoogleSheet(name, finalSGPA);
});

