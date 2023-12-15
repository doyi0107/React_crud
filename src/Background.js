import React, { useEffect, useRef } from "react";
import { gsap, Quad } from "gsap";
// import "./App.scss";
// import "./App.css";

const StarrySky = () => {
  const layers = 6;
  const starDensity = 0.0005;

  const ww = window.innerWidth;
  const wh = window.innerHeight;

  const dpi = window.devicePixelRatio;
  const cw = ww * dpi;
  const ch = wh * dpi;
  const stars = ww * ww * starDensity * dpi;

  const contexts = [];

  const startBlinking = (layer) => {
    const blink = () => {
      gsap.to(layer, {
        opacity: 0.4 + Math.random() * 0.4,
        duration: 0.2 + Math.random() * 0.4,
        repeat: 1,
        yoyo: true,
        ease: Quad.easeInOut,
        onComplete: blink,
      });
    };
    blink();
  };

  useEffect(() => {
    for (let i = 0; i < layers; i++) {
      const layer = document.createElement("canvas");
      layer.width = ww;
      layer.height = wh;
      layer.style.width = `${ww}px`;
      layer.style.height = `${wh}px`;
      layer.classList.add("layer");
      document.body.appendChild(layer);

      const ctx = layer.getContext("2d");
      ctx.fillStyle = "#00f6ff";
      contexts.push(ctx);
      startBlinking(layer);
    }

    for (let i = 0; i < stars; i++) {
      const x = Math.round(Math.random() * cw) - 0.5;
      const y = Math.round(Math.random() * ch) - 0.5;

      let s = Math.random();
      s = Math.pow(s, 8) * 1.5;
      s += 0.3;
      if (Math.random() < 0.1) {
        s *= 2;
      }
      if (s < 0) s = 0;

      let a = 1;
      if (s < 1) {
        a = s;
        s = 1;
      }

      const id = Math.round(Math.random() * (contexts.length - 1));
      const ctx = contexts[id];

      ctx.translate(x, y);
      ctx.globalAlpha = a;
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(0, 0, s * dpi, s * dpi);

      if (s >= 1) {
        ctx.globalAlpha = 0.03;
        const shineSize = s * s * s * 1.5 * dpi;
        ctx.fillRect(
          (s - shineSize) / 1.5,
          (s - shineSize) / 1.5,
          shineSize,
          shineSize
        );
      }

      ctx.rotate(-Math.PI / 4);
      ctx.translate(-x, -y);
    }
  }, [ww, wh, cw, ch, stars, contexts]);

  return <div></div>;
};

export default StarrySky;
