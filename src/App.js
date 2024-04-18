import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";

import FeedItemsAll from "./components/Feed/FeedItemsAll";
import FeedLoad from "./components/Feed/FeedLoad";
import Album from "./components/Album/Album";
import Playlist from "./components/Playlist/Playlist";
import Artist from "./components/Artist/Artist";
import Tracks from "./components/Tracks/Tracks";
import Like from "./components/Like/Like";
import Profile from "./components/Profile/Profile";
import LoginPage from "./Pages/LoginPage";
import Search from "./components/SearchBar/Search";
import Queue from "./PlayerComponents/Queue";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
      children: [
        { path: "", element: <FeedLoad /> },
        { path: "feed/:feedName", element: <FeedItemsAll /> },
        { path: "album/:albumId", element: <Album /> },
        { path: "playlist/:playlistId", element: <Playlist /> },
        { path: "artist/:artistId", element: <Artist /> },
        { path: "track/:trackId", element: <Tracks /> },
        { path: "like", element: <Like /> },
        { path: "like/:likeType", element: <FeedItemsAll /> },
        { path: "me", element: <Profile /> },
        { path: "me/:type", element: <FeedItemsAll /> },
        { path: "search/:string", element: <Search /> },
        { path: "queue", element: <Queue /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
