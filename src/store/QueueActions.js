import { queueActions } from "./queue-slice"

const findDuration = (duration) => {
    let str = "";
    const first = Math.trunc(duration / 60000);
    str += `${first}:`;
    const remainer = duration % 60000;
    const second = Math.trunc(remainer / 1000);
    if (second < 10) {
      str += `0${second}`;
    } else {
      str += second;
    }
  
    return str;
  };

export const queueAction = (playlist) => {
    return dispatch => {
        const current = [{
            name: playlist.currently_playing.name,
            type: playlist.currently_playing.type,
            id: playlist.currently_playing.id,
            artists: playlist.currently_playing.artists,
            image: playlist.currently_playing.album.images[0].url,
            albumName: playlist.currently_playing.album.name,
            albumType: playlist.currently_playing.album.type,
            albumId: playlist.currently_playing.album.id,
            duration: findDuration(playlist.currently_playing.duration_ms),
            uri: playlist.currently_playing.uri,
        }];

        const queue = [];

        for(const data of playlist.queue) {

          if(current[0].id === data.id) {
            break;
          }

          const obj = {
            name: data.name,
            type: data.type,
            id: data.id,
            artists: data.artists,
            image: data.album.images[0].url,
            albumName: data.album.name,
            albumType: data.album.type,
            albumId: data.album.id,
            duration: findDuration(data.duration_ms),
            uri: data.uri,
          };
          queue.push(obj);
        }

        dispatch(queueActions.setCurrent({current: current}));
        dispatch(queueActions.setItems({playlist: queue}));
    }
}