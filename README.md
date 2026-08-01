# PrepMate - Full-Stack Technical Interview & Learning Platform

PrepMate is an enterprise-ready, full-stack web application engineered to help students and software engineers prepare for technical computer science interviews. The platform provides categorized subject-wise question banks, interactive user progress tracking, community interview experience sharing, and an autonomous AI Content Curator Agent for automated technical content generation.

---

## Architectural Overview

PrepMate utilizes a decoupled client-server architecture. The frontend is built with React, Vite, Tailwind CSS, and Shadcn UI, communicating via RESTful HTTP interfaces with an Express.js backend. Data persistence is managed by PostgreSQL via Prisma ORM, supported by a two-tier L1/L2 caching engine and an autonomous OpenAI-powered AI Content Curator Agent.

```mermaid
graph TD
    Client[React Client - Vite + Tailwind CSS] -->|HTTPS REST API| Server[Node.js + Express API Gateway]
    
    Server -->|JWT Verification| Security[Auth & Role Guard Middleware]
    
    subgraph Data & Caching Infrastructure
        Server -->|Read / Write| Cache[Two-Tier Cache Manager]
        Cache -->|Sub-millisecond L1 Read| L1Cache[NodeCache - In-Memory]
        Cache -->|L2 Persistent Read| L2Cache[Upstash Redis Cloud REST]
        Server -->|Prisma ORM Client| Database[(PostgreSQL Database)]
    end
    
    subgraph Autonomous AI Agent Ecosystem
        Server -->|User Instruction & Parameters| AgentCtrl[Admin AI Agent Controller]
        AgentCtrl -->|OpenAI API - gpt-4o-mini| LLM[OpenAI GPT Engine]
        AgentCtrl -->|Tool Calling| WebSearchTool[Web Search Questions Tool]
        AgentCtrl -->|Tool Calling| DBFetchTool[Fetch Subjects & Subtopics Tool]
        AgentCtrl -->|Tool Calling| DBInsertTool[Add Questions to DB Tool]
        
        WebSearchTool -->|Layer 1| DDGHTML[DuckDuckGo HTML Lite]
        WebSearchTool -->|Layer 2| DDGScrape[DuckDuckGo Scrape API]
        WebSearchTool -->|Fallback| InternalCS[CS Knowledge Base Generator]
        
        DBInsertTool -->|Bulk Insert| Database
    end
```

---

## Key Architectural Decisions

1. **Decoupled Frontend and Backend Architecture**  
   The application strictly separates user interface logic from backend execution. The frontend acts as a single-page application (SPA), while the backend functions as a stateless API server, ensuring scalability, independent deployment, and modular testing.

2. **Two-Tier (L1 / L2) Caching Engine with Automated Circuit Breaker**  
   To minimize database read pressure and prevent cloud API rate limits, PrepMate implements a dual-tier caching client:
   - **Tier 1 (L1)**: Fast local in-memory caching (`NodeCache`) for sub-millisecond retrieval.
   - **Tier 2 (L2)**: Distributed cloud caching (`Upstash Redis REST`) across serverless execution environments.
   - **Circuit Breaker**: If Upstash Redis encounters network latency or HTTP connection errors, the caching manager temporarily disables L2 for 60 seconds and serves requests through L1, maintaining zero application downtime.

3. **Type-Safe Relational Data Modeling with Prisma & PostgreSQL**  
   PostgreSQL ensures ACID compliance and strict transactional integrity. Prisma ORM handles database migrations, model schema management, type-safe queries, and relation handling.

4. **Stateless JWT Authentication & Role-Based Access Control (RBAC)**  
   Security relies on stateless JSON Web Tokens. Access controls enforce granular permission boundaries separating regular users from administrative personnel (`user` vs `admin`).

5. **Autonomous Multi-Turn AI Agent Subsystem**  
   An AI content pipeline utilizes OpenAI's Function Calling API (`gpt-4o-mini`) to scrape external web sources, filter noise, format content into structured Markdown, and programmatically populate the database.

---

## Database Architecture and Entity-Relationship Model

### Entity-Relationship Diagram

