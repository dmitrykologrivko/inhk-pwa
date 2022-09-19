// TODO: Update with actual
export const SCHEDULE_TIME_INTERVALS = {
    1: {
        from: {
            hours: 8,
            minutes: 0
        },
        to: {
            hours: 9,
            minutes: 30
        }
    },
    2: {
        from: {
            hours: 9,
            minutes: 50
        },
        to: {
            hours: 11,
            minutes: 20
        }
    },
    3: {
        from: {
            hours: 11,
            minutes: 50
        },
        to: {
            hours: 13,
            minutes: 20
        }
    },
    4: {
        from: {
            hours: 13,
            minutes: 30
        },
        to: {
            hours: 15,
            minutes: 0
        }
    },
    5: {
        from: {
            hours: 15,
            minutes: 10
        },
        to: {
            hours: 16,
            minutes: 40
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

