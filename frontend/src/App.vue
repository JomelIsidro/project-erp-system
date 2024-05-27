<template>
  <router-view></router-view>
</template>

<script>
export default {
  // auto logout remove for now
  // computed: {
  //   didAutoLogout() {
  //     return this.$store.getters.didAutoLogout;
  //   }
  // },
  created() {
    this.$store.dispatch('tryLogin');
  },

  // auto logout remove for now
  // watch: {
  //   didAutoLogout(curValue, oldValue) {
  //     if (curValue && curValue !== oldValue) {
  //       this.$router.replace('/');
  //     } else {
  //       this.$router.replace('/');
  //     }
  //   }
  // }
}
</script>
