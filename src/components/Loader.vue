<template>
  <div class="loader-container">
    <div class="mesh-loader">
      <div class="set-one">
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <div class="set-two">
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgba(255, 255, 255, 0.8) !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 2;
}
.mesh-loader {
  overflow: hidden;
  height: inherit;
  width: inherit;
}
.mesh-loader .circle {
  width: 16px;
  height: 16px;
  position: absolute;
  background: #f44336;
  border-radius: 50%;
  margin: -15px;
  -webkit-animation: mesh 3s ease-in-out infinite -1.5s;
  animation: mesh 3s ease-in-out infinite -1.5s;
}

.mesh-loader > div .circle:last-child {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.mesh-loader > div {
  position: absolute;
  top: 50%;
  left: 50%;
}

.mesh-loader > div:last-child {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
@-webkit-keyframes mesh {
  0% {
    -webkit-transform-origin: 50% -100%;
    transform-origin: 50% -100%;
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  50% {
    -webkit-transform-origin: 50% -100%;
    transform-origin: 50% -100%;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  50.1% {
    -webkit-transform-origin: 50% 200%;
    transform-origin: 50% 200%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform-origin: 50% 200%;
    transform-origin: 50% 200%;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes mesh {
  0% {
    -webkit-transform-origin: 50% -100%;
    transform-origin: 50% -100%;
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  50% {
    -webkit-transform-origin: 50% -100%;
    transform-origin: 50% -100%;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  50.1% {
    -webkit-transform-origin: 50% 200%;
    transform-origin: 50% 200%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform-origin: 50% 200%;
    transform-origin: 50% 200%;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
