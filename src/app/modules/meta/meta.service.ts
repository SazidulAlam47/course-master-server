import { Course } from '../course/course.model';
import { Enrollment } from '../enrollment/enrollment.model';
import { Assignment } from '../assignment/assignment.model';

const getMeta = async () => {
    const totalEnrollments = await Enrollment.countDocuments({
        paymentStatus: 'paid',
    });

    const totalPublishedCourses = await Course.countDocuments({
        isPublished: true,
    });

    const totalPendingReviews = await Assignment.countDocuments({
        feedback: { $exists: false },
    });

    const totalAssignmentsSubmitted = await Assignment.countDocuments();

    return {
        totalEnrollments,
        totalPublishedCourses,
        totalPendingReviews,
        totalAssignmentsSubmitted,
    };
};

export const MetaServices = {
    getMeta,
};
