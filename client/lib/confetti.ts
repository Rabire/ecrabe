import confetti from "canvas-confetti";
import { PRIMARY_COLOR } from "./utils";

export const fireConfettiFromElement = (element: HTMLElement | null) => {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 120,
    spread: 90,
    origin: { x, y },
    angle: 70,
  });
};

export const schoolPride = () => {
  const common = {
    particleCount: 30,
    spread: 55,
    colors: [PRIMARY_COLOR],
  };

  const windowWidth = window.innerWidth;
  const sidebarWidth = 243;
  const leftOrigin = windowWidth >= 1024 ? sidebarWidth / windowWidth : 0;

  confetti({ angle: 60, origin: { x: leftOrigin }, ...common });
  confetti({ angle: 120, origin: { x: 1 }, ...common });
};
