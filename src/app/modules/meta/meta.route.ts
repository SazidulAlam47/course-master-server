import express from 'express';
import auth from '../../middlewares/auth';
import { MetaControllers } from './meta.controller';

const router = express.Router();

router.get('/', auth('admin'), MetaControllers.getMeta);

export const MetaRoutes = router;
