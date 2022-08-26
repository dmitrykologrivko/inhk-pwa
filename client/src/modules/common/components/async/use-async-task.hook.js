import {useState, useEffect} from 'react';

export const STATUS_PENDING = 'pending';
export const STATUS_IN_PROGRESS = 'in_progress';
export const STATUS_FAILED = 'failed';
export const STATUS_SUCCESS = 'success';

export function useAsyncTask(asyncTask) {
    const [status, setStatus] = useState(STATUS_PENDING);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setStatus(STATUS_IN_PROGRESS);
        asyncTask()
            .then(data => {
                setData(data);
                setError(null);
                setStatus(STATUS_SUCCESS);
            })
            .catch(e => {
                setError(e);
                setStatus(STATUS_FAILED);
            });
    }, [asyncTask, count]);

    return {
        status,
        data,
        error,
        restart: () => setCount(count => count + 1)
    };
}
