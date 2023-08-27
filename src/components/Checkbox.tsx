import React from 'react';
import { Checkbox as MUICheckbox } from '@mui/material';

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <MUICheckbox type={'checkbox'} ref={resolvedRef} {...rest} />
        </>
    )
});
