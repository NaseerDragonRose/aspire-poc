<template>
  <q-layout view="lhr lpr fff">
    <div class="desktop-nav">
      <div class="app-logo">
        <q-img src="/app_logo.svg" />
      </div>
      <div class="app-quote">Trusted way of banking for 3,000+ SMEs and startups in Singapore</div>
      <q-tabs
        v-model="tab"
        class="desktop-tabs text-white"
        active-color="primary"
        indicator-color="transparent"
        vertical
      >
        <q-route-tab name="home" icon="svguse:icons.svg#nav-logo" label="Home" to="/" />
        <q-route-tab name="cards" icon="svguse:icons.svg#nav-card" label="Cards" to="/my-cards" />
        <q-tab name="payments" icon="svguse:icons.svg#nav-payments" label="Payments" />
        <q-tab name="credit" icon="svguse:icons.svg#nav-credit" label="Credit" />
        <q-tab name="profile" icon="svguse:icons.svg#nav-profile" label="Profile" />
      </q-tabs>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DesktopLayout',

  setup() {
    const tab = ref('home');
    return { tab };
  }
});
</script>

<style lang="scss" scoped>
.desktop-nav {
  background-color: var(--q-dark);
  padding: 3rem;
}
.q-page-container {
  background-color: white;
  padding: 3rem 3.75rem;
}
.app-logo {
  width: 125px;
  height: 35px;
}
.app-quote {
  margin-top: 1.125rem;
  margin-bottom: 5rem;
  font-size: 1rem;
  color: white;
  opacity: 0.3;
}
</style>

<style lang="scss">
.desktop-tabs .q-tab {
  justify-content: start;
  .q-tab__content {
    flex-direction: row;
    .q-tab__label {
      font-size: 1rem;
      margin-left: 1rem;
    }
  }
}
</style>
