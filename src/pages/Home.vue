<template>
  <div>
    Welcome, {{ user.name }}!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'stores/user-store';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const userStore = useUserStore();
    const user = userStore.getUserDetails;
    return { user };
  },
});
</script>
