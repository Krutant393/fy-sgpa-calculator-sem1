function theoryTotal(att, internals, insem, ese) {
  return (
    Number(att) +
    Number(internals) +
    Number(insem) +
    Number(ese)
  );
}

function labTo100(marks, max) {
  return (marks / max) * 100;
}

document.getElementById("sgpaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const subjects = [
    // THEORY
    {
      marks: theoryTotal(lac_att.value, lac_int.value, lac_insem.value, lac_ese.value),
      credits: 3
    },
    {
      marks: theoryTotal(cst_att.value, cst_int.value, cst_insem.value, cst_ese.value),
      credits: 2
    },
    {
      marks: theoryTotal(cgd_att.value, cgd_int.value, cgd_insem.value, cgd_ese.value),
      credits: 2
    },
    {
      marks: theoryTotal(cpps_att.value, cpps_int.value, cpps_insem.value, cpps_ese.value),
      credits: 2
    },
    {
      marks: theoryTotal(ese_att.value, ese_int.value, ese_insem.value, ese_ese.value),
      credits: 2
    },

    // LABS / ACTIVITIES
    { marks: labTo100(lacLab.value, 25), credits: 1 },
    { marks: labTo100(cstLab.value, 25), credits: 1 },
    { marks: labTo100(cgdLab.value, 25), credits: 1 },
    { marks: labTo100(cppsLab.value, 25), credits: 1 },
    { marks: labTo100(iidtl.value, 50), credits: 1 },
    { marks: labTo100(ss.value, 25), credits: 2 },
    { marks: labTo100(cca.value, 25), credits: 1 },

    // NPTEL – credit only
    { marks: 100, credits: 1 }
  ];

  const res = await fetch("http://localhost:5000/calculate-sgpa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subjects })
  });

  const data = await res.json();

  document.getElementById("result").innerHTML =
    `🎯 <b>Your SGPA is ${data.sgpa}</b>`;
    
});

//
//<h2 id="xy">Created by <a href=https://www.linkedin.com/in/krutant-deshmukh/>Linkedin</a> </h2>