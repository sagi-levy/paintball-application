import "./App.css";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/common/footer";
import FooterMenu from "./components/common/footerMenu";
import CreateActivityCard from "./components/createActivityCard";
import SignOut from "./components/signOut";
import MyActivityCards from "./components/myActivityCards";
import ProtectedRoute from "./components/protectedRoute";
import ProtectedRouteOnlyBiz from "./components/protectedRouteOnlyBiz";

import About from "./components/about";
import EditActivityCard from "./components/editActivityCard";
import Home from "./components/home";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import SignUpBiz from "./components/signUpBiz";
import DeleteActivityCard from "./components/common/deleteActivityCard";
import PaymentForm from "./components/common/payment";
import Calendar from "./components/calendar";
import EmailForm from "./components/contactUs";
import ChangePassword from "./components/changePassword";
import ResetPassword from "./components/resetPassword";
import SentSms from "./components/emailSentPass";
import EnterNewPassword from "./components/enterNewPassword";
import PaintballPage from "./components/common/activities/paintballPage";
import LaserTagPage from "./components/common/activities/laserTagPage";
import KartingPage from "./components/common/activities/kartingPage";
import { date } from "joi";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AppProvider } from "./context/card.context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const stripePromise = loadStripe(process.env.REACT_APP_LOAD_STRIPE_STRING);
function App() {
  return (
    <div className="App">
      <header className="header">
        <Navbar />
      </header>
      <ToastContainer />
      <main className="main-content pb-4">
        <AppProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/paintball-page" element={<PaintballPage />}></Route>
            <Route path="/laser-tag-page" element={<LaserTagPage />}></Route>
            <Route path="/karting-page" element={<KartingPage />}></Route>
            <Route
              path="/cards/create-activity-card"
              element={<CreateActivityCard />}
            ></Route>
            <Route
              path="/cards/payment/:id"
              element={
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              }
            ></Route>
            <Route
              path="cards/my-activity-cards/:id"
              element={
                <ProtectedRouteOnlyBiz onlyBiz>
                  <MyActivityCards />
                </ProtectedRouteOnlyBiz>
              }
            ></Route>
            <Route
              path="cards/edit-activity-cards/:id"
              element={
                <ProtectedRoute id>
                  <EditActivityCard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/cards/delete-activity-cards/:id"
              element={
                <ProtectedRoute>
                  <DeleteActivityCard />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="sign-in" element={<SignIn />}></Route>
            <Route path="send-email" element={<EmailForm />}></Route>
            <Route
              path="users/change-password/:id"
              element={
                <ProtectedRoute id>
                  <ChangePassword />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="users/change-password/via-email-code/:id"
              element={
                <ProtectedRoute id>
                  <EnterNewPassword />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="sign-up" element={<SignUp />}></Route>
            <Route path="sign-out" element={<SignOut />}></Route>
            <Route path="sign-up-biz" element={<SignUpBiz />}></Route>{" "}
            <Route path="reset-password" element={<ResetPassword />}></Route>{" "}
            <Route
              path="reset-password/sent-email"
              element={<SentSms />}
            ></Route>{" "}
          </Routes>
        </AppProvider>
      </main>
      <footer>
        <FooterMenu />
        <Footer />
      </footer>
    </div>
  );
}

export default App;
