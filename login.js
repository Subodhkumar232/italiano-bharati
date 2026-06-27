import { login } from "./firebase.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        await login(email, password);

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});