# EQuizz Admin Dashboard

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white) ![Angular Material](https://img.shields.io/badge/Angular%20Material-21-757575?logo=angular&logoColor=white) ![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white) ![SSR](https://img.shields.io/badge/Angular%20SSR-Express-000000?logo=express&logoColor=white)

The administration side of an **online quiz platform for a school or university**. Staff use it to prepare quizzes, manage the question bank, organise courses and students, and read the answers students submitted.

**Author:** Chengho Fongang Marie Louise

---

## What an administrator can do

| Section | What it is for |
|---|---|
| **Dashboard** | Key figures and charts about quizzes and participation |
| **Quiz management** | Create and manage quizzes |
| **Question bank** | A reusable library of questions: multiple choice, true/false, short answer and essay |
| **Course management** | Courses that quizzes are attached to |
| **Academic configuration** | The academic structure the school works with |
| **Student management** | Student records |
| **Response viewing** | Read and review the answers students submitted |
| **Notifications management** | Messages sent to users |
| **User management** | Staff accounts; reserved for the super administrator |

## How it is built

```
src/app/
├── core/       guards (auth, role, super admin), interceptors (auth, error, loading), one service per feature
├── features/   one lazy-loaded module per section listed above, plus auth/login
├── layout/     auth layout and main layout (header + sidebar)
├── models/     typed data models
└── shared/     header, sidebar, directives (permission, tooltip, click-outside), pipes (date format, time ago, truncate, safe HTML)
```

- **Feature modules.** Each section is its own module with its own routing, loaded only when the user opens it.
- **Access control.** Auth, role and super-admin guards on the routes, and a `permission` directive to show or hide parts of a page.
- **HTTP interceptors.** One adds the token, one handles API errors in a single place, one drives the loading indicator.
- **Server-side rendering.** Built with Angular SSR on an Express server.
- **Three environments.** Development, staging and production configuration files. The keys in them are placeholders, not real credentials.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Angular 21, TypeScript 5.9, RxJS, Angular SSR (Express) |
| UI | Angular Material, Angular CDK, Bootstrap 5, Sass, ngx-toastr |
| Charts | Chart.js, ng2-charts |
| Auth | JWT (`@auth0/angular-jwt`), route guards, HTTP interceptors |
| Tests and tooling | Vitest, Prettier, Angular CLI |

## Run it locally

Requirements: Node.js 20 or later and npm.

```bash
git clone https://github.com/cheugs/Quiz-app.git
cd Quiz-app
npm install
npm start
```

Then open http://localhost:4200.

| Command | What it does |
|---|---|
| `npm test` | Runs the unit tests |
| `npm run build` | Builds the production bundle into `dist/` |

## Limits and next steps

- This repository is the frontend only. It is configured to call a REST API on `http://localhost:3000/api`; several screens currently display sample data.
- Test coverage is minimal.
- There are no screenshots or online demo yet.

## Skills shown

Modular Angular architecture, lazy-loaded feature modules, role-based access control with guards and a custom directive, HTTP interceptors, reusable pipes and directives, dashboards with Chart.js, and server-side rendering.
