import React, { useEffect } from "react";
import { gsap, Quad } from "gsap";

const StarrySky = () => {
  const layers = 5;
  const starDensity = 0.0004;

  const ww = window.innerWidth;
  const wh = window.innerHeight;

  const dpi = window.devicePixelRatio;
  const cw = ww * dpi;
  const ch = wh * dpi;
  // ww에 dpi를 곱함으로써 브라우저 창의 너비를 디바이스 픽셀 비율에 맞게 확장
  // 고해상도 디바이스에서는 더 선명한 화면을 제공
  const stars = 400; // Set a fixed number of stars

  const contexts = [];

  // 반짝이는 별 효과
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
      // - 0.5: 난수를 생성한 후, 0.5를 뺌으로써 값의 범위를 -0.5부터 0.5까지로 조정한다.
      // 이는 나중에 캔버스에서 별을 그릴 때, 좌표를 중심으로 하기 위한 보정값입니다.

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
      // id ->  contexts 배열의 랜덤한 인덱스.
      // 이 인덱스를 사용하여 contexts 배열에서 레이어의 2D 컨텍스트를 선택.
      // 선택된 컨텍스트를 이용하여 나중에 생성되는 각각의 별을 해당 캔버스 레이어에 그림.
      const ctx = contexts[id];

      //사각형을 그리는 작업시작

      ctx.translate(x, y);
      ctx.globalAlpha = a;
      //그림의 투명도(알파 값)를 a로 설정.
      // a는 이전에 계산된 알파 값으로, 별의 밝기에 따라 동적으로 변한다.

      ctx.rotate(Math.PI / 4);
      // 현재 좌표계를 시계 반대 방향으로 45도 회전시킨다.
      // 이후의 그림 그리기 작업은 회전된 좌표계에서 이뤄진다.

      ctx.fillRect(0, 0, s * dpi, s * dpi);
      // 현재 좌표계에서 (0, 0)을 시작점으로 하여 사각형을 그린다.
      // 사각형의 크기는 s * dpi로 설정되며, s는 이전에 계산된 크기 값.

      if (s >= 1) {
        ctx.globalAlpha = 0.03;
        // 새로운 알파 값으로 설정하여 빛나는 효과의 투명도를 줄인다.

        const shineSize = s * s * 1.5 * dpi;
        ctx.fillRect(
          (s - shineSize) / 1.5,
          (s - shineSize) / 1.5,
          shineSize,
          shineSize
        );
        // 빛나는 효과를 그린다.
        // (s - shineSize) / 1.5를 시작점으로 하여 사각형을 그리며, 크기는 shineSize로 설정.
      }

      ctx.rotate(-Math.PI / 4);
      // 이전의 회전을 되돌려 초기 상태로 돌아간다.

      ctx.translate(-x, -y);
      // 이전에 이동한 원점을 다시 초기 위치로 되돌린다.
    }
  }, [ww, wh, cw, ch, stars, contexts]);

  return <div></div>;
};

export default StarrySky;
