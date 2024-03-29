import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import About from "./components/About";
import Allwords from "./components/Allwords";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TopicPage from "./components/TopicPage";
import Layout from "./pages/Layout";
import Games from "./components/cardsNavigation/Games";
import CategoryDetailsQuiz from "./components/CategoryDetails/CategoryDetailsQuiz";
import CategoryDetailsFlipCards from "./components/CategoryDetails/CategoryDetailsFlipCards";
import CategoryDetailsWordList from "./components/CategoryDetails/CategoryDetailsWordList";
import TagPage from "./components/TagPage";
import TagDetailsFlipCards from "./components/TagDetails/TagDetailsFlipCards";
import TagDetailsQuiz from "./components/TagDetails/TagDetailsQuiz";
import TagDetailsWordList from "./components/TagDetails/TagDetailsWordList";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import "./App.css";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Account from "./components/Account/Account";

function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="404" element={<PageNotFound />} />
          <Route path="allwords/*" element={<Allwords />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="account" element={<Account />}></Route>
          </Route>
          <Route path=":categoryName" element={<TopicPage />}>
            <Route index element={<Navigate to="flipcards" replace />} />
            <Route path="flipcards" element={<CategoryDetailsFlipCards />} />
            <Route path="wordlist" element={<CategoryDetailsWordList />} />
            <Route path="test" element={<CategoryDetailsQuiz />} />
            <Route path="game" element={<Games />} />
          </Route>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="tag" element={<TagPage />}>
              <Route index element={<Navigate to="flipcards" replace />} />
              <Route path="flipcards" element={<TagDetailsFlipCards />} />
              <Route path="wordlist" element={<TagDetailsWordList />} />
              <Route path="test" element={<TagDetailsQuiz />} />
              <Route path="game" element={<Games />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
