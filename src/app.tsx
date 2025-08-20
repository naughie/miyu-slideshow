import { useEffect, useState } from "preact/hooks";

import ImageShow from "./ImageShow";

const getImages = async () => {
  type ImageMeta = {
    dir: string;
    title: string;
    files: string[];
  };

  const resp = await fetch("https://miyu-images.naughie.com/index.json");
  const meta = (await resp.json()) as ImageMeta[];

  const urls: string[] = [];

  for (const { files } of meta) {
    for (const file of files) {
      urls.push(`https://miyu-images.naughie.com${file}`);
    }
  }

  return urls;
};
const images: string[] = await getImages();

const randomPick = (prevIdx?: number) => {
  let nextIdx: number;
  do {
    nextIdx = Math.floor(Math.random() * images.length);
  } while (nextIdx === prevIdx);
  return nextIdx;
};

type States = {
  currIdx: number;
  fading: boolean;
};

export function App() {
  const [states, setStates] = useState<States>({
    currIdx: randomPick(),
    fading: false,
  });

  useEffect(() => {
    if (states.fading) {
      return;
    }

    const timerID = setTimeout(() => {
      setStates({
        ...states,
        fading: true,
      });
    }, 5000);

    return () => {
      clearTimeout(timerID);
    };
  }, [states.fading]);

  useEffect(() => {
    if (!states.fading) {
      return;
    }

    const timerID = setTimeout(() => {
      setStates({
        currIdx: randomPick(states.currIdx),
        fading: false,
      });
    }, 500);

    return () => {
      clearTimeout(timerID);
    };
  }, [states.fading]);

  return <ImageShow url={images[states.currIdx]} fading={states.fading} />;
}
