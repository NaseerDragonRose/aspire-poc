<template>
  <div class="cards-layout">
    <div class="flex justify-between">
      <span class="label text-body2 text-weight-medium q-mt-sm">
        Account balance
      </span>
      <q-icon class="mobile-app-logo" size="sm" name="svguse:icons.svg#nav-logo" color="primary" />
    </div>
    <div class="q-mt-md flex justify-between">
      <div class="flex items-center">
        <span class="bg-primary text-white q-px-md q-py-xs rounded-borders text-caption text-weight-bold">
          S$
        </span>
        <span class="label text-h5 text-weight-bold q-ml-sm">
          {{ user?.bankBalance.toLocaleString() }}
        </span>
      </div>
      <add-card />
    </div>
    <q-carousel
      v-model="currentCard"
      v-if="cards.length"
      swipeable
      animated
      navigation
      navigation-icon="radio_button_unchecked"
      control-type="flat"
      control-color="primary"
      class="cards-carousel"
    >
      <q-carousel-slide
        class="q-pa-none"
        v-for="(card, index) in cards"
        :name="index"
        :key="card.id"
      >
        <card-details :card="card" />
      </q-carousel-slide>
    </q-carousel>
  </div>
  <card-drawer v-if="cards.length" :card="cards[currentCard]"/>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useUserStore } from 'stores/user-store';
import CardDetails from 'components/CardDetails.vue';
import CardDrawer from 'components/CardDrawer.vue';
import { User } from 'src/models/User';
import AddCard from 'components/AddCard.vue';

export default defineComponent({
  name: 'MyCardsPage',

  components: {
    AddCard,
    CardDetails,
    CardDrawer
  },

  setup() {
    const userStore = useUserStore();
    const user = ref<User|null>();
    const currentCard = ref(0);
    const showNewCardModal = ref(false);

    onMounted(async () => {
      await userStore.fetchUserCards('user_1');
      user.value = userStore.getUserDetails;
    });

    const cards = computed(() => userStore.getUserCards);

    watch(cards, (curr, prev) => {
      if (curr.length !== prev.length) {
        currentCard.value = 0;
      }
    });

    return { cards, user, currentCard, showNewCardModal };
  }
});
</script>

<style lang="scss" scoped>
.cards-layout {
  position: fixed;
  width: calc(100vw - 3rem);
}
.cards-carousel {
  background: transparent;
  margin-top: 1.5rem;
  height: 18.25rem;
}
.label {
  color: white;
}
@media (min-width: $breakpoint-sm-max) {
  .cards-layout {
    position: static;
    width: 100%;
  }
  .cards-carousel {
    width: 50%;
  }
  .label{
    color: black;
  }
  .mobile-app-logo {
    display: none;
  }
}
</style>
