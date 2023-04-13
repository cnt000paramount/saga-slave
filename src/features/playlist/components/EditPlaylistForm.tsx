import { useState } from "react";
import { HackNorrisPlaylist } from "../../../types/HackNorrisPlaylist";
import { UiState } from "../../../types/UiState";
import styles from "../Playlist.module.css";

export const EditPlaylistForm = ({
  playlist,
  editPlaylist,
  setUiState,
}: {
  playlist: HackNorrisPlaylist | null;
  editPlaylist: (playlist: HackNorrisPlaylist) => void;
  setUiState: (state: UiState) => void;
}) => {
  const [payload, setPayload] = useState(playlist?.payload);
  return (
    <>
      <h2>Edit Playlist</h2>
      <form
        className={styles.form}
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="owner_id">Owner Id</label>
        User: {playlist?.owner_id}
        <label htmlFor="payload">Payload</label>
        <textarea
          name="payload"
          id="payload"
          cols={60}
          rows={20}
          value={typeof payload === "string" ? payload : ""}
          onChange={(e) => {
            if (e?.currentTarget?.value) {
              setPayload(e.currentTarget.value);
            }
          }}
        ></textarea>
        <pre></pre>
        {
          <input
            value="Save"
            type="submit"
            onClick={() => {
              editPlaylist({
                id: playlist?.id ?? "",
                owner_id: playlist?.owner_id ?? "",
                payload: JSON.parse(typeof payload === "string" ? payload : ""),
              });
              setUiState("empty");
            }}
          />
        }
      </form>
    </>
  );
};
