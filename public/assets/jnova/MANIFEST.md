# J Nova Systems image assets

## produce

- `id`: `hero-system`
  - `source_crop`: `.impeccable/mocks/j-nova-asymmetric-network.png` (hero network visual role)
  - `output_path`: `public/assets/jnova/hero-system.webp`
  - `strategy`: faithful clean regeneration as an isolated 3D hardware-network cutout
  - `prompt_used`: "Four connected dark-forest modular hardware nodes in an asymmetric isometric network, one larger central node, matte machined housings, pale-mint conduits, sparse acid-lime indicators, transparent background; no text, logos, data, UI, or presentation chrome."
  - `dimensions`: `1400x1100`
  - `format`: `WebP`
  - `transparency`: `true alpha`
  - `deviations`: labels from the approved comp intentionally removed; regenerated geometry is cleaner and more compact for responsive composition
  - `qa_status`: `accepted`

- `id`: `work-platform`
  - `source_crop`: `.impeccable/mocks/j-nova-asymmetric-network.png` (selected-work image language)
  - `output_path`: `public/assets/jnova/work-platform.webp`
  - `strategy`: abstract cinematic platform-system regeneration
  - `prompt_used`: "Abstract scalable web and SaaS platform translated into dark architectural infrastructure: layered translucent planes, precise rails, service blocks, mint data paths, sparse acid indicators; no real client, UI, text, logos, or fake data."
  - `dimensions`: `1200x720`
  - `format`: `WebP`
  - `transparency`: `opaque`
  - `deviations`: no client-specific content or interface claims
  - `qa_status`: `accepted`

- `id`: `work-mobile`
  - `source_crop`: `.impeccable/mocks/j-nova-asymmetric-network.png` (selected-work image language)
  - `output_path`: `public/assets/jnova/work-mobile.webp`
  - `strategy`: abstract cinematic mobile-system regeneration
  - `prompt_used`: "Abstract portrait device-form in a modular engineering cradle, connected to compact service nodes with mint signal paths and stacked translucent planes; no recognizable phone brand, operating-system UI, text, logos, or fake data."
  - `dimensions`: `1200x720`
  - `format`: `WebP`
  - `transparency`: `opaque`
  - `deviations`: device is intentionally generic and screen content is absent
  - `qa_status`: `accepted`

## direct

None.

## semantic

- `id`: `hero-labels-and-network-chrome`
  - `implementation`: Render all node labels, numbering, fine signal lines, status annotations, perspective framing, shadows, and responsive transforms in semantic HTML/CSS/SVG around the hero cutout.
  - `notes`: Keep names and claims sourced from product content; reduce network depth at tablet widths and stack the static composition below hero copy on mobile.
  - `qa_status`: `accepted`

## execution_order

1. Compose `hero-system.webp` within the CSS-owned hero network.
2. Place `work-platform.webp` and `work-mobile.webp` as responsive selected-work media.
3. Add all labels, chrome, corners, borders, and motion in code.

## blockers

None.

## assumptions

- WebP alpha is supported by the production browser matrix.
- CSS owns cropping, corner radius, border, shadow, and responsive positioning.
