<template>
  <q-layout view="lhr lpr fff">
    Desktop Layout
    <q-drawer show-if-above side="left" bordered></q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DesktopLayout',
});
</script>
