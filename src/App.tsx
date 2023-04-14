import React, { Suspense } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import styles from "./App.module.css";
import { Loading } from "./Loading";

const Counter = React.lazy(() => import("./views/Counter"));
const User = React.lazy(() => import("./views/User"));
const Spotify = React.lazy(() => import("./views/Spotify"));
const HackNorrisUsers = React.lazy(() => import("./views/HackNorrisUsers"));
const HackNorrisPlaylists = React.lazy(
  () => import("./views/HackNorrisPlaylists")
);

function App() {
  return (
    <div className="App">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Counter />} />
            <Route path="user" element={<User />} />
            <Route path="spotify" element={<Spotify />} />
            <Route path="counter" element={<Counter />} />
            <Route path="users" element={<HackNorrisUsers />} />
            <Route path="playlists" element={<HackNorrisPlaylists />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className={styles.menu}>
        <ul>
          <li>
            <Link to="/">Counter</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/spotify">Spotify</Link>
          </li>
          <li>
            <Link to="/users">Hack Norris Users</Link>
          </li>
          <li>
            <Link to="/playlists">Hack Norris Playlists</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
