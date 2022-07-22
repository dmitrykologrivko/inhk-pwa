export function FlexContainer({
    children,
    width,
    height,
    minWidth,
    minHeight,
    alignItems,
    justifyContent,
    flexFlow,
    flexDirection,
    padding,
    margin,
    className,
    style
}) {
    return (
        <div style={{
            ...style,
            display: 'flex',
            width,
            height,
            minWidth,
            minHeight,
            alignItems,
            justifyContent,
            flexFlow,
            flexDirection,
            padding,
            margin
        }} className={className}>
            {children}
        </div>
    );
}
