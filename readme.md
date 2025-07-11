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

1. **Clone the repository** (or download the source code files: `index.html`, `styles.css`, `scripts.js`, and `questions.json`).

    ```sh
    git clone [https://github.com/your-username/data-engineering-trivia.git](https://github.com/your-username/data-engineering-trivia.git)
    ```

2. **Navigate to the project directory.**

    ```sh
    cd data-engineering-trivia
    ```

3. **Open the `index.html` file** in your web browser. You can do this by double-clicking the file or right-clicking and selecting "Open with" your browser of choice.

That's it! The application should now be running locally.

---

## 🎮 How to Play

1. Open the application to see the welcome screen.
2. **(Optional)** Click the **"Enable Timer"** toggle switch if you want to challenge yourself with a 15-second time limit per question.
3. Click the **"Start Quiz 🚀"** button to begin.
4. For each question, select the answer you believe is correct. Look for the verification icon next to the question number:
    * ✅ **Verified:** The question has been reviewed for accuracy.
    * 🛡️ **Not Verified:** This question is awaiting community review. Consider contributing to the project by verifying it!
5. The application will immediately show you if your choice was right or wrong. If you were wrong, an explanation will appear.
6. Click the **"Next Question →"** button to proceed.
7. After the final question, your total score and a performance summary will be displayed.
8. Click **"Try Again 🔄"** to restart the quiz.

---

## 📂 File Structure

```sh
.
├── 📄 index.html      \# The main HTML file (structure)
├── 🎨 styles.css       \# All CSS styles (presentation)
├── ⚙️ scripts.js       \# JavaScript application logic (functionality)
└── ❓ questions.json   \# Database of trivia questions and answers
````

---

## 🔧 How to Add Questions

You can easily add your own questions to the quiz by editing the `questions.json` file.

1. Open the `questions.json` file in a text editor.
2. Inside the main `[]` brackets, you will see a list of question "objects," each enclosed in `{}` curly braces and separated by commas.
3. To add a new question, copy an existing question object, paste it after the last one, and make sure to add a comma after the preceding object.
4. Modify the values for each key in your new question object.

### Question Object Explained

Here is a breakdown of each key in a question object:

```json
{
  "question": "Which Google Cloud service is a fully managed, serverless data warehouse?",
  "answers": [
    "Cloud SQL",
    "Bigtable",
    "BigQuery",
    "Datastore"
  ],
  "correct": 2,
  "explanation": "BigQuery is Google Cloud's serverless, highly scalable, and cost-effective cloud data warehouse.",
  "verified": true
}
````

* `"question"`: (String) The text of the question you want to ask.
* `"answers"`: (Array of Strings) A list of possible answers. You should provide four options.
* `"correct"`: (Number) The index of the correct answer in the `"answers"` array. **This is zero-based**, meaning the first answer is `0`, the second is `1`, the third is `2`, and the fourth is `3`. In the example above, `2` points to `"BigQuery"` as the correct answer.
* `"explanation"`: (String) A detailed explanation of why the correct answer is right. This will be shown to the user if they answer incorrectly.
* `"verified"`: (Boolean) Set this to `true` if the question and its explanation have been reviewed for accuracy. This will display the "Verified" icon (✅). If you set it to `false` or omit the key entirely, the "Not Verified" icon (🛡️) will be shown.

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you'd like to contribute, you can help by:

* Verifying unverified questions and their explanations for accuracy.
* Adding new, high-quality questions to `questions.json`.
* Reporting bugs or suggesting new features by opening an issue.
* Improving the code or documentation.

Please feel free to open an issue or submit a pull request on the project's GitHub repository.

-----

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
