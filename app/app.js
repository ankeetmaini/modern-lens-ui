import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppContainer from './containers/AppContainer';

injectTapEventPlugin();
ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <AppContainer/>
  </MuiThemeProvider>,
  document.getElementById('root')
);
