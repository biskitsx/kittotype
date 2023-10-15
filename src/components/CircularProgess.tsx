import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Poppins } from 'next/font/google';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    const newValue = props.value / 15 * 100
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={newValue} thickness={2.5} sx={{ color: "#e5e5e5" }} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"

                >
                    {/* {`${Math.round(props.value)}`} */}
                    <p className='text-xl font-medium font-sans'>{`${Math.round(props.value)}`}</p>

                </Typography>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel({ timeRemaining }: { timeRemaining: number }) {
    // const [progress, setProgress] = React.useState(10);

    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    //     }, 800);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);


    return <CircularProgressWithLabel value={timeRemaining} />;
}
