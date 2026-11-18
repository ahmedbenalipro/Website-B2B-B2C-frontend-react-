# VoxFlow

VoxFlow is a responsive, local-first call and survey script copilot. It includes a multilingual call workspace, branching conversation prompts, dialect-aware objection guidance, call history and analytics, and an editable script library.

## Run locally

```sh
npm install
npm run dev
```

## Scripts

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` checks the source with ESLint.

## Using VoxFlow

- Switch between B2B Outreach and B2C Survey from the top bar.
- Choose France, Switzerland, Belgium, Luxembourg, or English to update script language and objection guidance.
- Follow response branches, track call time, add notes, and save an outcome to advance the lead queue.
- Review and filter activity in Analytics, or export the call history as CSV.
- Edit prompts for the selected region and campaign in Script editor. Changes are saved in this browser.

Call history and script edits are stored in this browser's `localStorage`; they are not sent to a server.
