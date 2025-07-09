const quizData = [
{
    question: "What house at Hogwarts does Harry belong to?",
    options: ["Ravenclaw", "Hufflepuff", "Slytherin", "Gryffindor"],
    answer: "Gryffindor"
},
{
    question: "Who is the headmaster of Hogwarts during Harry’s first year?",
    options: ["Albus Dumbledore", "Severus Snape", "Minerva McGonagall", "Gellert Grindelwald"],
    answer: "Albus Dumbledore"
},
{
    question: "What is the name of Harry's pet owl?",
    options: ["Crookshanks", "Hedwig", "Scabbers", "Fawkes"],
    answer: "Hedwig"
},
{
    question: "What spell is used to disarm an opponent?",
    options: ["Lumos", "Avada Kedavra", "Expelliarmus", "Expecto Patronum"],
    answer: "Expelliarmus"
},
{
    question: "Which house is Draco Malfoy in?",
    options: ["Hufflepuff", "Slytherin", "Gryffindor", "Ravenclaw"],
    answer: "Slytherin"
}
];

// Shuffle utility
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    shuffleArray(quizData); // Shuffle questions

    const form = document.getElementById("quiz-form");

    quizData.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "question";
      if (index === 0) div.classList.add("active");

      const questionHTML = `<p>${index + 1}. ${item.question}</p>`;

      const options = [...item.options];
      shuffleArray(options); // Shuffle options

      const optionsHTML = options.map(opt =>
        `<label><input type="radio" name="q${index}" value="${opt}">${opt}</label>`
      ).join("");

      const buttonHTML = index === quizData.length - 1
        ? `<button type="submit">Submit</button>`
        : `<button type="button">Next</button>`;

      div.innerHTML = questionHTML + optionsHTML + buttonHTML;
      form.appendChild(div);
    });

    const questions = document.querySelectorAll(".question");
    let current = 0;

    form.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON" && event.target.type !== "submit") {
        event.preventDefault();
        questions[current].classList.remove("active");
        current++;
        if (current < questions.length) {
          questions[current].classList.add("active");
        }
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const userAnswers = Array.from(data.values());
      let score = 0;

      userAnswers.forEach((ans, i) => {
        if (ans === quizData[i].answer) {
          score++;
        }
      });

      document.getElementById("out").innerText = `✅ You got ${score} out of ${quizData.length} correct!`;
      form.style.display = "none"; // Hide form after submit
    });
