const result = Array.prototype.map.call<number[], [(item: number) => string], string[]>([1, 2, 3], item => {
  return item.toFixed(1);
});