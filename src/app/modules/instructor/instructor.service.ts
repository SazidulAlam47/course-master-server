import { IInstructor } from './instructor.interface';
import { Instructor } from './instructor.model';

const createInstructor = async (payload: IInstructor) => {
    const result = await Instructor.create(payload);
    return result;
};

const getInstructorById = async (id: string) => {
    const result = await Instructor.findById(id);
    return result;
};

const getAllInstructors = async () => {
    const result = await Instructor.find();
    return result;
};

const updateInstructor = async (id: string, payload: Partial<IInstructor>) => {
    const result = await Instructor.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteInstructor = async (id: string) => {
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
