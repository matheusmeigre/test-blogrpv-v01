import { Router } from 'express';
import { ClassController } from '../controllers/class.controller';
import { isAuthenticated } from '../middlewares/auth';
import { hasRole } from '../middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Cria uma nova turma (requer perfil de admin)
 *     tags:
 *       - Classes
 *     description: Cria e cadastra uma nova turma, associando-a a um curso existente. A cor da turma é opcional.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Apenas os campos obrigatórios são listados aqui
 *             required:
 *               - title
 *               - description
 *               - courseId
 *               - initial_date
 *               - final_date
 *             properties:
 *               title:
 *                 type: string
 *                 description: O título da turma.
 *               description:
 *                 type: string
 *                 description: Uma breve descrição da turma.
 *               courseId:
 *                 type: string
 *                 format: uuid
 *                 description: O ID do curso ao qual esta turma pertence.
 *               initial_date:
 *                 type: string
 *                 format: date-time
 *                 description: A data e hora de início da turma.
 *               final_date:
 *                 type: string
 *                 format: date-time
 *                 description: A data e hora de término da turma.
 *               color:
 *                 type: string
 *                 description: A cor de destaque para a turma (opcional).
 *                 example: "#4287f5" # Exemplo de cor opcional
 *             # O exemplo abaixo mostra um payload completo, incluindo o campo opcional.
 *             example:
 *               title: "Turma 2025.1 - Noturno"
 *               description: "Turma de Análise e Desenvolvimento de Sistemas para o período noturno."
 *               courseId: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *               initial_date: "2025-02-10T22:00:00Z"
 *               final_date: "2028-12-15T01:00:00Z"
 *               color: "#D93B3B"
 *     responses:
 *       201:
 *         description: Turma criada com sucesso.
 *       400:
 *         description: Dados inválidos ou faltando.
 *       401:
 *         description: Não autorizado.
 */
router.post('/', isAuthenticated, hasRole('admin'), ClassController.create);

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Lista todas as turmas cadastradas
 *     tags:
 *       - Classes
 *     description: Retorna uma lista com todas as turmas disponíveis na plataforma.
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso.
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
 *                   courseId:
 *                     type: string
 *                     format: uuid
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 */
router.get('/', ClassController.getAll);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Busca uma turma específica pelo ID
 *     tags:
 *       - Classes
 *     description: Retorna os detalhes de uma única turma com base no seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único da turma a ser buscada.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detalhes da turma retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 courseId:
 *                   type: string
 *                   format: uuid
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Turma não encontrada.
 */
router.get('/:id', ClassController.getById);

export default router;
