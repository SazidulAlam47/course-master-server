import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategory(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Category created successfully',
        data: result,
    });
});

const getCategoryById = catchAsync(async (req, res) => {
    const result = await CategoryServices.getCategoryById(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Category retrieved successfully',
        data: result,
    });
});

const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategories();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Categories retrieved successfully',
        data: result,
    });
});

const updateCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.updateCategory(
        req.params.id,
        req.body,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Category updated successfully',
        data: result,
    });
});

const deleteCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.deleteCategory(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Category deleted successfully',
        data: result,
    });
});

export const CategoryControllers = {
    createCategory,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
