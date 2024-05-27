<template>
<div class="container">
      <!-- Skeleton Checkout -->

            <div class="card">
              <div class="card-body p-2 skeleton-checkout-header">
                <div class="left-skeleton">
                  <span></span>
                </div>

                <div class="right-skeleton">
                  <span class="skel-sp"></span>
                  <span class="skel-sp"></span>
                  <span class="skel-sp"></span>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body p-4 skeleton-checkout-body">
                <div class="skeleton-body-left">
                  <div class="skeleton-img"></div>
                  <div class="skeleton-details">
                    <span class="skeleton-details-title"></span>
                    <span class="skeleton-list skl-sp0"></span>
                    <span class="skeleton-list skl-sp1"></span>
                    <span class="skeleton-list skl-sp2"></span>
                    <span class="skeleton-list skl-sp3"></span>
                    <span class="skeleton-list skl-sp4"></span>
                    <span class="skeleton-list skl-sp5"></span>
                  </div>
                </div>

                <div class="skeleton-body-right">
                  <span class="skeleton-button"></span>
                  <span class="skeleton-button"></span>
                  <span class="skeleton-button"></span>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body p-2 skeleton-checkout-header">
                <div class="left-skeleton">
                  <span></span>
                </div>

                <div class="right-skeleton">
                  <span class="skel-sp"></span>
                  <span class="skel-sp"></span>
                  <span class="skel-sp"></span>
                </div>
              </div>
            </div>

            <!-- /.Skeleton Checkout -->
</div >  
</template>

<style scoped>

/* Skeleton Wrapper */

.skeleton-checkout-header {
  display: flex;
  justify-content: space-between;
}

.left-skeleton {
  flex: 47%;
  max-width: 47%;
}

.right-skeleton {
  flex: 47%;
  max-width: 47%;

  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.left-skeleton span {
  min-height: 20px;
  background: #d9d9d9;
  display: block;
  position: relative;
  width: 59%;
  margin-left: 3%;
}

.right-skeleton .skel-sp {
  height: 20px;
  background: #d9d9d9;
  display: block;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  width: 24%;
}

/* Skeleton Body */

.skeleton-checkout-body {
  display: flex;
  justify-content: space-between;
}

.skeleton-img {
  background-color: #d9d9d9;
  min-height: 150px;
  position: relative;
  border-radius: 2px;
}

.skeleton-checkout-body .skeleton-body-left {
  flex: 50%;
  max-width: 50%;

  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 2%;
}

.skeleton-checkout-body .skeleton-body-right {
  flex: 50%;
  max-width: 50%;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.skeleton-body-right .skeleton-button {
  height: 26px;
  background: #d9d9d9;
  display: block;
  position: relative;
  margin-top: 10px;
  border-radius: 2px;
  overflow: hidden;
  width: 15%;
}

.skeleton-details .skeleton-details-title {
  min-height: 28px;
  background: #d9d9d9;
  display: block;
  position: relative;
  margin-top: 0px;

  width: 89%;
}

.skeleton-details span {
  height: 16px;
  background: #d9d9d9;
  display: block;
  position: relative;
  margin-top: 10px;
  border-radius: 2px;
  overflow: hidden;
}

.skl-sp0 {
  width: 75%;
}
.skl-sp1 {
  width: 82%;
}
.skl-sp2 {
  width: 72%;
}
.skl-sp3 {
  width: 78%;
}
.skl-sp4 {
  width: 80%;
}
.skl-sp5 {
  width: 84%;
}

.skeleton-img::before,
.skeleton-details-title::before,
.skeleton-list::before,
.skeleton-button::before,
.skeleton-checkout-header span::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    to right,
    #d9d9d9 0%,
    rgba(0, 0, 0, 0.05) 20%,
    #d9d9d9 40%,
    #d9d9d9 100%
  );
  background-size: 450px 400px;
  background-repeat: no-repeat;
  animation: shimmer 1s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -450px 0;
  }

  100% {
    background-position: 450px 0;
  }
}
</style>