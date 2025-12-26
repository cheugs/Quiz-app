# EquizzAdminDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## EQuizz Platform - Admin Dashboard Folder Structure

equizz-admin-dashboard/
│
├── src/
│   ├── app/
│   │   │
│   │   ├── core/                          # Core module (singleton services, guards, interceptors)
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── super-admin.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   │
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── loading.interceptor.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── token.service.ts
│   │   │   │   ├── notification.service.ts
│   │   │   │   └── storage.service.ts
│   │   │   │
│   │   │   └── core.module.ts
│   │   │
│   │   │
│   │   ├── shared/                        # Shared module (reusable components, directives, pipes)
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   ├── header.component.css
│   │   │   │   │   └── header.component.spec.ts
│   │   │   │   │
│   │   │   │   └── sidebar/
│   │   │   │       ├── sidebar.component.ts
│   │   │   │       ├── sidebar.component.html
│   │   │   │       ├── sidebar.component.css
│   │   │   │       └── sidebar.component.spec.ts
│   │   │   │
│   │   │   ├── directives/
│   │   │   │   ├── tooltip.directive.ts
│   │   │   │   ├── click-outside.directive.ts
│   │   │   │   └── permission.directive.ts
│   │   │   │
│   │   │   ├── pipes/
│   │   │   │   ├── date-format.pipe.ts
│   │   │   │   ├── time-ago.pipe.ts
│   │   │   │   ├── truncate.pipe.ts
│   │   │   │   └── safe-html.pipe.ts
│   │   │   │
│   │   │   └── shared.module.ts
│   │   │
│   │   │
│   │   ├── features/                      # Feature modules (each page component)
│   │   │   │
│   │   │   ├── auth/                      # Authentication module
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   ├── login.component.css
│   │   │   │   │   └── login.component.spec.ts
│   │   │   │   │
│   │   │   │   ├── auth-routing.module.ts
│   │   │   │   └── auth.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── dashboard/                 # PAGE 1: Dashboard Home
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.css
│   │   │   │   ├── dashboard.component.spec.ts
│   │   │   │   ├── dashboard.service.ts
│   │   │   │   ├── dashboard-routing.module.ts
│   │   │   │   └── dashboard.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── quiz-management/           # PAGE 2: Quiz Management
│   │   │   │   ├── quiz-management.component.ts
│   │   │   │   ├── quiz-management.component.html
│   │   │   │   ├── quiz-management.component.css
│   │   │   │   ├── quiz-management.component.spec.ts
│   │   │   │   ├── quiz-management.service.ts
│   │   │   │   ├── quiz-management-routing.module.ts
│   │   │   │   └── quiz-management.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── question-bank/             # PAGE 3: Question Bank
│   │   │   │   ├── question-bank.component.ts
│   │   │   │   ├── question-bank.component.html
│   │   │   │   ├── question-bank.component.css
│   │   │   │   ├── question-bank.component.spec.ts
│   │   │   │   ├── question-bank.service.ts
│   │   │   │   ├── question-bank-routing.module.ts
│   │   │   │   └── question-bank.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── student-management/        # PAGE 5: Student Management
│   │   │   │   ├── student-management.component.ts
│   │   │   │   ├── student-management.component.html
│   │   │   │   ├── student-management.component.css
│   │   │   │   ├── student-management.component.spec.ts
│   │   │   │   ├── student-management.service.ts
│   │   │   │   ├── student-management-routing.module.ts
│   │   │   │   └── student-management.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── course-management/         # PAGE 6: Course Management
│   │   │   │   ├── course-management.component.ts
│   │   │   │   ├── course-management.component.html
│   │   │   │   ├── course-management.component.css
│   │   │   │   ├── course-management.component.spec.ts
│   │   │   │   ├── course-management.service.ts
│   │   │   │   ├── course-management-routing.module.ts
│   │   │   │   └── course-management.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── academic-configuration/    # PAGE 7: Academic Configuration
│   │   │   │   ├── academic-configuration.component.ts
│   │   │   │   ├── academic-configuration.component.html
│   │   │   │   ├── academic-configuration.component.css
│   │   │   │   ├── academic-configuration.component.spec.ts
│   │   │   │   ├── academic-configuration.service.ts
│   │   │   │   ├── academic-configuration-routing.module.ts
│   │   │   │   └── academic-configuration.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── user-management/           # PAGE 8: User Management (Super Admin)
│   │   │   │   ├── user-management.component.ts
│   │   │   │   ├── user-management.component.html
│   │   │   │   ├── user-management.component.css
│   │   │   │   ├── user-management.component.spec.ts
│   │   │   │   ├── user-management.service.ts
│   │   │   │   ├── user-management-routing.module.ts
│   │   │   │   └── user-management.module.ts
│   │   │   │
│   │   │   │
│   │   │   ├── response-viewing/          # PAGE 10: Response Viewing
│   │   │   │   ├── response-viewing.component.ts
│   │   │   │   ├── response-viewing.component.html
│   │   │   │   ├── response-viewing.component.css
│   │   │   │   ├── response-viewing.component.spec.ts
│   │   │   │   ├── response-viewing.service.ts
│   │   │   │   ├── response-viewing-routing.module.ts
│   │   │   │   └── response-viewing.module.ts
│   │   │   │
│   │   │   │
│   │   │   └── notifications-management/  # PAGE 12: Notifications Management
│   │   │       ├── notifications-management.component.ts
│   │   │       ├── notifications-management.component.html
│   │   │       ├── notifications-management.component.css
│   │   │       ├── notifications-management.component.spec.ts
│   │   │       ├── notifications-management.service.ts
│   │   │       ├── notifications-management-routing.module.ts
│   │   │       └── notifications-management.module.ts
│   │   │   
│   │   │   
│   │   │
│   │   ├── layout/                        # Layout components
│   │   │   ├── main-layout/
│   │   │   │   ├── main-layout.component.ts
│   │   │   │   ├── main-layout.component.html
│   │   │   │   ├── main-layout.component.css
│   │   │   │   └── main-layout.component.spec.ts
│   │   │   │
│   │   │   ├── auth-layout/
│   │   │   │   ├── auth-layout.component.ts
│   │   │   │   ├── auth-layout.component.html
│   │   │   │   ├── auth-layout.component.css
│   │   │   │   └── auth-layout.component.spec.ts
│   │   │   │
│   │   │   └── layout.module.ts
│   │   │
│   │   │
│   │   ├── models/                        # TypeScript interfaces and models
│   │   │   ├── user.model.ts
│   │   │   ├── student.model.ts
│   │   │   ├── administrator.model.ts
│   │   │   ├── quiz.model.ts
│   │   │   ├── question.model.ts
│   │   │   ├── response.model.ts
│   │   │   ├── course.model.ts
│   │   │   ├── class.model.ts
│   │   │   ├── academic-year.model.ts
│   │   │   ├── semester.model.ts
│   │   │   ├── evaluation-type.model.ts
│   │   │   ├── sentiment-analysis.model.ts
│   │   │   ├── notification.model.ts
│   │   │   ├── analytics.model.ts
│   │   │   └── api-response.model.ts
│   │   │
│   │   │
│   │   ├── constants/                     # Application constants
│   │   │   ├── api-endpoints.ts
│   │   │   ├── app-constants.ts
│   │   │   ├── question-types.ts
│   │   │   ├── evaluation-types.ts
│   │   │   ├── user-roles.ts
│   │   │   └── validation-patterns.ts
│   │   │
│   │   │
│   │   ├── utils/                         # Utility functions and helpers
│   │   │   ├── date-utils.ts
│   │   │   ├── validation-utils.ts
│   │   │   ├── format-utils.ts
│   │   │   ├── export-utils.ts
│   │   │   └── chart-config.ts
│   │   │
│   │   │
│   │   ├── app-routing.module.ts          # Main routing configuration
│   │   ├── app.component.ts                # Root component
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts
│   │   └── app.module.ts                   # Root module
│   │
│   │
│   ├── assets/                            # Static assets
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── logo-white.png
│   │   │   ├── default-avatar.png
│   │   │   ├── icons/
│   │   │   └── illustrations/
│   │   │
│   │   ├── i18n/                          # Internationalization files
│   │   │   ├── en.json                    # English translations
│   │   │   └── fr.json                    # French translations
│   │   │
│   │   ├── templates/                     # Excel templates for import
│   │   │   ├── questions-template.xlsx
│   │   │   ├── students-template.csv
│   │   │   └── courses-template.csv
│   │   │
│   │   └── fonts/                         # Custom fonts
│   │
│   │
│   ├── environments/                      # Environment configurations
│   │   ├── environment.ts                 # Development environment
│   │   ├── environment.prod.ts            # Production environment
│   │   └── environment.staging.ts         # Staging environment
│   │
│   │
│   ├── styles/                            # Global styles
│   │   ├── _variables.scss                # SCSS variables
│   │   ├── _mixins.scss                   # SCSS mixins
│   │   ├── _typography.scss               # Typography styles
│   │   ├── _utilities.scss                # Utility classes
│   │   ├── _animations.scss               # Animation definitions
│   │   └── styles.scss                    # Main global stylesheet
│   │
│   │
│   ├── index.html                         # Main HTML file
│   ├── main.ts                            # Application entry point
│   ├── main.server.ts                       
│   └── server.ts                            
│
│
├── angular.json                           # Angular CLI configuration
├── package.json                           # NPM dependencies and scripts
├── package-lock.json
├── tsconfig.json                          # TypeScript configuration
├── tsconfig.app.json                      # TypeScript config for app
├── tsconfig.spec.json                     # TypeScript config for tests
├── karma.conf.js                          # Karma test runner configuration
├── .editorconfig                          # Editor configuration
├── .gitignore                             # Git ignore file
└── README.md                              # Project documentation

