// check-db.js
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./me.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the database.');
});

// Check what tables exist
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
        console.error('Error getting tables:', err);
        db.close();
        return;
    }
    
    console.log('\n=== TABLES IN DATABASE ===');
    if (tables.length === 0) {
        console.log('No tables found!');
    } else {
        tables.forEach(table => {
            console.log('-', table.name);
        });
    }

    // Check each table for data
    checkTableData('profiles');
});

function checkTableData(tableName) {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
        if (err) {
            console.log(`\n=== ${tableName.toUpperCase()} ===`);
            console.log('Table might not exist or is empty');
        } else {
            console.log(`\n=== ${tableName.toUpperCase()} (${rows.length} rows) ===`);
            if (rows.length === 0) {
                console.log('No data found');
            } else {
                console.log(JSON.stringify(rows, null, 2));
            }
        }

        // After checking profiles, check skills, then projects
        if (tableName === 'profiles') {
            checkTableData('skills');
        } else if (tableName === 'skills') {
            checkTableData('projects');
        } else if (tableName === 'projects') {
            db.close();
            console.log('\n=== DATABASE CHECK COMPLETE ===');
        }
    });
}