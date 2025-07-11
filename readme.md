# 🧠 Data Engineering Trivia

Welcome to the Data Engineering Trivia! This is a fun, interactive quiz application designed to help users test and improve their knowledge for the Google Professional Data Engineer certification exam. Challenge yourself with questions covering core concepts like Google Cloud Platform services, data pipelines, BigQuery, and more.

---

## ✨ Features

* **Interactive Quiz Experience:** Engaging and user-friendly interface.
* **Dynamic Question Loading:** Questions are loaded from an external `questions.json` file, making them easy to update and expand.
* **Optional Timed Mode:** Enable a 15-second timer for each question to add an extra layer of challenge.
* **Verified Questions:** Questions can be marked as "verified" or "not verified," giving users more confidence in the content.
* **Scoring System:** Tracks your score, current question number, and answer streak.
* **Progress Bar:** Visual feedback on your progress through the quiz.
* **Instant Feedback:** See immediately whether your answer was correct or incorrect.
* **Detailed Explanations:** For incorrect answers, a detailed explanation is provided to help you learn.
* **Performance Summary:** At the end of the quiz, receive a final score and a personalized performance message.
* **Responsive Design:** Looks great on desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

This project is built with fundamental web technologies, keeping it lightweight and easy to run.

* **HTML:** For the structure and content of the application.
* **CSS:** For all styling, layout, and animations.
* **JavaScript (Vanilla):** For the application logic, including question handling, scoring, and user interaction.
* **JSON:** For storing and managing the trivia questions.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You only need a modern web browser (like Chrome, Firefox, or Edge).

### Installation

1.  **Clone the repository** (or download the source code files: `index.html`, `styles.css`, `scripts.js`, and `questions.json`).
    ```sh
    git clone [https://github.com/your-username/data-engineering-trivia.git](https://github.com/your-username/data-engineering-trivia.git)
    ```
2.  **Navigate to the project directory.**
    ```sh
    cd data-engineering-trivia
    ```
3.  **Open the `index.html` file** in your web browser. You can do this by double-clicking the file or right-clicking and selecting "Open with" your browser of choice.

That's it! The application should now be running locally.

---

## 🎮 How to Play

1.  Open the application to see the welcome screen.
2.  **(Optional)** Click the **"Enable Timer"** toggle switch if you want to challenge yourself with a 15-second time limit per question.
3.  Click the **"Start Quiz 🚀"** button to begin.
4.  For each question, select the answer you believe is correct. Look for the verification icon next to the question number:
    * ✅ **Verified:** The question has been reviewed for accuracy.
    * 🛡️ **Not Verified:** The question has not yet been reviewed.
5.  The application will immediately show you if your choice was right or wrong. If you were wrong, an explanation will appear.
6.  Click the **"Next Question →"** button to proceed.
7.  After the final question, your total score and a performance summary will be displayed.
8.  Click **"Try Again 🔄"** to restart the quiz.

---

## 📂 File Structure

The project is organized into the following files:

```sh
.
├── 📄 index.html      # The main HTML file (structure)
├── 🎨 styles.css       # All CSS styles (presentation)
├── ⚙️ scripts.js       # JavaScript application logic (functionality)
└── ❓ questions.json   # Database of trivia questions and answers
```

---

## 🔧 Customization: Adding Questions

You can easily add your own questions to the quiz.

1.  Open the `questions.json` file.
2.  Follow the existing structure to add a new question object to the `questions` array.
3.  Each question object must have the following format:

    ```json
    {
      "question": "What is your new question?",
      "answers": [
        "Answer A",
        "Answer B",
        "Answer C",
        "Answer D"
      ],
      "correct": 2,
      "explanation": "This is the detailed explanation for the correct answer. The correct answer is C because...",
      "verified": true
    }
    ```

    **Important Keys:**
    * `"correct"`: This field is a zero-based index. So, `0` corresponds to the first answer, `1` to the second, and so on.
    * `"verified"`: Set this to `true` to display the "Verified" icon. If this key is missing or set to `false`, the "Not Verified" icon will be shown.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.