## EQuizz Platform - Admin Dashboard Pages & Features

1. Dashboard Home / Overview Page
Purpose: Central hub showing key metrics and system status at a glance
What it contains:

Summary statistics cards (total quizzes, total responses, participation rates, active students)
Quick access widgets to recent activities
Participation trend charts over time
Response distribution by course (bar chart)
Completion rates by class (pie chart)
Alerts/notifications section for pending actions
Quick action buttons (Create Quiz, Import Questions, View Reports)
System health indicators
Current evaluation period information


2. Quiz Management Page
Purpose: Create, edit, and manage all evaluation quizzes
What it contains:

List/table of all quizzes with filters (by course, evaluation type, status, academic year)
Search functionality
Quiz status indicators (Draft, Active, Closed, Scheduled)
Actions for each quiz: Edit, Duplicate, Delete, View Responses, Publish
"Create New Quiz" button
Bulk actions (activate multiple quizzes, delete multiple)
Calendar view showing quiz schedules
Quiz statistics preview (response count, participation rate)

Quiz Creation/Edit Form includes:

Quiz title and description
Course selection dropdown
Evaluation type selection (mid-term, end-of-semester)
Start and end date/time pickers
Class selection (which classes can access this quiz)
Academic year association
Question management section
Import questions button (Excel upload)
Manual question addition interface
Preview mode


