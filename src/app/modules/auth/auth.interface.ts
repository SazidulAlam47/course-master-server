import z from 'zod';
import { AuthValidations } from './auth.validation';

export type TStudentRegisterPayload = z.infer<
    typeof AuthValidations.registerStudent
>;
