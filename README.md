<a href="https://mindfulyze.com">
  <img alt="Mindfulyze - Record moments from your day, free your thoughts and emotions in a safe way." src="https://res.cloudinary.com/mindfulyze/image/upload/v1693177063/thumbnail.png">
  <h1 align="center">Mindfulyze</h1>
</a>
<p align="center">Store moments from your day securely</p>

<p align="center">
  <a href="https://twitter.com/mindfulyze">
    <img src="https://img.shields.io/twitter/follow/mindfulyze?style=flat&label=%40mindfulyze&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://github.com/bjohansebas/mindfulyze/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/bjohansebas/mindfulyze?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#local-development"><strong>Local Development</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

## Introduction

Mindfulyze is a journaling tool designed specifically for those who wish to keep a personal diary in a more mindful and meaningful way.


## Features

- Encrypted Notes with [AES-256 (Advanced Encryption Standard-256) algorithm](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
- Templates
- Sentiment Analysis (alpha)


## Local Development

To develop Mindfulyze locally, you will need to clone this repository and set up all the env vars outlined in the [`.env.example` file](https://github.com/bjohansebas/mindfulyze/blob/main/.env.example).

Once that's done, you can use the following commands to run the app locally:

```
pnpm i
pnpm dev
```

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [Typescript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Supabase](https://supabase.com/) – database & storage
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Lemon Squeezy](https://lemonsqueezy.com/) – payments
- [Vercel](https://vercel.com/) – deployments
- [Resend](https://resend.com/) – emails


## Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/bjohansebas/mindfulyze/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/bjohansebas/mindfulyze/pull) to add new features/make quality-of-life improvements/fix bugs.
