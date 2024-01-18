import "./App.css";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/common/footer";
import CreateActivityCard from "./components/createActivityCard";
import SignOut from "./components/signOut";
import MyActivityCards from "./components/myActivityCards";
import ProtectedRoute from "./components/protectedRoute";
import About from "./components/about";
import EditActivityCard from "./components/editActivityCard";
import Home from "./components/home";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import SignUpBiz from "./components/signUpBiz";
import DeleteActivityCard from "./components/common/deleteActivityCard";
function App() {
  //
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/cards/create-activity-card"
            element={<CreateActivityCard />}
          ></Route>
          <Route
            path="cards/my-activity-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyActivityCards />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="cards/edit-activity-cards/:id"
            element={
              <ProtectedRoute onlyBiz>
                <EditActivityCard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/cards/delete-activity-cards/:id"
            element={
              <ProtectedRoute onlyBiz>
                <DeleteActivityCard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="sign-in" element={<SignIn />}></Route>
          <Route path="sign-up" element={<SignUp />}></Route>
          <Route path="sign-out" element={<SignOut />}></Route>
          <Route path="sign-up-biz" element={<SignUpBiz />}></Route>{" "}
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
