import { useContext } from "react"
import { QuizContext } from "../../context/quiz-context"
import "./option.css"

export const Options = ({ question }) => {
    const { dispatch, answer } = useContext(QuizContext);

    const hasAnswered = answer !== null;
    const isCorrectAnswer = question.correctOption === answer;
    
    const handleSelectOption = (index) => {
        dispatch({ type: "NEW_ANSWER", payload: index });

    };

    return (
        <div>
            {question.options.map((option, index) => {
                const classes = hasAnswered ? index === question.correctOption ? "correct" : "wrong" : "";
                return (
                    <button key = {option} className={`${classes}`} onClick={() =>handleSelectOption(index)}>{option}</button>
                )
            })}
        </div>
    )
}