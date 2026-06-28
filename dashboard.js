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

document.getElementById("studentName").innerHTML=data.name;

document.getElementById("name").innerHTML=data.name;

document.getElementById("email").innerHTML=data.email;

document.getElementById("course").innerHTML=data.course;

document.getElementById("batch").innerHTML=data.batch;
    

    receiptBtn.onclick = () => {
    if(student.receiptUrl){
        window.open(student.receiptUrl, "_blank");
    }else{
        alert("Receipt not available.");
    }
};

materialsBtn.onclick = () => {
    if(student.materialsUrl){
        window.open(student.materialsUrl, "_blank");
    }else{
        alert("Materials not available.");
    }
};

assignmentBtn.onclick = () => {
    if(student.assignmentUrl){
        window.open(student.assignmentUrl, "_blank");
    }else{
        alert("Assignments not available.");
    }
};

syllabusBtn.onclick = () => {
    if(student.syllabusUrl){
        window.open(student.syllabusUrl, "_blank");
    }else{
        alert("Syllabus not available.");
    }
};

liveClassBtn.onclick = () => {
    if(student.liveClassUrl){
        window.open(student.liveClassUrl, "_blank");
    }else{
        alert("Live class not available.");
    }
};

recordedBtn.onclick = () => {
    if(student.recordedClassesUrl){
        window.open(student.recordedClassesUrl, "_blank");
    }else{
        alert("No recorded classes available.");
    }
};

paymentHistoryBtn.onclick = () => {
    if(student.paymentHistoryUrl){
        window.open(student.paymentHistoryUrl, "_blank");
    }else{
        alert("Payment history not available.");
    }
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


