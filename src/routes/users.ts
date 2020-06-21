import signup from '../controller/users/signup';
import signin from '../controller/users/signin';
import user from '../controller/users/user';
import signout from '../controller/users/signout';
import findPassword from '../controller/users/findPassword';

import usersTracksController from '../controller/tracks/usersTracks.Controller';
import usersSchedulesController from '../controller/schedules/usersSchedules.Controller';

import index from '../middleware/index';


const router = require('express').Router();

router.post('/signin', signin.post);
router.post('/signup', signup.post);
router.patch('/user/name', index.verifyToken, user.patch);
router.get('/user/exist', user.get);
router.get('/signout', signout.get);
router.get('/findPassword', findPassword.get);
router.post('/changePassword', findPassword.post);

/*
* users/tracks
*/
router.post('/tracks', usersTracksController.post);
router.delete('/tracks', usersTracksController.delete);
router.patch('/tracks', usersTracksController.patch);
router.get('/tracks/', usersTracksController.get);
router.post('/tracks/rate', usersTracksController.postRate);


/*
* users/schedules
*/
router.get('/schedules', index.verifyToken, usersSchedulesController.get);
router.post('/schedules', index.verifyToken, usersSchedulesController.post);
router.delete('/schedules', index.verifyToken, usersSchedulesController.delete);


export default router;
