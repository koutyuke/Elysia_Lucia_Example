# ElysiaJS + lucia-auth Example

This repository implements password login with lucia-auth in ElysiaJS and OAuth2.0 login for use with Next.js and Expo.

## What's inside?
It was built by Turborepo and includes the following packages/apps/tools

* `apps/api`: a [ElysiaJS](https://elysiajs.com/) and [lucia-auth v3](https://lucia-auth.com/) app
* `apps/web`: a [Next.js](https://nextjs.org/) app
* `apps/mobile`: a [Expo](https://expo.dev/) app
* `tools/*`: these are the project settings
* `packages/*`: these are common components of the project

## Installation
```sh
bun i
```

## Start
```sh
// web
bun web dev

// mobile
bun mobile run:ios
bun mobile start

// api
bun api dev
```

## Supported Authentication

* Password + Email
* OAuth2.0
  - Discord
  - Google
  - LINE
* Password-Reset

Authenticate requests from the web using cookies, and from mobile using authorization-header

## API Reference

Start api server
```sh
bun api dev
```
and access `http://localhost:3001/swagger`.

## thanks

Without [The Copenhagen Book](https://thecopenhagenbook.com/), this repository would not be here.
