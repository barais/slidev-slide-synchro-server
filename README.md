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


## Run with docker


```bash
docker run -it --rm --name my-running-script -v "$PWD":/home/node/app -w /home/node/app node:22 npm i

docker run -it --rm --name my-running-script -v "$PWD":/home/node/app -w /home/node/app node:22 npm run build

docker compose up -d
```

## Configure nginx resolve proxy

```txt
server {
    # server name to change based on your own domain name for doodle
    server_name  YOURDNSNAMETOREPLACE; # Do not forget to replace YOURDNSNAMETOREPLACE

    location / {
        proxy_pass http://127.0.0.1:8082/;
        proxy_set_header Host $http_host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    error_page   500 502 503 504  /50x.html;

    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    listen [::]:80;
    listen 80;
}
```