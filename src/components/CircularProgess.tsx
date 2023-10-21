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
            <CircularProgress variant="determinate" value={newValue} thickness={2} sx={{ color: "white" }} size={34} />
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
                    <p className='text-lg font-light font-sans'>{`${Math.round(props.value)}`}</p>

                </Typography>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel({ timeRemaining }: { timeRemaining: number }) {
    return <CircularProgressWithLabel value={timeRemaining} />;
}
