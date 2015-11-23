
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
  Image,
  TextInput,
  TouchableHighlight,
  ListView,
} = React;

export class FlickrSearchResult extends React.Component {
    constructor(args) {
        super(args);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data)
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={{flex: 1}} />
            </View>
        );
    }
    renderRow(rowData, sectionID: number, rowID: number) {
        var url = "https://farm"+ rowData.farm +".staticflickr.com/"+rowData.server+"/"+rowData.id+"_"+rowData.secret+".jpg";
        return (
            <TouchableHighlight underlayColor="#C6C7EA">
                <View style={[{flexDirection: 'row', padding: 10, paddingLeft: 25},this.props.showSeparator ? {borderBottomColor: '#F9F9F9', borderBottomWidth: 1}: {}]}>
                    <Image source={{uri: url }}
                        style={{width: 150, height: 150}} />

                </View>
           </TouchableHighlight>
       );
   }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    }
});

AppRegistry.registerComponent('FlickrPhotoSearchApp', () => FlickrPhotoSearchApp);
