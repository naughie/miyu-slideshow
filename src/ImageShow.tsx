import { useEffect, useState } from "preact/hooks";

type Props = {
  url: string;
  fading: boolean;
};

type States = {
  curr: string;
  prev?: string;
};

const ImageShow = ({ url, fading }: Props) => {
  const [states, setStates] = useState<States>({ curr: url });

  useEffect(() => {
    setStates({
      prev: states.curr,
      curr: url,
    });
  }, [url]);

  return (
    <main class="relative h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      {states.prev && (
        <img
          key={`bg-${states.prev}`}
          src={states.prev}
          alt="Blurred background"
          class="absolute inset-0 h-full w-full object-cover filter blur-2xl scale-110 transition-opacity duration-500"
        />
      )}

      <img
        key={`bg-${states.curr}`}
        src={states.curr}
        alt="Blurred background"
        class="absolute inset-0 h-full w-full object-cover filter blur-2xl scale-110 transition-opacity duration-500"
      />

      <div class="relative w-full h-auto max-h-(--max-frame-height) aspect-video p-(--frame-padding) rounded-lg shadow-2xl bg-pink-200/50 flex justify-center items-center">
        <img
          key={`fg-${states.curr}`}
          src={states.curr}
          alt="Selected foreground"
          class={`w-full max-w-(--max-image-width) h-auto max-h-(--max-image-height) rounded-lg shadow-2xl transition-opacity duration-500 ease-in-out ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </main>
  );
};

export default ImageShow;
