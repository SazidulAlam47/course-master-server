import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MetaServices } from './meta.service';

const getMeta = catchAsync(async (req, res) => {
    const result = await MetaServices.getMeta();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Meta data retrieved successfully',
        data: result,
    });
});

export const MetaControllers = {
    getMeta,
};
