import React, { useState } from "react";
import styles from "../../../../styles/upsc/quiz.module.css";

function QiestionQuizCard({
  currentQuestion,
  selectedAnswer,
  handleAnswerSelection,
  handlePreviousQuestion,
  handleNextQuestion,
  saveQuiz,
  questionNumber,
  questions,
}) {
  return (
    <div className="auto mb-16">
      <a className="block relative p-6 bg-white border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-decoration-none">
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg text-gray-700 ">
            Question {questionNumber} out of {questions.length} questions
          </span>
          <button className={styles["finish-btn"]} onClick={saveQuiz}>
            Finish Test
          </button>
        </div>
        <hr className="border-1 border-solid border-gray-400 my-4" />

        <div className="flex">
          <div className="flex-auto w-3/5 h-290">
            {/* Question Panel */}
            <p className="px-6 w-full text-[#7a7a7a] text-justify">
              {currentQuestion ? currentQuestion.text : ""}
            </p>
          </div>

          <div className="flex-auto w-2/5 items-center">
            {/* Answer Panel */}
            <div className="radio-block w-full">
              {currentQuestion &&
                currentQuestion.choices.map((choice, index) => (
                  <div
                    className={`${styles["custom-answer"]} ${
                      selectedAnswer === choice.id ? styles["selected"] : ""
                    }`}
                    key={choice.id}
                  >
                    <input
                      type="radio"
                      name="radio01"
                      id={choice.id}
                      value={choice.id}
                      checked={selectedAnswer === choice.id}
                      onChange={handleAnswerSelection}
                    />
                    <label htmlFor={choice.id}>
                      <span>{String.fromCharCode(65 + index)}</span>
                      <p
                        style={{
                          margin: "0px",
                          marginLeft: "40px",
                        }}
                      >
                        {choice.text}
                      </p>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className={`${styles["buttons-group"]} flex-none`}
            onClick={handlePreviousQuestion}
            disabled={questionNumber === 1 ? true : false}
          >
            Previous
          </button>
          <button
            className={styles["buttons-group"]}
            onClick={handleNextQuestion}
            disabled={questionNumber === questions.length ? true : false}
          >
            Next
          </button>
        </div>
      </a>
    </div>
  );
}

export default QiestionQuizCard;
