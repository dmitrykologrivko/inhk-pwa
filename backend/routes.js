const InhkClient = require('./inhk.client').InhkClient;
const InhkApiError = require('./inhk.client').InhkApiError;

const client = new InhkClient();

function handleError(error) {
    if (error instanceof InhkApiError) {
        return {
            message: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Inhk server is not available'
        };
    }
    throw error;
}

async function todaySchedule(req, res) {
    try {
        const groups = await client.getTodaySchedule();
        return res.json(groups);
    } catch (e) {
        return res
            .status(503)
            .json(handleError(e));
    }
}

async function onDateSchedule(req, res) {
    try {
        const groups = await client.getScheduleOnDate(req.params.date);
        return res.json(groups);
    } catch (e) {
        return res
            .status(503)
            .json(handleError(e));
    }
}

async function teacherSchedule(req, res) {
    try {
        const groups = await client.getTeacherSchedule(req.params.id);
        return res.json(groups);
    } catch (e) {
        return res
            .status(503)
            .json(handleError(e));
    }
}

async function groupSchedule(req, res) {
    try {
        const groups = await client.getGroupSchedule(req.params.id);
        return res.json(groups);
    } catch (e) {
        return res
            .status(503)
            .json(handleError(e));
    }
}

async function teachers(req, res) {
    try {
        const groups = await client.getTeachers();
        return res.json(groups);
    } catch (e) {
        return res
            .status(503)
            .json(handleError(e));
    }
}

async function groups(req, res) {
    try {
        const groups = await client.getGroups();
        return res.json(groups);
    } catch (e) {
        return res
            .status(503)
            .json(handleError(e));
    }
}

module.exports = {
    todaySchedule,
    onDateSchedule,
    teacherSchedule,
    groupSchedule,
    teachers,
    groups
};
