# J Nova Systems Website and Contact Delivery Design

## Objective

Convert the existing personal portfolio into a company-first website for J Nova Systems and make every valid project inquiry reach `developers@jnovasystems.com` through Cloudflare Email Service while retaining the existing D1 record.

The primary audience is startup founders and early product teams looking for one partner to take a digital product from product thinking through design, engineering, and cloud delivery.

## Product Positioning

J Nova Systems is an end-to-end product engineering partner. The offer connects six disciplines:

- Web applications
- Mobile applications
- SaaS platforms
- UI/UX design
- APIs and integrations
- Cloud delivery

The site must earn trust through real project and article data. It must not invent customer logos, testimonials, metrics, awards, pricing, or unsupported claims.

## Information Architecture

The homepage is a single company narrative with this approved order:

1. **Hero** — immediately state the end-to-end product engineering offer and provide the primary “Start a project” action.
2. **Capabilities** — present the six connected disciplines as parts of one delivery system.
3. **Selected Work** — reuse the existing Projects data feed as proof of execution.
4. **Delivery System** — explain the sequence Discover → Design → Build → Scale.
5. **Insights** — reuse the existing Blog data feed as a compact engineering journal.
6. **Company** — explain the focused product-partner model and operating principles.
7. **Start a Project** — close with a concise prompt and the inquiry form.

The persistent navigation links to Services, Work, Insights, Company, and Start a Project. Existing project and article detail routes remain available where currently supported.

## Visual Direction: Living Infrastructure

The replacement visual world is a technical system that feels active, dimensional, and engineered rather than a conventional agency template.

- Deep near-black green is the primary field.
- Luminous mint is the main action and system color; sharp yellow-green is a sparing signal accent.
- Fine grid lines, node connections, status marks, and modular panels communicate infrastructure.
- The hero contains a lightweight CSS/React dimensional node assembly. It must not require Three.js or WebGL.
- Dimensional effects use transforms, layered borders, controlled shadows, and restrained scroll or pointer response.
- Selected Work may switch to a light mint surface to create a decisive proof-focused rhythm change.
- Typography is compact, technically confident, and readable. Wide tracking is reserved for short uppercase labels, never body copy.
- Visible containers use at least 12px internal padding; primary content panels target 16px or more.

The experience must remain fast and legible. 3D treatment supports hierarchy and storytelling; it never obscures copy or becomes required to understand the page.

## Responsive and Motion Behavior

- Desktop uses an asymmetric grid and visible dimensional scene.
- Tablet reduces scene depth and simplifies multi-column grids.
- Mobile becomes a single-column narrative, keeps tap targets at least 44px, and places the dimensional scene behind or below the hero copy without overlap.
- Keyboard focus is always visible and follows document order.
- `prefers-reduced-motion` disables continuous, pointer-driven, and scroll-linked movement while preserving the composed static scene.
- Content remains usable when client-side motion code does not run.

## Contact Architecture

The existing Next.js contact endpoint remains the only browser-facing submission target. It owns validation and orchestrates persistence and delivery.

### Runtime bindings

- D1 remains the durable contact-message store.
- A Cloudflare `send_email` binding is added and restricted to `developers@jnovasystems.com`.
- The sender is `website@jnovasystems.com` on the verified `jnovasystems.com` sending domain.

### Submission flow

1. The browser submits name, email, subject, package, and message to `/api/contact`.
2. The route validates and normalizes the request with the existing schema.
3. The message is inserted into D1.
4. The Worker sends a plain-text and HTML notification to `developers@jnovasystems.com` containing every submitted field and the stored message identifier. The visitor’s email is set as `Reply-To`, not as the sender.
5. The endpoint returns success only after Cloudflare accepts the email send.
6. The form clears only on success and presents an accessible confirmation.

### Failure behavior

- Invalid input returns field-safe validation feedback without attempting storage or email.
- Missing runtime bindings produce a controlled server error and are logged without exposing configuration details.
- If D1 persistence fails, no email is attempted.
- If email delivery fails after persistence, the stored message remains available for recovery and the endpoint returns a retryable failure. The UI keeps the user’s entered values.
- The submit button is disabled only during the active request, preventing accidental duplicate clicks.
- Logs must never contain the complete message body or any secret value.

This design guarantees that a success response means both durable storage and acceptance by Cloudflare Email Service. It does not claim inbox delivery until verified in the destination mailbox.

## Component Boundaries

- **Homepage shell:** navigation, page-level anchors, background system, and responsive rhythm.
- **Hero system:** copy, primary action, status labels, and isolated dimensional visual.
- **Capabilities grid:** six service modules with concise outcomes.
- **Selected Work:** adapter around the existing project data and reusable project cards.
- **Delivery System:** four-stage pipeline with semantic ordered content.
- **Insights:** adapter around the existing article data and reusable article cards.
- **Company:** factual positioning and principles only.
- **Contact form:** client state, validation display, submission state, and accessible status messaging.
- **Contact endpoint:** server validation, D1 persistence, email composition, and send orchestration.
- **Email composer:** pure formatting function suitable for unit testing and safe HTML escaping.

## Content Direction

The voice is direct, capable, and technically credible. The hero direction is:

> Digital products engineered to keep moving.

Supporting copy identifies web, mobile, and SaaS delivery from interface through infrastructure. Capability descriptions focus on founder outcomes without promising unverified commercial results. Existing project and article titles remain grounded in their data sources.

## Testing and Verification

### Contact delivery

- Unit-test schema rejection and email composition, including HTML escaping.
- Test the route with mocked D1 and email bindings for success, persistence failure, email failure, and missing binding cases.
- Run TypeScript and the project’s relevant test/build commands.
- Verify the OpenNext Cloudflare build recognizes the email binding.
- A real inbox-delivery claim requires an actual deployed submission and confirmation in `developers@jnovasystems.com`; local mocks and a build alone are not sufficient.

### Interface

- Run lint/type/build checks appropriate to the repository.
- Capture one bounded desktop and mobile screenshot pass.
- Review layout, contrast, focus, overflow, tap targets, reduced motion, and no-JavaScript content integrity.
- Fix all material issues in one batch, then perform at most one confirmation screenshot pass.
- Run the Impeccable detector once at the end and resolve real findings.

## Delivery Sequence

1. Implement and verify Cloudflare email delivery while preserving D1 storage.
2. Commit and push the contact-delivery change.
3. Implement the approved Living Infrastructure redesign.
4. Run bounded visual and technical verification.
5. Commit and push the redesign.

Production deployment is outside the explicit commit-and-push request. If deployment is later authorized, live submission and inbox receipt become the final production acceptance test.

## Acceptance Criteria

- A valid submission cannot receive a success response unless D1 storage and Cloudflare email acceptance both succeed.
- The notification is addressed only to `developers@jnovasystems.com` and includes all form fields.
- The visitor can retry after a send failure without losing entered data.
- The website consistently presents J Nova Systems, not a personal freelancer portfolio.
- All seven approved homepage sections are present in order.
- Existing project and blog feeds remain functional.
- The dimensional visual direction is distinct on desktop and composed safely on mobile.
- The site is keyboard accessible, responsive, reduced-motion aware, and free of horizontal overflow at supported viewport sizes.
- Relevant automated checks and production builds pass before each feature commit is pushed.
