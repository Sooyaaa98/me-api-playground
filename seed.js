// seed.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

console.log("Starting database setup...");

// 1. Connect to database
const db = new sqlite3.Database('./me.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
        return;
    }
    console.log('Connected to database.');
    setupDatabase();
});

function setupDatabase() {
    // 2. Read and execute schema to create tables
    console.log('Creating tables...');
    const schemaSQL = fs.readFileSync('./schema.sql', 'utf8');
    
    db.exec(schemaSQL, (err) => {
        if (err) {
            console.error('Error creating tables:', err);
            db.close();
            return;
        }
        console.log('Tables created successfully!');
        insertData();
    });
}

function insertData() {
    console.log('Starting to insert data...');
    
    // 3. Insert profile 
    db.run(
        `INSERT INTO profiles (id, name, email, github_link, linkedin_link, portfolio_link) VALUES (1, ?, ?, ?, ?, ?)`,
        [
            'Supriya Katiyar',
            'katiyarsupriya2403@gmail.com',
            'https://github.com/SupriyaKatiyar24', 
            'https://linkedin.com/in/supriya-katiyar-9b3b29256', 
            '' 
        ],
        function(err) {
            if (err) {
                console.error('Error inserting profile:', err);
                db.close();
                return;
            }
            console.log('✓ Profile inserted');
            insertSkills();
        }
    );
}

function insertSkills() {
    const skills = [
        ['Java', 9],
        ['Python', 9],
        ['C', 8],
        ['JavaScript', 7],
        ['HTML/CSS', 8],
        ['SQL', 7],
        ['React', 7],
        ['Node.js', 7],
        ['Express', 7],
        ['Flask', 8],
        ['Bootstrap', 8],
        ['Tkinter', 7],
        ['pandas', 8],
        ['NumPy', 8],
        ['scikit-learn', 8],
        ['Data Preprocessing', 8],
        ['Lex', 7], 
        ['Yacc', 7], 
        ['Linux', 8] 
    ];

    console.log('Inserting skills...');
    
    let completed = 0;
    skills.forEach(([name, proficiency]) => {
        db.run(
            `INSERT INTO skills (profile_id, name, proficiency) VALUES (1, ?, ?)`,
            [name, proficiency],
            function(err) {
                if (err) {
                    console.error(`Error inserting skill ${name}:`, err);
                } else {
                    console.log(`✓ Skill inserted: ${name}`);
                }
                completed++;
                
                if (completed === skills.length) {
                    console.log('All skills inserted');
                    insertProjects();
                }
            }
        );
    });
}

function insertProjects() {
    const projects = [
        {
            title: 'Autism Prediction Using AI/ML',
            description: 'Designed and implemented a Flask-based web application for early-stage prediction of Autism Spectrum Disorder using AQ-10 screening data and demographic inputs. Trained and evaluated multiple ML models (Random Forest, Logistic Regression, Gradient Boosting); selected the optimal model achieving 81.87% accuracy.',
            github_link: 'https://github.com/SupriyaKatiyar24/Autism-Prediction', 
            live_link: ''
        },
        {
            title: 'Book Recommendation System',
            description: 'Developed a real-time Book Recommendation System using collaborative filtering and matrix factorization (Truncated SVD) to suggest personalized book recommendations based on user input. Integrated fuzzy string matching (FuzzyWuzzy) to enhance user experience by handling imprecise, misspelled, or partial book titles with over 80% match accuracy.',
            github_link: 'https://github.com/SupriyaKatiyar24/Book-Recommendation-System', 
            live_link: ''
        },
        {
            title: 'SyntaxShield: A Parser with Error Recovery',
            description: 'Engineered a compiler front-end leveraging Lex (Flex) and Yace (Bison) to execute efficient lexical analysis and syntax parsing for a custom programming language. Integrated precise, line-based error reporting and graceful error handling mechanisms, replicating behavior of modern IDEs like GCC and Visual Studio Code.',
            github_link: 'https://github.com/SupriyaKatiyar24/SyntaxShield-Parser', 
            live_link: ''
        }
    ];

    console.log('Inserting projects...');
    
    let completed = 0;
    projects.forEach(project => {
        db.run(
            `INSERT INTO projects (profile_id, title, description, github_link, live_link) VALUES (1, ?, ?, ?, ?)`,
            [project.title, project.description, project.github_link, project.live_link],
            function(err) {
                if (err) {
                    console.error(`Error inserting project ${project.title}:`, err);
                } else {
                    console.log(`✓ Project inserted: ${project.title}`);
                }
                completed++;
                
                if (completed === projects.length) {
                    console.log('All projects inserted');
                    linkProjectsToSkills();
                }
            }
        );
    });
}

function linkProjectsToSkills() {
    console.log('Linking projects to skills...');
    
    // Links projects to their respective skills
    const projectSkills = [
        // Autism Prediction project (ID 1) skills
        { project_id: 1, skills: ['Python', 'Flask', 'scikit-learn', 'Data Preprocessing'] },
        
        // Book Recommendation project (ID 2) skills  
        { project_id: 2, skills: ['Python', 'pandas', 'NumPy'] },
        
        // SyntaxShield project (ID 3) skills
        { project_id: 3, skills: ['C', 'Lex', 'Yacc', 'Linux'] }
    ];

    let totalLinks = projectSkills.reduce((total, ps) => total + ps.skills.length, 0);
    let completedLinks = 0;

    projectSkills.forEach(ps => {
        ps.skills.forEach(skillName => {
            // Find the skill ID
            db.get(
                `SELECT id FROM skills WHERE name = ? AND profile_id = 1`,
                [skillName],
                (err, skill) => {
                    if (err) {
                        console.error(`Error finding skill ${skillName}:`, err);
                        return;
                    }
                    
                    if (skill) {
                        // Link project to skill
                        db.run(
                            `INSERT INTO project_skills (project_id, skill_id) VALUES (?, ?)`,
                            [ps.project_id, skill.id],
                            function(err) {
                                if (err) {
                                    console.error(`Error linking project ${ps.project_id} to skill ${skillName}:`, err);
                                } else {
                                    console.log(`✓ Linked project ${ps.project_id} to skill ${skillName}`);
                                }
                                completedLinks++;
                                
                                if (completedLinks === totalLinks) {
                                    console.log('All project-skill links created');
                                    console.log('Database setup completed successfully! 🎉');
                                    db.close();
                                }
                            }
                        );
                    }
                }
            );
        });
    });
}