import { useContext, useMemo } from "react"
import { QuizContext } from "../../context/quiz-context"

const getemojiIcon = (percentage) => {
    let emoji;
    if (percentage >= 0 && percentage < 20) {   
        emoji = "🙄";
        } else if (percentage >= 20 && percentage < 40) {
            emoji = "🤔";
            } else if (percentage >= 40 && percentage < 60) {
                emoji = "🙂";
                } else if (percentage >= 60 && percentage < 80) {
                    emoji = "😀";
                    } else if (percentage >= 80 && percentage <= 100) {
                        emoji = "😍";
                        } 
                    return emoji;
}
export const FinishScreen = () => {
    const { points, maxPossiblePoints, dispatch } = useContext(QuizContext);
    const emoji = useMemo(()=>{
       return getemojiIcon((points / maxPossiblePoints) * 100);
    }, [points, maxPossiblePoints]);
   
    return (
        <div className="">
            <p>
                <p>{emoji}</p>
                <span>
                    You scored {points} out of {maxPossiblePoints} points;
                </span>
            </p>

            <button onClick={() => dispatch ({
                type: "RESTART"
            })}>
                Try Again
            </button>

        </div>
    )
}