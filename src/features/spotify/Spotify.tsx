import { getResult, getToken, selectSpotify } from "./spotifySlice";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../util/hooks";
import styles from "./Spotify.module.css";

export function Spotify() {
  const { token, spotify } = useAppSelector(selectSpotify);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <h2>Search artist</h2>
          <input
            className={styles.input}
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
            className={styles.input}
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
        <div className={styles.result}>
          {spotify?.artists &&
            spotify?.artists?.items?.map((artist) => (
              <div className={styles.box}>
                <img
                  alt="artist logo"
                  src={artist?.images[0]?.url}
                  className={styles.image}
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
              src={spotify?.tracks?.items[0]?.external_urls?.spotify.replace(
                "/track",
                "/embed/track"
              )}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              frameBorder="0"
            ></iframe>
          )}
        </div>
      </div>
    </>
  );
}
