// @flow
import * as React from 'react';
import {Container, Grid} from "@mui/material";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";

type Props = {

};
const ProfilPage = (props: Props) => {
    return (
        <Container maxWidth={'md'} sx={{ my: 2.5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <UpdateProfile/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <UpdatePassword/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilPage