let imgCoords: RSP[keyof RSP] = '0';

interface RSP {
  readonly ROCK: '0',
  readonly SCISSORS: '-142px',
  readonly PAPER: '-284px',
};

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
};

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
  return (Object.keys(rsp) as [keyof RSP]).find(k => rsp[k] === imgCoords)!;
}

let interval: number;
let point: number = 0;
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(this: HTMLButtonElement) {
    clearInterval(interval);
    setTimeout(intervalMaker, 2000);
    const myChoice = this.textContent as keyof RSP;
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;
    if(diff === 0) {
      console.log('비겼습니다.');
    } else if([-1, 2].includes(diff)) {
      console.log('이겼습니다.');
      point++;
    } else {
      console.log('졌습니다.');
      point--;
    }
  });
});

function intervalMaker() {
  interval = setInterval(() => {
    if(imgCoords === rsp.ROCK) {
      imgCoords = rsp.SCISSORS;
    } else if(imgCoords === rsp.SCISSORS) {
      imgCoords = rsp.PAPER;
    } else {
      imgCoords = rsp.ROCK;
    }
    if(document.querySelector('#computer')) {
      (document.querySelector('#computer') as HTMLDivElement).style.background
      = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
    }
  }, 100);
}

intervalMaker();