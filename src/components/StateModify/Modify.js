import { useDispatch } from "react-redux";

const accessToken = localStorage.getItem("access_token");

export const modifyAlbum = async (method, id) => {
  await fetch(`https://api.spotify.com/v1/me/albums?ids=${id}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: [id],
    }),
  });
};

export const modifyPlaylist = async (method, id) => {
  await fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const modifyTrack = async (method, id) => {
  await fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: [id],
    }),
  });
};

export const modifyArtist = async (method, id) => {
  await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${id}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: [id],
    }),
  });
};
