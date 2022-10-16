import { useState, useEffect } from 'react';
import styles from './pull-to-refresh.module.css';
import ArrowIcon from './arrow-down-thin.svg';
import RotateIcon from './autorenew.svg';

const CONTENT_HEIGHT = 60;
const MAX_CONTENT_HEIGHT = 80;

export function PullToRefresh({children, onRefresh, showProgress}) {
    const [positionStart, setPositionStart] = useState({ x: 0, y: 0 });
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (!showProgress) {
            setHeaderHeight(0);
        }
    }, [showProgress]);

    const onTouchStartHandler = e => {
        if (typeof e["targetTouches"] !== "undefined") {
            const touch = e.targetTouches[0];
            setPositionStart({ x: touch.screenX, y: touch.screenY });
        } else {
            setPositionStart({ x: e.screenX, y: e.screenY });
        }
    };

    const onTouchEndHandler = () => {
        if (headerHeight < CONTENT_HEIGHT) {
            setHeaderHeight(0);
            return;
        }
        // Start refreshing once header height is reached the allowed content height
        if (headerHeight >= CONTENT_HEIGHT) {
            setHeaderHeight(CONTENT_HEIGHT);
            if (onRefresh) {
                onRefresh();
            }
        }
    };

    const onTouchMoveHandler = e => {
        // Stop handling if page scroll
        if (e.view.pageYOffset > 0) {
            return;
        }

        let x;
        let y;
        if (typeof e["targetTouches"] !== "undefined") {
            const touch = e.targetTouches[0];
            x = touch.screenX;
            y = touch.screenY;
        } else {
            x = e.screenX;
            y = e.screenY;
        }

        const xDiff = positionStart.x - x;
        const yDiff = positionStart.y - y;

        // Stop handling if the initial swiping up
        if (Math.abs(xDiff) < Math.abs(yDiff) && yDiff > 0) {
            return;
        }

        const diffHeight = Math.abs(positionStart.y - y);
        const newHeaderHeight = diffHeight > MAX_CONTENT_HEIGHT
            ? MAX_CONTENT_HEIGHT
            : diffHeight;

        setHeaderHeight(newHeaderHeight);
    };

    const inProgressContent = (
        <img className={styles.rotate_icon}
             src={RotateIcon}
             alt='Rotate Icon' />
    );

    const pullContent = (
        <img className={`${headerHeight >= CONTENT_HEIGHT ? styles.arrow_up_icon : styles.arrow_down_icon}`}
             src={ArrowIcon}
             alt='Arrow Icon' />
    );

    return (
      <div onTouchStart={showProgress ? null : onTouchStartHandler}
           onTouchEnd={showProgress ? null : onTouchEndHandler}
           onTouchMove={showProgress ? null : onTouchMoveHandler}>
          <div className={styles.header} style={{ height: headerHeight }}>
              <div className={styles.header__content}>
                  {showProgress ? (inProgressContent) : (pullContent)}
              </div>
          </div>
          {children}
      </div>
    );
}
