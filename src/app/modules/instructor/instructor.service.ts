import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { IInstructor } from './instructor.interface';
import { Instructor } from './instructor.model';

const createInstructor = async (payload: IInstructor) => {
    const result = await Instructor.create(payload);
    return result;
};

const getInstructorById = async (id: string) => {
    const result = await Instructor.findById(id);
    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Instructor not found');
    }
    return result;
};

const getAllInstructors = async () => {
    const result = await Instructor.find();
    return result;
};

const updateInstructor = async (id: string, payload: Partial<IInstructor>) => {
    const instructor = await Instructor.findById(id);
    if (!instructor) {
        throw new ApiError(status.NOT_FOUND, 'Instructor not found');
    }
    const result = await Instructor.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteInstructor = async (id: string) => {
    const instructor = await Instructor.findById(id);
    if (!instructor) {
        throw new ApiError(status.NOT_FOUND, 'Instructor not found');
    }
    const result = await Instructor.findByIdAndDelete(id);
    return result;
};

export const InstructorServices = {
    createInstructor,
    getInstructorById,
    getAllInstructors,
    updateInstructor,
    deleteInstructor,
};
