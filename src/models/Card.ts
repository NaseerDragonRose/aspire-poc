export interface Card {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  userId: string;
  isDisabled: boolean;
  isCancelled: boolean;
}
