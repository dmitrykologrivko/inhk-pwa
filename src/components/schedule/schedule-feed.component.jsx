import { News } from './news.component';
import { Schedule } from './schedule.component';
import { Margin } from '../spacing';
import { FlexContainer } from '../containers';

export function ScheduleFeed(props) {
    return (
        <>
            {props.news && props.news.length > 0
                ? (
                    <Margin bottom={15}>
                        <News {...props} />
                    </Margin>
                ) : ''}
            {props.lessons && props.lessons.length > 0 ? (
                <Schedule {...props} />
            ) : (
                <FlexContainer justifyContent='center'>
                    Нет текущего расписания
                </FlexContainer>
            )}
        </>
    );
}
