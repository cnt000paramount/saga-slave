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

  const spotySearchSong = (
    _: ChangeEvent<HTMLInputElement> | MouseEvent,
    searchLabel: string
  ) => {
    dispatch({
      type: "SPOTY_SEARCH_SONG_REQUEST",
      payload: { searchLabel, token },
    });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOKEN_REQUEST" });
  }, [dispatch]);

  const getUser = (_: React.SyntheticEvent, id: number) => {
    dispatch({ type: "USER_FETCH_REQUESTED", payload: { id } });
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
      {user?.["name"] ? (
        <>
          <p>Name: {user["name"]}</p>
          <p>Username: {user["username"]}</p>
          <p>Email: {user["email"]}</p>
        </>
      ) : (
        <p>{message}</p>
      )}
      <div style={{ backgroundColor: "lightgreen", borderRadius: "15px" }}>
        <h1 style={{ color: "green" }}>Spotify</h1>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <h2>Search artist</h2>
          <input
            name="searchArtist"
            onChange={(e) => spotySearch(e, e.currentTarget.value)}
          />
        </form>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <h2>Search song</h2>
          <input
            name="searchSong"
            onChange={(e) => spotySearchSong(e, e.currentTarget.value)}
          />
        </form>
        <h3>Results</h3>
        {searchResult?.artists ? (
          <div>
            <img
              alt="artist logo"
              src={searchResult?.artists?.items[0]?.images[0]?.url}
              style={{ width: "200px" }}
            ></img>
            <p>Name: {searchResult?.artists?.items[0]?.name}</p>
            <p>Genres: {searchResult?.artists?.items[0]?.genres.join(", ")}</p>
            <p>
              Followers: {searchResult?.artists?.items[0]?.followers?.total}
            </p>
            <p>Popularity: {searchResult?.artists?.items[0]?.popularity}</p>
          </div>
        ) : (
          <p>{message}</p>
        )}
        {searchResult?.tracks ? (
          <iframe
            title="spotify"
            style={{ borderRadius: "12px" }}
            src={searchResult?.tracks?.items[0]?.external_urls?.spotify.replace(
              "/track",
              "/embed/track"
            )}
            width="100%"
            height="352"
            frameBorder="0"
            // allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}
