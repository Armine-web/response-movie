import { useContext } from "react"
import { QuizContext } from "../../context/quiz-context"

export const Progress = () => {
    const { points, index, questions, answer } = useContext(QuizContext);
    return (
        <header>
            <progress max = {questions.length}
                value = {index + Number(answer !== null)}/>
                
            <p>
                Question {index + 1} / {questions.length}
                <p className="">{points} / {questions.length * 10}</p>
            </p>
        </header>
        
    )
}