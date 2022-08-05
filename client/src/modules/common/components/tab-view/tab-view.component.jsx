import {
    useRef,
    useState,
    useCallback,
    useEffect,
    useLayoutEffect,
    cloneElement
} from 'react';
import {TabBar} from '../tab-bar';
import {debounce} from '../../utils';
import styles from './tab-view.module.css';

export function TabView({tabs, defaultView, navigate, onTabSelected}) {
    const DEBOUNCE_DELAY = 100;

    const [viewMinHeight, setViewMinHeight] = useState(0);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabBarRef = useRef(null);

    const findTabByPath = useCallback(() => {
        const lastSegment = window.location.pathname.split('/').pop();
        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];
            if (tab.path === lastSegment) {
                setSelectedTabIndex(i);
                return;
            }
        }

        setSelectedTabIndex(-1);
    }, [tabs]);

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

    // First loading page
    useEffect(() => {
        findTabByPath();
    }, [findTabByPath]);

    // Navigation
    useEffect(() => {
        const onPopState = (e) => {
            e.preventDefault();
            findTabByPath();
        };

        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, [findTabByPath]);

    return (
        <div style={{backgroundColor: tabs[selectedTabIndex]?.bgColor}}>
            <div style={{minHeight: viewMinHeight}}>
                {tabs[selectedTabIndex]?.view || defaultView}
            </div>
            <div className={styles.tab_bar_wrapper} ref={tabBarRef}>
                <TabBar selectedIndex={selectedTabIndex}
                        onItemSelected={(index) => {
                            setSelectedTabIndex(index);

                            if (onTabSelected) {
                                onTabSelected(index);
                            }

                            if (navigate) {
                                navigate(tabs[index]?.path);
                            }
                        }}>
                    {tabs.map((tab, index) => cloneElement(tab.tabItem, {key: index}))}
                </TabBar>
            </div>
        </div>
    );
}