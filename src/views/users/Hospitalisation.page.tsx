import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {useParams} from "react-router";
import {useQuery} from "@apollo/client";
import {LAST_OBSERVATION_QUERY, OBSERVATION_SUBSCRIPTION} from "../../services/graphql/observation";
import {Box, Container, Grid, LinearProgress, Typography, Paper} from "@mui/material";
import {Equipment, Observation} from "../../__generated__/graphql";
import {LineChart} from '@mui/x-charts/LineChart';


const HospitalisationPage = () => {

    const params = useParams() as { hospitalisationId: string };
    const hospitalisationId = params.hospitalisationId;

    const {data, loading, subscribeToMore} = useQuery(LAST_OBSERVATION_QUERY, {
        variables: {
            payload: {
                hospitalisationId,
                limit: 100,
                page: 1,
            }
        },
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {
        subscribeToMore({
            document: OBSERVATION_SUBSCRIPTION,
            variables: {hospitalisationId},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data.observationAdded) return prev;
                const newFeedItem = subscriptionData.data.observationAdded;
                return {
                    ...prev,
                    lastObservations: {
                        ...prev.lastObservations,
                        data: [newFeedItem, ...prev.lastObservations.data]
                            .filter((e, index, self) =>
                                self.findIndex(i => i.id === e.id) === index)
                    }
                };
            }
        })
    }, []);


    let equipmentsMap = useMemo(() => {
        let equipmentsMap: { [key: string]: [Equipment, Observation[]] } = {};
        (data?.lastObservations?.data ?? [])
            .forEach((item: any) => {
                if (equipmentsMap[item.equipmentId]) {
                    equipmentsMap[item.equipmentId] = [item.equipment,
                        [...equipmentsMap[item.equipmentId][1], item]]
                } else {
                    equipmentsMap[item.equipmentId] = [item.equipment, [item]]
                }
            })
        return equipmentsMap;
    }, [data?.lastObservations?.data]);


    return <Box my={2}>
        <Container maxWidth={'lg'}>
            {
                loading &&
                <LinearProgress/>
            }
            <Grid container spacing={4} >
                {
                    Object.values(equipmentsMap)
                        .map(([equipment, observations]) => <Grid item lg={6} sm={12} key={equipment.id}>
                            <Paper sx={{p: 2}} elevation={2} >
                                <Typography variant={'h6'}>
                                    {equipment.name}
                                </Typography>
                                <LineChart
                                    xAxis={[{
                                        data: observations
                                            .slice(-10)
                                            .map((o, k) => k + 1)
                                    }]}
                                    series={[
                                        {
                                            data: observations
                                                .reverse()
                                                .slice(-10)
                                                .map(o => o.value),
                                            area: true,
                                        },
                                    ]}
                                    height={300}
                                />
                            </Paper>
                        </Grid>)
                }
            </Grid>
        </Container>
    </Box>
};


export default HospitalisationPage