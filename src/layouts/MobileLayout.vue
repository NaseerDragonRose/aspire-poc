<template>
  <q-layout view="lhr lpr fff">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated class="bg-white">
      <q-tabs
        v-model="tab"
        class="text-grey-1"
        active-color="primary"
        indicator-color="transparent"
        align="justify"
      >
        <q-route-tab name="home" icon="svguse:icons.svg#nav-logo" label="Home" to="/" />
        <q-route-tab name="cards" icon="svguse:icons.svg#nav-card" label="Cards" to="/my-cards" />
        <q-tab name="payments" icon="svguse:icons.svg#nav-payments" label="Payments" />
        <q-tab name="credit" icon="svguse:icons.svg#nav-credit" label="Credit" />
        <q-tab name="profile" icon="svguse:icons.svg#nav-profile" label="Profile" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'MobileLayout',

  setup() {
    const tab = ref('home');
    return { tab };
  }
});
</script>
