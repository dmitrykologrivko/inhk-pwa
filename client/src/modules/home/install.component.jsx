import { useWindowSize } from '../../shared/hooks';
import { SegmentedControl, SegmentedControlItem } from '../../shared/components/segmented-control';

export function Install() {
    const { height } = useWindowSize();

    return (
        <div id='install'
             style={{ padding: '8px', minHeight: `${height}px`, border: '1px solid black' }}>
            <SegmentedControl>
                <SegmentedControlItem title='Desktop' />
                <SegmentedControlItem title='iOS' />
                <SegmentedControlItem title='Android' />
            </SegmentedControl>
            <div>
                TODO
            </div>
        </div>
    );
}
