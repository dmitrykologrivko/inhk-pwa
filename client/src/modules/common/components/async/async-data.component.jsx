import { useState, useEffect } from 'react';
import {
    useAsyncTask,
    STATUS_PENDING,
    STATUS_IN_PROGRESS,
    STATUS_FAILED,
    STATUS_SUCCESS
} from './use-async-task.hook';

/**
 * Async data loading component
 * @param asyncTask async data loading function.
 *                  wrap by useCallback to avoid restarting on each re-render
 * @param pending render pending content before data is loaded
 * @param inProgress render progress content when data is loading
 * @param failed render failed content after data is loaded with error
 * @param success render success content after data is loaded successfully TODO://
 * @returns {JSX.Element|*}
 * @constructor
 */
export function AsyncData({
   asyncTask,
   pending,
   inProgress,
   failed,
   content
}) {
    const {
        status,
        data,
        error,
        restart
    } = useAsyncTask(asyncTask);

    const [isRefreshingData, setRefreshingData] = useState(false);
    const [isErrorHandled, setErrorHandled] = useState(true);

    useEffect(() => {
        if (status === STATUS_FAILED) {
            setErrorHandled(false);
        } else {
            setErrorHandled(true);
        }
    }, [status]);

    const result = {
        status,
        data,
        error,
        isErrorHandled,
        onErrorHandled: () => {
            setErrorHandled(true);
        },
        restart: (refresh = false) => {
            setRefreshingData(refresh);
            restart();
        }
    };

    if (isRefreshingData) {
        return content(result);
    }

    if (status === STATUS_PENDING && pending) {
        return pending(result);
    }
    if (status === STATUS_IN_PROGRESS && inProgress) {
        return inProgress(result);
    }
    if (status === STATUS_FAILED && failed) {
        return failed(result);
    }
    if (status === STATUS_SUCCESS && content) {
        return content(result);
    }

    return (<></>);
}
