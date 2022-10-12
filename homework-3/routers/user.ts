import { Router } from "express";
import { Container } from "typedi";
import { IUserInputDTO } from '../interfaces/user';
import { UserService } from '../services/user-service';
import userValidator from "./userValidator";

const router = Router();
const userService = Container.get(UserService);

// CRUD
router.post('/',userValidator, async (req, res) => {
    const data = req.body as IUserInputDTO;
    const user = await userService.createUser(data);

    res.setHeader('Location', `${req.path}/${user.id}`);
    res.status(201).send(user);
})

router.get('/', async(req, res) => {
    const {loginSubString = '', limit=10} = req.query as any
    const list = await userService.getUsersList(loginSubString, limit)

    res.send(list)
})

router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const user = await userService.getUserById(id)
    if (!user) {
        res.status(404).send('User does not exit')
    } else {
        res.send(user)
    }
})

router.put('/:id', userValidator, async(req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body as IUserInputDTO
    const foundData = await userService.updateUserById(id, data)

    if (foundData[0] === 0) {
        res.status(404).send('User does not exit')
    } else {
        const updateData = foundData[1].dataValues
        res.send(updateData)
    }
})

router.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const foundData = await userService.deleteUserById(id)
    if (foundData[0] === 0) {
        res.status(404).send('User does not exit')
    } else {
        res.status(204).send()
    }
})

export default router;