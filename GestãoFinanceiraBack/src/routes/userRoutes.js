// src/routes/userRoutes.js (VERSÃO CORRIGIDA)

const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *         - telefone
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente para o usuário.
 *         nome:
 *           type: string
 *           description: O nome do usuário.
 *         email:
 *           type: string
 *           format: email
 *           description: O email do usuário, deve ser único.
 *         senha:
 *           type: string
 *           description: A senha do usuário (não será retornada nas respostas).
 *         telefone:
 *           type: string
 *           description: O telefone do usuário.
 *       example:
 *         nome: John Doe
 *         email: john.doe@example.com
 *         senha: password123
 *         telefone: '(35) 91111-1111'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *       properties:
 *         nome:
 *           type: string
 *           description: O nome do usuário.
 *         email:
 *           type: string
 *           format: email
 *           description: O email do usuário.
 *         telefone:
 *           type: string
 *           description: O telefone do usuário.
 *       example:
 *         nome: John Doe
 *         email: john.doe@example.com
 *         telefone: '(35) 91111-1111'
 */


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API para gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao buscar usuários.
 */

router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuários.
 */

router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao buscar usuários.
 */

router.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário (exceto a senha)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuários.
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID do usuário a ser removido
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso (sem conteúdo)
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuários.
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;