3. Question Bank Page
Purpose: Manage reusable questions across multiple quizzes
What it contains:

Searchable question library
Filters by question type, course, topic, academic year
Question preview cards showing question text and type
Tags/categories for organization
Version history for each question
Bulk import functionality (Excel upload interface)
Template download link for Excel format
Add new question button
Edit/Delete/Duplicate actions
Question usage statistics (which quizzes use this question)

Question types management:

Multiple Choice Questions (MCQ) builder
Closed response (Yes/No, True/False) builder
Open-ended question builder
Rating scale questions
Each type has specific configuration options


4. Student Management Page
Purpose: Manage student accounts and access
What it contains:

Student list/table with search and filters
Filters by class, academic year, verification status, registration date
Student details: ID number, email, class, registration date, verification status
Bulk actions (verify students, update class, delete accounts)
Student statistics (total registered, verified, unverified)
Manual student registration option
CSV import for bulk student creation
View individual student profile
Student activity log (quizzes completed, last login)
Reset password functionality
Resend verification email option
Class progression tools (moving students to N+1 year)
Account status management (active, suspended)


5. Course Management Page
Purpose: Configure courses and class associations
What it contains:

Course catalog table with search
Filters by department, academic year, semester
Add new course button
Course details: code, name, description, department
Associated classes for each course
Assigned instructors/coordinators
Active quizzes per course
Student enrollment count
Edit/Delete course actions
Course import functionality (bulk upload)
Academic year and semester association
Course prerequisites configuration


6. Academic Configuration Page
Purpose: Manage academic years, semesters, and evaluation periods
What it contains:
Academic Year Section:

List of academic years
Create new academic year
Set active/current year
Start and end dates
Activate/deactivate years
Academic year status

Semester Section:

Semester definitions per academic year
Semester names, start/end dates
Current semester indicator
Evaluation period definitions within semesters

Evaluation Type Section:

Mid-term evaluation configuration
End-of-semester evaluation configuration
Custom evaluation types
Duration settings for each type
Default settings per evaluation type

Class/Level Management:

Define class names and levels
Department associations
Student capacity settings
Class progression rules


7. User Management Page (Super Admin only)
Purpose: Manage administrator accounts and permissions
What it contains:

Administrator list with roles
Add new administrator button
Role assignment (Administrator, Super Administrator)
Permission management per admin
Department assignments
Course assignments
Activity logs for each admin
Last login information
Suspend/activate admin accounts
Edit admin profile
Change password
Audit trail of admin actions


8. Response Viewing Page
Purpose: View and analyze individual quiz responses
What it contains:

Quiz selector dropdown
Response list with anonymous tokens
Submission timestamp
Submission method indicator (online/offline)
Device information (for troubleshooting)
Individual response details view
Question-by-question breakdown
Answer visualization based on question type
MCQ answer distribution
Open-ended response viewer with sentiment tags
Export individual responses
Bulk response analysis
Filter by submission date, class
Response validation status
Sync status for offline submissions


9. Notifications Management Page
Purpose: Send and manage push notifications to students
What it contains:

Send new notification form
Recipient selection (all students, by class, by course)
Notification message composer
Schedule notification option
Notification templates library
Push notification history
Delivery status tracking
Failed delivery reports
Automatic notification settings (quiz published, deadline reminders)
Notification preview before sending


## angular original

{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": "1d4673f1-f14e-4b83-ba36-25e225134d64"
  },
  "newProjectRoot": "projects",
  "projects": {
    "equizz-admin-dashboard": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "server": "src/main.server.ts",
            "outputMode": "server",
            "ssr": {
              "entry": "src/server.ts"
            }
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "equizz-admin-dashboard:build:production"
            },
            "development": {
              "buildTarget": "equizz-admin-dashboard:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
