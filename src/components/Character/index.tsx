import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { setSplineTimeline, setAllTimeline } from "../utils/GsapScroll";
import { setProgress } from "../Loading";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE_URL =
  "https://prod.spline.design/ib8MZg-DksRril0p/scene.splinecode";

const CharacterModel = () => {
  const { setLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const progressRef = useRef<ReturnType<typeof setProgress> | null>(null);

  useEffect(() => {
    progressRef.current = setProgress((value) => setLoading(value));
  }, []);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    progressRef.current?.loaded().then(() => {
      setTimeout(() => {
        setSplineTimeline();
        setAllTimeline();
      }, 2500);
    });
  }, []);

  return (
    <div className="character-container">
      <div className="character-model">
        <div className="character-rim"></div>
        <Suspense fallback={null}>
          <Spline
            scene={SPLINE_SCENE_URL}
            onLoad={handleLoad}
            style={{
              width: "100%",
              height: "100%",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default CharacterModel;
