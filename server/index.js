const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const { users, todos } = require("./data");
// Define your data source or storage mechanism here
// For example, you could use an in-memory array or a database connection

// Define your resolver functions
const resolvers = {
  Todo: {
    user: (todo) => users.find((user) => user.id == todo.user_id),
  },
  Query: {
    getTodos: () => todos,
    getAllUser: () => users,
    getUserById: (parent, { id }) => users.find((user) => user.id == id),
  },
  Mutation: {
    addTodo: (_, { title }) => {
      const newTodo = {
        id: todos.length + 1,
        title,
        completed: true,
        user_id: 1,
      };
      todos.unshift(newTodo);
      return newTodo;
    },
    toggleTodo: (_, { id }) => {
      const todo = todos.find((t) => t.id === parseInt(id));
      if (!todo) {
        throw new Error(`Todo with id ${id} not found`);
      }
      todo.completed = !todo.completed;
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const todoIndex = todos.findIndex((t) => t.id == id);
      if (todoIndex === -1) {
        throw new Error(`Todo with id ${id} not found`);
      }
      const deletedTodo = todos.splice(todoIndex, 1)[0];
      return deletedTodo;
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type User {
            id: ID!
            name: String!
            email: String!
            password: String!
        }

        type Todo {
            id: ID!
            user_id: ID!
            title: String!
            completed: Boolean!
            user : User!
        }

        type Query {
            getTodos: [Todo!]!
            getAllUser: [User!]!
            getUserById(id: ID!): User
        }

        type Mutation {
            addTodo(title: String!): Todo!
            toggleTodo(id: ID!): Todo!
            deleteTodo(id: ID!): Todo!
        }
    `,
    resolvers,
    // Disable introspection and playground in production environments
    introspection: process.env.NODE_ENV !== "production",
    playground: process.env.NODE_ENV !== "production",
  });

  // Add middleware
  app.use(cors());
  app.use(express.json());

  // Start the server
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  // Use environment variable or configuration file for the port
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server started on port ${PORT}: http://localhost:${PORT}/graphql`
    );
  });
}

startServer();
