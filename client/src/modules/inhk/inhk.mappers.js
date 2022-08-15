import { getTimeInterval } from './lesson-time-interval.util';

export async function mapTeachers(dto) {
    return dto.result?.teachers?.map(item => ({id: item.id, text: item.name})); // map to name ???
}

export async function mapGroups(dto) {
    return dto.result?.groups?.map(item => ({id: item.id, text: item.name})); // map to name ???
}

export async function mapSchedule(dto) {
    const onDate = dto.result?.on_date;

    const mapLesson = (date, number, details) => ({
        number,
        timeInterval: getTimeInterval(number, date),
        details: details.map(element => ({
            subject: element.subject,
            teacher: element.teacher,
            group: element.group,
            classRoom: element.classroom,
        }))
    });

    const schedule = dto.result?.schedule?.map(element => ({
        user: element.info,
        lessons: [
            mapLesson(onDate, 1, element['1']),
            mapLesson(onDate, 2, element['2']),
            mapLesson(onDate, 3, element['3']),
            mapLesson(onDate, 4, element['4']),
            mapLesson(onDate, 5, element['5']),
        ],
    }));

    return {
        current: dto.result?.current,
        onDate,
        schedule,
        news: [
            ...dto.result?.all_news,
            ...dto.result?.news_for_group
        ]
    };
}
