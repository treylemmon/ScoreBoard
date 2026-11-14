# Talents Scoreboard

Staff scoreboard for the Fall Retreat points game (Parable of the Talents). Installable web app, works offline, no accounts or server. Everything is saved on the device.

## Files

| File | What it does |
|---|---|
| `index.html` | The whole app: teams, game results, store, capture the flag, trivia and talent show, inventory, lights out, log, rosters, setup |
| `sw.js` | Offline support (caches the app on the device) |
| `manifest.webmanifest` | App name and icon for "Add to Home Screen" |
| `icons/` | App icons |

## Moving data between devices

Setup tab → **Save a backup file** on the old device, then **Load a backup file** on the new one. Loading replaces everything on that device.

Student names live only in the backup file and on the device, never in this repo.

## Making a change

1. Edit the file.
2. Open `sw.js` and bump the version (for example `scoreboard-v3` → `scoreboard-v4`). **If you skip this, installed copies won't update.**
3. Upload the changed files to GitHub.

## The math

1 unit = 10% of a team's starting points (50 / 30 / 20 / 10). Every prize and price is set in units, so each team plays the same game at its own size. The crowned winner is the team that grew the most.
