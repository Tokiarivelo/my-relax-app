# MyRelaxApp

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/usbiE59lLs)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve my-relax-app
```

To create a production bundle:

```sh
npx nx build my-relax-app
```

To see all available targets to run for a project, run:

```sh
npx nx show project my-relax-app
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

To generate library

```sh
pnpm nx g @nx/nest:lib shared/shared-prisma --buildable
```

Install package into specific service / libs


You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

# Structure globale du projet

```sh
my-relax-app/
│
├── apps/
│   ├── front-end/            # Next.js app (client)
│   |   ├── auth/
│   |   ├── admin/
│   |   ├── customer/
|   |   |...........
|   |
│   ├── api-gateway/         # API Gateway Nest.js (GraphQL)
│   └── services/     # Chaque service Nest.js ici
│       ├── auth/
│       ├── location/
│       ├── reservation/
│       ├── review/
│       ├── payment/
|       |...........
│
├── libs/                    # Librairies partagées (DTOs, interfaces, etc.)
│
├── infra/                   # Fichiers K8s, Skaffold, Dockerfiles
│
├── docker-compose.yml       # Pour tests locaux
├── skaffold.yaml            # Pour le dev local dans Kubernetes
└── package.json
```

# Lancement du service
## Apollo gateway
```sh
pnpm nx serve api-gateway
```

# DB
## Schema
![DB](./ressources/db-schema.png "Database schema")

## Details
```sql
users
- id: UUID (PK)
- email: VARCHAR(255) (UNIQUE, NOT NULL)
- password_hash: TEXT (NOT NULL)
- firstName: VARCHAR(255)
- lastName: VARCHAR(255)
- image: VARCHAR(255)
- role: VARCHAR(20) (DEFAULT 'user')
- created_at: TIMESTAMP (DEFAULT CURRENT_TIMESTAMP)

places
- id: UUID (PK)
- owner_id: UUID (FK → users.id)
- title: VARCHAR(255) (NOT NULL)
- description: TEXT
- address: TEXT
- latitude: DECIMAL(9,6)
- longitude: DECIMAL(9,6)
- price: DECIMAL(10,2)
- transport_info: TEXT
- created_at: TIMESTAMP (DEFAULT CURRENT_TIMESTAMP)

place_images
- id: UUID (PK)
- place_id: UUID (FK → places.id)
- url: TEXT (NOT NULL)
- is_cover: BOOLEAN (DEFAULT FALSE)

categories
- id: UUID (PK)
- name: VARCHAR(255) (UNIQUE, NOT NULL)
- created_by: UUID (FK → users.id)
- place_categories (Junction table)
- place_id: UUID (PK, FK → places.id)
- category_id: UUID (PK, FK → categories.id)

tags
- id: UUID (PK)
- name: VARCHAR(100) (UNIQUE, NOT NULL)
- place_tags (Junction table)
- place_id: UUID (PK, FK → places.id)
- tag_id: UUID (PK, FK → tags.id)

reservations
- id: UUID (PK)
- user_id: UUID (FK → users.id)
- place_id: UUID (FK → places.id)
- start_date: TIMESTAMP (NOT NULL)
- end_date: TIMESTAMP (NOT NULL)
- status: VARCHAR(20) (DEFAULT 'pending')
- created_at: TIMESTAMP (DEFAULT CURRENT_TIMESTAMP)

reviews
- id: UUID (PK)
- user_id: UUID (FK → users.id)
- place_id: UUID (FK → places.id)
- rating: INTEGER (CHECK 1-5)
- comment: TEXT
- created_at: TIMESTAMP (DEFAULT CURRENT_TIMESTAMP)

payments
- id: UUID (PK)
- reservation_id: UUID (FK → reservations.id)
- user_id: UUID (FK → users.id)
- amount: DECIMAL(10,2)
- payment_method: VARCHAR(50)
- status: VARCHAR(20)
- paid_at: TIMESTAMP

 Relationships
- users → places: One-to-Many (owner_id FK in places references users.id)
- users → categories: One-to-Many (created_by FK in categories references users.id)
- users → reservations: One-to-Many (user_id FK in reservations references users.id)
- users → reviews: One-to-Many (user_id FK in reviews references users.id)
- users → payments: One-to-Many (user_id FK in payments references users.id)
- places → place_images: One-to-Many (place_id FK in place_images references places.id)
- places → reservations: One-to-Many (place_id FK in reservations references places.id)
- places → reviews: One-to-Many (place_id FK in reviews references places.id)
- places → place_categories: One-to-Many (place_id FK in place_categories references places.id)
- categories → place_categories: One-to-Many (category_id FK in place_categories references categories.id)
- places → place_tags: One-to-Many (place_id FK in place_tags references places.id)
- tags → place_tags: One-to-Many (tag_id FK in place_tags references tags.id)
- reservations → payments: One-to-Many (reservation_id FK in payments references reservations.id)
 ```

# Prisma
## Set up prisma
Set up your Prisma ORM project by creating your Prisma Schema file with the following command:

