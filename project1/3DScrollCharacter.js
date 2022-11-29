function Character(info) {
  console.log(this);
  this.mainElem = document.createElement('div');
  this.mainElem.classList.add('character');
  this.mainElem.innerHTML = `                
  <div class="character-face-con character-head">'
  <div class="character-face character-head-face face-front"></div>'
  <div class="character-face character-head-face face-back"></div>'
</div>
<div class="character-face-con character-torso">'
  <div class="character-face character-torso-face face-front"></div>'
  <div class="character-face character-torso-face face-back"></div>'
</div>
<div class="character-face-con character-arm character-arm-right">
  <div class="character-face character-arm-face face-front"></div>
  <div class="character-face character-arm-face face-back"></div>
</div>
<div class="character-face-con character-arm character-arm-left">
  <div class="character-face character-arm-face face-front"></div>
  <div class="character-face character-arm-face face-back"></div>
</div>
<div class="character-face-con character-leg character-leg-right">
  <div class="character-face character-leg-face face-front"></div>
  <div class="character-face character-leg-face face-back"></div>
</div>
<div class="character-face-con character-leg character-leg-left">
  <div class="character-face character-leg-face face-front"></div>
  <div class="character-face character-leg-face face-back"></div>
</div>
</div>
  `
  document.querySelector('.stage').appendChild(this.mainElem);

  this.mainElem.style.left = info.xPos + '%';
  this.scrollState = false;
  this.lastScrollTop = 0;
  this.xPos = info.xPos
  this.speed = info.speed * 0.5 + 0.2;
  this.direction;
  this.init();
  this.runningState = false;
}

Character.prototype = {
  constructor: Character,
  init: function () {
    const self = this;

    window.addEventListener('scroll', () => {

      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add('running')
      }

      self.scrollState = setTimeout(() => {
        self.scrollState = false;
        self.mainElem.classList.remove('running');
      }, 500);

      if (self.lastScrollTop > pageYOffset) {
        self.mainElem.setAttribute('data-direction', 'backward');
      } else {
        self.mainElem.setAttribute('data-direction', 'forward');
      }

      self.lastScrollTop = pageYOffset;
    });

    window.addEventListener('keydown', (e) => {
      if (self.runningState) {
        return;
      }
      if (e.keyCode == 37) {
        self.direction = 'left'
        self.mainElem.setAttribute('data-direction', 'left');
        self.mainElem.classList.add('running');
        self.run(self);
        self.runningState = true;
      } else if (e.keyCode == 39) {
        self.direction = 'right'
        self.mainElem.setAttribute('data-direction', 'right');
        self.mainElem.classList.add('running');
        self.run(self);
        self.runningState = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      self.mainElem.classList.remove('running');
      cancelAnimationFrame(self.rafId);
      self.runningState = false;
    });
  },
  run: function (self) {
    if (self.direction == 'left') {
      self.xPos -= self.speed;
    } else if (self.direction = 'right') {
      self.xPos += self.speed;
    }

    if (self.xPos < 2) {
      self.xPos = 2;
    }
    if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.mainElem.style.left = self.xPos + '%';

    self.rafId = requestAnimationFrame(() => {
      self.run(self);
    });
  }
}