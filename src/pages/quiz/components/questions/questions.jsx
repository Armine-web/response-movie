import { useContext } from "react"
import { QuizContext } from "../../context/quiz-context"
import { Options } from "./options";

export const Questions = () => {
    const { questions, index } = useContext(QuizContext);
    console.log(questions);
    const question = questions[index]
    
    return(
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h4 style={{color: "#EC8305", textTransform: "capitalize", margin: "20px"}}>{question.question}</h4>
            <Options question = {question} />
        </div>
    )
}