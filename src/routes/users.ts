import express from 'express'
import {createUser, login} from '../controllers/users'
import { ensureAuth } from '../middlewares/authenticated';

const api = express.Router();

api.post('/users', ensureAuth, createUser);
api.post('/login', login);

export default api