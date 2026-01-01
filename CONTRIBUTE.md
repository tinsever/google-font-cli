# Contributing
After experiencing "merge hell" with v3 – it really was hell – this project now uses a Trunk-Based / Tag-driven workflow. This keeps the codebase clean, ensures CI runs on the latest code, and makes releases predictable.

## Branching Model

- **`master`**: The "Trunk". This is the active development area for the current major version. All PRs target this branch. It must always pass tests.
- **`feat/` or `fix/`**: Short-lived branches for specific tasks. These are deleted immediately after merging.
- **`support/v[x]`**: Maintenance branches for older major versions (e.g., `support/v3`). These are only created if a critical patch is needed for a previous major release.

## Release Process

We use Git Tags to trigger GitHub Actions and automate npm publishing.

### 1. Development
1. Create a task branch: `git checkout -b feat/my-feature`
2. Open a Pull Request to `master`.
3. After merge, delete the task branch.

### 2. Pre-releases (Alpha/Beta)
To ship a version for testing:
- Tag the commit: `git tag vX.X.X-beta.x`
- Push the tag: `git push origin vX.X.X-beta.x`
- Action publishes this to npm under the `@next` tag.

### 3. Stable Releases
When a version is ready for production:
- Tag the commit: `git tag vX.X.X`
- Push the tag: `git push origin vX.X.X`
- Action publishes this to npm under the `@latest` tag.

## Maintenance for Older Versions
If a bug is found in a previous major version:
1. Checkout the corresponding `support/v[x]` branch.
2. Apply the fix and tag a new patch (e.g., `v1.0.5`).
3. Publish the maintenance release under a **dedicated dist-tag so it doesn't overwrite `@latest` on npm.** Example approaches:
   - Publish with a tag directly:
     ```
     npm publish --tag support-v1
     ```
   - Or publish normally and then add a dist-tag:
     ```
     npm dist-tag add <package>@<version> support-v1
     ```
   Use a clear tag (e.g., `support-v1`) so users can opt into older major releases without changing `@latest`.

4. If the bug exists in the current version, port the fix to `master`.