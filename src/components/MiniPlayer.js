import { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import classes from '../styles/MiniPlayer.module.css';

export default function MiniPlayer({ id, videoTitle }) {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false);



  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  /*  console.log(videoUrl)
   console.log(id) */

  function toggleFloatingBtn() {
    if (!status) {

      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <div className={`${classes.miniPlayer}  ${classes.floatingBtn}`} onClick={toggleFloatingBtn} ref={buttonRef}>

      <span className={`material-icons-outlined  ${classes.open}`} > play_circle_filled </span>
      <span className={`material-icons-outlined  ${classes.close}`} onClick={toggleFloatingBtn} > close </span>
      <ReactPlayer url={videoUrl}  className={classes.player1} width="300px" height="200px" playing={status} controls />
      <p>{videoTitle}</p>

    </div>
  );
}