import { Loading } from "../../../Loading";
import { HackNorrisPlaylist } from "../../../types/HackNorrisPlaylist";
import { UiState } from "../../../types/UiState";
import { useGetPlaylistsQuery } from "../../api/apiSlice";
import styles from "../Playlist.module.css";

export function PlaylistList({
  currentUserId,
  setCurrentPlaylist,
  setUiState,
  removePlaylistCb,
}: {
  currentUserId: string;
  setCurrentPlaylist: (playlist: HackNorrisPlaylist) => void;
  setUiState: (state: UiState) => void;
  removePlaylistCb: (id: string) => void;
}) {
  const { data: playlists, isLoading } = useGetPlaylistsQuery(
    {
      id: currentUserId,
    },
    { skip: !currentUserId }
  );

  return isLoading ? (
    <Loading />
  ) : (
    <ul className={styles.list}>
      {playlists?.map((playlist: any, i: number) => (
        <li key={i}>
          <div>
            <div>
              Playlist id: <pre>{playlist.id}</pre>
            </div>
            <div>
              Owner id: <pre>{playlist.owner_id}</pre>
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                setCurrentPlaylist(playlist);
                setUiState("view");
              }}
            >
              View
            </button>
            <button
              onClick={() => {
                setCurrentPlaylist(playlist);
                setUiState("edit");
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                removePlaylistCb(playlist.id);
                setUiState("empty");
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
