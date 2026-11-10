# CLAUDE.md: LaSalle Stompers 2017 Girls Black playbook

Game-calls playbook for the LaSalle Stompers 2017 Girls Black team (U10 girls, ECSL league, Ontario Soccer, 7v7). The user is a parent coach and shares it with the head coach, players and parents.

- Live: https://mkonkolowicz.github.io/2017-girls-stompers-black/ (GitHub Pages, deployed from `main` at `/`)
- Repo: https://github.com/mkonkolowicz/2017-girls-stompers-black (public; renamed from `stompers-playbook` in v1.0.0, and the old Pages URL now 404s)

## Files
- `index.html`: the whole app (HTML, CSS and JS). Calls are `<section class="play" id="...">`, grouped under `.grouphead` blocks. The call cards (`.cards`) and the sticky nav chips (`nav.quick`) are grouped the same way.
- `sw.js`: offline service worker. **Bump `VERSION` on every content change.**
- `manifest.webmanifest`, `icons/`: installable app. The icons, header logo and favicon use the real club crest from lasallestompers.org.
- `2017-girls-stompers-black-playbook.pdf`: printable version. Regenerate with `node tools/make-pdf.mjs` (needs `playwright-core` and the installed Google Chrome).
- `CHANGELOG.md`: Keep a Changelog format with semver.

## Calls and groups (current: v1.0.0)
| Group | Calls (section id) |
|---|---|
| Team shape | SHAPE UP! (`shape`) |
| Win the ball | STOMP! (`stomp`), SET THE TRAP! (`trap`) |
| Advance the ball | WINGS OUT! (`wings`), OVER THE TOP! (`overtop`) |
| Corners | CRASH THE BOX! (`crash`), LOCK THE BOX! (`lock`) |
| Free kicks | TAP & BLAST! (`tap`), WALL UP! (`wall`) |

Each call has a "picture in your head" diagram and two drills. When you add a call, update all of these: the section, its call card, its nav chip, the "N calls" count in the hero, the README table, the CHANGELOG, its feedback link, and the form's dropdown.

## Diagram engine (the `const D = {...}` object in index.html)
- `pitch:'full'` is 150×100, horizontal, with our goal on the LEFT and the team attacking right. `pitch:'half'` is 100×80 with the goal at the TOP and the halfway line at y=77. `size:[w,h]` gives a plain grid.
- `fixed:[...]` holds static items: `p`/`o` tokens, `gk`/`ogk`, `c` (coach), `ball`, `cone`, `zone`, `czone`, `line`, `rline` (retreat line), `tri`, `lbl`, `tag`, `n`.
- `actors:[[type,x,y,label,id]]` holds anything that moves.
- `steps:[{s:caption, m:[[id,x,y,kind,curve,opts]], fx:[items], d, h, clear}]`.
  - Player kinds: run (default), `drib`, `none`.
  - Ball kinds: pass (default), `shot`, `none`, `reset`.
  - To show a dribble, move the player with `drib` and move the ball with `none` to just ahead of her, in the same step.
- `still:n` sets how many steps the static, print and reduced-motion picture shows.
- Full-pitch tokens are drawn 1.3× larger. Check that tags and tokens don't overlap.
- Retreat line, 7v7 (Ontario Soccer Adapted Match Formats, 2026): it sits at one third of the field. On a full pitch it's at x=51.3 for our goal and x=98.7 for theirs. On a half pitch it's at y=52.7.
  - Opponents stay behind it on a goal kick or while the GK has the ball, until the ball is in play.
  - Ontario Soccer recommends that keepers don't drop-kick.

## Style
- The audience is 8 and 9 year old girls. Use short, concrete sentences and Canadian spelling.
- No em dashes in visible copy. Use colons and periods.
- Theme: mostly black (`--ink`), crest green accents (`--green` #137a42, `--green-hi` #3dbb6c). Inside diagrams, labels and run arrows stay yellow so they show up on the green pitch.
- Formation: 2-3-1 (GK, LB, RB, LM, CM, RM, S). Ours are black tokens, opponents are red.

## Verify before shipping
1. Check the animation frames: use Playwright (`playwright-core` with Chrome's `executablePath`) to screenshot `.dg[data-d="KEY"]` at several timings, and check for JS errors. Headless `--virtual-time-budget` is unreliable for rAF and transitions.
2. Check the static frames with `reducedMotion:'reduce'`. For phone layout, use an iPhone device emulation. Chrome headless has a minimum width of about 500px.
3. Regenerate the PDF and check its pages. Render them with a PDFKit Swift script, since poppler isn't installed.

## Release flow
1. Update `CHANGELOG.md`, the footer version (`Playbook vX.Y.Z · date`) and `sw.js` `VERSION`.
2. Regenerate the PDF.
3. Commit, then `git push` to `main`.
4. Watch Pages: `gh api repos/mkonkolowicz/2017-girls-stompers-black/pages/builds/latest` until it reports `built <sha>`, then curl the live site to confirm.
5. Tag `vX.Y.Z` and create a `gh release` with the changelog section and the attached PDF.

The `gh` CLI is at `/opt/homebrew/bin/gh`.

## Memories / decisions log
- The user is fine with Claude pushing playbook updates to the live site after verifying them.
- Corner signal for CRASH THE BOX!: hand UP = get ready, hand DOWN = GO.
- Credit line: "Beta tested by #9 Victoria K." with no "thank you".
- The two backs are LB and RB. The user once wrote "CB and RB" and meant the two backs.
- Still open: a redirect repo at the old `stompers-playbook` Pages URL. The user hasn't asked for it.

## Feedback form (added in v1.0.0)
- Responder: https://docs.google.com/forms/d/e/1FAIpQLSehVao4iN_hs0dEaz_k5A2iL-7mpqFKXwh-p09SES9mPjnvRQ/viewform
- Edit: https://docs.google.com/forms/d/19hS3ltEuyuXB5gfMM1Cr3_7H2elPXB-uGp-pZesuTCs/edit
- Responses Sheet: https://docs.google.com/spreadsheets/d/1yV4gXK69eBxayucU7uCctSTmkwFR8ZXoIEOUP71C2N0/edit
- Pre-fill: "Which call?" is `entry.1089797194`. ("I am a…" is `entry.535876269`.) Each call's button is `<viewform>?usp=pp_url&entry.1089797194=<CALL, URL-encoded>`.
- Built by `tools/create-feedback-form.gs` run from an Apps Script project in the user's account.
- "Which call?" choices: General / whole playbook, Idea for a new call, then the 9 calls. The hero "Feedback? Tell us" and footer "Send feedback" links pre-fill General; the footer `.idea` button pre-fills "Idea for a new call". To change choices later, use `addIdeaChoice()`-style code in the same Apps Script project ("Untitled project"), not `createStompersFeedbackForm` (that makes a new form).
- Email notifications for new responses are ON (set in the form's Responses tab, 2026-11-09).
- **When you add a call:** also add its "💬 Feedback on this call" link (`p.fb.screen-only` at the end of the section's `.body`), and add the call to the form's "Which call?" dropdown (edit URL above) so the pre-fill matches.
