import {Spinner} from '../spinner';
import {CenteredView} from './centered-view.component';

export function ProgressView(props) {
    return (
        <CenteredView {...props}>
            <Spinner/>
        </CenteredView>
    );
}
