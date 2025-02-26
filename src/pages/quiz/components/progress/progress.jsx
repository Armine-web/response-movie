import { useContext } from "react";
import { QuizContext } from "../../context/quiz-context";
import "./progress.css";

export const Progress = () => {
    const { points, index, questions, correctAnswersCount } = useContext(QuizContext);
    
    return (
        <header className="progressHeader">
            <progress 
                max={questions.length}
                value={correctAnswersCount}
            />
            
            <p className="d-flex justify-content-between align-items-center">
                <span className="mt-2">
                    Question 
                    <span style={{ marginLeft: "6px", padding: "2px 5px", backgroundColor: "#EC8305", borderRadius: "5px" }}>
                        {index + 1} / {questions.length}
                    </span>
                </span>  
                <span className="mt-2">
                    Points 
                    <span style={{ marginLeft: "6px", padding: "2px 5px", backgroundColor: "#EC8305", borderRadius: "5px" }}>
                        {points} / {questions.length * 10}
                    </span>
                </span> 
            </p>
        </header>
    );
};
