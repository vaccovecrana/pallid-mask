## Overview

[pallid-mask](https://kinginyellow.fandom.com/wiki/Pallid_Mask) is a minimal front-end web ui that provides certificate management via `cfssl`.

In its current implementation, it only invokes `cfssl` as a spawning process, rather than using `cfssl`'s REST server (but this might change in the future). For now, all it offers is a quick and convenient way to maintain a self managed public key infrastructure.

All certificate data is maintained inside a single JSON database file, which is portable across instances of the application.

## Usage

After installing the project's dependencies via `npm install`, run a production bundle as follows:

    npm run build
    cd build
    node api.js
    
This will start `expressjs` and serve the ui at port `3000` by default.

You may also specify the following environment variables to specify alternative settings for the application:

- `PM_DB_FILE` - Path to the JSON key-store database file.
- `PM_HTTP_PORT` - HTTP service port

To run this code in development mode:

- `npm run dev`: runs the api and ui for development on port `3000`.
- `npm run debug`: waits for a debugger to attach on port `9229`, and then starts the api and ui on port `3000`.

## Security considerations

Since `pallid-mask` is essentially just a front end for `cfssl`:

- DO NOT expose the running process to external network interfaces. It its current version, `pallid-mask` has no authentication mechanisms. Though this may change in the future, make sure that only the local computer running the application has access to it in order to prevent others from gaining access to the JSON database file.
- Keep your `database.json` file in a secure location since all keys and certificate data is stored in this file.

Ideally, run `pallid-mask` in an air-gapped computer, and export the generated certificate bundles only for leaf nodes of the trust chain (i.e. keep your root CA and intermediate CA keys safe inside the json database file).

## Disclaimer

> This project is not production ready, and still requires security and code correctness audits. You use this software at your own risk. Vaccove Crana, LLC., its affiliates and subsidiaries waive any and all liability for any damages caused to you by your usage of this software.
