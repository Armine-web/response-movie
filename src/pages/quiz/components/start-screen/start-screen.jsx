import { useContext } from "react";
import { QuizContext } from "../../context/quiz-context";

export const StartScreen = () => {
  const { questions, dispatch } = useContext(QuizContext);
  const numberOfQuestions = questions.length;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 
      style={{color: "#EC8305"}}>Welcome to The Movie Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your movie knowledge skills</h3>
      <button
        className="btn btn-warning"
        onClick={() => dispatch({ type: "START" })}
      >
        Let's start
      </button>
    </div>
  );
};