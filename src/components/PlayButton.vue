<template>
  <div class="absolute -bottom-10 -right-10">
    <div class="absolute-center">
      <svg class="circle-svg absolute top-0 left-0" viewBox="0 0 500 500">
        <defs>
          <path
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
            id="textcircle_top"
          />
        </defs>
        <g>
          <text class="circle-text" dy="70" textLength="1220">
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

      <i class="pi pi-play play-btn"></i>
    </div>
  </div>
</template>

<style scoped>
.circle-text {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 10px;
  fill: #333;
}

.absolute-center {
  position: relative;
  width: 700px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-btn {
  font-size: 6rem;
  padding: 60px;
  z-index: 10;
  border-radius: 50%;
  transition: background-color 1s ease-in-out;
  animation: pulsePlay 2s infinite;
  cursor: pointer;
}

.play-btn:hover {
  background-color: gray;
  animation: pulse 2s infinite;
}

/* Pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
    padding: 60px;
    background-color: rgba(128, 128, 128, 0.2);
  }
  50% {
    transform: scale(1.08);
    padding: 70px;
    background-color: rgba(128, 128, 128, 0.4);
  }
  100% {
    transform: scale(1);
    padding: 60px;
    background-color: rgba(128, 128, 128, 0.2);
  }
}

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
