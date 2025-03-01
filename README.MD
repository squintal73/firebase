# Nodejs  e Firebase - Cadastro de usuários [![Custom Badge](https://img.shields.io/badge/FireBase-Node-ff69b)](https://github.com/squintal73/firebase)


![GitHub repo size](https://img.shields.io/github/repo-size/squintal73/firebase?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/squintal73/firebase?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/squintal73/firebase?style=for-the-badge)

## Descrição

Este projeto demonstra como configurar e implementar um sistema de cadastro de usuários utilizando Firebase com Node.js.

## 💻 Pré-requisitos 

- ![JavaScript](https://img.shields.io/badge/-Nodejs-3333?style=flat&logo=nodejs) [Node.js]()  instalado
- [Conta no Firebase]() e um projeto criado
- Editor de código (recomendado: [Visual Studio Code]())

## 🚀 Instalação


```
npm install
```

## ☕ Utilizando

* [Inicie o servidor]()

```
node index.js
```

Use uma ferramenta como o Postman ou cURL para testar as rotas:

* [Cadastrar um usuário ]()

```
curl -X POST http://localhost:3000/signup -H "Content-Type: application/json" -d '{"email": "usuario@exemplo.com", "password": "senha123", "name": "João Silva"}'
```

* [Listar todos os usuários]()

```
curl -X GET http://localhost:3000/users
```

* [Mostrar um unico usuário]()

```
curl -X GET http://localhost:3000/users/<chave ID>
```

* [Atualizar um usuário]()

```
curl -X PUT http://localhost:3000/users/<chave ID> -H "Content-Type: application/json" -d '{
  "name": "Usuario Atualizado",
  "email": "usuario.atualizado@exemplo.com"
}'
```

* [Excluir um usuário]()

```
curl -X DELETE http://localhost:3000/users/<chave ID>
```



## License
![GitHub](https://img.shields.io/github/license/squintal73/firebase)
