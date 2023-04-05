import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => (state.user ? state.user : {}));
  const message = useSelector((state: any) => state.message);
  const token = useSelector((state: any) => state.token);
  const results = useSelector((state: any) => state.results);

  useEffect(() => {
    dispatch({ type: "GET_TOKEN_REQUEST" });
  }, []);

  const getUser = (e, id) => {
    if (id <= 10) {
      dispatch({ type: "USER_FETCH_REQUESTED", payload: { id } });
    } else {
      dispatch({ type: "USER_FETCH_REQUESTED", payload: { id: null } });
      dispatch({
        type: "USER_NOT_EXISTS",
        payload: { message: "We have ony 10 user!" },
      });
    }
  };

  const searchSpotify = (e, searchTerm) => {
    dispatch({
      type: "SPOTIFY_SEARCH_FETCH_REQUESTED",
      payload: { searchTerm, token },
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          name="search"
          onChange={(e) => getUser(e, e.currentTarget.value)}
        />
      </form>
      <button onClick={(e) => getUser(e, 1)}>Prendi user id: 1</button>
      <button onClick={(e) => getUser(e, 2)}>Prendi user id: 2</button>
      <h2>Results</h2>
      {user.name ? (
        <>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>{message}</p>
      )}

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          name="search-spotify"
          onChange={(e) => searchSpotify(e, e.currentTarget.value)}
        />
      </form>
      <h2>Spotify Results</h2>
      <ul>
        {results?.tracks?.items.map((item) => (
          <li>
            <img
              width="100"
              src={item.album.images?.[0].url}
              alt={item.album.name}
            />
            <br />
            {item.name} - {item.artists.map((artist) => artist.name).join(", ")}{" "}
            - {item.album.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
