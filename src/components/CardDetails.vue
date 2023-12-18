<template>
  <div class="card-detail">
    <div class="card-bank-logo">
      <q-img src="/card_bank_logo.svg" />
    </div>
    <div class="card-name">
      {{ card.cardHolderName }}
    </div>
    <div class="card-number">
      <div v-for="(_, i) in Array.from({length: 12}).fill('')" :key="i">
        <div class="dot" :class="{space: (i % 4 === 3)}"/>
      </div>
      <span class="text-body2 text-weight-bold">
        {{ card.cardNumber.slice(-4) }}
      </span>
    </div>
    <div class="card-others">
      <div class="q-mr-lg">
        Thru: {{ card.cardExpiry }}
      </div>
      <div class="flex items-start">
        CVV: <span class="cvv-hidden">***</span>
      </div>
    </div>
    <div class="card-brand-logo">
      <q-img src="/card_brand_logo.svg" />
    </div>
    <div v-if="card.isDisabled" class="watermark">
      <q-icon name="block" size="2xl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card } from 'src/models/Card';

export default defineComponent({
  name: 'CardDetails',

  props: {
    card: {
      type: Object as () => Card,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: rgba(255, 0, 0, 0.4);
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-size: 10rem;
}
.card-detail {
  position: relative;
  background-color: var(--q-primary);
  padding: 1.5rem;
  border-radius: 0.75rem;
  .card-bank-logo,
  .card-brand-logo {
    width: 72px;
    height: 20px;
    margin-left: auto;
  }
  .card-name,
  .card-number {
    font-size: 1.375rem;
    font-weight: bold;
    margin-top: 1.5rem;
    color: white;
  }
  .card-number {
    display: flex;
    align-items: baseline;
    font-size: 0.875rem;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: white;
      margin-right: 0.375rem;
      &.space {
        margin-right: 1.5rem;
      }
    }
  }
  .card-others {
    font-size: 0.8125rem;
    margin: 0.75rem 0 0.25rem;
    font-weight: bold;
    display: flex;
    color: white;
    .cvv-hidden {
      letter-spacing: 0.25rem;
      font-size: 1.5rem;
      margin-top: -0.25rem;
      margin-left: 0.25rem;
    }
  }
}
</style>
