# HAIS - HPI AI Safety Club

Static website for the HPI AI Safety Club, built with [Hugo](https://gohugo.io/) and deployed on GitHub Pages. The generated site uses semantic HTML, plain CSS, and small vanilla JavaScript modules for the spam-resistant email link and consent-gated external embeds. It has no client-side framework or server-side runtime.

## Local development

Hugo **v0.160.0 or newer** is recommended.

```sh
hugo server
```

Open the URL printed by Hugo. To create the production site in `public/`:

```sh
hugo --minify
```

Set `baseURL` in `hugo.toml` if the repository or deployment URL changes.

## Project structure

- `content/` - legal pages and page metadata
- `layouts/` - Hugo templates and partials
- `assets/css/` - site styles, processed and fingerprinted by Hugo Pipes
- `assets/js/` - minimal progressive-enhancement JavaScript
- `static/images/` - ready-to-serve WebP assets
- `agent-instructions/` - original copy and source images

## Image processing

Convert images to WebP and scale them to a reasonable size before adding them to the page!

The checked-in WebP files were processed once with **ImageMagick 7.1.2-12**. There is deliberately no image-processing script or image dependency in the project. Processing consisted of applying EXIF orientation, removing metadata, constraining large event photographs to 1800 × 1350 px without upscaling, and encoding them as WebP at quality 82. Organizer portraits use quality 84.

Representative commands:

```sh
# Event photograph
magick source.jpg -auto-orient -strip -resize '1800x1350>' -quality 82 output.webp

# Organizer portrait
magick source.jpg -auto-orient -strip -resize '800x800>' -quality 84 output.webp
```

## Legal maintenance notes

- Keep the independent-initiative disclaimer. Do not present HPI as a sponsor or endorser. The imprint must identify the AI Safety Club GbR and its currently authorized representative ([§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html)).
- Keep `content/datenschutz.md` aligned with the actual site. GitHub Pages logs visitor IP addresses; consult its [Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- Luma and LinkedIn must remain **click-to-load**: no external iframe, script, image, or connection before separate provider-specific consent. `loading="lazy"` or CSS hiding is not sufficient. Recheck the [Luma](https://luma.com/privacy-policy) and [LinkedIn](https://www.linkedin.com/legal/privacy-policy) policies when changing these embeds.
- Before adding embeds, analytics, forms, cookies, or another host, reassess [§ 25 TDDDG](https://www.gesetze-im-internet.de/tdddg/__25.html) and GDPR Articles [6](https://eur-lex.europa.eu/eli/reg/2016/679/art_6/oj), [7](https://eur-lex.europa.eu/eli/reg/2016/679/art_7/oj), and [13](https://eur-lex.europa.eu/eli/reg/2016/679/art_13/oj). The German authorities' [digital-services guidance](https://datenschutzkonferenz-online.de/media/oh/OH_Digitale_Dienste.pdf) is the main implementation reference. Ask HPI Legal to review material changes.

Quick check after building: `rg '<iframe|src=https?://|src="https?://' public/index.html` must return no matches.

## Deployment

Pushing to `main` triggers the workflow in `.github/workflows/hugo.yml`. GitHub Actions builds the static output and publishes it through GitHub Pages at `https://hais-potsdam.github.io/`. The repository is owned by the `hais-potsdam` organization and must remain named `hais-potsdam.github.io`; its Pages source must be set to **GitHub Actions**.
