import { useContext } from "react";
import { QuizContext } from "../../context/quiz-context";
import "./option.css";

export const Options = ({ question }) => {
    const { dispatch, answer } = useContext(QuizContext);

    const hasAnswered = answer !== null; 
    

    const handleSelectOption = (index) => {
        dispatch({ type: "NEW_ANSWER", payload: index });
    };

    return (
        <div>
            {question.options.map((option, index) => {
                let classes = "";
                if (hasAnswered) {
                    if (index === question.correctOption) {
                        classes = "correct";
                    } else if (index === answer) {
                        classes = "wrong"; 
                    }
                }

                return (
                    <button
                        key={index} 
                        style={{
                            width: "100%",
                            padding: "12px 12px",
                            borderRadius: "12px",
                            boxShadow: "0 0 8px rgba(206, 192, 192, 0.8)",
                            backgroundColor: "#212529",
                            color: "white",
                            margin: "20px",
                        }}
                        className={classes}
                        onClick={() => handleSelectOption(index)}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
};
