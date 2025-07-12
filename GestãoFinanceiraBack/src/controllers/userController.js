// Importa o model para interagir com o banco de dados
const User = require('../models/userModel');

class UserController {
  // Criar um novo usuário
  async createUser(req, res) {
    try {
      const { nome, email, senha, telefone } = req.body;

      if (!nome || !email || !senha || !telefone) {
        return res.status(400).json({ message: 'Nome, email, senha e telefone são obrigatórios.' });
      }
      
      const newUser = await User.create({ nome, email, senha, telefone });
      
      res.status(201).json(newUser);

    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  }
  
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone } = req.body;
      
      if (!nome || !email || !telefone) {
        return res.status(400).json({ message: 'Nome, email, senha e telefone são obrigatórios.' });
      }

      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const UpdatedUser = await User.update(id, {nome, email, telefone});

      res.status(200).json(UpdatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await User.delete(id);

      res.status(204).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  }

}

module.exports = new UserController();