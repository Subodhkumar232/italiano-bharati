import {

auth,

db,

onAuthStateChanged,

doc,

getDoc,

logout

}

from "./firebase.js";

onAuthStateChanged(auth,async(user)=>{ 

if(!user){

window.location.href="index.html";

return;


}

const ref=doc(db,"students",user.uid);

const snap=await getDoc(ref);

if(!snap.exists()){

alert("Student record not found");

return;

}


const data=snap.data();
console.log("FULL DATA:", data);

console.log("Amount:", data.paymentAmount);
console.log("Due Date:", data.paymentDueDate);
console.log("Message:", data.paymentMessage);
console.log("Payment Due:", data.paymentDue);

document.getElementById("studentName").innerHTML=data.name;

document.getElementById("name").innerHTML=data.name;

document.getElementById("email").innerHTML=data.email;

document.getElementById("course").innerHTML=data.course;

document.getElementById("batch").innerHTML=data.batch;

// Payment Due Section

const paymentAmount = document.getElementById("paymentAmount");
const paymentDueDate = document.getElementById("paymentDueDate");
const paymentMessage = document.getElementById("paymentMessage");
const payNowBtn = document.getElementById("payNowBtn");
const paymentValidationSection = document.getElementById("paymentValidationSection");

if (data.paymentDue) {

    paymentAmount.textContent = data.paymentAmount || "-";
    paymentDueDate.textContent = data.paymentDueDate || "-";

    paymentMessage.textContent =
        data.paymentMessage || "No payment information available.";

    payNowBtn.style.display = "inline-block";
    paymentValidationSection.style.display = "block";

} else {

    paymentAmount.textContent = "-";
    paymentDueDate.textContent = "-";

    paymentMessage.textContent =
        "Your account is up to date. There are no pending installments.";

    payNowBtn.style.display = "none";
    paymentValidationSection.style.display = "none";
}
payNowBtn.onclick = () => {

    if (data.razorpayLink && data.razorpayLink.trim() !== "") {

        window.open(data.razorpayLink, "_blank");

    } else {

        alert("No payment request is available at the moment.");

    }

};

document.getElementById("validatePaymentBtn").onclick = () => {
    window.open(
        "https://forms.gle/ekSFPGbqx5zjF7xu7",
        "_blank"
    );
};

// ======================
// LOAD SCHEDULE
// ======================

const scheduleRef = doc(db, "schedule", user.uid);

const scheduleSnap = await getDoc(scheduleRef);
console.log("Logged UID:", user.uid);
console.log("Schedule Exists:", scheduleSnap.exists());

if (scheduleSnap.exists()) {

    const schedule = scheduleSnap.data();

    console.log("Schedule Data:", schedule);

    document.getElementById("monday").textContent =
        schedule.monday || "Holiday";

    document.getElementById("tuesday").textContent =
        schedule.tuesday || "Holiday";

    document.getElementById("wednesday").textContent =
        schedule.wednesday || "Holiday";

    document.getElementById("thursday").textContent =
        schedule.thursday || "Holiday";

    document.getElementById("friday").textContent =
        schedule.friday || "Holiday";

    document.getElementById("saturday").textContent =
        schedule.saturday || "Holiday";

    document.getElementById("sunday").textContent =
        schedule.sunday || "Holiday";

} else {

    console.log("Schedule document not found.");

}

console.log("Entire document:", data);
console.log("paymentStatus =", data.paymentStatus);
console.log("Type =", typeof data.paymentStatus);


const liveButton = document.getElementById("liveClassBtn");

liveButton.addEventListener("click", () => {

    if (data.liveClassURL && data.liveClassURL.trim() !== "") {

        window.open(data.liveClassURL, "_blank");

    } else {

        alert("No live class is scheduled at the moment.");

    }

});

// Receipt
document.getElementById("receiptBtn").addEventListener("click", () => {
    if (data.receiptURL && data.receiptURL.trim() !== "") {
        window.open(data.receiptURL, "_blank");
    } else {
        alert("Receipt is not available.");
    }
});

// PDF Materials
document.getElementById("materialsBtn").addEventListener("click", () => {
    if (data.materialsURL && data.materialsURL.trim() !== "") {
        window.open(data.materialsURL, "_blank");
    } else {
        alert("Materials are not available.");
    }
});

// Assignments
document.getElementById("assignmentBtn").addEventListener("click", () => {
    if (data.assignmentURL && data.assignmentURL.trim() !== "") {
        window.open(data.assignmentURL, "_blank");
    } else {
        alert("Assignments are not available.");
    }
});

// Syllabus
document.getElementById("syllabusBtn").addEventListener("click", () => {
    if (data.syllabusURL && data.syllabusURL.trim() !== "") {
        window.open(data.syllabusURL, "_blank");
    } else {
        alert("Syllabus is not available.");
    }
});


const paymentStatus = document.getElementById("paymentStatus");

if ((data.paymentStatus || "").trim().toLowerCase() === "paid") {

    paymentStatus.innerHTML = "✅ Paid";
    paymentStatus.style.color = "#16a34a";

} else {

    paymentStatus.innerHTML = "❌ Unpaid";
    paymentStatus.style.color = "#dc2626";

}

document.getElementById("lastTransaction").textContent =
    data.lastTransaction || "--";

document.getElementById("transactionDate").textContent =
    data.transactionDate || "--";
});


document.querySelector(".logout-btn").onclick=async()=>{

await logout();

window.location.href="index.html";

};

document.querySelector(".logout-big").onclick=async()=>{

await logout();

window.location.href="index.html";

};

// Dark Mode Toggle
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    themeBtn.textContent =
        document.body.classList.contains("dark-mode")
            ? "☀️"
            : "🌙";
});

