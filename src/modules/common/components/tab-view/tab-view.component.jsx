import {
    useRef,
    useState,
    useLayoutEffect,
    cloneElement
} from 'react';
import { TabBar } from '../tab-bar';
import { debounce } from '../../utils';
import styles from './tab-view.module.css';

export function TabView({ tabs, onTabSelected }) {
    const DEBOUNCE_DELAY = 100;

    const [viewMinHeight, setViewMinHeight] = useState(0);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabBarRef = useRef(null);

    useLayoutEffect(() => {
        const calcViewMinHeight = () =>
            window.innerHeight - tabBarRef.current.clientHeight;

        const onWindowResize = debounce(() => {
            setViewMinHeight(calcViewMinHeight());
        }, DEBOUNCE_DELAY);

        setViewMinHeight(calcViewMinHeight());

        window.addEventListener('resize', onWindowResize);
        return () => window.removeEventListener('resize', onWindowResize);
    }, []);

    return (
        <div style={{ backgroundColor: tabs[selectedTabIndex].bgColor }}>
            <div style={{ minHeight: viewMinHeight }}>
                {tabs[selectedTabIndex].view}
            </div>
            <div className={styles.tab_bar_wrapper} ref={tabBarRef}>
                <TabBar onItemSelected={(index) => {
                    setSelectedTabIndex(index);
                    
                    if (onTabSelected) {
                        onTabSelected(index);
                    }
                }}>
                    {tabs.map((tab, index) => cloneElement(tab.tabItem, { key: index }))}
                </TabBar>
            </div>
        </div>
    );
}
