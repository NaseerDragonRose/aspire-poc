<template>
  <div class="card-drawer">
    <div class="card-actions bg-blue-2">
      <q-btn :ripple="false" no-caps flat round dense icon="img:/freeze_card_icon.svg" size="lg" @click="onCardFreezeToggle">
        <div class="icon-label text-dark">{{ card.isDisabled ? 'Unfreeze' : 'Freeze' }} card</div>
      </q-btn>
      <q-btn :ripple="false" no-caps flat round dense icon="img:/spend_limit_icon.svg" size="lg" disable>
        <div class="icon-label text-dark">Set spend limit</div>
      </q-btn>
      <q-btn :ripple="false" no-caps flat round dense icon="img:/gpay_icon.svg" size="lg" disable>
        <div class="icon-label text-dark">Add to GPay</div>
      </q-btn>
      <q-btn :ripple="false" no-caps flat round dense icon="img:/replace_card_icon.svg" size="lg" disable>
        <div class="icon-label text-dark">Replace card</div>
      </q-btn>
      <q-btn :ripple="false" no-caps flat round dense icon="img:/cancel_card_icon.svg" size="lg" @click="showConfirmModal = !showConfirmModal">
        <div class="icon-label text-dark">Cancel card</div>
      </q-btn>
    </div>
  </div>
  <q-dialog v-model="showConfirmModal" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          Do you really want to cancel card ending with
          <span class="text-weight-bold">{{ card.cardNumber.slice(-4) }}</span>
          ?
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="No" v-close-popup />
        <q-btn flat label="Yes" color="red" @click="onCardCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs} from 'vue';
import { Card } from 'src/models/Card';
import { useUserStore } from 'stores/user-store';

export default defineComponent({
  name: 'CardDrawer',

  props: {
    card: {
      type: Object as () => Card,
      required: true
    }
  },

  setup(props) {
    const userStore = useUserStore();
    const { card } = toRefs(props);
    const showConfirmModal = ref(false);

    const onCardFreezeToggle = async () => {
      await userStore.freezeCardToggle(card.value.id, {isDisabled: !card.value.isDisabled});
    };

    const onCardCancel = async () => {
      await userStore.cancelCard(card.value.id, {isCancelled: !card.value.isCancelled});
      showConfirmModal.value = false;
    };

    return {
      showConfirmModal,
      onCardFreezeToggle,
      onCardCancel
    }
  }
});
</script>

<style lang="scss" scoped>
.card-drawer,
.card-actions {
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.card-drawer {
  background-color: white;
  width: 100vw;
  height: calc(100vh + 5.75rem);
  margin-left: -1.5rem;
  margin-top: calc(100vh - 18rem);
  position: sticky;
  top: -5.75rem;
}
.card-actions {
  display: flex;
  justify-content: space-between;
  padding: 1.125rem;
}
.icon-label {
  font-size: 0.8125rem;
  margin-top: 0.5rem;
  font-weight: normal;
  line-height: 1rem;
  letter-spacing: 0.03333em;
}
</style>
