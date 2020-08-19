# AngularsLittleHelpers

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@angulars-little-helpers/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

# Labels

## Definitions

**Assignment to Issues or Pull Requests**

Most of the labels can be applied to both Issues and Pull Requests, however for some labels it may not make sense to apply it to one or the other.

### Priority

#### "Priority: Critical"

This should be dealt with ASAP. Not fixing this issue would be a serious error.

#### "Priority: High"

After critical issues are fixed, these should be dealt with before any further issues.

#### "Priority: Medium"

This issue may be useful, and needs some attention.

#### "Priority: Low"

This issue can probably be picked up by anyone looking to contribute to the project, as an entry fix.

### Type

#### "Type: Bug"

Inconsistencies or issues which will cause an issue or problem for users or implementors.

#### "Type: Maintenance"

Updating phrasing or wording to make things clearer or removing ambiguity, without changing the functionality.

#### "Type: Enhancement"

Most issues will probably ask for additions or changes. It's expected that this type of issue will result in a Pull Request.

#### "Type: Question"

A query or seeking clarification on parts of the spec. Probably doesn't need the attention of everyone, just a few to help bring clarification or explain intent.

### Status

The status label may apply to both Issues and Pull Requests.

#### "Status: Available"

No one has claimed responsibility for resolving this issue. Generally this will be applied to bugs and enhancement issues, but may be applied to others.

#### "Status: Accepted"

It's clear what the subject of the issue is about, and what the resolution should be.

#### "Status: Blocked"

There is another issue that needs to be resolved first, or a specific person is required to comment or reply to progress. There may also be some external blocker.

#### "Status: Completed"

Nothing further to be done with this issue. Awaiting to be closed by the requestor out of politeness, or can be closed by a project member.

#### "Status: In Progress"

This issue is being worked on, and has someone assigned.

#### "Status: On Hold"

Similar to blocked, but is assigned to someone. May also be assigned to someone because of their experience, but it's recognised they are unable to process the issue at this time.

#### "Status: Review Needed"

The issue has a PR attached to it which needs to be reviewed. Should receive review by others in the community, and at least one member / comitter. Specifics on when merging PRs is allowed is still up for debate.

#### "Status: Revision Needed"

At least two people have seen issues in the PR that makes them uneasy. Submitter of PR needs to revise the PR related to the issue.

#### "Status: Abandoned"

It's believed that this issue is no longer important to the requestor and no one else has shown an interest in it.

## Combinations

An issue should only have one label from the _Priority_ category, and one from the _Type_ category. It may make sense to combine some _Status_ category labels to an issue or PR, but not others.

For example, it makes sense for an issue to be both _In Progress_ and _On Hold_. The issue may have someone assigned who has started work, but is waiting for another issue to be completed first, allowing them to focus on one thing at a time. However, an issue _In Progress_ cannot also be _Abandoned_

A further example, _Available_ and _Accepted_ could happen if the scope and resolution of the issue has clearly been agreed, but no one is currently willing to be responsible to fix it, for whatever reason. However, you would not apply _On Hold_, as there is no one assigned to the task, nor would you apply _Blocked_ if nothing has been identified as a problem to resolving the issue. In addition, you wouldn't apply _Revision Needed_ as there is no associated PR.
