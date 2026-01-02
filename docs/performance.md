# Performance & Caching

## Caching Strategy

To provide a responsive experience, Google Font CLI caches the font metadata list.

- **Location**: `~/.gfcli/cache.json`
- **TTL**: 24 hours.
- **Bypassing**: You can force a fresh download by adding the `--refresh-cache` flag to any command.

## Download Performance

- **WOFF2 Support**: Use the `--woff2` flag when downloading fonts for web use. WOFF2 files are significantly smaller than TTF files due to better compression.
- **Variant Selection**: Only download the variants you need (e.g., `-v regular,700`) to save bandwidth and disk space.
