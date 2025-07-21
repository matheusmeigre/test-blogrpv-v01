import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const router = Router();

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Cadastra um novo estudante
 *     tags: [Students]
 *     description: Cria um novo registro de estudante e o associa a uma turma. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - classId
 *             properties:
 *               name:
 *                 type: string
 *                 description: O nome completo do estudante.
 *                 example: "Carlos de Andrade"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: O e-mail do estudante.
 *                 example: "carlos.andrade@example.com"
 *               classId:
 *                 type: string
 *                 format: uuid
 *                 description: O ID da turma na qual o estudante será matriculado.
 *                 example: "b1c2d3e4-f5g6-7890-1234-567890abcdef"
 *     responses:
 *       '201':
 *         description: Estudante cadastrado com sucesso.
 *       '400':
 *         description: Dados inválidos ou faltando.
 *       '401':
 *         description: Não autorizado.
 *       '409':
 *         description: Conflito. Já existe um estudante com este e-mail.
 */
router.post('/', StudentController.create);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Lista todos os estudantes
 *     tags: [Students]
 *     description: Retorna uma lista com todos os estudantes cadastrados. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de estudantes retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   classId:
 *                     type: string
 *                     format: uuid
 *       '401':
 *         description: Não autorizado.
 */
router.get('/', StudentController.getAll);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Busca um estudante específico pelo ID
 *     tags: [Students]
 *     description: Retorna os detalhes de um único estudante com base no seu ID. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do estudante a ser buscado.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Detalhes do estudante retornados com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Estudante não encontrado.
 */
router.get('/:id', StudentController.getById);

export default router;
