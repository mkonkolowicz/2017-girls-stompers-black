# LaSalle Stompers 2017 Girls Black: Game Calls Playbook

U10 girls · ECSL · Ontario Soccer · **Playbook v1.0.0** ([changelog](CHANGELOG.md))

A mobile-friendly playbook of nine sideline calls, grouped by situation. Each call has a picture of what to do and two practice drills:

| Call | When |
|---|---|
| **STOMP!** | Pressing: they have the ball |
| **SHAPE UP!** (BIG! / SMALL!) | Positioning |
| **WINGS OUT!** | We just won it, or our keeper has it (retreat line) |
| **OVER THE TOP!** | They press too high: GK throws or kicks it long behind them |
| **SET THE TRAP!** | Their keeper has it: line up at the retreat line, then press |
| **TAP & BLAST!** | Our indirect free kick |
| **WALL UP!** | Their indirect free kick |
| **CRASH THE BOX!** | Our corner |
| **LOCK THE BOX!** | Their corner |

**Live:** https://mkonkolowicz.github.io/2017-girls-stompers-black/

## Install on a phone
- **iPhone (Safari):** Share, then *Add to Home Screen*
- **Android (Chrome):** menu (⋮), then *Install app* / *Add to Home screen*

Once you've opened it, it works offline at the field.

## Print
- **Printable PDF:** [2017-girls-stompers-black-playbook.pdf](2017-girls-stompers-black-playbook.pdf), 20 pages, Letter size. There's also a download button at the top of the site.
- **Print button** on the site prints the current page with every diagram shown as its finished picture.

## Editing
Everything lives in `index.html`. Diagram data is in the `D` object near the bottom of the file. After you change it, bump `VERSION` in `sw.js` so installed phones pick up the update.

After you change the content, regenerate the PDF: `npm i playwright-core && node tools/make-pdf.mjs` (it uses your installed Google Chrome).

## Versions
The playbook version appears in the page footer. For each update:
1. Add an entry to [CHANGELOG.md](CHANGELOG.md). Use a minor version (1.1.0) for new calls or drills, and a patch version (1.0.1) for fixes.
2. Update the version in the `index.html` footer and bump `VERSION` in `sw.js`.
3. Regenerate the PDF, then tag the release: `git tag v1.1.0 && git push --tags`.
