// Keep section anchors aligned with the sticky header, including wrapped navigation.
const header = document.querySelector('.site-header');

if (header) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  };
  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(header);
}

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
