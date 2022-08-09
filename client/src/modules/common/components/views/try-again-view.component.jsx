import {TryAgain} from '../errors';
import {CenteredView} from './centered-view.component';

export function TryAgainView(props) {
    return (
        <CenteredView {...props}>
            <TryAgain onRequestAgain={() => {
                if (props.onRequestAgain) {
                    props.onRequestAgain()
                }
            }}>
                {props.errorMessage}
            </TryAgain>
        </CenteredView>
    );
}
