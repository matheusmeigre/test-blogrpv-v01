import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { isAuthenticated } from '../middlewares/auth';
import { hasRole } from '../middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Cria um novo curso (requer perfil de admin)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               example:
 *                 title: "Curso de TypeScript Avançado"
 *                 description: "Aprenda os segredos do TypeScript."
 *     responses:
 *       201:
 *         description: Curso criado com sucesso.
 *       401:
 *         description: Não autorizado. Token inválido ou não fornecido.
 *       403:
 *         description: Acesso negado. Requer perfil de administrador.
 */
router.post('/', isAuthenticated, hasRole('admin'), CourseController.create);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Lista todos os cursos cadastrados
 *     tags: [Courses]
 *     description: Retorna uma lista com todos os cursos disponíveis na plataforma.
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: O ID único do curso.
 *                     example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *                   title:
 *                     type: string
 *                     description: O título do curso.
 *                     example: "ADS"
 *                   description:
 *                     type: string
 *                     description: A descrição detalhada do curso.
 *                     example: "Curso focado em formar profissionais para o mercado de desenvolvimento de software."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: A data e hora de criação do curso.
 */
router.get('/', CourseController.getAll);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Busca um curso específico pelo ID
 *     tags: [Courses]
 *     description: Retorna os detalhes de um único curso com base no seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do curso a ser buscado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do curso retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *                 title:
 *                   type: string
 *                   example: "ADS"
 *                 description:
 *                   type: string
 *                   example: "Curso focado em formar profissionais para o mercado de desenvolvimento de software."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Curso não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Curso não encontrado."
 */
router.get('/:id', CourseController.getById);

export default router;
