interface Card {
  att: number;
  hp: number;
  mine: boolean;
  field: boolean;
  cost?: number;
  hero?: boolean;
}

class Hero implements Card {
  public att: number;
  public hp: number;
  public hero: boolean;
  public field: boolean;
  public mine: boolean;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
}

class Sub implements Card {
  public att: number;
  public hp: number;
  public field: boolean = false;
  public mine: boolean;
  public cost: number;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
}

function isSub(data: Card): data is Sub {
  if(data.cost) {
    return true;
  }
  return false;
}

function isHero(data: Card): data is Hero {
  if(data.hero) {
    return true;
  }
  return false;
}

interface Player {
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData?: Card | null,
  fieldData: Card[],
  chosenCard?: HTMLDivElement | null,
  chosenCardData?: Card | null,
}

const opponent: Player = {
  hero: document.querySelector('#rival-hero') as HTMLDivElement,
  deck: document.querySelector('#rival-deck') as HTMLDivElement,
  field: document.querySelector('#rival-cards') as HTMLDivElement,
  cost: document.querySelector('#rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const me: Player = {
  hero: document.querySelector('#my-hero') as HTMLDivElement,
  deck: document.querySelector('#my-deck') as HTMLDivElement,
  field: document.querySelector('#my-cards') as HTMLDivElement,
  cost: document.querySelector('#my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const turnButton = document.querySelector('#turn-btn');
let turn = true;

function init() {
  [opponent, me].forEach(item => {
    item.deckData = [];
    item.heroData = null;
    item.fieldData = [];
    item.chosenCard = null;
    item.chosenCardData = null;
  });
  createDeck({ mine: true, count: 5});
  createDeck({ mine: false, count: 5});
  createHero({ mine: false });
  createHero({ mine: true });
  redrawScreen({ mine: true });
  redrawScreen({ mine: false });
}

init();

function createDeck({mine, count}: { mine: boolean, count: number }) {
  const player = mine ? me : opponent;
  for(let i: number = 0; i < count; i++) {
    player.deckData.push(new Sub(mine));
  }
  redrawDeck(player);
}

function createHero({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true});
}

interface A {
  data: Card;
  DOM: HTMLDivElement;
  hero?: boolean;
}

function connectCardDOM({ data, DOM, hero = false }: A) {
  const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
  cardEl.querySelector('.card-att')!.textContent = String(data.att);
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);
  if(hero) {
    (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display = 'none';
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.append(name);
  } else {
    cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
  }
  cardEl.addEventListener('click', () => {
    if(isSub(data) && data.mine === turn && !data.field) {
      if(!deckToField({ data })) {
        createDeck({ mine: turn, count: 1 });
      }
    }
  });
  DOM.append(cardEl);
}

function redrawScreen({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  redrawHero(player);
}

function redrawHero(target: Player) {
  if(!target.heroData) {
    throw new Error('hero 데이터가 없습니다.');
  }
  target.hero.innerHTML = '';
  connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true});
}

function redrawDeck(target: Player) {
  target.deck.innerHTML = '';
  target.deckData.forEach((data) => {
    connectCardDOM({ data, DOM: target.deck });
  });
}

function redrawField(target: Player) {
  target.field.innerHTML = '';
  target.fieldData.forEach((data) => {
    connectCardDOM({ data, DOM: target.field });
  });
}

function deckToField({ data }: { data: Sub }): boolean {
  const target = turn ? me : opponent;
  const currentCost = Number(target.cost.textContent);
  if(currentCost < data.cost) {
    alert('코스트가 모자릅니다.');
    return true;
  }
  data.field = true;
  const idx = target.deckData.indexOf(data);
  target.deckData.splice(idx, 1);
  target.fieldData.push(data);
  redrawDeck(target);
  redrawField(target);
  target.cost.textContent = String(currentCost - data.cost);
  return false;
}