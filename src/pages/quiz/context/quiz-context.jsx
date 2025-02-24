import { createContext, useReducer } from "react";

export const QuizContext = createContext();

const initialState = {

    status: "loading",
    index: 0,
    answer: null,
    questions: [],
}

function reducer(state, action) {
    switch (action.type) {
      case "DATA_RECEIVED":
        return { ...state, questions: action.payload, status: "ready",  };
      case "DATA_FAILED":
        return { ...state, status: "error", };
      case "START":
        return { ...state, status: "active", };
      case "NEW_ANSWER":     
        return { ...state, answer: action.payload};

      default:
        throw new Error("Something wrong");
    }
  }

export function QuizProvider ({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <QuizContext.Provider
            value ={{...state, dispatch}}
        >
            {children}
        </QuizContext.Provider>
    )
}