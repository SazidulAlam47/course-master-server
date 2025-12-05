import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuizAttemptServices } from './quizAttempt.service';

const createQuizAttempt = catchAsync(async (req, res) => {
    const result = await QuizAttemptServices.createQuizAttempt(
        req.user,
        req.body,
    );
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Quiz attempt submitted successfully',
        data: result,
    });
});

const getQuizAttemptByLessonId = catchAsync(async (req, res) => {
    const result = await QuizAttemptServices.getQuizAttemptByLessonId(
        req.user,
        req.params.lessonId,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Quiz attempt retrieved successfully',
        data: result,
    });
});

export const QuizAttemptControllers = {
    createQuizAttempt,
    getQuizAttemptByLessonId,
};
