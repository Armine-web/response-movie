import { useContext } from "react"
import { QuizContext } from "../../context/quiz-context"
import { Options } from "./options";

export const Questions = () => {
    const { questions, index } = useContext(QuizContext);
    console.log(questions);
    const question = questions[index]
    
    return(
        <div>
            <h4>{question.question}</h4>
            <Options question = {question} />
        </div>
    )
}