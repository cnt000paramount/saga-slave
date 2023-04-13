import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../../util/env";
import { HackNorrisUser } from "../../types/HackNorrisUser";

export const apiSlice = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: env.hackNorrisApiDomain ?? "",
  }),
  tagTypes: ["User", "Playlist"],
  endpoints: (builder) => ({
    getUsers: builder.query<HackNorrisUser[], void>({
      query: () => "/user",
      providesTags: ["User"],
    }),
    getUser: builder.query<HackNorrisUser[], string>({
      query: (id) => `/user/${id}`,
    }),
    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    removeUser: builder.mutation({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getPlaylists: builder.query({
      query: (user) => `/user/${user.id}/playlist`,
      providesTags: ["Playlist"],
    }),
    getPlaylist: builder.query({
      query: (id) => `/playlist/${id}`,
    }),
    addNewPlaylist: builder.mutation({
      query: (newPlaylist) => ({
        url: "/playlist",
        method: "POST",
        body: newPlaylist,
      }),
      invalidatesTags: ["Playlist"],
    }),
    editPlaylist: builder.mutation({
      query: (playlist) => ({
        url: `/playlist/${playlist.id}`,
        method: "PUT",
        body: playlist,
      }),
      invalidatesTags: ["Playlist"],
    }),
    removePlaylist: builder.mutation({
      query: (id) => ({
        url: `/playlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlist"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useRemoveUserMutation,
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useAddNewPlaylistMutation,
  useRemovePlaylistMutation,
  useEditPlaylistMutation,
} = apiSlice;
