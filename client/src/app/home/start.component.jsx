import { useTranslation } from 'react-i18next';
import { FlexContainer } from '../common/components/containers';
import { PrimaryButton } from '../common/components/buttons';
import { useWindowSize } from '../common/hooks';
import styles from './start.module.css';
import logo from '../../assets/images/logo.png';

export function Start() {
    const {t} = useTranslation();
    const { height } = useWindowSize();

    return (
        <FlexContainer id='start'
                       justifyContent='center'
                       alignItems='center'
                       flexFlow='column'
                       minHeight={`${height}px`}
                       style={{ textAlign:'center' }}>
            <img src={logo} alt='Logo' className={styles.logo}/>
            <h4 className={styles.title}>
                {t('start.title', { ns: 'home' })}
            </h4>
            <div>
                <a href='/#install' className={styles.install_button}>
                    <PrimaryButton title={t('start.install', { ns: 'home' })}/>
                </a>
                <a href='/#about'>
                    <PrimaryButton title={t('start.more', { ns: 'home' })}/>
                </a>
            </div>
        </FlexContainer>
    );
}
