import { useTranslation } from 'react-i18next';
import { FlexContainer } from '../common/components/containers';
import { useWindowSize } from '../common/hooks';
import styles from './about.module.css';
import pwaLogo from '../../assets/images/pwa_logo.svg';
import reactLogo from '../../assets/images/react_logo.svg';

export function About() {
    const {t} = useTranslation();
    const { height } = useWindowSize();

    return (
        <FlexContainer id='about'
                       alignItems='center'
                       justifyContent='center'
                       flexFlow='column'
                       minHeight={`${height}px`}
                       padding='20px'
                       style={{ textAlign:'center' }}>
            <div>
                <img className={styles.react_logo}
                     src={reactLogo}
                     alt='React Logo' />
                <img className={styles.pwa_logo}
                     src={pwaLogo}
                     alt='PWA Logo' />
            </div>
            <div className={styles.description}>
                {t('about.description', { ns: 'home' })}
            </div>
        </FlexContainer>
    );
}
