import {Spinner} from '../spinner';
import {CenteredView} from './centered-view.component';

export function ProgressView(props) {
    return (
        <CenteredView {...props}>
            <Spinner color='var(--primary-color)'
                     secondaryColor='#f3f3f3'/>
        </CenteredView>
    );
}
