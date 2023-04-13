import { UiState } from "../../../types/UiState";
import styles from "../Playlist.module.css";

export function AddNewPlaylistForm({
  setUiState,
}: {
  setUiState: (state: UiState) => void;
}) {
  return (
    <form
      className={styles.form}
      action=""
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        value="Add New"
        type="submit"
        onClick={() => {
          setUiState("new");
        }}
      />
    </form>
  );
}
