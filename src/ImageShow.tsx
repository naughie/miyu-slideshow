import { Expand } from "lucide-preact";
import { EnterFullscreen, exitFullscreen } from "./fullscreen";

type Props = {
  currUrl: string;
  prevUrl?: string;
  fading: boolean;
};

const ImageShow = ({ currUrl, prevUrl, fading }: Props) => {
  return (
    <main class="relative h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      {prevUrl && (
        <img
          key={`bg-${prevUrl}`}
          src={prevUrl}
          alt="Blurred background"
          class="absolute inset-0 h-full w-full object-cover filter blur-2xl scale-110 transition-opacity duration-500"
          onClick={exitFullscreen}
        />
      )}

      <img
        key={`bg-${currUrl}`}
        src={currUrl}
        alt="Blurred background"
        class="absolute inset-0 h-full w-full object-cover filter blur-2xl scale-110 transition-opacity duration-500"
        onClick={exitFullscreen}
      />

      <div class="relative w-full h-auto max-h-(--max-frame-height) aspect-video p-(--frame-padding) rounded-lg shadow-2xl bg-pink-200/50 flex justify-center items-center">
        <div class="relative w-full max-w-(--max-image-width) h-auto max-h-(--max-image-height)">
          <img
            key={`fg-${currUrl}`}
            src={currUrl}
            alt="Selected foreground"
            class={`w-full max-w-(--max-image-width) h-auto max-h-(--max-image-height) rounded-lg shadow-2xl transition-opacity duration-500 ease-in-out ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          />

          <EnterFullscreen>
            <div class="absolute bottom-2 right-2 p-(--frame-padding)">
              <div class="bg-pink-200/40 text-white rounded-full p-5 flex items-center justify-center">
                <Expand class="w-10 h-10" />
              </div>
            </div>
          </EnterFullscreen>
        </div>
      </div>
    </main>
  );
};

export default ImageShow;
