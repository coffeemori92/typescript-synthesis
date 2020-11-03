interface A {
  hello: boolean;
}
interface B {
  bye: boolean;
}
type C = {
  hi: boolean,
}
const a: A = {
  hello: true
}
const b: B = {
  bye: true,
}
const c: A & B & C = {
  hello: true,
  bye: true,
  hi: true,
}