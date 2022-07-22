import { useEffect, useState } from "react";

type MediaProps = (media: string) => boolean;

export const useMedia: MediaProps = (media) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const changeMatch = () => {
      const { matches } = matchMedia(media);
      setMatch(matches);
    };
    changeMatch();
    window.addEventListener("resize", changeMatch);

    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);

  return match;
};
