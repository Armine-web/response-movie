import { useContext } from "react"
import { QuizContext } from "../../context/quiz-context"

export const Footer = () => {
    const { dispatch, answer, index, questions } = useContext(QuizContext)
    return(
        <footer className="d-flex justify-content-between align-center">
            Footer

            {answer !== null && index < questions.length - 1 && (
                <button className=""
                    onClick={() => dispatch({type: "NEXT_QUESTION"})}>
                    Next
                </button>  
            )
            
            }

            {answer !== null && index === questions.length - 1 && (
                <button className=""
                    onClick={() => dispatch({type: "FINISH"})}>
                    Finish
                </button>  
            )
            
            }


            

        </footer>
    )
}