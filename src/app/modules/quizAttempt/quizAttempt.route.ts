import express from 'express';
import auth from '../../middlewares/auth';
import { QuizAttemptControllers } from './quizAttempt.controller';
import validateRequest from '../../middlewares/validateRequest';
import { QuizAttemptValidations } from './quizAttempt.validation';

const router = express.Router();

router.get(
    '/lesson/:lessonId',
    auth(),
    QuizAttemptControllers.getQuizAttemptByLessonId,
);

router.post(
    '/',
    auth('student'),
    validateRequest(QuizAttemptValidations.createQuizAttempt),
    QuizAttemptControllers.createQuizAttempt,
);

export const QuizAttemptRoutes = router;
