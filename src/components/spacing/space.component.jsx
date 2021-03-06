export function Space({ size }) {
    return (<div style={{ flexBasis: size }} />);
}

export function Margin({
    children,
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
    className
}) {
    return (
        <div style={{ margin: `${top}px ${right}px ${bottom}px ${left}px` }}
            className={className}>
            {children}
        </div>
    );
}

export function Padding({
    children,
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
    className
}) {
    return (
        <div style={{ padding: `${top}px ${right}px ${bottom}px ${left}px` }}
            className={className}>
            {children}
        </div>
    );
}
