import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from '../../shared/hooks';
import { Padding } from '../../shared/components/spacing';
import {
    SegmentedControl,
    SegmentedControlItem
} from '../../shared/components/segmented-control';
import styles from './install.module.css';
import chromeStep1 from './images/chrome_step_1.webp';
import chromeStep2 from './images/chrome_step_2.webp';
import iosStep1 from './images/ios_step_1.webp';
import iosStep2 from './images/ios_step_2.webp';
import iosStep3 from './images/ios_step_3.webp';
import androidStep1 from './images/android_step_1.webp';
import androidStep2 from './images/android_step_2.webp';
import androidStep3 from './images/android_step_3.webp';

const PLATFORM_DESKTOP = 'Desktop';
const PLATFORM_IOS = 'iOS';
const PLATFORM_ANDROID = 'Android';

export function Install() {
    const {t} = useTranslation();
    const { height } = useWindowSize();

    const [selectedPlatform, setSelectedPlatform] = useState(PLATFORM_DESKTOP);

    const desktopGuide = (
        <div className={styles.guide}>
            <div className={styles.guide__text}>
                {t('install.desktop.step1', { ns: 'home' })}
            </div>
            <a href={chromeStep1} target='_blank' rel="noreferrer">
                <img src={chromeStep1} alt='Desktop step 1' />
            </a>
            <div className={styles.guide__text}>
                {t('install.desktop.step2', { ns: 'home' })}
            </div>
            <a href={chromeStep2} target='_blank' rel="noreferrer">
                <img src={chromeStep2} alt='Desktop step 2' />
            </a>
        </div>
    );

    const iosGuide = (
        <div className={styles.guide}>
            <div className={styles.guide__text}>
                {t('install.ios.step1', { ns: 'home' })}
            </div>
            <a href={iosStep1} target='_blank' rel="noreferrer">
                <img className={styles.guide__image}
                     src={iosStep1}
                     alt='iOS step 1' />
            </a>
            <div className={styles.guide__text}>
                {t('install.ios.step2', { ns: 'home' })}
            </div>
            <a href={iosStep2} target='_blank' rel="noreferrer">
                <img className={styles.guide__image}
                     src={iosStep2}
                     alt='iOS step 2' />
            </a>
            <div className={styles.guide__text}>
                {t('install.ios.step3', { ns: 'home' })}
            </div>
            <a href={iosStep3} target='_blank' rel="noreferrer">
                <img className={styles.guide__image}
                     src={iosStep3}
                     alt='iOS step 3'/>
            </a>
        </div>
    );

    const androidGuide = (
        <div className={styles.guide}>
            <div className={styles.guide__text}>
                {t('install.android.step1', { ns: 'home' })}
            </div>
            <a href={androidStep1} target='_blank' rel="noreferrer">
                <img className={styles.guide__image}
                     src={androidStep1}
                     alt='Android step 1' />
            </a>
            <div className={styles.guide__text}>
                {t('install.android.step2', { ns: 'home' })}
            </div>
            <a href={androidStep2} target='_blank' rel="noreferrer">
                <img className={styles.guide__image}
                     src={androidStep2}
                     alt='Android step 2' />
            </a>
            <div className={styles.guide__text}>
                {t('install.android.step3', { ns: 'home' })}
            </div>
            <a href={androidStep3} target='_blank' rel="noreferrer">
                <img className={styles.guide__image}
                     src={androidStep3}
                     alt='Android step 3' />
            </a>
        </div>
    );

    let currentGuide;
    if (selectedPlatform === PLATFORM_DESKTOP) {
        currentGuide = desktopGuide;
    }
    if (selectedPlatform === PLATFORM_IOS) {
        currentGuide = iosGuide;
    }
    if (selectedPlatform === PLATFORM_ANDROID) {
        currentGuide = androidGuide;
    }
    console.log(navigator)
    return (
        <div id='install'
             className={styles.install}
             style={{ minHeight: `${height}px` }}>
            <div>Platform: {window.navigator.platform}</div>
            <div>User Agent: {window.navigator.userAgent}</div>
            <SegmentedControl>
                <SegmentedControlItem title={PLATFORM_DESKTOP}
                                      onClick={() => setSelectedPlatform(PLATFORM_DESKTOP)} />
                <SegmentedControlItem title={PLATFORM_IOS}
                                      onClick={() => setSelectedPlatform(PLATFORM_IOS)} />
                <SegmentedControlItem title={PLATFORM_ANDROID}
                                      onClick={() => setSelectedPlatform(PLATFORM_ANDROID)} />
            </SegmentedControl>
            <div>
                <Padding top={8} bottom={8}>
                    {currentGuide}
                </Padding>
            </div>
        </div>
    );
}
