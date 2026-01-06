<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB88yi10ICjymyNM97DPP1mjKpsX9RbheQ",
    authDomain: "pictsgpacal.firebaseapp.com",
    projectId: "pictsgpacal",
    storageBucket: "pictsgpacal.firebasestorage.app",
    messagingSenderId: "10615424340",
    appId: "1:10615424340:web:61a460abce3d1512f934c1",
    measurementId: "G-M3PBY5KD3S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
