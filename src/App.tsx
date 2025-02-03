import { useReducer } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import MyRouter from "./MyRouter";
import { initialUserState, UserReducer, userContext } from "./components/User";

const App=() => {
const [state,dispatch]=useReducer(UserReducer,initialUserState)
  return (
    <>
      <Provider store={store}>
       <userContext.Provider value={[state,dispatch]}>
        <MyRouter />
        </userContext.Provider>
      </Provider>
    </>
  )
}
export default App