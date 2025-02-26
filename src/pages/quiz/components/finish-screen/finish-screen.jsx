import { useContext, useMemo } from "react"
import { QuizContext } from "../../context/quiz-context"
import "./finish-screen.css"

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
        <div className="finish-screen">
            <p>
                <p className="fs-1">{emoji}</p>
                <span>
                You Scored 
                <span style={{margin: '0 12px', color: '#EC8305', fontWeight: 'bolder' }}>{points}</span> 
                Out Of 
                <span style={{ color: '#EC8305', margin: '0 12px', fontWeight: 'bolder' }}>{maxPossiblePoints} </span>
                Points.
            </span>
            </p>

            <button className="restartButton" onClick={() => dispatch ({
                type: "RESTART"
            })}>
                Try Again
            </button>

        </div>
    )
}