import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api/users',
  headers: { 'Content-Type': 'application/json' }
});

const email = process.env.TEST_TEACHER_EMAIL;
const password = process.env.TEST_TEACHER_PASSWORD;

if (!email || !password) {
  throw new Error('Set TEST_TEACHER_EMAIL and TEST_TEACHER_PASSWORD before running this script.');
}

async function test() {
  try {
    console.log('Logging in...');
    await api.post('/auth', { email, password });
    console.log('Login successful.');
  } catch (err) {
    console.error('Login failed:', err.response?.data?.message || err.message);
    process.exitCode = 1;
  }
}

test();
