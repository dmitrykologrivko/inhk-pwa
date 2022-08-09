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
 * @param success render success content after data is loaded successfully
 * @returns {JSX.Element|*}
 * @constructor
 */
export function AsyncData({
   asyncTask,
   pending,
   inProgress,
   failed,
   success
}) {
    const {
        status,
        data,
        error,
        restart
    } = useAsyncTask(asyncTask);

    if (status === STATUS_PENDING && pending) {
        return pending();
    }
    if (status === STATUS_IN_PROGRESS && inProgress) {
        return inProgress();
    }
    if (status === STATUS_FAILED && failed) {
        return failed(error, restart);
    }
    if (status === STATUS_SUCCESS && success) {
        return success(data, restart);
    }

    return (<></>);
}
