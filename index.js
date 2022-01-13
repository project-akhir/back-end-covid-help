import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors());
app.get('/', (req, res) => {
  const message = `
  <div style="text-align: center;">
      <h1>WELCOME TO COVID HELP LIST</h1>
      <p>By Group 9</p>
      <p>/posts for displaying all users available</p>
      <p>/users followed by /signin for signin, /signup for signup, and /semua for displaying all users available</p>
  <div>
`;
res.send(message)
});
app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb+srv://puis:puis123@cluster0.9soo7.mongodb.net/db_coba1?retryWrites=true&w=majority';

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
