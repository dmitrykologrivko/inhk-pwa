import './spinner-animation.css';

export function Spinner({
    width = 50,
    height = 50,
    depth = 8,
    duration = 1.5,
    color = 'black',
    secondaryColor = 'black'
}) {
    return (
        <div style={{
            width: `${width}px`,
            height: `${height}px`,
            border: `${depth}px solid ${secondaryColor}`,
            borderTop: `${depth}px solid ${color}`,
            borderRadius: '50%',
            animation: `spinner ${duration}s linear infinite`,
            WebkitAnimation: `spinner ${duration}s linear infinite`
        }} />
    );
}
