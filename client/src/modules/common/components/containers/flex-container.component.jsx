export function FlexContainer({
    id,
    children,
    width,
    height,
    minWidth,
    minHeight,
    alignItems,
    justifyContent,
    flexFlow,
    padding,
    margin,
    className,
    style
}) {
    return (
        <div id={id}
             style={{
                 ...style,
                 display: 'flex',
                 width,
                 height,
                 minWidth,
                 minHeight,
                 alignItems,
                 justifyContent,
                 flexFlow,
                 padding,
                 margin
             }}
             className={className}>
            {children}
        </div>
    );
}
