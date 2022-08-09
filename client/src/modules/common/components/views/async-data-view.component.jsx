import {TryAgainView} from './try-again-view.component';
import {ProgressView} from './progress-view.component';
import {IndentedView} from './indented-view.component';
import {AsyncData} from '../async';

/**
 * Async data loading view component
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
     content
}) {
    const inProgress = () => (<ProgressView className={className} style={style} />);
    const failed = (error, restart) => (
        <TryAgainView className={className}
                      style={style}
                      errorMessage={error.message}
                      onRequestAgain={() => restart()}/>
    );
    const success = (data, restart) => (
        <IndentedView className={className}
                      style={style}>
            {content(data, restart)}
        </IndentedView>
    );

    return (
      <AsyncData asyncTask={asyncTask}
                 inProgress={inProgress}
                 failed={failed}
                 success={success}/>
    );
}
