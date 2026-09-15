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
- Forced-colors review support
- Theme controls with descriptive accessible labels

## Recommended Verification

Run these checks manually after starting the frontend.

### 1. Keyboard-only navigation

**Steps**
1. Reload the page and do not use the mouse.
2. Press `Tab` repeatedly through the sidebar, navbar, controls, event cards, and forms.
3. Use `Enter` or `Space` on focused buttons.
4. Open an event dialog and press `Escape`.
5. Open the login dialog and continue through every form control.

**Expected results**
- Every interactive control receives a visible focus indicator.
- Sidebar items work with `Enter`/`Space`.
- No clickable navigation item requires a mouse.
- Dialogs can be closed with `Escape`.
- Focus does not disappear behind the page content.

### 2. Screen-reader / accessibility-tree check

Use Chrome DevTools Accessibility Tree or NVDA.

**Expected results**
- Sidebar is announced as navigation.
- Navbar is announced as global navigation.
- Buttons have meaningful accessible names.
- Notification count is understandable without relying on the red dot.
- Theme and role controls expose their current state.
- Event dialogs announce their title and description.
- Decorative Lucide icons are ignored by assistive technology.
- Event poster images have useful alternative text.

### 3. Forms

Test login and registration with:
- Empty required fields
- Invalid email: `not-an-email`
- Student roll number: `STU2026001`
- Organizer/admin OTP: `482910`

**Expected results**
- Every input has an associated visible label.
- Required fields prevent invalid submission.
- Error/status messages are understandable and not color-only.
- OTP controls remain keyboard accessible.

### 4. Dynamic status / registration

Use the demo student account and register for an available event.

**Expected results**
- Registration state is visible in the event dialog.
- The registration ticket is exposed as a status region.
- The page does not require color alone to communicate registration state.
- Cancellation is available from a keyboard-focused button.

### 5. Zoom and reflow

Test browser zoom at **100%, 200%, and 400%**.

**Expected results**
- Text remains readable.
- Controls remain reachable.
- Content does not become permanently clipped or inaccessible.
- At narrow widths, the sidebar/navbar reflow rather than forcing horizontal page navigation.

### 6. Contrast / forced colors

Test both dark and light themes and enable Windows High Contrast / browser forced-colors support where available.

**Expected results**
- Text and controls remain distinguishable.
- Focus remains visible.
- Borders/state indicators remain perceivable without depending only on color.

### 7. Reduced motion

Enable the operating-system preference **Reduce motion**.

**Expected results**
- Decorative animations and transitions are effectively minimized.
- The interface remains usable without animation.

## Manual Testing Record

Fill this section after performing the checks:

| Check | Test value | Expected | Result |
|---|---|---|---|
| Keyboard navigation | Tab / Shift+Tab / Enter / Space | All controls reachable | ☐ Pass ☐ Fail |
| Dialog keyboard | Open event → Escape | Dialog closes | ☐ Pass ☐ Fail |
| Screen reader | NVDA or Chrome Accessibility Tree | Names/states announced | ☐ Pass ☐ Fail |
| Login validation | `not-an-email` | Validation is understandable | ☐ Pass ☐ Fail |
| Student registration | `student@college.edu` | Registration state announced | ☐ Pass ☐ Fail |
| OTP flow | `482910` | OTP controls accessible | ☐ Pass ☐ Fail |
| Zoom | 200% and 400% | Content remains usable | ☐ Pass ☐ Fail |
| Forced colors | Windows High Contrast | Focus/content remain perceivable | ☐ Pass ☐ Fail |
| Reduced motion | OS Reduce Motion | Motion minimized | ☐ Pass ☐ Fail |

Do not mark a row as Pass until the behavior has been manually verified in the running application.
