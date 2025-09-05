-- schema.sql
-- This table holds your basic info
CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    github_link TEXT,
    linkedin_link TEXT,
    portfolio_link TEXT
);

-- This table holds your skills
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER,
    name TEXT NOT NULL,
    proficiency INTEGER CHECK(proficiency >= 1 AND proficiency <= 10),
    FOREIGN KEY (profile_id) REFERENCES profiles (id)
);

-- This table holds your projects
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    github_link TEXT,
    live_link TEXT,
    FOREIGN KEY (profile_id) REFERENCES profiles (id)
);

-- This table links projects to skills (a project can have many skills)
CREATE TABLE IF NOT EXISTS project_skills (
    project_id INTEGER,
    skill_id INTEGER,
    FOREIGN KEY (project_id) REFERENCES projects (id),
    FOREIGN KEY (skill_id) REFERENCES skills (id),
    PRIMARY KEY (project_id, skill_id)
);