```mermaid
erDiagram
    users ||--o| admin_users : "is admin account"
    users ||--o{ interview_experiences : "author of"
    users ||--o{ user_question_progress : "tracks question status"
    users ||--o{ progress : "tracks subject aggregate"
    users ||--o{ questions : "created by"
    subjects ||--o{ subtopics : "contains"
    subjects ||--o{ questions : "categorizes"
    subjects ||--o{ user_question_progress : "subject context"
    subjects ||--o{ progress : "subject stats"
    subtopics ||--o{ questions : "groups questions"

    users {
        uuid id PK
        string email UK
        string password
        string full_name
        string profile_photo
        string college_name
        int passout_year
        string role
        datetime created_at
        datetime updated_at
    }

    admin_users {
        uuid id PK,FK
        datetime created_at
    }

    subjects {
        uuid id PK
        string name UK
        string description
        string icon
        datetime created_at
    }

    subtopics {
        uuid id PK
        uuid subject_id FK
        string name
        datetime created_at
    }

    questions {
        uuid id PK
        uuid subject_id FK
        uuid subtopic_id FK
        string question_text UK
        string answer_text UK
        uuid created_by FK
        datetime created_at
        datetime updated_at
    }

    user_question_progress {
        bigint id PK
        uuid user_id FK
        uuid question_id FK
        uuid subject_id FK
        boolean is_read
        datetime read_at
    }

    progress {
        bigint id PK
        uuid user_id FK
        uuid subject_id FK
        bigint read_count
    }

    interview_experiences {
        uuid id PK
        uuid user_id FK
        string company_name
        string role
        string opportunity_type
        string offer_type
        string linkedin_url
        string github_url
        string content
        boolean is_public
        boolean is_anonymous
        datetime created_at
    }
```

### Relational Schema Specifications

#### 1. `users`
Primary store for identity, credentials, educational details, and roles.
- `id`: UUID (Primary Key, Auto-generated)
- `email`: String (Unique, Indexed)
- `password`: String (Bcrypt Hash)
- `full_name`: String (Optional)
- `profile_photo`: String (Optional)
- `college_name`: String (Optional)
- `passout_year`: Integer (Optional)
- `role`: String (Default: `"user"`)
- `created_at`: Timestamp (Default: `now()`)
- `updated_at`: Timestamp (Default: `now()`)

#### 2. `admin_users`
Join table enforcing 1:1 administrative privilege mapping.
- `id`: UUID (Primary Key, Foreign Key -> `users.id`)
- `created_at`: Timestamp (Default: `now()`)

#### 3. `subjects`
Top-level technical computer science categories (e.g., Operating Systems, DBMS, OOPs, Computer Networks, System Design).
- `id`: UUID (Primary Key)
- `name`: String (Unique)
- `description`: String (Optional)
- `icon`: String (Optional)
- `created_at`: Timestamp

#### 4. `subtopics`
Sub-categories grouped under specific subjects (e.g., Normalization, Indexing under DBMS).
- `id`: UUID (Primary Key)
- `subject_id`: UUID (Foreign Key -> `subjects.id`, Indexed)
- `name`: String
- `created_at`: Timestamp

#### 5. `questions`
Question and detailed answer repository.
- `id`: UUID (Primary Key)
- `subject_id`: UUID (Foreign Key -> `subjects.id`, Indexed)
- `subtopic_id`: UUID (Foreign Key -> `subtopics.id`, Indexed)
- `question_text`: String (Unique)
- `answer_text`: String (Unique)
- `created_by`: UUID (Foreign Key -> `users.id`, Optional)
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### 6. `user_question_progress`
Granular question completion status per user.
- `id`: BigInt (Primary Key, Auto-increment)
- `user_id`: UUID (Foreign Key -> `users.id`, Indexed)
- `question_id`: UUID (Foreign Key -> `questions.id`, Indexed)
- `subject_id`: UUID (Foreign Key -> `subjects.id`, Indexed)
- `is_read`: Boolean (Default: `false`)
- `read_at`: Timestamp
- Unique Constraint: `(user_id, question_id)`

