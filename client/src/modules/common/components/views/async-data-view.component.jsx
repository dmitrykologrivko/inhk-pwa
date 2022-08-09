import {TryAgainView} from './try-again-view.component';
import {ProgressView} from './progress-view.component';
import {IndentedView} from './indented-view.component';
import {
    useAsyncTask,
    STATUS_IN_PROGRESS,
    STATUS_FAILED
} from '../../hooks';

/**
 * Async data loading view
 * @param className css class name
 * @param style additional css styles
 * @param asyncTask async data loading function.
 *                  wrap by useCallback to avoid restarting on each re-render
 * @param render render main content after data is loaded
 * @returns {JSX.Element}
 */
export function AsyncDataView({
     className,
     style,
     asyncTask,
     render
}) {
    const {
        status,
        data,
        error,
        restart
    } = useAsyncTask(asyncTask);

    const content = status === STATUS_FAILED ? (
        <TryAgainView className={className}
                      style={style}
                      errorMessage={error.message}
                      onRequestAgain={() => restart()} />
    ) : (
        <IndentedView className={className}
                      style={style}>
            {render(data)}
        </IndentedView>
    );

    return (
        status === STATUS_IN_PROGRESS ? (
            <ProgressView className={className}
                          style={style} />
        ) : (content)
    );
}
