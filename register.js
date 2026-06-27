const scriptURL = "https://script.google.com/macros/s/AKfycbxIiThBPA90NUQHBkbGxjS7SB8fauTOG9KYeji9x9_VXSNKV1IhrEVx3B-g21UAS8UD/exec";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    const btn = document.querySelector(".btn");
    btn.disabled = true;
    btn.innerHTML = "Creating Account...";

    const data = {
        name,
        email,
        phone,
        password
    };

    try{

        await fetch(scriptURL,{
            method:"POST",
            headers:{
                "Content-Type":"text/plain;charset=utf-8"
            },
            body:JSON.stringify(data)
        });

        showSuccess();

    }catch(error){

        alert("Registration Failed!");

        console.error(error);

        btn.disabled = false;
        btn.innerHTML = "Create Account";

    }

});

function showSuccess() {

    document.body.innerHTML = `

    <div style="
        min-height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#F7F2EA;
        font-family:'Poppins',sans-serif;
        padding:20px;
    ">

        <div style="
            width:100%;
            max-width:550px;
            background:#ffffff;
            border-radius:20px;
            padding:50px 40px;
            text-align:center;
            box-shadow:0 15px 40px rgba(0,0,0,0.08);
        ">

            <div style="
                font-size:70px;
                color:#28a745;
                margin-bottom:20px;
            ">
                ✅
            </div>

            <h1 style="
                color:#9E1B32;
                margin-bottom:20px;
                font-size:34px;
            ">
                Registration Successful!
            </h1>

            <p style="
                color:#555;
                line-height:1.8;
                font-size:17px;
                margin-bottom:15px;
            ">
                <strong>Thank you for registering with Italiano Bharati Academy.</strong>
            </p>

            <p style="
                color:#666;
                line-height:1.8;
                font-size:16px;
            ">
                Your registration has been received successfully.
            </p>

            <p style="
                color:#666;
                line-height:1.8;
                font-size:16px;
                margin-top:15px;
            ">
                Your account is currently
                <strong style="color:#9E1B32;">pending approval</strong>.
            </p>

            <p style="
                color:#666;
                line-height:1.8;
                font-size:16px;
                margin-top:15px;
            ">
                We will notify you once your account has been activated.
            </p>

            <hr style="
                margin:30px 0;
                border:none;
                border-top:1px solid #eee;
            ">

            <h2 style="
                color:#9E1B32;
                font-size:24px;
            ">
                Redirecting in
                <span id="countdown">5</span>
                seconds...
            </h2>

        </div>

    </div>

    `;

    let seconds = 5;

    const timer = setInterval(() => {

        seconds--;

        document.getElementById("countdown").textContent = seconds;

        if (seconds <= 0) {

            clearInterval(timer);

            // Replace with your website URL
            window.location.href = "index.html";

        }

    }, 1000);
}