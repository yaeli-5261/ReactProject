import { createContext, Dispatch } from "react"

export type userType = {
    id: number,
    firstName: String,
    lastName: String
    email: String,
    password: String
    address: String
    pel: String
}

export type Action = {
    type: "ADD",
    data: { id: number } & { email: string } & { password: string }
} | {
    type: "UPDATE",
    data: Partial<userType> & { id: number }
} |
{
    type: "GET",
    data: string
} |
{
    type: "DELETE"
}
export const initialUserState: userType = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    pel: '',
};


export const UserReducer = (state: userType, action: Action): userType => {
    switch (action.type) {
        case 'ADD':
            return { ...state, ...action.data }
        case 'UPDATE':
            const updateUser = { ...state, ...action.data }
            return updateUser
        case 'DELETE':
            return {...initialUserState}
        default:
            return state
    }
}

export const UserContext = createContext<[userType, Dispatch<Action>]>([
    {} as userType,
    () => { },
]);