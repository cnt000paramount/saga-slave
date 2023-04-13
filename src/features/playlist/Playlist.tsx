import { useState } from "react";
import {
  useGetPlaylistsQuery,
  useGetUsersQuery,
  useAddNewPlaylistMutation,
  useRemovePlaylistMutation,
  useEditPlaylistMutation,
} from "../api/apiSlice";
import { HackNorrisPlaylist } from "../../types/HackNorrisPlaylist";
import { HackNorrisUser } from "../../types/HackNorrisUser";
import styles from "./Playlist.module.css";

type UiState = "empty" | "new" | "view" | "edit";

export function Playlists() {
  const [uiState, setUiState] = useState<UiState>("empty");
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentPlaylist, setCurrentPlaylist] =
    useState<null | HackNorrisPlaylist>(null);

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();

  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery({ id: currentUserId });

  const [addNewPlaylist] = useAddNewPlaylistMutation();
  const [removePlaylist] = useRemovePlaylistMutation();
  const [editPlaylist] = useEditPlaylistMutation();

  const removePlaylistCb = async (id: string) => {
    await removePlaylist(id).unwrap();
  };
  const savePlaylist = async ({
    owner_id,
    payload,
  }: {
    owner_id: string;
    payload: string;
  }) => {
    await addNewPlaylist({
      owner_id,
      payload,
    }).unwrap();
  };

  const saveModifiedPlaylist = async (playlist: HackNorrisPlaylist) => {
    await editPlaylist(playlist).unwrap();
  };

  return (
    <>
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
      <form
        className={styles.form}
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <select
          onChange={(e) => {
            if (e?.currentTarget?.value) {
              setCurrentUserId(e.currentTarget.value);
            }
            setUiState("empty");
          }}
        >
          <option value="">Select a user</option>
          {isLoadingUsers
            ? "Loading ..."
            : users?.map((user, i) => (
                <option value={user.id} key={i}>
                  {user.name} - {user.email}
                </option>
              ))}
        </select>
      </form>
      {isLoadingPlaylists
        ? "Loading..."
        : playlists?.length > 0 &&
          currentUserId && (
            <ul className={styles.list}>
              {playlists?.map((playlist: any, i: number) => (
                <li key={i}>
                  <span>
                    {playlist.id} - {playlist.owner_id}
                  </span>
                  <div>
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
          )}
      {uiState === "new" && (
        <NewPlaylistForm
          users={users ?? []}
          savePlaylist={savePlaylist}
          setUiState={setUiState}
        />
      )}
      {uiState === "view" && currentPlaylist && (
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
      )}
      {uiState === "edit" && (
        <EditPlaylistForm
          playlist={currentPlaylist}
          editPlaylist={saveModifiedPlaylist}
          setUiState={setUiState}
        />
      )}
    </>
  );
}

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
      <form action="" onSubmit={(e) => e.preventDefault()}>
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
            users.map((user) => (
              <option value={user.id}>
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
