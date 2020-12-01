import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createStandaloneToast } from "@chakra-ui/react";

import { removeToast } from "redux/actions";

export default function AppToasts() {
  const audioRef = useRef();
  const dispatch = useDispatch();
  const toast = createStandaloneToast();

  const toasts = useSelector(state => state.app.toasts);

  const playAudio = name => {
    if (audioRef.current) {
      if (name) {
        audioRef.current.src = `sounds/${name}.mp3`;
      }

      // Show loading animation.
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            console.log("Play notification sound paused by error: " + error);
          });
      }
    }
  };

  useEffect(() => {
    if (toasts.length > 0) {
      toast(toasts[0]);
      dispatch(removeToast());

      playAudio(toasts[0].status);
    }
  }, [toasts]);

  return (
    <>
      <audio
        style={{ display: "none" }}
        ref={audioRef}
        src={`sounds/info.mp3`}
      ></audio>
    </>
  );
}
