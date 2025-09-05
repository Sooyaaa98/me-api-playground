// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./me.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create tables from schema
const sql = require('fs').readFileSync('./schema.sql', 'utf8');
db.exec(sql, (err) => {
    if (err) console.error('Error creating tables:', err);
});

// --- API ENDPOINTS ---

// 1. HEALTH CHECK
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Supriya\'s API is alive!' });
});

// 2. GET PROFILE
app.get('/profile', (req, res) => {
    db.get("SELECT * FROM profiles WHERE id = 1", (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row || {});
    });
});

// 3. GET ALL SKILLS
app.get('/skills', (req, res) => {
    db.all("SELECT * FROM skills WHERE profile_id = 1 ORDER BY proficiency DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows || []);
    });
});

// 4. GET TOP SKILLS
app.get('/skills/top', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    db.all("SELECT * FROM skills WHERE profile_id = 1 ORDER BY proficiency DESC LIMIT ?", [limit], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows || []);
    });
});

// 5. GET ALL PROJECTS (with optional skill filter)
app.get('/projects', (req, res) => {
    let sqlQuery = `
        SELECT p.* FROM projects p
        WHERE p.profile_id = 1
    `;
    let params = [];

    if (req.query.skill) {
        sqlQuery += `
            AND EXISTS (
                SELECT 1 FROM project_skills ps
                JOIN skills s ON ps.skill_id = s.id
                WHERE ps.project_id = p.id AND s.name LIKE ?
            )
        `;
        params.push(`%${req.query.skill}%`);
    }

    db.all(sqlQuery, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows || []);
    });
});

// 6. SEARCH ENDPOINT (searches across projects and skills)
app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const searchTerm = `%${query}%`;
    
    // Search projects
    db.all(`
        SELECT 'project' as type, id, title as name, description 
        FROM projects 
        WHERE profile_id = 1 AND (title LIKE ? OR description LIKE ?)
    `, [searchTerm, searchTerm], (err, projectResults) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Search skills
        db.all(`
            SELECT 'skill' as type, id, name, proficiency 
            FROM skills 
            WHERE profile_id = 1 AND name LIKE ?
        `, [searchTerm], (err, skillResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                projects: projectResults,
                skills: skillResults
            });
        });
    });
});

// 7. GET PROJECT DETAILS WITH SKILLS
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    
    // Get project details
    db.get("SELECT * FROM projects WHERE id = ? AND profile_id = 1", [projectId], (err, project) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Get skills for this project
        db.all(`
            SELECT s.* FROM skills s
            JOIN project_skills ps ON s.id = ps.skill_id
            WHERE ps.project_id = ?
        `, [projectId], (err, skills) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                ...project,
                skills: skills || []
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Supriya's API server running on http://localhost:${PORT}`);
});