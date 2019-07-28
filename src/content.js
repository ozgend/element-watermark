// denolk

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  applyWatermark(request.profiles);
});

const generateWatermarkElement = (profile) => {
  let cfLogo = document.createElement('IMG');
  cfLogo = updateWatermarkAttributes(cfLogo, profile);
  return cfLogo;
};

const updateWatermarkAttributes = (element, profile) => {
  const attributes = prepareWatermarkAttributes(profile);

  element.className = attributes.className;
  element.src = attributes.src;
  element.style.width = attributes.style.width;
  element.style.height = attributes.style.height;
  element.style.position = attributes.style.position;
  element.style.opacity = attributes.style.opacity;

  if (profile.top !== '-1') {
    element.style.top = attributes.style.top;
  }

  if (profile.left !== '-1') {
    element.style.left = attributes.style.left;
  }

  if (profile.bottom !== '-1') {
    element.style.bottom = attributes.style.bottom;
  }

  if (profile.right !== '-1') {
    element.style.right = attributes.style.right;
  }

  return element;
};

const prepareWatermarkAttributes = (profile) => {
  return {
    className: 'cf-logo',
    src: profile.imageUrl,
    style: {
      'user-select': 'none',
      position: 'absolute',
      width: `${profile.imageWidth}px`,
      height: `${profile.imageHeight}px`,
      top: `${profile.top}px`,
      left: `${profile.left}px`,
      bottom: `${profile.bottom}px`,
      right: `${profile.right}px`,
      opacity: parseFloat(profile.opacity)
    }
  };
};

const applyWatermark = function (profiles) {
  console.log('applyWatermark - entrypoint');

  profiles.forEach(profile => {
    const elements = [...document.querySelectorAll(profile.targetSelector)];
    elements.forEach(element => {
      console.log('applyCodefictionWatermark -- applied');
      if (element.attributes.cfLogo) {
        console.log('updating watermark...');
        updateWatermarkAttributes(element.querySelector('img.cf-logo'), profile);
      }
      else {
        const logo = generateWatermarkElement(profile);
        element.appendChild(logo);
        element.attributes.cfLogo = true;
        element.style.position = 'relative';
      }
    });
  });

}

// const observer = new MutationObserver(applyWatermark);
// observer.observe(document.body, { childList: true, subtree: true });
