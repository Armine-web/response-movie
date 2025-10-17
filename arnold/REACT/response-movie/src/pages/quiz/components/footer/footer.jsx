import { useContext, useEffect } from "react"
import { QuizContext } from "../../context/quiz-context"
import "./footer.css"

const getCorrectFormat = (sec) => {
    const mins = Math.floor(sec / 60);
    const seconds = sec % 60;
        return (
            <span
            style={{
                width: "200px",
                textAlign: "center",
                padding: "12px 12px",
                borderRadius: "12px",
                boxShadow: "0 0 8px rgba(206, 192, 192, 0.8)",
                backgroundColor: "#212529",
                color: "rgb(236, 131, 5)",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "50px",
            }}>
                {mins < 10 && "0"}
                {mins}:{seconds < 10 && "0"}
                {seconds}
            </span>
        );
};

export const Footer = () => {
    const { dispatch, answer, index, secondsRemaining, questions } = useContext(QuizContext);

    useEffect(() => {
        const id = setInterval(() => {
          dispatch({ type: "TICK" });
        }, 1000);
        return () => {
            clearInterval(id);
          };
        }, [dispatch]);
      
        const timer = getCorrectFormat(secondsRemaining);
    return(
        <footer className="d-flex justify-center align-items-center flex-column-reverse">
            {timer}

            {answer !== null && index < questions.length - 1 && (
                <button className="next-and-finish-question-button"
                    onClick={() => dispatch({type: "NEXT_QUESTION"})}>
                    Next
                </button>  
            )
            
            }

            {answer !== null && index === questions.length - 1 && (
                <button className="next-and-finish-question-button" 
                    onClick={() => dispatch({type: "FINISH"})}>
                    Finish
                </button>  
            )
            
            }


            

        </footer>
    )
}