import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import StartSet from "./components/StartSet";
import History from "./components/History";
import RootLayout from "./layouts/RootLayout";
import GamesList from "./components/GamesList";
import Remake from "./components/Remake";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<StartSet />}></Route>
      <Route path="history" element={<History />}></Route>
      <Route path=":setId/games" element={<GamesList />}></Route>
      <Route path=":gameId/remake" element={<Remake />}></Route>
      <Route path="*" element={<StartSet />}></Route>
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
