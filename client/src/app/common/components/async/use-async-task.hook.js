import { useState, useEffect } from 'react';

export const STATUS_PENDING = 'pending';
export const STATUS_IN_PROGRESS = 'in_progress';
export const STATUS_FAILED = 'failed';
export const STATUS_SUCCESS = 'success';

export function useAsyncTask(asyncTask, args) {
    const [taskArgs, setTaskArgs] = useState(args);
    const [status, setStatus] = useState(STATUS_PENDING);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setStatus(STATUS_IN_PROGRESS);
        asyncTask(taskArgs)
            .then(data => {
                setData(data);
                setError(null);
                setStatus(STATUS_SUCCESS);
            })
            .catch(e => {
                setError(e);
                setStatus(STATUS_FAILED);
            });
    }, [asyncTask, taskArgs, count]);

    return {
        status,
        data,
        error,
        restart: args => {
            setTaskArgs(args);
            setCount(count => count + 1);
        }
    };
}
