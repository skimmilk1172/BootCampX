const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
  PORT: 5432
});

// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
// .then(response => {
//   console.log(response.rows);
// })
// .catch(err => console.error('query error', err.stack));

pool.query(`
SELECT students.id as id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(response => {
  // console.log(response.rows);
  // response.rows is an ARRAY
  // ARRAY.forEach(callback which does something on every element of an array)
  response.rows.forEach(user => {
    // user = { student_id: 1, name: 'Armand Hilll', cohort: 'FEB12' }
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));