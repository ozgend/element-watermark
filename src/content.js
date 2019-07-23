// denolk
// https://github.com/ozgend/un-password.git

var cfw = {
  elements: []
};

const generateCfLogoNode = () => {
  let cfLogo = document.createElement("IMG");
  cfLogo.className = 'cf-logo';
  cfLogo.src = 'https://codefiction-cover.herokuapp.com/logo/0-cf-orange-c-tr.png';
  cfLogo.style.width = '80px';
  cfLogo.style.height = 'auto';
  cfLogo.style.position = 'absolute';
  cfLogo.style.bottom = '8px';
  cfLogo.style.right = '0px';
  cfLogo.style.opacity = 0.7;
  return cfLogo;
}


const applyCodefictionWatermark = function () {
  cfw.elements = [...document.querySelectorAll('.canvas-item')].filter(element => !element.attributes.cfLogo);
  cfw.elements.forEach(element => {
    console.log('applyCodefictionWatermark -- applied');
    const logo = generateCfLogoNode();
    element.appendChild(logo);
    element.attributes.cfLogo = true;
  });
}

const observer = new MutationObserver(applyCodefictionWatermark);
observer.observe(document.body, { childList: true, subtree: true });

applyCodefictionWatermark();