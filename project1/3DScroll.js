(function () {
  const stageElem = document.querySelector('.stage');
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar')
  const mousePos = {
    x: 0,
    y: 0
  };

  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }


  window.addEventListener('scroll', () => {
    // console.log(pageYOffset / maxScrollValue);
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

    barElem.style.width = scrollPer * 100 + '%';
  });

  window.addEventListener('mousemove', (e) => {
    // console.log(e.clientX, e.clientY);
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform = 'rotateX(' + mousePos.y * 5 + 'deg) rotateY(' + mousePos.x * 5 + 'deg)'
  });

  window.addEventListener('resize', resizeHandler);
  resizeHandler();


  stageElem.addEventListener('click', (e) => {
    console.log(e.clientX / window.innerWidth * 100);
    new Character({
      xPos: e.clientX / window.innerWidth * 100,
      speed: Math.random()
    });
  })
})();