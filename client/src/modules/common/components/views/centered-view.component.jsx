import {FlexContainer} from '../containers';

export function CenteredView({children, className, style}) {
    return (
        <FlexContainer className={className}
                       style={style}
                       minHeight='inherit'
                       alignItems='center'
                       justifyContent='center'>
            {children}
        </FlexContainer>
    );
}
