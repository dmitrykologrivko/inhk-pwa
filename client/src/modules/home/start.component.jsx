import { useTranslation } from 'react-i18next';
import { FlexContainer } from '../../shared/components/containers';
import { PrimaryButton } from '../../shared/components/buttons';
import { useWindowSize } from '../../shared/hooks';
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
            <div>v1</div>
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
