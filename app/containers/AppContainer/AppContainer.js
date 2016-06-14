import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import styles from './AppContainer.css';

export default class AppContainer extends Component {
  render () {
    return (
      <div className={styles.app}>
        <AppBar
          title='Apache Lens'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
        />
      </div>
    );
  }
}
