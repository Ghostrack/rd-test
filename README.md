# Reedsy Node.js Fullstack Engineer Challenge

Reedsy technical assignment, Fran Deriu.

## 1. About you

Previous Node and Vue related commercial projects include:

- A customer management portal for a sales company with a Laravel backend and Vue frontend.
- An educational web app accessed by teachers and pupils with a PHP backend and Vue frontend.
- A monorepo project including Authentication, DB Management, API and a web app portal with a Node backend and React frontend.

## 2. Document versioning

One way of storing version novels would be to store the full content
of the novel only for the current, most recent version.
When a new version of a novel is pushed a diff patch file will be stored,
representing the changes between the new current version and its previous state.
The diff patches could then be applied to the current version
to recreate the full contents of the novel at that particular version.
This method should be more efficient with disk space usage compared with
storing the full contents of the novels for each version,
as only the actual changes between versions are stored.
However, this does make retrieving the previous version of a novel
more complicated, as this will require creating diff patches that can then
be applied to the full novel, and keeping an ordered history of the
novel's versions, as applying multiple patches in the correct order
will be necessary to recreate older versions of a novel.

## 3. Node.js REST API

The Node REST API is a Fastify app that uses Drizzle to manage data
stored in a PostgreSQL database.
Both the application and tests require docker for the database connection:
