# Sandbox — Development Ground

This repository is a development ground for a number of small, independent projects. Each project lives in its own top-level folder so their files, dependencies, generated output and tooling never mix.

## Projects

| Project | Folder | What it is | Status |
| --- | --- | --- | --- |
| 8Twelve Mortgage Conversation Kit | [`8twelve-mortgage-kit/`](8twelve-mortgage-kit/) | Four-page mortgage and business presentation with a separate two-page advisor tools sheet, built as a single-source HTML preview and print/PDF kit. | Development draft — not approved for distribution |

## Conventions

- **One top-level folder per project.** The folder name should identify the project without context.
- **Each project owns its files.** A project keeps its own `README.md`, `package.json`, scripts, assets and generated output inside its folder.
- **Each project owns its ignore rules.** Only generic ignores (`node_modules/`, `__pycache__/`, `.DS_Store`, tool caches) live in the root `.gitignore`. Project-specific rules such as `dist/` or build tool output belong in that project's `.gitignore`.
- **No project source at the root.** The root holds this README, the shared `.gitignore`, and repository-wide CI configuration only.
- **History stays together.** All projects share this repository, so one `git log` covers the whole sandbox. Use clear commit scopes (for example `8twelve-mortgage-kit: ...`) when a change touches one project.

## Running a project

Each project documents its own setup in its folder. For the current project:

```sh
cd 8twelve-mortgage-kit
npm install
npm run verify
npm run preview:check
```

Repository-wide publishing lives in `.github/workflows/` and is scoped to the project it serves.
