import { HackNorrisPlaylist } from "../../../types/HackNorrisPlaylist";
import styles from "../Playlist.module.css";

export function PlaylistForm({
  currentPlaylist,
}: {
  currentPlaylist: HackNorrisPlaylist;
}) {
  return (
    <>
      <h2>Playlist</h2>
      <form
        className={styles.form}
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="owner_id">Owner Id</label>
        <input
          id="owner_id"
          type="text"
          defaultValue={currentPlaylist.owner_id}
        />

        <label htmlFor="payload">Payload</label>
        <textarea
          name="payload"
          id="payload"
          cols={60}
          rows={20}
          defaultValue={JSON.stringify(currentPlaylist.payload, null, 2)}
        ></textarea>
      </form>
    </>
  );
}
