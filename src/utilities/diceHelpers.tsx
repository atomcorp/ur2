export const rollDice = () =>
  Array.from(Array(4))
    .fill(0)
    .map(() => Math.round(Math.random()));
