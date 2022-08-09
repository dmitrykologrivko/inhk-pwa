export function View({children, className, style}) {
    return (
        <div className={className}
             style={{...style, minHeight: 'inherit'}}>
            {children}
        </div>
    );
}
