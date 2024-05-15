import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Components/UI/SignIn";
import SignUp from "./Components/UI/SignUp";
import { Home } from "@mui/icons-material";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
            {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