```sh
npx prisma init --datasource-provider mysql --output ../generated/prisma
```
### 📄 Prisma Schema Example (shared/prisma/schema.prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      String
  isVerified Boolean @default(false)
  images    UserImage[]
  reservations Reservation[]
  reviews   Review[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model UserImage {
  id     String @id @default(uuid())
  url    String
  user   User   @relation(fields: [userId], references: [id])
  userId String
}

model Place {
  id          String        @id @default(uuid())
  name        String
  description String
  category    String
  price       Float
  location    Unsupported("geometry(Point,4326)")
  provider    User          @relation(fields: [providerId], references: [id])
  providerId  String
  images      PlaceImage[]
  tags        Tag[]
  reservations Reservation[]
  reviews     Review[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model PlaceImage {
  id      String @id @default(uuid())
  url     String
  place   Place  @relation(fields: [placeId], references: [id])
  placeId String
}

model Tag {
  id      String @id @default(uuid())
  name    String
  place   Place  @relation(fields: [placeId], references: [id])
  placeId String
}

model Reservation {
  id         String   @id @default(uuid())
  user       User     @relation(fields: [userId], references: [id])
  userId     String
  place      Place    @relation(fields: [placeId], references: [id])
  placeId    String
  status     String
  date       DateTime
  payment    Payment?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Payment {
  id            String       @id @default(uuid())
  user          User         @relation(fields: [userId], references: [id])
  userId        String
  reservation   Reservation  @relation(fields: [reservationId], references: [id])
  reservationId String
  amount        Float
  method        String
  status        String
  createdAt     DateTime     @default(now())
}

model Review {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  place     Place    @relation(fields: [placeId], references: [id])
  placeId   String
  comment   String
  rating    Int
  createdAt DateTime @default(now())
}
```


# TODO list

Monorepo managed by Nx.

## Global Setup

- [x] Setup Nx workspace (apps/libs structure)
- [x] Setup Docker Compose (PostGIS, Redis, pgAdmin)
- [x] Setup Skaffold and Helm for deployments

## DB
- [x] Modeling database schema

## Services

### Gateway (Apollo Federation)

- [ ] Setup Apollo Gateway (Nest.js)
- [ ] Configure subgraphs and service discovery
- [ ] Authentication middleware for token verification
- [ ] Rate Limiting, Caching

### Auth Service

- [ ] Local login/signup with JWT (access + refresh token)
- [ ] MFA (Multi-Factor Authentication)
- [ ] OAuth2 (Google, Facebook, etc.)
- [ ] Device Flow for IoT/Mobile
- [ ] Session management

### Places Service

- [ ] Add, Edit, Delete Places
- [ ] Geolocation fields (PostGIS)
- [ ] Tags and Categories system
- [ ] Image upload

### Reservation Service

- [ ] Create Reservation
- [ ] Cancel Reservation
- [ ] Payment integration hooks
- [ ] Booking calendar

### Reviews Service

- [ ] Add review
- [ ] Rate places
- [ ] Fetch top-rated places

### Location Service

- [ ] Find nearest places
- [ ] Calculate distance matrix
- [ ] Map integration (Google Maps API)

### Payment Service

- [ ] Integrate Stripe or custom provider
- [ ] Handle payment sessions and success/failure callbacks

### Notifications Service
- [ ] Créer `apps/notifications` (NestJS microservice)
- [ ] Configurer transport RabbitMQ ou NATS
- [ ] Implémenter `EventPattern` pour :
    - `reservation.created`
    - `payment.completed`
    - `user.registered`
- [ ] Intégrer **Nodemailer** + templating (Handlebars/EJS)
- [ ] Intégrer SMS (Twilio) et Push (Firebase)
- [ ] Stocker l’historique des notifications (table `notifications`)


## Frontends

### Admin Frontend (Next.js)

- [ ] Dashboard for Prestataires
- [ ] Manage places and pricing
- [ ] Manage reservations
- [ ] Manage reviews and feedback
- [ ] Analytics and Statistics

### Customer Frontend (Next.js)

- [ ] Search places (filter by category, tags, distance)
- [ ] View details of a place
- [ ] Booking system
- [ ] Google Maps integration
- [ ] Leave reviews
- [ ] Payment online

## Shared Libraries

- [ ] shared/ui (shadcn-based)
- [ ] shared/graphql (Apollo Client codegen)
- [ ] shared/zod-schemas (validation everywhere)
- [ ] shared/common (DTOs, types, interfaces)

## Infrastructure

- [ ] PostGIS setup via Helm chart
- [ ] Redis setup via Helm chart
- [ ] pgAdmin access
- [ ] Auto database migrations
- [ ] Centralized logging
- [ ] Monitoring (Prometheus, Grafana)

---

## To-Do Next

- [ ] Setup CI/CD (GitHub Actions)
- [ ] Add E2E tests (Cypress/Playwright)
- [ ] Add Unit tests (Jest)


