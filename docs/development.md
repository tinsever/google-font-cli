# Development & Testing

## Development Setup

To set up the project for development:

1. Clone the repository:
   ```bash
   git clone https://github.com/tinsever/google-font-cli.git
   cd google-font-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the package locally to test the CLI:
   ```bash
   npm link
   gfcli --help
   ```

## Testing

We use [Jest](https://jestjs.io/) for unit testing.

To run the tests:
```bash
npm test
```

To run tests with coverage:
```bash
npm test -- --coverage
```

## Contributing

Please refer to [CONTRIBUTE.md](../CONTRIBUTE.md) for our coding standards and contribution process.
