<template>
  <div
    class="linear-loader relative overflow-hidden w-full h-1 flex bg-gray-100 dark:bg-gray-700 min-h-[theme(spacing.1)]"
  >
    <!-- slow -->
    <div
      class="bar absolute inset-0 w-full bg-primary dark:bg-primary-200"
    ></div>
    <!-- fast -->
    <div
      class="bar absolute inset-0 w-full bg-primary dark:bg-primary-200"
    ></div>
  </div>
</template>

<style lang="postcss" scoped>
.linear-loader {
  animation: start 0.3s ease-in;
  z-index: -1;
}
.linear-loader > * {
  transition: transform 0.2s linear;
}
.linear-loader > *:first-child {
  animation: grow 2.5s infinite, moveBar1 2.5s infinite;
}
.linear-loader > *:last-child {
  animation: grows 2.5s infinite, moveBar2 2.5s infinite;
}
@keyframes grow {
  0% {
    animation-timing-function: linear;
    transform: scaleX(0.1);
  }
  36.6% {
    animation-timing-function: cubic-bezier(0.33473, 0.12482, 0.78584, 1);
    transform: scaleX(0.1);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.22573, 0, 0.23365, 1.37098);
    transform: scaleX(0.83);
  }
  100% {
    transform: scaleX(0.1);
  }
}
@keyframes moveBar1 {
  0% {
    left: -105.16667%;
    animation-timing-function: linear;
  }
  20% {
    left: -105.16667%;
    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
  }
  69.15% {
    left: 21.5%;
    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
  }
  100% {
    left: 95.44444%;
  }
}
@keyframes grows {
  0% {
    animation-timing-function: cubic-bezier(0.20503, 0.05705, 0.57661, 0.45397);
    transform: scaleX(0.1);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.15231, 0.19643, 0.64837, 1.00432);
    transform: scaleX(0.57);
  }
  44.15% {
    animation-timing-function: cubic-bezier(
      0.25776,
      -0.00316,
      0.21176,
      1.38179
    );
    transform: scaleX(0.91);
  }
  100% {
    transform: scaleX(0.1);
  }
}
@keyframes moveBar2 {
  0% {
    left: -54.88889%;
    animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40968);
  }
  25% {
    left: -17.25%;
    animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73372);
  }
  48.35% {
    left: 29.5%;
    animation-timing-function: cubic-bezier(0.4, 0.62703, 0.6, 0.90203);
  }
  100% {
    left: 117.38889%;
  }
}
@keyframes start {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 20px;
    opacity: 1;
  }
}
@keyframes end {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 2px;
    opacity: 1;
  }
}
@keyframes progressLinearMovement {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
