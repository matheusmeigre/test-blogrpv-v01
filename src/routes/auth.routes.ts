import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Auth
 *     description: Cria uma nova conta de usuário na plataforma.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: O nome completo do usuário.
 *                 example: "Maria da Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: O endereço de e-mail do usuário, que será usado para login.
 *                 example: "maria.silva@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: A senha do usuário (mínimo de 8 caracteres).
 *                 example: "senhaForte123"
 *               role:
 *                 type: string
 *                 description: "A função do usuário no sistema (ex: 'admin', 'student')."
 *                 example: "student"
 *     responses:
 *       '201':
 *         description: Usuário registrado com sucesso.
 *       '400':
 *         description: Dados inválidos ou faltando.
 *       '409':
 *         description: Conflito. O e-mail ou nome de usuário já está em uso.
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Auth]
 *     description: Realiza o login de um usuário com e-mail e senha, retornando um token JWT para autenticação nas rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria.silva@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "senhaForte123"
 *     responses:
 *       '200':
 *         description: Login bem-sucedido. Retorna o token de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para ser usado no cabeçalho 'Authorization' como 'Bearer <token>'.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       '401':
 *         description: Não autorizado. E-mail ou senha inválidos.
 */
router.post('/login', AuthController.login);

export default router;
