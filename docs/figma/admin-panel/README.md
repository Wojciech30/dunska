# Duńska Admin Panel — Figma Build Package

This package is the implementation-ready source for generating the admin panel Figma file once Figma MCP is connected.

## Target Figma File
- Name: `Dunska Admin Panel v1`
- Pages:
  1. `00 Foundations`
  2. `01 Components`
  3. `02 Admin Screens - Desktop`
  4. `03 Admin Screens - Tablet`
  5. `04 Admin Screens - Mobile`
  6. `05 Handoff`

## Source Files
- `tokens.json` — design tokens and grid specs
- `components.json` — component variants and interaction states
- `screens.json` — frame-by-frame content blueprint for all breakpoints

## Coverage Included
- Login
- Dashboard
- Brands list
- Brand editor (new + edit state)
- Blog list
- Blog editor (new + edit state)
- Inspirations list/editor state
- Inquiries list + inquiry details modal
- Settings
- Admin shell (sidebar + content)

## Prototype Flow
- Login -> Dashboard
- Dashboard -> each list screen
- Lists -> editor create/edit
- Inquiries list -> details modal
- All screens -> logout action

## Figma Build Notes
- Use Auto Layout for all shells, cards, forms, and tables.
- Use component instances only in screen pages (no ad-hoc style overrides).
- Use naming:
  - Tokens: `color/*`, `space/*`, `type/*`, `radius/*`, `elevation/*`, `grid/*`
  - Components: `cmp/<category>/<name>`
  - Frames: `scr/<breakpoint>/<screen>`
- Refresh direction: neutral editorial admin UI, premium/minimal tone, denser actions than current app.

## Acceptance Checklist
- Every admin route has desktop, tablet, mobile frame.
- Every interactive element maps to a component variant.
- Empty/loading/error states exist for list, editor, settings.
- Handoff page documents spacing, typography, and state behavior.
