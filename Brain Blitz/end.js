document.getElementById("final-score").innerText = localStorage.getItem("quizScore");

function restartGame() {
    localStorage.removeItem("quizScore");
    window.location.href = "index.html";
}
