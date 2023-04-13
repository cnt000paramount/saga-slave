import { HackNorrisPlaylist } from "../../../types/HackNorrisPlaylist";
import { UiState } from "../../../types/UiState";
import styles from "../Playlist.module.css";

export function PlaylistList({
  playlists,
  setCurrentPlaylist,
  setUiState,
  removePlaylistCb,
}: {
  playlists: HackNorrisPlaylist[];
  setCurrentPlaylist: (playlist: HackNorrisPlaylist) => void;
  setUiState: (state: UiState) => void;
  removePlaylistCb: (id: string) => void;
}) {
  return (
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
