# slidev-poll-server

WebSocket server for [slidev-component-wssynchro](https://github.com/barais/slidev-addon-ws-syncho.git).

Based on a fork of https://github.com/Smile-SA/slidev-poll-server

## Installation

Get source code or git clone this repo.

Install dependencies:
```bash
npm i
```

Then build the files:
```bash
npm run build
```

Finally start the server:
```bash
npm run start
```

## Configuration

You can configure the project using environment variables.

Example:
```bash
DEBUG=info npm run start
```

Available environment variables:

| Variable | Type | Default value | Description |
|---|---|---|---|
| PORT | `number` | `8080` | Change running port |
| DEBUG | `'error' \| 'warn' \| 'info'` | `'error'` | Debug level |
