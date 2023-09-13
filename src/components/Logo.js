import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import {useTheme} from '@mui/material/styles';
import {Box} from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
    disabledLink: PropTypes.bool,
    sx: PropTypes.object,
};

export default function Logo({disabledLink = false, sx}) {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR
    // const logo = '/logo/logo_single.svg';

    const logo = (
        <Box sx={{width: 64, height: 64, display: 'flex', alignItems: 'center', ...sx}}>
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
                <g clip-path="url(#clip0_263_618)">
                    <path d="M13.7828 10.2594C13.8124 10.639 14.1482 10.9538 14.529 10.9538H17.4828C17.8635 10.9538 18.1993 10.639 18.229 10.2594L18.3519 8.68809C18.3815 8.30849 18.0943 8 17.7135 8H14.2982C13.9174 8 13.6302 8.30849 13.6598 8.68805L13.7828 10.2594Z" fill="black"/>
                    <path d="M17.8219 12.5559L17.8219 12.556L19.3841 20.0072C19.3841 20.0072 19.3841 20.0072 19.3841 20.0073C19.401 20.088 19.3954 20.2201 19.3479 20.3684C19.3004 20.5167 19.2281 20.6273 19.1674 20.6831L16.1713 23.4384L16.5097 23.8064L16.1713 23.4384C16.0818 23.5207 15.9175 23.5203 15.829 23.439L15.8289 23.4389L12.8329 20.685C12.8329 20.685 12.8328 20.685 12.8328 20.6849C12.7717 20.6288 12.6996 20.5184 12.6522 20.3711C12.6048 20.2237 12.5992 20.0924 12.6161 20.0116C12.6161 20.0116 12.6161 20.0116 12.6161 20.0115L14.1784 12.5559L14.1784 12.5559C14.2064 12.4222 14.3715 12.2845 14.5232 12.2845H17.477C17.6287 12.2845 17.7938 12.4222 17.8219 12.5559Z" stroke="black"/>
                </g>
                <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="black"/>
                <defs>
                    <clipPath id="clip0_263_618">
                        <rect width="16" height="16" fill="white" transform="translate(8 8)"/>
                    </clipPath>
                </defs>
            </svg>
        </Box>
    );

    if (disabledLink) {
        return <>{logo}</>;
    }

    return <RouterLink to="/">{logo}</RouterLink>;
}
