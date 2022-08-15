export const SCHEDULE_TIME_INTERVALS = {
    1: {
        from: {
            hours: 8,
            minutes: 0
        },
        to: {
            hours: 8,
            minutes: 30
        }
    },
    2: {
        from: {
            hours: 8,
            minutes: 0
        },
        to: {
            hours: 8,
            minutes: 30
        }
    },
    3: {
        from: {
            hours: 8,
            minutes: 0
        },
        to: {
            hours: 8,
            minutes: 30
        }
    },
    4: {
        from: {
            hours: 8,
            minutes: 0
        },
        to: {
            hours: 8,
            minutes: 30
        }
    },
    5: {
        from: {
            hours: 8,
            minutes: 0
        },
        to: {
            hours: 8,
            minutes: 30
        }
    }
};

export function getTimeInterval(lessonNumber, lessonDate) {
    const from = new Date(lessonDate);
    const to = new Date(lessonDate);

    const timeInterval = SCHEDULE_TIME_INTERVALS[lessonNumber];

    from.setHours(timeInterval?.from.hours, timeInterval?.from.minutes);
    to.setHours(timeInterval?.to.hours, timeInterval?.to.minutes);

    return {
        from,
        to
    }
}

