class Person {
  title: string;
  age = 27;
  gender = 'male';
  constructor(name: string) {
    this.title = name;
  }
  setTitle(title: string) {

  }
  sayTitle(): string {
    return this.title
  }
}