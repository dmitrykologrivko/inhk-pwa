import { createContext, useContext } from 'react';
import { InhkService } from './inhk.service';

const InhkContext = createContext(null);

export function InhkProvider(props) {
    const inhkService = props.inhkService || new InhkService();
    return (
        <InhkContext.Provider value={inhkService}>
            {props.children}
        </InhkContext.Provider>
    );
}

export function useInhk() {
    return useContext(InhkContext);
}
