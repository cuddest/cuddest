# cuddest-portfolio

Static portfolio site. No build step, no dependencies, no framework — open `index.html` and it works.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Adding content

**Everything lives in `js/data.js`.** Never touch `main.js` to add content.

| Want to add a...        | Edit this array in `js/data.js` |
|-------------------------|---------------------------------|
| Project                 | `PROJECTS`                      |
| CTF writeup             | `WRITEUPS`                      |
| CTF placement / win     | `CTFS`                          |
| Skill or tool           | `SKILLS`                        |
| Epigraph / quote        | `QUOTES`                        |
| Degree / certification  | `CREDENTIALS`                   |
| Name, bio, social links | `PROFILE`                       |
| Headline / spec sheet   | `PROFILE.statement` / `.facts`  |

Notes:
- Wrap text in `[[double brackets]]` inside any `PROFILE.about` paragraph to render it as a redaction bar that reveals on hover/tap. Use it once, maybe twice — more and it stops being funny.
- Writeups take an optional `severity`: `Critical`, `High`, `Medium`, `Low`, `Info`. Only `Critical` gets the red mark, which is what keeps it meaningful.
- `PROFILE.portrait.src` adds a portrait beside the About text. Put the file in `assets/` and point at it (e.g. `assets/portrait.jpg`). Leave it `""` and the figure hides itself. The image is rendered greyscale under a brass wash, so it matches the palette regardless of the original colours.
- Quick search is keyboard-driven: `/` or `Ctrl/Cmd+K`, arrows to move, Enter to open, Esc to close. It indexes sections, projects, writeups, and CTF results automatically — no maintenance.
- Project `tags` and writeup `category` values build the filter bars automatically. Keep them consistent — a typo creates a new filter button.
- `featured: true` on a project makes it a double-width card on desktop.
- `highlight: true` on a CTF gives it the gold treatment. Use it for 1st places.
- Empty string in `PROFILE.links` hides that social icon.
- Empty `CREDENTIALS` array hides the whole section.
- Entries currently prefixed with "Example —" are placeholders. Replace them.

## Deploying

GitHub Pages: push to a repo, then Settings → Pages → deploy from `main` / root. Works as-is on Netlify, Vercel, or Cloudflare Pages too — no build command needed.
