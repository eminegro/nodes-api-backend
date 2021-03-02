const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use((request, response, next) => {
  console.log(request.method);
  console.log(request.path);
  console.log("----------");
  next();
});
app.use(cors());

let notes = [
  {
    id: 1,
    content: "Me tengo que suscribir a @Midu",
    date: "2019-08-30T17:30:31.0982",
    important: true,
  },
  {
    id: 2,
    content: "Tengo que estudiar",
    date: "2019-08-30T18:39:31.0982",
    important: false,
  },
  {
    id: 3,
    content: "Repasar los retos de JS de midudev",
    date: "2019-08-30T19:20:31.0982",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end;
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important != "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];
  response.json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
