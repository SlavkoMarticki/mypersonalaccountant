import { Login, SignUp, Home, PageNotFound} from "./pages";
import { Background } from "./components";
import "./components/background/background.css";
import "./assets/body.css";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


function App() {
  return (
    <>
      <Background />
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
 
    </>
   
  );
}

export default App;