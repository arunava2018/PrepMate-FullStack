# 📚 PrepMate – Full Stack Learning Platform  

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadcnUI](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![FramerMotion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-D82C20?style=for-the-badge&logo=redis&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

**PrepMate** is a **full-stack web application** that helps students prepare for technical interviews in a structured and interactive way.  
It enables students to:  
- 📚 Practice **subject-wise questions** with subtopic categorization  
- 📊 Track **learning progress** with real-time progress bars  
- 📝 Share and explore **interview experiences** from peers  

Built with a modern **React + Tailwind + Shadcn UI frontend**, and a **PostgreSQL + Prisma backend**, PrepMate ensures both **performance and scalability**. Optimized APIs are powered by **Redis caching** for lightning-fast responses.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**  
  Secure login system with JWT-based authentication and role-based access (User/Admin).  

- 📖 **Subjects & Subtopics Management**  
  Organize practice material by subject → subtopic → question.  

- ❓ **Question Bank**  
  - Add, update, and delete subject-wise questions.  
  - Fast retrieval with Redis caching + invalidation.  

- ✅ **Progress Tracking**  
  - Track completion status of each question.  
  - Visualize progress through interactive progress bars.  

- 📝 **Interview Experiences**  
  - Share real-world interview stories.  
  - Public experiences visible upon admin approval.  

- ⚡ **Optimized APIs with Redis**  
  - Reduced DB load through caching.  
  - Intelligent cache invalidation ensures data consistency.  

- 🎨 **Modern UI/UX**  
  - Responsive design using Tailwind CSS.  
  - Prebuilt components with Shadcn UI.  
  - Smooth animations with Framer Motion.  

---

## 🛠️ Tech Stack

- **Frontend** → React, Tailwind CSS, Shadcn UI, Framer Motion  
- **Backend** → Node.js, Express.js  
- **Database** → PostgreSQL (Prisma ORM)  
- **Caching** → Redis (Upstash)  
- **Deployment** → Vercel (Frontend + Backend), NeonDB (Postgres), Upstash Redis  

---

## ⚡ Installation & Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/prepmate.git
   cd prepmate
   ```
2. **Install dependencies**
   ```
   npm install
   ````
3. **Configure environment variables**
   Create a .env file in the root with:
   ```
    DATABASE_URL=your_postgres_url
    REDIS_URL=your_redis_url
    FRONTEND_URL=http://localhost:3000
    JWT_SECRET=your_jwt_secret
   ```
4. **Run Prisma migrations**
   ```
    npx prisma migrate dev
   ```
5. **Start the backend**
   ```
   npm run dev
   ```
6. **Start the frontend**
   ```
   cd frontend
   npm run dev
   ```
   ---
   
## 📊 Caching Strategy

| **Endpoint**                       | **TTL (Time-to-Live)** | **Invalidation Condition**                                      |
|-------------------------------------|-------------------------|-----------------------------------------------------------------|
| `/subjects`                        | 12 hours               | On adding a new **subject**, **subtopic**, or **question**      |
| `/subtopics/:subject`              | 1 hour                 | On adding a new **subtopic**                                    |
| `/questions/:subtopic`             | 15 minutes             | On **add**, **update**, or **delete** question                  |
| `/interview/public`                | 30 minutes             | On **approve** or **delete** interview experience              |

---

### 📝 Notes
- **Subjects (12h)** → Subjects are relatively stable and change less frequently, so a longer TTL reduces redundant database calls.  
- **Subtopics (1h)** → Subtopics may get updated more often than subjects but not as frequently as questions, hence a moderate TTL.  
- **Questions (15m)** → Questions are dynamic and likely to be added, updated, or removed frequently, so the cache is kept short.  
- **Public Interview Experiences (30m)** → These are user-submitted and pending moderation, so a shorter TTL ensures faster reflection of approval or deletion.  

## 🌍 Deployment
[🔗Live Link](https://prep-mate-full-stack.vercel.app/)



