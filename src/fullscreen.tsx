import type { ComponentChildren } from "preact";
import { createContext } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";

const FsCtx = createContext({
  isFullscreen: false,
  enterFullscreen: () => {},
});

export const exitFullscreen = () => {
  if (!document.fullscreenEnabled || !document.fullscreenElement) {
    return;
  }
  document.exitFullscreen().catch(console.error);
};

type Children = {
  children: ComponentChildren;
};

export const FullscreenProvider = ({ children }: Children) => {
  const [isFs, setIsFs] = useState(!!document.fullscreenElement);
  const ref = useRef<HTMLDivElement>(null);

  const handleFullscreenChange = () => {
    setIsFs(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    if (ref.current === null) {
      return;
    }

    ref.current.requestFullscreen().catch(console.error);
  };

  const ctx = {
    isFullscreen: isFs,
    enterFullscreen,
  };

  return (
    <div ref={ref}>
      <FsCtx.Provider value={ctx}>{children}</FsCtx.Provider>
    </div>
  );
};

export const EnterFullscreen = ({ children }: Children) => {
  const { isFullscreen, enterFullscreen } = useContext(FsCtx);

  if (!document.fullscreenEnabled || isFullscreen) {
    return null;
  }

  return (
    <button type="button" onClick={enterFullscreen}>
      {children}
    </button>
  );
};
