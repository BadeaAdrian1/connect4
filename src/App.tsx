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
import ManualStartSet from "./components/StartSiglePlayerSet";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<StartSet />} />
      <Route path="history" element={<History />} />
      <Route path=":setId/games" element={<GamesList />} />
      <Route path=":gameId/remake" element={<Remake />} />
      <Route path="play/manual-start-set" element={<ManualStartSet />} />
      <Route path="play/start-set" element={<StartSet />} />
      {/* The "*" route should probably be a catch-all for unknown routes */}
      <Route path="*" element={<StartSet />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
