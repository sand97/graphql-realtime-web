import {Link as RouterLink} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Button, Typography, Container} from '@mui/material';
// components
import Page from 'components/Page';
// assets
import {PageNotFoundIllustration} from 'assets';

import React from 'react';
import {useTranslation} from "react-i18next";
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: 'calc(100vh - 250px)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: theme.spacing(12, 0),
    paddingRight: theme.spacing(12, 0),
}));

export default function Page404() {
    const {t} = useTranslation();

    return (
        <Page title="404 Page Not Found">
            <Container>
                <ContentStyle sx={{textAlign: 'center', alignItems: 'center'}}>
                    <Typography variant="h3" paragraph>
                        {t('page_not_found.title')}
                    </Typography>

                    <Typography sx={{color: 'text.secondary'}}>
                        {t('page_not_found.subtitle')}
                    </Typography>

                    <PageNotFoundIllustration sx={{height: 260, my: {xs: 5, sm: 10}}}/>

                    <Button to="/" size="large" variant="contained" component={RouterLink}>
                        {t('page_not_found.action')}
                    </Button>
                </ContentStyle>
            </Container>
        </Page>
    );
}
