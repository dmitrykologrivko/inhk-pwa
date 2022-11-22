import { getTimeInterval } from './lesson-time-interval.util';

export async function mapTeachers(dto) {
    return dto.result?.teachers?.map(item => ({id: item.id, name: item.name}));
}

export async function mapGroups(dto) {
    return dto.result?.groups?.map(item => ({id: item.id, name: item.name}));
}

export async function mapSchedule(dto) {
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
            mapLesson(dto.result?.on_date, 1, element['1']),
            mapLesson(dto.result?.on_date, 2, element['2']),
            mapLesson(dto.result?.on_date, 3, element['3']),
            mapLesson(dto.result?.on_date, 4, element['4']),
            mapLesson(dto.result?.on_date, 5, element['5']),
        ],
    }));

    return {
        current: dto.result?.current,
        onDate: new Date(dto.result?.on_date),
        schedule,
        news: [
            ...dto.result?.all_news || [],
            ...dto.result?.news_for_group || []
        ]
    };
}
