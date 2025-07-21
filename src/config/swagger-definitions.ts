/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: O nome completo do usuário.
 *           example: "Maria da Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: O endereço de e-mail do usuário, que será usado para login.
 *           example: "maria.silva@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: A senha do usuário (mínimo de 8 caracteres).
 *           example: "senhaForte123"
 *         role:
 *           type: string
 *           description: "A função do usuário no sistema (ex: 'admin', 'student')."
 *           example: "student"
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "joao.silva@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "senhaSegura123"
 *     CourseCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: O título único do curso.
 *           example: "Desenvolvimento Web Full-Stack"
 *         description:
 *           type: string
 *           description: A descrição detalhada do curso.
 *           example: "Um curso completo que aborda desde o front-end com React até o back-end com Node.js."
 *     ClassCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - courseId
 *         - initial_date
 *         - final_date
 *       properties:
 *         title:
 *           type: string
 *           description: O título da turma.
 *         description:
 *           type: string
 *           description: Uma breve descrição da turma.
 *         courseId:
 *           type: string
 *           format: uuid
 *           description: O ID do curso ao qual esta turma pertence.
 *         initial_date:
 *           type: string
 *           format: date-time
 *           description: A data e hora de início da turma.
 *         final_date:
 *           type: string
 *           format: date-time
 *           description: A data e hora de término da turma.
 *         color:
 *           type: string
 *           description: A cor de destaque para a turma (opcional).
 *           example: "#4287f5"
 *     StudentCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - classId
 *       properties:
 *         name:
 *           type: string
 *           description: O nome completo do estudante.
 *           example: "Carlos de Andrade"
 *         email:
 *           type: string
 *           format: email
 *           description: O e-mail do estudante.
 *           example: "carlos.andrade@example.com"
 *         classId:
 *           type: string
 *           format: uuid
 *           description: O ID da turma na qual o estudante será matriculado.
*/
