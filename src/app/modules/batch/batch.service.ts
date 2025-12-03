import { IBatch } from './batch.interface';
import { Batch } from './batch.model';

const createBatch = async (payload: IBatch) => {
    const result = await Batch.create(payload);
    return result;
};

const getBatch = async (id: string) => {
    const result = await Batch.findById(id);
    return result;
};

const getAllBatch = async () => {
    const result = await Batch.find();
    return result;
};

const updateBatch = async (id: string, payload: Partial<IBatch>) => {
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
    getBatch,
    getAllBatch,
    updateBatch,
    deleteBatch,
};
