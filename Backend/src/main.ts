import express from "express";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import Yaml from 'yamljs'
import { router } from './routes'
import cors from "cors";

const app = express();
const swaggerDocument = Yaml.load('./swagger.yml');
const PORT = 3001;

dotenv.config();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true // only needed if you're using cookies
}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});