import {
  Route,
  // Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import MainPage from "./pages/mainPage";
import PrivatePage from "./pages/privatePage";
import CinemaHistoryPage from "./pages/cinemaHistoryPage";
import { Layout } from "./components/layout/layout";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
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
