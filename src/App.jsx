import { BrowserRouter, Router } from "react-router-dom";
import SignIn from "./Components/UI/SignIn";
import SignUp from "./Components/UI/SignUp";

function App() {
  return (
    <>
    <BrowserRouter>
      <SignUp />
      <SignIn />
    </BrowserRouter>
    </>
  );
}

export default App;
