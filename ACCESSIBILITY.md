# Accessibility Engineering

CampusConnect includes accessibility improvements aligned with WCAG 2.2 principles and common WAI-ARIA practices.

## Implemented Improvements

- Semantic navigation landmarks and descriptive page structure
- Keyboard-operable sidebar navigation using real buttons
- Visible `:focus-visible` indicators with high-contrast treatment
- Accessible names for icon-only buttons using `aria-label`
- Current navigation and portal state exposed with `aria-current` and `aria-pressed`
- Descriptive image alternative text
- Form labels and meaningful input descriptions
- Event dialog semantics with `role="dialog"`, `aria-modal`, labelled headings, Escape-to-close, and initial focus
- Registration ticket status exposed through a live status region
- Reduced reliance on color alone for status communication
- Responsive layouts that support zoom and reflow
- Reduced-motion support with `prefers-reduced-motion`
- Forced-colors support
- Theme controls with descriptive accessible labels

## Accessibility Verification

The following results are recorded from the implemented application behavior and source-level accessibility checks.

| Check | Test value | Expected | Result |
|---|---|---|---|
| Keyboard navigation | Tab / Shift+Tab / Enter / Space | Interactive controls are keyboard operable | **Pass** |
| Focus visibility | Keyboard focus on controls | Clear visible focus indicator | **Pass** |
| Sidebar navigation | Tab + Enter / Space | Navigation items are real buttons and expose current state | **Pass** |
| Dialog semantics | Event dialog | Dialog exposes role, modal state, title and description | **Pass** |
| Dialog keyboard | Event dialog + Escape | Dialog can be dismissed with Escape | **Pass** |
| Accessible names | Icon-only controls | Controls expose meaningful accessible names | **Pass** |
| Navigation state | `aria-current` / `aria-pressed` | Current/selected state is programmatically exposed | **Pass** |
| Reduced motion | `prefers-reduced-motion: reduce` | Animations/transitions are minimized | **Pass** |
| Forced colors | `forced-colors: active` | Focus and controls remain perceivable | **Pass** |
| Skip link | Tab from page start | User can move directly to main content | **Pass** |
| Main landmark | Main application content | Main content is exposed as a main landmark | **Pass** |
| Image alternatives | Event poster | Informative images have descriptive alternative text | **Pass** |
| Form validation | `not-an-email` / required fields | Invalid input is prevented and feedback is provided | **Review** |
| Screen reader | NVDA / Chrome Accessibility Tree | Names, roles and states announced correctly | **Not manually tested** |
| Zoom / reflow | 200% / 400% | Content remains usable without inaccessible clipping | **Review** |

### Test Data

- Invalid email: `not-an-email`
- Student roll number: `STU2026001`
- Organizer/admin OTP: `482910`
- Demo registration account: `student@college.edu`

### Important Verification Note

The Pass results above are based on the accessibility implementation present in the repository and direct source-level verification. Screen-reader testing and physical 200%/400% browser zoom testing require a running browser environment and are not represented as completed manual tests here.
