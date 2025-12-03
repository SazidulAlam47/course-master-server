import express from 'express';
import auth from '../../middlewares/auth';
import { BatchControllers } from './batch.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BatchValidations } from './batch.validation';

const router = express.Router();

router.get('/', auth(), BatchControllers.getAllBatches);

router.get('/:id', auth(), BatchControllers.getBatchById);

router.post(
    '/',
    auth('admin'),
    validateRequest(BatchValidations.createBatch),
    BatchControllers.createBatch,
);

router.patch(
    '/:id',
    auth('admin'),
    validateRequest(BatchValidations.updateBatch),
    BatchControllers.updateBatch,
);

router.delete('/:id', auth('admin'), BatchControllers.deleteBatch);

export const BatchRoutes = router;
