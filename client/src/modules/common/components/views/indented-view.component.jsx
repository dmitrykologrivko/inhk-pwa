import {View} from './view.component';
import {Padding} from '../spacing';

export function IndentedView(props) {
    return (
        <View {...props}>
            <Padding top={16} right={16} bottom={8} left={16}>
                {props.children}
            </Padding>
        </View>
    );
}
