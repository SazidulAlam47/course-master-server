import express from 'express';
import auth from '../../middlewares/auth';
import { CategoryControllers } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';

const router = express.Router();

router.get('/', auth(), CategoryControllers.getAllCategories);

router.get('/:id', auth(), CategoryControllers.getCategoryById);

router.post(
    '/',
    auth('admin'),
    validateRequest(CategoryValidations.createCategory),
    CategoryControllers.createCategory,
);

router.patch(
    '/:id',
    auth('admin'),
    validateRequest(CategoryValidations.updateCategory),
    CategoryControllers.updateCategory,
);

router.delete('/:id', auth('admin'), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
