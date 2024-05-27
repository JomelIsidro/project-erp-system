<template>
  <!-- Modal Skeleteon Loader -->
  <div class="card">
    <div class="card-body">
      <div class="skeleton-wrapper-upper">
        <div class="skeleton-img"></div>

        <div class="skeleton-details">
          <span class="skeleton-title"></span>
          <hr />
          <span class="skel-sp skeleton-list0"></span>
          <span class="skel-sp skeleton-list1"></span>
          <span class="skel-sp skeleton-list2"></span>
          <span class="skel-sp skeleton-list3"></span>
          <span class="skel-sp skeleton-list4"></span>
          <span class="skel-sp skeleton-list5"></span>
          <span class="skel-sp skeleton-list6"></span>
          <span class="skel-sp skeleton-list7"></span>
        </div>
      </div>

      <hr />

      <div class="skeleton-wrapper-lower">
        <span class="skeleton-paragraph"></span>
      </div>
    </div>
  </div>
  <!-- /.Modal Skeleton Loader -->
</template>

<style scoped>
/* Skeleton Modal */
.skeleton-img {
  background-color: #d9d9d9;
  min-height: 150px;
  position: relative;
  border-radius: 2px;
}

.skeleton-wrapper-upper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2%;
}

.skeleton-wrapper-upper .skeleton-title {
  min-height: 28px;
  background: #d9d9d9;
  display: block;
  position: relative;
}

.skeleton-wrapper-upper .skel-sp {
  height: 16px;
  background: #d9d9d9;
  display: block;
  position: relative;
  margin-top: 10px;
  border-radius: 2px;
  overflow: hidden;
}

.skeleton-wrapper-lower .skeleton-paragraph {
  min-height: 120px;
  background: #d9d9d9;
  display: block;
  position: relative;
  border-radius: 2px;
}

.skeleton-list0 {
  width: 87%;
}

.skeleton-list1 {
  width: 82%;
}

.skeleton-list2 {
  width: 92%;
}

.skeleton-list3 {
  width: 90%;
}

.skeleton-list4 {
  width: 85%;
}

.skeleton-list5 {
  width: 94%;
}

.skeleton-list6 {
  width: 82%;
}

.skeleton-list7 {
  width: 89%;
}

.skeleton-img::before,
.skeleton-title::before,
.skeleton-paragraph::before,
.skeleton-wrapper-upper .skel-sp::before {
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

/* Skeleton Modal */
</style>
