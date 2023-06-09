import { useEffect, useState } from "react";
import { HackNorrisPlaylist } from "../../../types/HackNorrisPlaylist";
import { UiState } from "../../../types/UiState";
import styles from "../Playlist.module.css";
import { useEditPlaylistMutation } from "../../api/apiSlice";

export const EditPlaylistForm = ({
  playlist,
  setUiState,
}: {
  playlist: HackNorrisPlaylist | null;
  setUiState: (state: UiState) => void;
}) => {
  const [payload, setPayload] = useState<string>("");
  const [editPlaylist] = useEditPlaylistMutation();
  const saveModifiedPlaylist = async (playlist: HackNorrisPlaylist) => {
    await editPlaylist(playlist).unwrap();
  };

  const handleSafePayload = (value: string) => {
    setPayload(value);
  };

  useEffect(() => {
    setPayload(JSON.stringify(playlist?.payload));
  }, [playlist]);

  const payloadValue =
    typeof playlist?.payload === "string"
      ? playlist?.payload
      : JSON.stringify(playlist?.payload, null, 2);

  return (
    <>
      <h2>Edit Playlist {playlist?.id}</h2>
      <form
        className={styles.form}
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <div>Id: {playlist?.id}</div>
        <div>Owner Id: {playlist?.owner_id}</div>
        <div>
          Payload: <pre>{payloadValue}</pre>
        </div>
        <label htmlFor="payload">Payload</label>
        <textarea
          name="payload"
          id="payload"
          cols={60}
          rows={20}
          value={payload}
          onChange={(e) => {
            if (e?.currentTarget?.value) {
              handleSafePayload(e.currentTarget.value);
            }
          }}
        ></textarea>
        {
          <input
            value="Save"
            type="submit"
            onClick={() => {
              saveModifiedPlaylist({
                id: playlist?.id ?? "",
                owner_id: playlist?.owner_id ?? "",
                payload: JSON.parse(payload),
              });
              setUiState("empty");
            }}
          />
        }
      </form>
    </>
  );
};
