import { getResult, getToken, selectSpotify } from "./spotifySlice";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../util/hooks";

export function Spotify() {
  const { token, spotify } = useAppSelector(selectSpotify);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  return (
    <>
      <div style={{ backgroundColor: "lightgreen", borderRadius: "15px" }}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <h2>Search artist</h2>
          <input
            name="searchArtist"
            onChange={(e) => {
              dispatch(
                getResult({
                  searchLabel: e.currentTarget.value,
                  token: token ?? "",
                  type: "artist",
                })
              );
            }}
          />
        </form>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <h2>Search song</h2>
          <input
            name="searchSong"
            onChange={(e) => {
              dispatch(
                getResult({
                  searchLabel: e.currentTarget.value,
                  token: token ?? "",
                  type: "track",
                })
              );
            }}
          />
        </form>
        <h3>Results</h3>
        {spotify?.artists &&
          spotify?.artists?.items?.map((artist) => (
            <div>
              <img
                alt="artist logo"
                src={artist?.images[0]?.url}
                style={{ width: "200px" }}
              ></img>
              <p>Name: {artist?.name}</p>
              <p>Genres: {artist?.genres.join(", ")}</p>
              <p>Followers: {artist?.followers?.total}</p>
              <p>Popularity: {artist?.popularity}</p>
            </div>
          ))}
        {spotify?.tracks && (
          <iframe
            title="spotify"
            style={{ borderRadius: "12px" }}
            src={spotify?.tracks?.items[0]?.external_urls?.spotify.replace(
              "/track",
              "/embed/track"
            )}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        )}
      </div>
    </>
  );
}
