import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Course } from '../course/course.model';
import { IBatch } from './batch.interface';
import { Batch } from './batch.model';

const createBatch = async (payload: IBatch) => {
    const course = await Course.findById(payload.courseId);
    if (!course) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }
    const result = await Batch.create(payload);
    return result;
};

const getBatchById = async (id: string) => {
    const result = await Batch.findById(id);
    return result;
};

const getAllBatches = async () => {
    const result = await Batch.find();
    return result;
};

const updateBatch = async (id: string, payload: Partial<IBatch>) => {
    const course = await Course.findById(payload.courseId);
    if (!course) {
        throw new ApiError(status.NOT_FOUND, 'Course not found');
    }
    const result = await Batch.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteBatch = async (id: string) => {
    const result = await Batch.findByIdAndDelete(id);
    return result;
};

export const BatchServices = {
    createBatch,
    getBatchById,
    getAllBatches,
    updateBatch,
    deleteBatch,
};
