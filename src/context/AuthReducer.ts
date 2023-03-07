import { Company, State } from "./AuthContext";

export type Action = {
  type: string,
  payload: Company | null
}

export default (state: State, action: Action): State => {
  switch(action.type) {
    case "SIGN_IN":
      return {
        ...state,
        company: action.payload
      }  

    case "SIGN_UP":
      return {
        ...state,
        company: action.payload
      }

    case "SIGN_OUT":
      return {
        ...state,
        company: null
      }

    default:
      return state
  }
}