# 🚀 Supriya Katiyar - Me-API Playground

A comprehensive personal portfolio API showcasing my skills, projects, and experience. Built with modern web technologies as a backend assessment project.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

BASE URL : https://me-api-playground-fhxr.onrender.com

## ✨ Features

### 🎯 Core Functionality
- **RESTful API** with proper HTTP methods and status codes
- **Dynamic Filtering** of projects by skills and technologies
- **Advanced Search** across multiple data types
- **Real-time Data** synchronization between frontend and backend
- **CORS Enabled** for cross-origin requests

### 📊 Data Management
- **SQL Database** with proper schema design
- **Data Relationships** between profiles, skills, and projects
- **Efficient Queries** with optimized database operations
- **Data Validation** and error handling

### 🎨 User Experience
- **Responsive Design** works on desktop and mobile devices
- **Instant Search** with real-time results
- **Clean UI** with modern gradient design
- **Interactive Elements** with hover effects and animations

## 🏆 Assessment Requirements Met

### ✅ Mandatory Requirements
- **Backend API**: Complete RESTful endpoints with CRUD operations
- **Database**: SQLite with proper schema and relationships  
- **Frontend**: Minimal UI with search and filtering capabilities
- **Hosting**: Full deployment on Render + Netlify
- **Documentation**: Comprehensive README with setup instructions

### ✅ Query Endpoints Implemented
- `GET /projects?skill=python` - Skill-based project filtering
- `GET /skills/top` - Top skills by proficiency rating
- `GET /search?q=python` - Cross-table search functionality
- `GET /health` - API health check endpoint

### ✅ Data Completeness
- **Personal Profile**: Complete professional information
- **Technical Skills**: 16+ skills with proficiency ratings
- **Projects**: 3 real-world projects with detailed descriptions
- **Social Links**: GitHub, LinkedIn, LeetCode, HackerRank

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Modern web browser

### Installation & Running
bash
# Clone the repository
git clone https://github.com/sooyaaa98/me-api-playground.git
cd me-api-playground

# Install dependencies
npm install

# Initialize database with sample data
node seed.js

# Start the development server
node server.js

# Open frontend (in new terminal)
cd frontend
python -m http.server 8000

###project Structure
me-api-playground/
│   ├── server.js          # Express server and API routes
│   ├── seed.js           # Database seeding script
│   ├── check-db.js       # Database inspection utility
│   └── schema.sql        # Database schema definition
├── frontend/
│   └── index.html        # Single-page application
├── package.json          # Dependencies and scripts
├── .gitignore           # Git ignore rules
└── README.md           # Project documentation


🌐 Deployment Architecture
Backend (Render)
Service: Web Service

Runtime: Node.js

Build Command: npm install

Start Command: node server.js

Environment: Production

Frontend (Netlify)
Build Command: None (static files)

Publish Directory: frontend

Environment: Production

CDN: Global content delivery network

Environment Variables
bash
# For local development
PORT=3001
NODE_ENV=development
🧪 Testing
Manual Testing Checklist
API endpoints return correct status codes

Database queries return expected data

Frontend displays data correctly

Search functionality works accurately

Filtering returns appropriate results

CORS headers are properly set

Error handling works as expected


📊 Performance Considerations
Database Indexing: Automatic indexing on primary keys

Query Optimization: Efficient SQL queries with proper joins

Caching Headers: Static assets served with cache headers

CDN Optimization: Frontend deployed on global CDN

Connection Pooling: Efficient database connections

🔒 Security Features
CORS Configuration: Proper cross-origin resource sharing

Input Sanitization: Basic input validation and sanitization

SQL Injection Prevention: Parameterized queries

HTTPS Enforcement: All endpoints served over HTTPS

Error Handling: Generic error messages to avoid information leakage

🤝 Contributing
While this is a personal project, suggestions and improvements are welcome:

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 Changelog
v1.0.0 (Current)
✅ Complete backend API implementation

✅ SQLite database with proper schema

✅ Responsive frontend interface

✅ Full deployment on Render + Netlify

✅ Comprehensive documentation

✅ All assessment requirements met

🙏 Acknowledgments
Manipal University Jaipur for education and support

NPTEL for programming certifications

Google for cybersecurity foundations course

Render and Netlify for free hosting services

Open Source Community for amazing tools and libraries

📞 Connect With Me
Portfolio: (Currently working on it)

GitHub: @sooyaaa98

LinkedIn: Supriya Katiyar

Email: katiyarsupriya2403@gmail.com

RESUME_LINK : https://drive.google.com/file/d/1jm-ruY6dOUSlEKWAarnBEmwv79ivNssg/view?usp=drive_link



⭐ If you find this project useful, please give it a star on GitHub!

