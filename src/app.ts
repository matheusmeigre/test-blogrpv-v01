import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc'; // Importado para geração dinâmica
import open from 'open';
import 'express-async-errors';

import { router } from './routes';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();

const app = express();

// Middlewares de configuração geral
app.use(cors({
    origin: '*', // Permite requisições de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));
app.options('*', cors());
app.use(express.json());

// Swagger-jsdoc ler os comentários
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do RPV gerenciada por PontoSe',
      version: '1.0.0',
      description: 'Documentação da API para gerenciar Cursos, Turmas, Estudantes e Autenticação.',
      contact: {
        name: "SUPPORT@PONTOSE",
        email: "pontose@outlook.com"
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // URL base onde sua API está rodando
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Caminho para os arquivos que contêm as anotações do Swagger
  apis: ['./src/routes/*.ts', './src/middlewares/*.ts', './src/config/swagger-definitions.ts'], 
};

// Geração da especificação do Swagger com base nas opções
const swaggerSpec = swaggerJSDoc(swaggerOptions);


// Rotas

app.use('/api', router);

// Usando as specs dinamicas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Tratamento de erros -> importante ser o ÚLTIMO
app.use(errorHandler);


// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log('Acesse a documentação da API em http://localhost:3000/api-docs');
    open('http://localhost:3000/api-docs');
});
