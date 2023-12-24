import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Header from "./components/header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./components/AboutPage";
import Post from "./components/Post";
import AbouticonLink from "./components/AbouticonLink";
import Card from "./components/shared/Card";
import { FeedbackProvider } from "./context/FeedbackContext";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthProvider from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { getItem } = useLocalStorage("x-auth-token");
  const token = getItem();
  let authInitialState = { accessToken: token ?? null };

  return (
    <AuthProvider defaultState={authInitialState}>
      <FeedbackProvider>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <FeedbackForm />
                    <FeedbackStats />
                    <FeedbackList />
                    <AbouticonLink />
                  </>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Card>
              <NavLink to="/" activeclassname="active">
                Home
              </NavLink>
              <NavLink to="/about" activeclassname="active">
                About
              </NavLink>
            </Card>
          </div>
        </Router>
      </FeedbackProvider>
    </AuthProvider>
  );
}
export default App;
