import { defineStore } from 'pinia';
import { api } from 'boot/axios'
import {User} from 'src/models/User';
import {Card} from 'src/models/Card';

interface State {
  userDetails: User | null;
  cards: Card[];
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    userDetails: null,
    cards: [],
  }),
  getters: {
    getUserDetails: (state) => state.userDetails,
    getUserCards: (state) => state.cards
  },
  actions: {
    async fetchUserDetails(userId: string) {
      const { data } = await api.get<User>(`/users/${userId}`);
      this.userDetails = data;
    },
    async fetchUserCards(userId: string) {
      const { data } = await api.get<Card[]>(`/users/${userId}/cards?isCancelled=false`);
      this.cards = data;
    },
    async addCard(userId: string, payload: Partial<Card>) {
      const { data } = await api.post<Card>(`/users/${userId}/cards`, payload);
      this.cards.push(data);
    },
    async freezeCardToggle(cardId: string, payload: Partial<Card>) {
      const { data } = await api.patch(`/cards/${cardId}`, payload);
      this.cards = this.cards.map((card) => {
        if (card.id === data.id) return data;
        return card;
      });
    },
    async cancelCard(cardId: string, payload: Partial<Card>) {
      const { data } = await api.patch(`/cards/${cardId}`, payload);
      this.cards = this.cards.filter((card) => card.id !== data.id);
    }
  },
});
