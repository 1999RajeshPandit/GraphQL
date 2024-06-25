const todos = [
  { id: 1, title: "Learn GraphQL", completed: false, user_id: 1 },
  { id: 2, title: "Build a todo app", completed: false, user_id: 2 },
  { id: 3, title: "Explore Apollo Server", completed: true, user_id: 1 },
  { id: 4, title: "Implement authentication", completed: false, user_id: 2 },
  { id: 5, title: "Deploy to production", completed: false, user_id: 2 },
  { id: 6, title: "Write unit tests", completed: false, user_id: 1 },
  { id: 7, title: "Refactor code", completed: false, user_id: 2 },
  { id: 8, title: "Add random text", completed: true, user_id: 2 },
  { id: 9, title: "Implement caching", completed: false, user_id: 2 },
  { id: 10, title: "Optimize performance", completed: false, user_id: 2 },
  {
    id: 11,
    title: "Integrate with third-party API",
    completed: false,
    user_id: 2,
  },
  {
    id: 12,
    title: "Implement real-time updates",
    completed: false,
    user_id: 2,
  },
  { id: 13, title: "Add random text again", completed: true, user_id: 2 },
  { id: 14, title: "Improve error handling", completed: false, user_id: 2 },
  { id: 15, title: "Enhance user experience", completed: false, user_id: 1 },
  { id: 16, title: "Implement pagination", completed: false, user_id: 2 },
  {
    id: 17,
    title: "Add random text one more time",
    completed: true,
    user_id: 2,
  },
  {
    id: 18,
    title: "Implement search functionality",
    completed: false,
    user_id: 2,
  },
];

const users = [
  {
    id: 1,
    name: "John",
    email: "john@gmail.com",
    password: "12345",
  },
  {
    id: 2,
    name: "Ellie",
    email: "ellie@gmail.com",
    password: "1234567890",
  },
];

module.exports = { todos, users };
