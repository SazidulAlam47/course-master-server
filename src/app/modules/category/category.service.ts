import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: ICategory) => {
    const category = await Category.findOne({ name: payload.name });
    if (category) {
        throw new ApiError(status.CONFLICT, 'Category already exists');
    }
    const result = await Category.create(payload);
    return result;
};

const getCategoryById = async (id: string) => {
    const result = await Category.findById(id);
    return result;
};

const getAllCategories = async () => {
    const result = await Category.find();
    return result;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
    const category = await Category.findOne({ name: payload.name });
    if (category) {
        throw new ApiError(status.CONFLICT, 'Category already exists');
    }
    const result = await Category.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteCategory = async (id: string) => {
    const result = await Category.findByIdAndDelete(id);
    return result;
};

export const CategoryServices = {
    createCategory,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
