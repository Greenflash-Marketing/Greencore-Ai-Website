// Funktionsumfang fuer LazyMotion. Wird per dynamischem Import nachgeladen,
// damit motion das erste Rendern und den LCP nicht blockiert.
// domAnimation deckt Animationen, Varianten, Exit, Hover/Tap/Focus und
// whileInView ab. Erst fuer Drag oder Layout-Animationen auf domMax wechseln.
import { domAnimation } from "motion/react";

export default domAnimation;
