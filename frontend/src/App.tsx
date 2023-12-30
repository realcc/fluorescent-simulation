import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Paper, Button, LinearProgress } from '@mui/material';
import './App.css';
import classroom_bg from './classroom.jpeg';

const App: React.FC = () => {
    const [simulationData, setSimulationData] = useState<any>(null);
    const [updatedSimulationData, setUpdatedSimulationData] = useState<any>(null);
    const [currentDuration, setCurrentDuration] = useState<any>(null);
    const [simulationStarted, setSimulationStarted] = useState(false);

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch('http://localhost:3000/simulation/index')
            .then(response => response.json())
            .then(data => setSimulationData(data))
            .catch(error => console.error('Error fetching simulation data:', error));
    }, []);

    const startSimulation = () => {
        // You can add your simulation logic here if needed
        setSimulationStarted(true);

        // Simulate based on histories with a delay
        for (let i = 0; i <= 2700; i++) {
            setTimeout(() => {
                // Update simulation data with the loop index
                setCurrentDuration(i);
                setUpdatedSimulationData(simulationData.histories[i]);
            }, i * 10);
        }
    };

    const simulateAndRender = () => {
        if (!simulationData) {
            return null;
        }

        return (
            <Paper style={{ backgroundImage: `url(${classroom_bg})`, backgroundSize: 'cover', height: '100vh', position: 'relative' }}>
                <Container>
                    <Box textAlign="center" pt={4} pb={4}>
                        <Box style={{ backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px', borderRadius: '8px' }}>
                            <Typography variant="h4" gutterBottom>
                                Classroom Fluorescent Simulation
                            </Typography>
                        </Box>
                    </Box>
                    {updatedSimulationData && simulationStarted && (
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((unit, unitIndex) => (
                                <Grid key={unitIndex} item xs={12} sm={6} md={4} lg={3}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Fluorescent Unit {unit}
                                            </Typography>
                                            {[1, 2, 3, 4].map((tube, tubeIndex) => (
                                                <div key={tube} style={{ marginBottom: '10px' }}>
                                                    Tube {tube}
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={(updatedSimulationData.units[unitIndex].tubes[tubeIndex].hours_left / 200) * 100}
                                                    />
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            {simulationStarted && (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Current Simulation Duration
                                            </Typography>
                                            <Typography variant="body1">
                                                Months: {Math.floor(currentDuration / (15 * 5 * 4))}&nbsp;&nbsp;&nbsp;
                                                Weeks: {Math.floor(currentDuration / (15 * 5) % 4)}&nbsp;&nbsp;&nbsp;
                                                Days: {Math.floor(currentDuration / 15 % 5)}&nbsp;&nbsp;&nbsp;
                                                Hours: {Math.floor(currentDuration % 15)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Total Replacement
                                        </Typography>
                                        <Typography variant="body1">
                                            {updatedSimulationData.total_replacement} units
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Total Cost
                                        </Typography>
                                        <Typography variant="body1">
                                            USD ${updatedSimulationData.total_cost}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                    {!simulationStarted && (
                        <Box textAlign="center" pt={2}>
                            <Button variant="contained" color="primary" onClick={startSimulation}>
                                Start Simulation
                            </Button>
                        </Box>
                    )}
                </Container>
            </Paper>
        );
    };

    return <div>{simulateAndRender()}</div>;
};

export default App;
