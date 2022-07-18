import { News } from './news.component';
import { Schedule } from './schedule.component';
import { Margin } from '../spacing';

export function ScheduleFeed(props) {
    return (
        <>
            {props.news && props.news.length > 0
                ? (
                    <Margin bottom={15}>
                        <News {...props} />
                    </Margin>
                ) : ''}
            <Schedule {...props} />
        </>
    );
}
