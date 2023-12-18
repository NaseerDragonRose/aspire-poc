<template>
  <q-btn
    :flat="isMobile"
    :unelevated="!isMobile"
    no-caps
    :class="{'q-pa-none': isMobile}"
    :color="`${isMobile ? 'blue-1' : 'secondary'}`"
    icon="add_circle"
    label="New Card"
    @click="showNewCardModal = !showNewCardModal"
  />
  <q-dialog v-model="showNewCardModal" persistent full-width>
    <q-card>
      <q-card-section>
        <q-input label="Cardholder Name" v-model="cardHolderName" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup @click="reset" />
        <q-btn unelevated label="Add Card" color="primary" :disable="!cardHolderName" @click="onAddCard" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Card } from 'src/models/Card';
import { date, useQuasar } from 'quasar';
import { useUserStore } from 'stores/user-store';

export default defineComponent({
  name: 'AddCard',

  setup() {
    const showNewCardModal = ref(false);
    const cardHolderName = ref('');
    const $q = useQuasar();

    const getRandomDigit = () => Math.floor(Math.random() * 10);

    const reset = () => {
      cardHolderName.value = '';
      showNewCardModal.value = false;
    }

    const onAddCard = async () => {
      const userStore = useUserStore();
      const futureDate = date.addToDate(new Date(), { months: getRandomDigit() + 1, years: getRandomDigit() })
      const payload: Partial<Card> = {
        cardHolderName: cardHolderName.value,
        cardNumber: Array.from({ length: 16 }, getRandomDigit).join(''),
        cardCVV: Array.from({ length: 3 }, getRandomDigit).join(''),
        cardExpiry: date.formatDate(futureDate, 'MM/YY'),
        isCancelled: false,
        isDisabled: false,
      };
      await userStore.addCard('user_1', payload);
      reset();
    };

    return {
      isMobile: $q.platform.is.mobile,
      showNewCardModal,
      cardHolderName,
      onAddCard,
      reset
    };
  }
});
</script>
