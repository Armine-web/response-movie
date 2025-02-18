import { createContext, useReducer } from "react";

export const QuizContext = createContext();

const initialState = {

    status: "loading",
    questions: [],
}

function reducer(state, action) {
    switch (action.type) {
      case "DATA_RECEIVED":
        return { ...state, questions: action.payload, status: "ready",  };
  
      case "DATA_FAILED":
        return { ...state,
          status: "error", };
      case "START":
        return { status: "active", };

      default:
        throw new Error("Something wrong");
    }
  }

export function QuizProvider ({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { status, questions } = state;
    return (
        <QuizContext.Provider
            value ={{status, questions, dispatch}}
        >
            {children}
        </QuizContext.Provider>
    )
}