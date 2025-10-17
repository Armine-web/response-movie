import { createContext, useReducer } from "react";

export const QuizContext = createContext();

export const STATUES = {loading: "loading", error: "error", ready: "ready", active: "active", finished: "finished"};
const initialState = {
    status: STATUES.loading,
    index: 0,
    answer: null,
    points: 0,
    correctAnswersCount: 0,
    questions: [],
    maxPossiblePoints: 0,
    secondsRemainding: null,
}

function reducer(state, action) {
    switch (action.type) {
        case "DATA_RECEIVED":
            const maxPossiblePoints = action.payload.reduce((prev, cur) => {
                return prev + cur.points;
            }, 0);
            return { 
                ...state, 
                questions: action.payload, 
                status: STATUES.ready, 
                maxPossiblePoints,
            };
        
        case "DATA_FAILED":
            return { ...state, status: STATUES.error, };
        
        case "START":
            return { ...state, status: STATUES.active, secondsRemaining: state.questions.length * 30, };

        case "NEW_ANSWER":
            const question = state.questions[state.index];
            const isCorrect = action.payload === question.correctOption;
            const newCorrectAnswersCount = isCorrect ? state.correctAnswersCount + 1 : state.correctAnswersCount;

            return {
                ...state,
                answer: action.payload,
                points: isCorrect ? state.points + question.points : state.points,
                correctAnswersCount: newCorrectAnswersCount,
            };

        case "NEXT_QUESTION":
            return { ...state, answer: null, index: state.index + 1, };

        case "FINISH":
            return { ...state, status: STATUES.finished, };

        case "RESTART":
            return { ...initialState, questions: state.questions, status: STATUES.ready, };

        case "TICK":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? STATUES.finished : state.status,
            };

        default:
            throw new Error("Something went wrong");
    }
}

export function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <QuizContext.Provider value={{ ...state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
}
