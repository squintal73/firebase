const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./chaves.json');

// Inicialize o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

// Rota para cadastrar um usuário
app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Cria o usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Salva informações adicionais no Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para buscar um único usuário pelo ID (GET /users/:id)
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Busca o usuário no Firestore
      const userDoc = await db.collection('users').doc(userId).get();
  
      // Verifica se o usuário existe
      if (!userDoc.exists) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Retorna os dados do usuário
      res.status(200).json({ id: userDoc.id, ...userDoc.data() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Rota para atualizar um usuário (PUT)
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    // Atualiza as informações no Firestore
    await db.collection('users').doc(userId).update({
      name,
      email,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para deletar um usuário (DELETE)
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Deleta o usuário do Firebase Authentication
    await admin.auth().deleteUser(userId);

    // Deleta as informações do Firestore
    await db.collection('users').doc(userId).delete();

    res.status(200).json({ message: 'Usuário deletado com sucesso!', userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});