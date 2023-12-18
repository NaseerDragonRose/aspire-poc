<template>
  <mobile-layout class="display-mobile" />
  <desktop-layout class="display-desktop" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'stores/user-store';
import MobileLayout from 'layouts/MobileLayout.vue';
import DesktopLayout from 'layouts/DesktopLayout.vue';

export default defineComponent({
  name: 'App',

  components: {
    DesktopLayout,
    MobileLayout
  },

  setup() {
    useUserStore().fetchUserDetails('user_1');
  },
});
</script>

<style lang="scss">
.display-mobile,
.display-desktop {
  display: none;
}
@media (max-width: $breakpoint-sm-max) {
  .display-mobile {
    display: block;
  }
}
@media (min-width: $breakpoint-sm-max) {
  .display-desktop {
    display: grid;
    grid-template-columns: 24vw 76vw;
    overflow-y: clip;
  }
}
</style>
