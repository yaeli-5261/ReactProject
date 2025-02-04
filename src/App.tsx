import { useReducer } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import MyRouter from "./MyRouter";
import { initialUserState, UserReducer, UserContext } from "./components/User";

const App=() => {
const [state,dispatch]=useReducer(UserReducer,initialUserState)
  return (
    <>
      <Provider store={store}>
       <UserContext value={[state,dispatch]}>
        <MyRouter />
        </UserContext>
      </Provider>
    </>
  )
}
export default App