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
@media (max-width: $breakpoint-xs-max) {
  .display-mobile {
    display: block;
  }
}
@media (min-width: $breakpoint-xs-max) {
  .display-desktop {
    display: block;
  }
}
</style>
