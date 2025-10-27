"use client";

import { useEffect, useRef } from "react";

export default function GlobalBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Try to play audio
      audio.play().catch((error) => {
        console.log("Audio autoplay prevented:", error);
      });

      // Play audio on any user interaction
      const playAudio = () => {
        if (audio.paused) {
          audio.play().catch((error) => {
            console.log("Audio play error:", error);
          });
        }
      };

      document.addEventListener("click", playAudio, { once: true });
      document.addEventListener("keydown", playAudio, { once: true });

      return () => {
        document.removeEventListener("click", playAudio);
        document.removeEventListener("keydown", playAudio);
      };
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      src="/login-assets/black-vault-audio.mp3"
      preload="auto"
    />
  );
}