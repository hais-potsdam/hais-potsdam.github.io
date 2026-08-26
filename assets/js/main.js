const externalEmbeds = document.querySelectorAll('.external-embed');

externalEmbeds.forEach((embed) => {
  const consent = embed.querySelector('.embed-consent');
  const content = embed.querySelector('.embed-content');
  const frames = embed.querySelector('.embed-frames');
  const loadButton = embed.querySelector('.embed-load');

  loadButton.addEventListener('click', () => {
    const urls = embed.dataset.embedUrls.split('|');
    const provider = embed.dataset.provider;

    urls.forEach((url, index) => {
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.height = embed.dataset.height;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer';
      iframe.title = urls.length > 1 ? `${provider} content ${index + 1}` : `${provider} content`;
      iframe.setAttribute('allowfullscreen', '');
      frames.append(iframe);
    });

    consent.hidden = true;
    content.hidden = false;
  });
});

const emailButton = document.querySelector('#email-button');

if (emailButton) {
  emailButton.addEventListener('click', () => {
    const address = ['klub-artificial-intelligence-sprecher', 'hpi', 'de'].join('@').replace('@de', '.de');
    window.location.href = `mailto:${address}`;
  });
}