#### 7. `progress`
Aggregated progress metrics per user per subject.
- `id`: BigInt (Primary Key, Auto-increment)
- `user_id`: UUID (Foreign Key -> `users.id`, Indexed)
- `subject_id`: UUID (Foreign Key -> `subjects.id`, Indexed)
- `read_count`: BigInt (Default: `0`)

#### 8. `interview_experiences`
Community interview reports shared by candidates.
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key -> `users.id`)
- `company_name`: String
- `role`: String
- `opportunity_type`: String (Optional)
- `offer_type`: String
- `linkedin_url`: String (Optional)
- `github_url`: String (Optional)
- `content`: String (Markdown format)
- `is_public`: Boolean (Default: `true`)
- `is_anonymous`: Boolean (Default: `false`)
- `created_at`: Timestamp

---

## AI Agent Architecture & Workflow

### Autonomous Technical Content Curator Agent

PrepMate includes an autonomous AI Content Curator Agent that automates the research, formatting, and database insertion of technical interview questions. Operating on OpenAI's `gpt-4o-mini` engine with Function Calling capabilities, the agent functions as an automated research tool for system administrators.

### Agent Workflow Diagram

```mermaid
flowchart TD
    Request[Admin Request: Prompt, Subject ID, Subtopic ID, AutoCommit Flag] --> CheckMode{Is AutoCommit Enabled?}
    
    CheckMode -->|No: Preview Mode| FilterTools1[Exclude add_question_to_db_tool from Agent Tools]
    CheckMode -->|Yes: AutoCommit Mode| FilterTools2[Include all Tools in Agent Tools]
    
    FilterTools1 --> InitPrompt[Construct System Prompt & Initial Message Array]
    FilterTools2 --> InitPrompt
    
    InitPrompt --> LoopStart[Start Multi-Turn Execution Loop - Max 4 Turns]
    LoopStart --> CallLLM[Execute OpenAI Chat Completion]
    
    CallLLM --> CheckTools{Did LLM Request Tool Call?}
    
    CheckTools -->|Yes| InspectTool{Identify Tool}
    
    InspectTool -->|web_search_questions_tool| ToolSearch[Run Web Search Tool]
    ToolSearch --> CheckSearchLayer{Layer 1: DuckDuckGo HTML Lite}
    CheckSearchLayer -->|Success| SearchOutput[Format Web Search Results JSON]
    CheckSearchLayer -->|Rate Limited / Error| Layer2Scrape{Layer 2: DuckDuckGo API Scrape}
    Layer2Scrape -->|Success| SearchOutput
    Layer2Scrape -->|Error| FallbackKB[Activate Internal Knowledge Synthesis Fallback]
    FallbackKB --> SearchOutput
    
    InspectTool -->|fetch_subjects_and_subtopics_tool| ToolFetch[Run Fetch Subjects & Subtopics Tool]
    ToolFetch --> FetchOutput[Fetch DB Metadata via Prisma]
    
    InspectTool -->|add_question_to_db_tool| ToolInsert[Run Add Question to DB Tool]
    ToolInsert --> InsertOutput[Bulk Execute DB Insertion with Duplicate Handling]
    
    SearchOutput --> PushHistory[Push Tool Response to Message History]
    FetchOutput --> PushHistory
    InsertOutput --> PushHistory
    
    PushHistory --> LoopStart
    
    CheckTools -->|No: Final Text Output| CleanJSON[Strip Markdown Code Fences and Parse JSON]
    CleanJSON --> ReturnClient[Return Standardized Response to Admin UI]
```

### Tool Definitions & Schemas

#### 1. `web_search_questions_tool`
Searches external web sources for authentic technical interview questions and detailed answers.
- **Parameters**:
  - `query` (String, Required): Target web search query string.
  - `topic` (String, Required): Target computer science topic.
- **Dual-Layer Strategy & Resilient Fallback**:
  - **Layer 1**: Sends customized HTTP requests to DuckDuckGo HTML Lite using realistic browser headers to prevent bot detection.
  - **Layer 2**: Uses standard `duck-duck-scrape` module if Layer 1 yields no valid DOM nodes.
  - **Fallback Layer**: If both external engines rate-limit requests, the tool activates an internal synthesis module, producing 10 interview questions based on deep domain knowledge without breaking the agent cycle.

