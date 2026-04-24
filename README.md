 FY SGPA Calculator – PICT (Semester 1 and Semester 2)

 Live Website:
 https://pictsgpa-calculator.vercel.app/

A modern, responsive SGPA Calculator for PICT First Year Engineering students (Semester 1), built according to PICT / SPPU evaluation rules.

This project allows students to enter subject-wise marks (theory + labs) and instantly calculate their SGPA, with a clean UI and accurate credit-based computation.

Features

 Theory Subjects Support

Attendance

Internals

In-Sem Exam

End-Sem Exam

 Labs & Activities Support

LAC Lab

CST/QP Lab

CGD/MFR Lab

CPPS Lab

IIDTL / IKS

Soft Skills / FAB

CCA-1

 Accurate SGPA Calculation

Credit-weighted grade points

Marks normalized to 100 where required

Based on official SPPU grading scheme

 Student Name Validation

SGPA cannot be calculated without entering name

Clean & Aesthetic UI

Mobile responsive

Card-based layout

Smooth user experience



Real-time database backend

Deployed on Vercel

 SGPA Calculation Logic

Each subject total is calculated out of 100

Grade Points Mapping:

Marks Range	Grade Point
91–100	10
81–90	  9
71–80   8
61–70	  7
51–60	  6
41–50	  5
< 40	  0​

🛠 Tech Stack
Frontend

HTML5

CSS3 (Modern UI)

Vanilla JavaScript (ES Modules)

Backend / Database

Firebase Firestore

Deployment

Vercel

📂 Project Structure
fy-sgpa-calculator-sem1/
│
├── index.html        # Main UI
├── style.css         # Styling & UI
├── script.js         # SGPA logic + Firebase save
├── firebase.js       # Firebase configuration
├── README.md

 Getting Started (Local Setup)

1️⃣ Clone the repository

git clone https://github.com/Krutant393/fy-sgpa-calculator-sem1.git



4️⃣ Run locally
Use Live Server or any static server.
