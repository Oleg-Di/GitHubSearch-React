import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { Alert } from "./components/Alert";
import { AlertState } from "./context/alert/alertState";
import { GithubState } from "./context/GitHub/githubState";
import { useContext } from "react";
import { AuthContext } from './context/authForm/authContext';
import { Auth } from "./pages/Auth";


function App() {
  const {token} = useContext(AuthContext)
  const routes = (
    <Routes>
    <Route path="/" exact='true' element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile/:name" element={<Profile />} />
    
  </Routes>
  )
  const notAuthRote = (
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path="/about" element={<About />} />
    </Routes>
  )
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert alert={{ text: "Test alert" }} />
            {token? routes : notAuthRote}
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;
