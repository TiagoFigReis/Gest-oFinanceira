const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

class UserModel {

  async findAll() {
    const [rows] = await db.execute('SELECT id, nome, email, telefone, created_at, updated_at FROM usuarios');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.execute('SELECT id, nome, email, telefone, created_at, updated_at FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  async create(user) {
    const { nome, email, senha, telefone } = user;

    const id = uuidv4();
    const passwordHash = bcrypt.hashSync(senha, 10)

    await db.execute(
        'INSERT INTO usuarios (id, nome, email, passwordHash, telefone) VALUES (?, ?, ?, ?, ?)',
        [id, nome, email, passwordHash, telefone]
    );

    const CreatedUser = await this.findById(id);

    return CreatedUser;
  }

  async update(id, user) {
    const { nome, email, telefone } = user;

    await db.execute(
        'UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?',
        [nome, email, telefone, id]
    );

    const UpdatedUser = await this.findById(id);

    return UpdatedUser;
  }

  async delete(id) {
    await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);

    return;
    }
}

module.exports = new UserModel();