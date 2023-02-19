# Alignmind

Alignmind is a web application for tracking emotions and thoughts. The application was created with the goal of helping you reflect on your emotions and thoughts, and keep a record of them in a simple and organized way.

License: [Mozilla Public License 2.0](LICENSE)

## Table of Contents

- [Alignmind](#alignmind)
  - [Table of Contents](#table-of-contents)
  - [Development Setup](#development-setup)
    - [Server](#server)
      - [Docker Postgres (Optional)](#docker-postgres-optional)
      - [Diesel](#diesel)
      - [Run locally (Server)](#run-locally-server)
    - [Frontend](#frontend)
      - [Run locally (Frontend)](#run-locally-frontend)

## Development Setup

### Server

**Important: To run this server, it is necessary to have the Rust programming language installed. If you do not have Rust installed yet, you can download and install the latest stable version of Rust from the official [Rust website](https://www.rust-lang.org/tools/install)**

First, clone the repo and cd into the project:

```bash
git clone git@github.com:bsebas/align_mind_server.git
cd align_mind_server
```

#### Docker Postgres (Optional)

Run container with service postgres

```bash
docker-compose up -d postgres
```

#### Diesel

Install diesel and run migrations

```bash
cargo install diesel_cli --no-default-features --features postgres
echo DATABASE_URL=postgres://postgres:postgres123@localhost:5432/postgres > .env
diesel setup
```

#### Run locally (Server)

Create a **.env** file in **./** and set this value:

```bash
DATABASE_URL = postgres://postgres:postgres123@localhost:5432/postgres
JWT_SECRET = jwt_secret
```

Install dependencies and run locally:

```bash
cargo run
```

### Frontend

Now, clone the repo and cd into the project:

```bash
git clone git@github.com:bsebas/alignmind.git
cd alignmind
```

#### Run locally (Frontend)

Create a **.env** file in **./** and set this value:

```bash
VITE_API_URL = "http://localhost:8000"
```

Install dependencies and run locally:

```bash
npm i
npm run dev
```
