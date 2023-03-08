import {
  Route,
  // Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import MainPage from "./pages/mainPage";
import PrivatePage from "./pages/privatePage";
import MoviePage from "./pages/moviePage";
import CinemaHistoryPage from "./pages/cinemaHistoryPage";
import AuthPage from "./pages/authPage";
import { Layout } from "./components/layout/layout";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="/:id" element={<MoviePage />} />
      <Route path="login" element={<AuthPage />} />
      <Route path="history" element={<CinemaHistoryPage />} />
      <Route path="private" element={<PrivatePage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
