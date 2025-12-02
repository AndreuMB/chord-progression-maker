<template>
  <div class="absolute bottom-20 right-10 w-70 h-70">
    <!-- absolute-center -->
    <div class="w-full h-full">
      <!-- absolute top-0 left-0 w-50 h-50 -->
      <svg class="circle-svg" viewBox="0 0 500 500">
        <defs>
          <path
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
            id="textcircle_top"
          />
        </defs>
        <g>
          <text class="circle-text" dy="0" textLength="1220">
            <textPath xlink:href="#textcircle_top">LETS PLAY LETS PLAY LETS PLAY</textPath>
          </text>
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="20s"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            repeatCount="indefinite"
          />
        </g>
      </svg>

      <!-- Change icon -->
      <div class="absolute left-0 top-0 w-full h-full flex items-center justify-center">
        <i class="pi pi-play play-btn"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.circle-text {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 10px;
  fill: var(--primary);
}

.absolute-center {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-btn {
  font-size: 2rem;
  padding: 4rem;
  z-index: 10;
  border-radius: 50%;
  /* transition: background-color 1s ease-in-out; */
  animation: pulsePlay 2s infinite;
  cursor: pointer;
  /* text-align: center; */
}

.play-btn:hover {
  background-color: color-mix(in srgb, var(--terciary) 20%, transparent);
  /* animation: pulse 2s infinite; */
}

/* Pulse animation */
/* @keyframes pulse {
  0% {
    transform: scale(1);
    padding: 60px;
    background-color: color-mix(in srgb, var(--terciary) 20%, transparent);
  }
  50% {
    transform: scale(1.08);
    padding: 70px;
    background-color: color-mix(in srgb, var(--terciary) 40%, transparent);
  }
  100% {
    transform: scale(1);
    padding: 60px;
    background-color: color-mix(in srgb, var(--terciary) 20%, transparent);
  }
} */

@keyframes pulsePlay {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}
</style>
