import express from "express";
import Joi from "joi";
import { v4 } from "uuid";
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema, createValidator } from "express-joi-validation";

const app = express();
const validator = createValidator()
app.use(express.json());

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum(),
    age: Joi.number().required().min(4).max(130),
});

interface UserSchema extends ValidatedRequestSchema {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

interface Filter {
    loginSubstring?: string;
    limit?:number;
}

const users: Array<UserSchema> = [];

// CRUD operations
app.post('/users',
    validator.query(userSchema),
    (req: ValidatedRequest<UserSchema>, res) => {
        const user = req.body as UserSchema
        user.id = v4();
        user.isDeleted = false;
        users.push(user)
        res.setHeader('Location', `/users/${user.id}`);
        res.status(200).send(user);
    })

app.get('/users', (req, res) => {
    const filter = req.query as Filter
    filter.loginSubstring = ''
    filter.limit = 10
    const list = users
        .filter(user => user.login.includes(filter.loginSubstring!) && !user.isDeleted)
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, filter.limit);
    res.send(list);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const userToFind = users.find(user => user.id === id)
    if (!userToFind) {
        res.status(404).send('User cannot be found')
    }
    res.send(userToFind)
})

app.put('/users/:id', validator.query(userSchema), (req, res) => {
    const id = req.params.id
    const { login, password, age } = req.body as UserSchema

    const userToUpdate = users.find(user => user.id === id)

    if (!userToUpdate) {
        res.status(404).send('User is not found')
    } else {
        userToUpdate.login = login
        userToUpdate.password = password
        userToUpdate.age = age
        res.send(userToUpdate)
    }
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    const UserToDelete = users.find(user => user.id === id)
    if (!UserToDelete || UserToDelete.isDeleted) {
        res.status(404).send('User is not found')
    } else {
        UserToDelete.isDeleted = true
        res.status(204).send()
    }
})

app.listen(8080, () => {
    console.log('Service is online');
});