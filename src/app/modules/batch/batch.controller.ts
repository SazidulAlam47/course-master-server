import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BatchServices } from './batch.service';

const createBatch = catchAsync(async (req, res) => {
    const result = await BatchServices.createBatch(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Batch created successfully',
        data: result,
    });
});

const getBatchById = catchAsync(async (req, res) => {
    const result = await BatchServices.getBatchById(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Batch retrieved successfully',
        data: result,
    });
});

const getAllBatches = catchAsync(async (req, res) => {
    const result = await BatchServices.getAllBatches();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Batches retrieved successfully',
        data: result,
    });
});

const updateBatch = catchAsync(async (req, res) => {
    const result = await BatchServices.updateBatch(req.params.id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Batch updated successfully',
        data: result,
    });
});

const deleteBatch = catchAsync(async (req, res) => {
    const result = await BatchServices.deleteBatch(req.params.id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Batch deleted successfully',
        data: result,
    });
});

export const BatchControllers = {
    createBatch,
    getBatchById,
    getAllBatches,
    updateBatch,
    deleteBatch,
};
