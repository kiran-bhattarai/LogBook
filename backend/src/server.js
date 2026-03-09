import app from './app.js';
import connectDB from "./config/db.js"
import logger from './config/logger.js';

connectDB()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
  