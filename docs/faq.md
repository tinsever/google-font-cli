# FAQ & Troubleshooting

## Common Issues

### Permission Denied
**Error**: `EACCES: permission denied` when installing fonts.
**Solution**: 
- On Linux/macOS, ensure you have write permissions to your font directory.
- On Windows, you may need to run your terminal as an Administrator.

### Font Not Found
**Error**: `No results for "Font Name"`
**Solution**: 
- Check the spelling of the font family.
- Use `gfcli search [name]` to find the exact family name using fuzzy matching.

### Cache Issues
**Error**: `failed to download font list`
**Solution**: 
- Check your internet connection.
- Run `gfcli search --refresh-cache` to force a cache update.

## Frequently Asked Questions

**Q: Where are the fonts installed?**
- **macOS**: `~/Library/Fonts/`
- **Linux**: `~/.local/share/fonts/`
- **Windows**: System font directory via native installer.

**Q: How do I update the font list?**
Use the `--refresh-cache` flag with any command.

**Q: Can I use this in my own Node.js project?**
Yes! See the [APIs](../README.md#apis) section in the README.
