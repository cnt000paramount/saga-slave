import React from "react";
import { Suspense, useState } from "react";
import {
  useGetUsersQuery,
  useAddNewPlaylistMutation,
  useRemovePlaylistMutation,
} from "../api/apiSlice";
import { HackNorrisPlaylist } from "../../types/HackNorrisPlaylist";
import { UiState } from "../../types/UiState";
import { EditPlaylistForm } from "./components/EditPlaylistForm";
import { NewPlaylistForm } from "./components/NewPlaylistForm";
import { PlaylistList } from "./components/PlaylistList";
import { PlaylistForm } from "./components/PlaylistForm";
import { AddNewPlaylistForm } from "./components/AddNewPlaylistForm";
import styles from "./Playlist.module.css";
import { Loading } from "../../Loading";

const SelectUserForm = React.lazy(() => import("./components/SelectUserForm"));

export function Playlists() {
  const [uiState, setUiState] = useState<UiState>("empty");
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentPlaylist, setCurrentPlaylist] =
    useState<null | HackNorrisPlaylist>(null);
  const [addNewPlaylist] = useAddNewPlaylistMutation();
  const [removePlaylist] = useRemovePlaylistMutation();
  const { data: users } = useGetUsersQuery();

  const removePlaylistCb = async (id: string) => {
    await removePlaylist(id).unwrap();
  };
  const savePlaylist = async ({
    owner_id,
    payload,
  }: Omit<HackNorrisPlaylist, "id">) => {
    await addNewPlaylist({
      owner_id,
      payload,
    }).unwrap();
  };

  return (
    <div className={styles.container}>
      <AddNewPlaylistForm setUiState={setUiState} />
      <Suspense fallback={<Loading />}>
        <SelectUserForm
          users={users ?? []}
          setCurrentUserId={setCurrentUserId}
          setUiState={setUiState}
        />
      </Suspense>
      {currentUserId && (
        <PlaylistList
          currentUserId={currentUserId}
          setCurrentPlaylist={setCurrentPlaylist}
          setUiState={setUiState}
          removePlaylistCb={removePlaylistCb}
        />
      )}
      {uiState === "new" && (
        <NewPlaylistForm
          users={users ?? []}
          savePlaylist={savePlaylist}
          setUiState={setUiState}
        />
      )}
      {uiState === "view" && currentPlaylist && (
        <PlaylistForm currentPlaylist={currentPlaylist} />
      )}
      {uiState === "edit" && (
        <EditPlaylistForm playlist={currentPlaylist} setUiState={setUiState} />
      )}
    </div>
  );
}
