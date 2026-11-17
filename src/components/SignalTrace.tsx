"use client";

import { useEffect, useRef } from "react";

// The hero's one moving thing: a sensor signal that arrives analog and noisy
// on the left, gets sampled in the middle, and leaves as clean digital steps
// on the right. Same wave on both sides, so the steps visibly track the input.

const SIGNAL = "#7fd4e3";
const PAD = "#f0c56b";
const TRACE = "#25365c";
const STEP = 30; // px between samples
const LEVELS = 7; // quantisation levels either side of zero

function wave(x: number, t: number) {
  const p = x - t * 70;
  return (
    Math.sin(p * 0.011) * 0.55 +
    Math.sin(p * 0.027 + 1.3) * 0.28 +
    Math.sin(p * 0.006 - 0.6) * 0.17
  );
}

function jitter(x: number, t: number) {
  return Math.sin(x * 12.9898 + Math.floor(t * 24) * 78.233) * 0.07;
}

export default function SignalTrace({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;

    const draw = (ms: number) => {
      const t = still ? 0 : ms / 1000;
      const mid = height / 2;
      const amp = height * 0.36;
      const split = Math.round(width * 0.46);

      ctx.clearRect(0, 0, width, height);

      // sampling boundary
      ctx.strokeStyle = TRACE;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(split + 0.5, 0);
      ctx.lineTo(split + 0.5, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // analog side
      ctx.strokeStyle = SIGNAL;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= split; x += 2) {
        const y = mid - amp * (wave(x, t) + jitter(x, t));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // digital side: sample and hold
      ctx.strokeStyle = PAD;
      ctx.fillStyle = PAD;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      const samples: [number, number][] = [];
      for (let x = split; x <= width + STEP; x += STEP) {
        const level = Math.round(wave(x, t) * LEVELS) / LEVELS;
        const y = mid - amp * level;
        if (x === split) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        ctx.lineTo(x + STEP, y);
        samples.push([x, y]);
      }
      ctx.stroke();
      for (const [x, y] of samples) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!still) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still) draw(0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (!still) frame = requestAnimationFrame(draw);

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !still) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