#### 2. `fetch_subjects_and_subtopics_tool`
Queries the database for existing subject and subtopic UUID mappings.
- **Parameters**: None.
- **Output**: JSON payload containing all valid subject IDs, subject names, subtopic IDs, and subtopic names to ensure foreign key validity.

#### 3. `add_question_to_db_tool`
Performs bulk insertion of curated question-answer pairs into the PostgreSQL database.
- **Parameters**:
  - `subject_id` (String, Required): Valid subject UUID.
  - `subtopic_id` (String, Required): Valid subtopic UUID.
  - `questions` (Array of Objects, Required): Array containing `{ question_text, answer_text }`.
- **Duplicate Prevention**: Handles Prisma unique constraint violations (`P2002`). If a question already exists in the database, it is skipped without throwing an unhandled exception, and metrics are returned indicating `insertedCount` and `skippedCount`.

### Operational Modes

- **Preview Mode (`autoCommit = false`)**:  
  The `add_question_to_db_tool` is excluded from the tool array provided to OpenAI. The agent executes web research, cleans and formats questions, structures detailed Markdown answers, and returns a JSON payload to the Admin dashboard for manual review, editing, and approval.

- **Auto-Commit Mode (`autoCommit = true`)**:  
  The `add_question_to_db_tool` is made available to the agent. Upon processing the web results and generating Markdown answers, the agent directly executes database insertion within the same turn loop, returning real-time execution logs and database insertion stats.

---

## Multi-Tier Caching & Invalidation Strategy

PrepMate uses a two-tier caching pattern managed by `cacheClient` to provide rapid data delivery and database load reduction.

```mermaid
flowchart LR
    Request[API Endpoint Request] --> CacheCheck{Check L1 Cache - NodeCache}
    
    CacheCheck -->|L1 Hit: Sub-millisecond| ReturnClient[Return Cached Data]
    
    CacheCheck -->|L1 Miss| CBCheck{Is L2 Redis Active?}
    
    CBCheck -->|Circuit Breaker Active| FetchDB[Query PostgreSQL via Prisma]
    CBCheck -->|Yes: L2 Available| ReadL2[Query Upstash Redis REST]
    
    ReadL2 -->|L2 Hit| WarmL1[Warm L1 Cache with L2 Result]
    WarmL1 --> ReturnClient
    
    ReadL2 -->|L2 Miss| FetchDB
    ReadL2 -->|L2 Exception| TriggerCB[Trip Circuit Breaker for 60s]
    TriggerCB --> FetchDB
    
    FetchDB --> UpdateCaches[Populate L1 & L2 Caches]
    UpdateCaches --> ReturnClient
```

### Route Caching Policy & Invalidation Matrix

| Route Endpoint | Cache TTL | Rationale | Invalidation Trigger |
|---|---|---|---|
| `/subjects` | 12 Hours | Subject definitions change infrequently. | Creating a new subject, subtopic, or question. |
| `/subtopics/:subject` | 1 Hour | Subtopics change periodically under admin updates. | Adding a subtopic or updating a subject. |
| `/questions/:subtopic` | 15 Minutes | Questions are dynamically added, modified, or updated. | Adding, updating, or deleting a question. |
| `/interview/public` | 30 Minutes | Public experiences require timely visibility upon approval. | Approving or deleting an interview experience. |

---

## Authentication & Security Model

1. **Stateless JWT Authorization**  
   Users authenticate via `/auth/login` or `/auth/signup`. Passwords are hashed using bcrypt before database storage. Upon authentication, the server issues a signed JWT containing user metadata and role permissions.

2. **Middleware Pipeline**  
   - `authMiddleware`: Extracts the token from the `Authorization: Bearer <token>` header, verifies its cryptographic signature, and attaches the user payload to `req.user`.
   - `adminMiddleware`: Verifies that `req.user.role === 'admin'` or validates presence within the `admin_users` table before granting access to privileged administrative routes.

3. **CORS and Environment Variable Protection**  
   Cross-Origin Resource Sharing (CORS) is configured strictly to permit requests originating from the configured `FRONTEND_URL`. Sensitive operational values (JWT secrets, database credentials, API keys) are restricted to backend environment configurations.

