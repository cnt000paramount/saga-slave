import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContent } from "spotify-types";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { user: Record<string, string> }) => state.user
  );
  const message = useSelector((state: { message: string }) => state.message);
  const searchResult = useSelector(
    (state: { searchResult: SearchContent }) => state.searchResult
  );
  const token = useSelector((state: { token: string }) => state.token);

  useEffect(() => {
    dispatch({ type: "GET_TOKEN_REQUEST" });
  }, [dispatch]);

  const spotySearch = (
    _: ChangeEvent<HTMLInputElement> | MouseEvent,
    searchLabel: string
  ) => {
    dispatch({ type: "SPOTY_SEARCH_REQUEST", payload: { searchLabel, token } });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOKEN_REQUEST" });
  }, [dispatch]);

  const getUser = (_: React.SyntheticEvent, id: number) => {
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

  return (
    <div>
      <h2>Dashboard</h2>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          name="search"
          onChange={(e) => getUser(e, Number(e.currentTarget.value))}
        />
      </form>
      <button onClick={(e) => getUser(e, 1)}>Prendi user id: 1</button>
      <button onClick={(e) => getUser(e, 2)}>Prendi user id: 2</button>
      <h2>Results</h2>
      {user?.name ? (
        <>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>{message}</p>
      )}
      <h1 style={{ color: "green" }}>Spotify</h1>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <h2>Search artist</h2>
        <input
          name="search"
          onChange={(e) => spotySearch(e, e.currentTarget.value)}
        />
      </form>
      <h3>Results</h3>
      {searchResult ? (
        <div>
          <img
            alt="artist logo"
            src={searchResult?.artists?.items[0]?.images[0]?.url}
            style={{ width: "200px" }}
          ></img>
          <p>Name: {searchResult?.artists?.items[0]?.name}</p>
          <p>Genres: {searchResult?.artists?.items[0]?.genres.join(", ")}</p>
          <p>Followers: {searchResult?.artists?.items[0]?.followers?.total}</p>
          <p>Popularity: {searchResult?.artists?.items[0]?.popularity}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
