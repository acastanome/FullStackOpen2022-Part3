const { request } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

const entries = () => {
	return persons.length;
};

app.get("/info", (request, response) => {
	const date = new Date();
	response.send(`Phonebook has info for ${entries()} people<br/><br/>${date}`);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

const generateId = () => {
	// const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
	const id = Math.floor(Math.random() * 420000000);
	// const id = 20;
	// return maxId + 1;
	return id;
};

app.post("/api/persons", (request, response) => {
	const body = request.body;
	console.log(body);

	if (!body.name) {
		return response.status(400).json({
			error: "The name is missing",
		});
	}
	if (!body.number) {
		return response.status(400).json({
			error: "The number is missing",
		});
	}
	const found = persons.filter((person) => person.name === body.name);
	if (found[0]) {
		return response.status(400).json({
			error: "The name must be unique",
		});
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
