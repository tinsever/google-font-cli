# Architecture & Integration

Google Font CLI acts as a bridge between the [google-webfonts-helper](https://gwfh.mranftl.com/) API and your local system.

## How it works

1. **Metadata Fetching**: The tool fetches a complete list of available Google Fonts from `google-webfonts-helper`.
2. **Caching**: This list is cached locally to ensure fast startup times for subsequent commands.
3. **Processing**: The metadata is parsed into `GoogleFont` objects, which handle the logic for downloading and installing specific font variants.
4. **Platform-Specific Installation**:
   - **macOS/Linux**: Fonts are copied to the user's font directory.
   - **Windows**: A small WScript is used to trigger the native Windows font installation process.

## Components

- **CLI Layer**: Handles command-line arguments and user interaction.
- **GoogleFontList**: Manages the collection of fonts, searching, and caching.
- **GoogleFont**: Represents a single font family and provides methods for downloading and installing variants.
- **Request Module**: Handles all network communication.

![Architecture Diagram](architecture.png)