---

## API Reference & Endpoint Map

### Authentication Routes (`/auth`)
- `POST /auth/signup` - Register a new user account.
- `POST /auth/login` - Authenticate credentials and receive a JWT.
- `GET /auth/me` - Fetch profile metadata for the authenticated user.

### Subject Routes (`/subjects`)
- `GET /subjects` - Fetch all available subjects (Cached).
- `POST /subjects` - Create a new subject (Admin only, Invalidates Cache).

### Subtopic Routes (`/subtopics`)
- `GET /subtopics/:subjectId` - Fetch all subtopics for a target subject (Cached).
- `POST /subtopics` - Create a new subtopic under a subject (Admin only, Invalidates Cache).

### Question Routes (`/questions`)
- `GET /questions/:subtopicId` - Fetch questions and answers for a specific subtopic (Cached).
- `POST /questions` - Create a new question (Admin only, Invalidates Cache).
- `PUT /questions/:id` - Update an existing question (Admin only, Invalidates Cache).
- `DELETE /questions/:id` - Delete a question (Admin only, Invalidates Cache).

### Interview Experience Routes (`/interview`)
- `GET /interview/public` - Fetch approved public interview experiences (Cached).
- `POST /interview` - Submit a new interview experience.
- `GET /interview/pending` - Fetch pending submissions (Admin only).
- `PATCH /interview/approve/:id` - Approve an experience for public listing (Admin only, Invalidates Cache).
- `DELETE /interview/:id` - Delete an experience submission (Admin only, Invalidates Cache).

### Progress Routes (`/progress`)
- `GET /progress/subject/:subjectId` - Fetch user progress metrics for a target subject.
- `POST /progress/toggle` - Toggle question read status (`is_read`).

### Autonomous AI Agent Routes (`/ai`)
- `POST /ai/agent` - Execute the Autonomous AI Content Curator Agent (Admin only).

---

## Installation & Local Development Guide

### Prerequisites

Ensure the following tools are installed on your host machine:
- Node.js (v18.x or higher)
- npm (v9.x or higher)
- PostgreSQL database instance (Local or hosted, e.g., NeonDB)
- Upstash Redis instance (Optional, for L2 persistent caching)

### 1. Clone the Repository

```bash
git clone https://github.com/arunava2018/PrepMate-FullStack.git
cd PrepMate-FullStack
```

### 2. Backend Setup

Navigate to the `Backend` directory and install dependencies:

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` directory with the following variables:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/prepmate?schema=public"
JWT_SECRET="your_secure_jwt_secret_key"
FRONTEND_URL="http://localhost:5173"

# Optional L2 Caching
UPSTASH_REDIS_REST_URL="https://your-upstash-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_upstash_rest_token"

# AI Agent Configuration
OPENAI_API_KEY="sk-proj-your-openai-api-key"
```

Run Prisma database migrations:

```bash
npx prisma migrate dev --name init
```

Start the backend development server:

```bash
npm run dev
```

The server will initialize on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the `Frontend` directory, and install dependencies:

```bash
cd Frontend
npm install
```

Create a `.env` file inside the `Frontend` directory:

```env
VITE_API_BASE_URL="http://localhost:5000"
```

Start the frontend Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## Production Deployment Guide

### Frontend Deployment (Vercel)
1. Import the repository into Vercel and set the Root Directory to `Frontend`.
2. Set the Framework Preset to `Vite`.
3. Add Environment Variable:
   - `VITE_API_BASE_URL`: The deployed URL of your production backend API.

### Backend Deployment (Vercel Serverless / Node.js Host)
1. Import the repository into Vercel and set the Root Directory to `Backend`.
2. Configure the required production environment variables:
   - `DATABASE_URL` (Neon PostgreSQL production connection string)
   - `JWT_SECRET`
   - `FRONTEND_URL` (Deployed frontend domain)
   - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`
   - `OPENAI_API_KEY`
3. Execute `npx prisma generate` in build scripts to ensure the Prisma Client is generated for the deployment runtime.

---

## License

This project is open source and available under the MIT License.
