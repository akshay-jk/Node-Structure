import { Router } from 'express';
import Validator from './Validator.js'
import Controller from './Controller.js';

const Route = Router();

Route.post('/SignUp', Validator.SignUp, Controller.SignUp);
Route.post('/SignIn', Validator.SignIn, Controller.SignIn);

Route.post('/RefreshToken', Validator.RefreshToken, Controller.RefreshToken);

export default Route;