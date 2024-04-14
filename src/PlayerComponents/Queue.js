import { useSelector } from "react-redux";
import useFetch from "../Hooks/FetchHook";
import { queueAction } from "../store/QueueActions";
import TracksList from "../components/pageComponents/TracksList";
import { usePlaybackState } from "react-spotify-web-playback-sdk";

import classes from './Queue.module.css';

const Queue = () => {
    const player = usePlaybackState();
    const current = useSelector(state => state.queue.current);
    const queue = useSelector(state => state.queue.next);
    const loading = useFetch([{url: 'https://api.spotify.com/v1/me/player/queue', saveData: queueAction}], player.loading);

    if(!loading) {
        return <>
        <div className={classes.itemContainer}>
        <h3 className={classes.heading}>Currently Playing</h3>
        <TracksList playlist={current} />
      </div>
      {queue.items.length > 0 && <div className={classes.itemContainer}>
      <h3 className={classes.heading}>Next</h3>
      <TracksList playlist={queue} />
    </div>}
      </>
    };
}
export default Queue;