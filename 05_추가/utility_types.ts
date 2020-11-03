interface A {
  a: 'b';
  c: true;
  d: 123;
}
const a: A = {
  a: 'b',
  c: true,
  d: 123,
}
const b: Partial<A> = {
  c: true,
  d: 123,
}