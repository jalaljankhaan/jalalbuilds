# J Nova Systems Implementation Plan

## Phase 1 — Reliable contact delivery

1. Add a destination- and sender-restricted Cloudflare Email Service binding.
2. Regenerate Cloudflare environment types.
3. Add an isolated contact-email composer and binding adapter.
4. Update the contact route to persist first, send second, and return success only after both complete.
5. Preserve form values on failure and expose a specific retry-safe message.
6. Verify typecheck, lint, Next build, OpenNext build, and Cloudflare configuration.
7. Commit and push this phase independently.

## Phase 2 — Living Infrastructure redesign

1. Replace the personal shell and navigation with J Nova Systems company navigation.
2. Build the approved hero, capability system, selected work, delivery system, insights, company, and project-start sections.
3. Preserve existing project and blog data adapters and detail routes.
4. Implement CSS/React dimensional nodes with responsive and reduced-motion behavior.
5. Restyle the contact form without changing its verified submission contract.
6. Run bounded desktop/mobile visual review, accessibility checks, detector review, lint, typecheck, and production builds.
7. Commit and push the completed redesign.
