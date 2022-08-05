import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Margin, Padding} from '../common/components/spacing';
import {FlexContainer} from '../common/components/containers';
import {PageHeading, PageHeadingSecondary} from '../common/components/titles';
import {Spinner} from '../common/components/spinner';
import {TryAgain} from '../common/components/errors';
import {College} from './college.component';
import styles from './college-view.module.css';

const students = [
    {
        id: 1,
        text: 'IR-001'
    },
    {
        id: 2,
        text: 'IR-002'
    },
    {
        id: 3,
        text: 'TR-001'
    }
]
const teachers = [
    {
        id: 1,
        text: 'Lisa Williams'
    },
    {
        id: 2,
        text: 'Eva Johnson'
    },
    {
        id: 3,
        text: 'John Smith'
    },
    {
        id: 4,
        text: 'Eva Philips'
    },
]
const primaryColor = '#4da7fe';

export function CollegeView() {
    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [errorMesssage, setErrorMessage] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setErrorMessage('');
        }, 1000);
    }, [isLoading]);

    const content = errorMesssage ? (
        <FlexContainer className={styles.view_container}
                       alignItems='center'
                       justifyContent='center'>
            <TryAgain onRequestAgain={() => {
            }}>
                {errorMesssage}
            </TryAgain>
        </FlexContainer>
    ) : (
        <div className={styles.view_container}>
            <Padding top={16} right={16} bottom={8} left={16}>
                <Margin bottom={15}>
                    <PageHeading>
                        {t('title', {ns: 'college'})}
                    </PageHeading>
                </Margin>
                <College students={students} teachers={teachers}/>
            </Padding>
        </div>
    );

    return (
        isLoading ? (
            <FlexContainer className={styles.view_container}
                           alignItems='center'
                           justifyContent='center'>
                <Spinner color={primaryColor}
                         secondaryColor='#f3f3f3'/>
            </FlexContainer>
        ) : (content)
    );
}