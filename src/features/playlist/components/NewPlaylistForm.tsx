import { useState } from "react";
import { HackNorrisUser } from "../../../types/HackNorrisUser";
import { UiState } from "../../../types/UiState";
import styles from "../Playlist.module.css";

export const NewPlaylistForm = ({
  users,
  savePlaylist,
  setUiState,
}: {
  users: HackNorrisUser[];
  savePlaylist: ({
    owner_id,
    payload,
  }: {
    owner_id: string;
    payload: string;
  }) => void;
  setUiState: (state: UiState) => void;
}) => {
  const [currentOwnerId, setCurrentOwnerId] = useState("");
  const [payload, setPayload] = useState({});
  return (
    <>
      <h2>New Playlist</h2>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className={styles.form}
      >
        <label htmlFor="owner_id">Owner Id</label>
        <select
          onChange={(e) => {
            if (e?.currentTarget?.value) {
              setCurrentOwnerId(e.currentTarget.value);
            }
          }}
        >
          <option value="">Select a user</option>
          {users &&
            users.map((user, i) => (
              <option value={user.id} key={i}>
                {user.name} - {user.email}
              </option>
            ))}
        </select>

        <label htmlFor="payload">Payload</label>
        <textarea
          name="payload"
          id="payload"
          cols={60}
          rows={20}
          onChange={(e) => {
            if (e?.currentTarget?.value) {
              setPayload(e.currentTarget.value);
            }
          }}
        ></textarea>
        {
          <input
            value="Add"
            type="submit"
            onClick={() => {
              savePlaylist({
                owner_id: currentOwnerId,
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
