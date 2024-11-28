// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.signup-form');
  // Connect to MySQL Database
      const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Alhomora@2516', // Replace with your MySQL password
        database: 'user_management' // Replace with your database name
      });
      
      db.connect(err => {
        if (err) {
          console.error('Error connecting to the database:', err);
          return;
        }
        console.log('Connected to MySQL database.');
      });
      
      // Handle Signup Form Submission
      app.post('/signup', async (req, res) => {
        const { username, email, aadhar, phone, password, voterId } = req.body;
      
        if (!username || !email || !aadhar || !phone || !password || !voterId) {
          return res.status(400).json({ error: 'All fields are required.' });
        }
      
        try {
          // Check if the email already exists
          db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) throw err;
      
            if (results.length > 0) {
              return res.status(400).json({ error: 'Email is already registered.' });
            }
      
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
      
            // Insert user into the database
            const query = 'INSERT INTO users (username, email, aadhar, phone, password, voter_id) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(query, [username, email, hashedPassword], (err, results) => {
              if (err) throw err;
      
              res.status(201).json({ message: 'User registered successfully!' });
            });
          });
        } catch (err) {
          console.error('Error:', err);
          res.status(500).json({ error: 'Internal server error.' });
        }
      });
      
    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting

      // If all validations pass, simulate successful signup
      alert('Signup successful!');
      form.reset(); // Clear the form
    });
  
    // Email validation function
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });

  // Start the Server
  app.listen(7000, () => {
    console.log('Server running on http://localhost:7000');
  });
  