/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ToolbarAndroid,
  BackAndroid,
} = React;


import { FlickrPhotoSearch } from './FlickrPhotoSearch';
import { FlickrSearchResult } from './FlickrSearchResult';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

var FlickrPhotoSearchApp = React.createClass({
    renderScene: function(route, navigator) {
        _navigator = navigator;
        var scene = null;
        switch(route.id) {
            case 'search':
                scene = (<FlickrPhotoSearch navigator={_navigator} />);
                break;
            case 'result':
                scene = (<FlickrSearchResult navigator={_navigator} {...route.passProps} />)
                break;
        }

        return (
            <View style={styles.container}>
                <ToolbarAndroid title={route.title} style={styles.toolbar} titleColor='#FFF' />
                { scene }
            </View>
        );
    },
    render: function() {
        return (
            <Navigator initialRoute = {{ id: 'search', title: 'Search Flickr Photos' }}
                renderScene={this.renderScene.bind(this)} />
        );
    }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  },
  toolbar: {
    backgroundColor: '#03A9F5',
    height: 56,
  }
});

AppRegistry.registerComponent('FlickrPhotoSearchApp', () => FlickrPhotoSearchApp);
