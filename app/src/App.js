import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { DrizzleContext } from '@drizzle/react-plugin';
import SimpleCard from './components/SimpleCard';
import drizzle from './config/drizzle';

import 'typeface-roboto';

function App() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle: _drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return 'Loading...';
          }
          return (
            <Container>
              <Grid alignContent="center">
                <SimpleCard drizzle={_drizzle} drizzleState={drizzleState} hola="hola" />
              </Grid>
            </Container>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
