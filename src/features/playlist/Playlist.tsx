import { Suspense, useState } from "react";
import {
  useGetPlaylistsQuery,
  useGetUsersQuery,
  useAddNewPlaylistMutation,
  useRemovePlaylistMutation,
  useEditPlaylistMutation,
} from "../api/apiSlice";
import { HackNorrisPlaylist } from "../../types/HackNorrisPlaylist";
import { UiState } from "../../types/UiState";
import { EditPlaylistForm } from "./components/EditPlaylistForm";
import { NewPlaylistForm } from "./components/NewPlaylistForm";
import { SelectUserForm } from "./components/SelectUserForm";
import { PlaylistList } from "./components/PlaylistList";
import { PlaylistForm } from "./components/PlaylistForm";
import { AddNewPlaylistForm } from "./components/AddNewPlaylistForm";
import styles from "./Playlist.module.css";
import React from "react";
import { Loading } from "../../Loading";

export function Playlists() {
  const [uiState, setUiState] = useState<UiState>("empty");
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentPlaylist, setCurrentPlaylist] =
    useState<null | HackNorrisPlaylist>(null);
  const [addNewPlaylist] = useAddNewPlaylistMutation();
  const [removePlaylist] = useRemovePlaylistMutation();
  const [editPlaylist] = useEditPlaylistMutation();
  const { data: users } = useGetUsersQuery();
  const { data: playlists } = useGetPlaylistsQuery({ id: currentUserId });

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

  const saveModifiedPlaylist = async (playlist: HackNorrisPlaylist) => {
    await editPlaylist(playlist).unwrap();
  };

  const SelectUserForm = React.lazy(
    () => import("./components/SelectUserForm")
  );

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
      {playlists?.length > 0 && currentUserId && (
        <PlaylistList
          playlists={playlists}
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
        <EditPlaylistForm
          playlist={currentPlaylist}
          editPlaylist={saveModifiedPlaylist}
          setUiState={setUiState}
        />
      )}
    </div>
  );
}
