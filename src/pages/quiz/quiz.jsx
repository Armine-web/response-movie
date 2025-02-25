import { useContext, useEffect } from "react"
import { QuizProvider, QuizContext, STATUES} from "./context/quiz-context"
import{ quizApi } from "../../api/quiz.api"
import { Loading } from "./components/loading/loading"
import { Error } from "./components/error/error"
import { StartScreen } from "./components/start-screen/start-screen"
import { Progress } from "./components/progress/progress"
import { Questions } from "./components/questions/questions"
import { Footer } from "./components/footer/footer"
import { FinishScreen } from "./components/finish-screen/finish-screen"

const QuizApp = () => {
    const { status, dispatch } = useContext(QuizContext);
    console.log("status:", status);
    
    
    useEffect(() => {
        quizApi.getQuestions().then((response) => {
          if (response.success) {
            dispatch({ type: "DATA_RECEIVED", payload: response.data });
          } else {
            dispatch({ type: "DATA_FAILED" });
          }
        });
      }, [dispatch])
    
    return(
       <div className="mt-4 text-white">
            <main>
                {status === STATUES.loading && <Loading />}
                {status === STATUES.error && <Error />}
                {status === STATUES.ready && <StartScreen />}
                {status === STATUES.active &&  (<>
                <Progress />
                <Questions />
                <Footer />
                  </>
                 ) }
                 {status === STATUES.finished && <FinishScreen />}
            </main>
        </div> 
    )  
}

export const Quiz = () => {
    return (
        <QuizProvider>
            <QuizApp />
        </QuizProvider>
    )
}