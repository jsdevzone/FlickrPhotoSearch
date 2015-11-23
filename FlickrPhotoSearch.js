
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
} = React;

export class FlickrPhotoSearch extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            searchText: 'iphone',
            isLoading: false,
            message: ''
        };
    }
    onSearchTextChange(text) {
        this.setState({ searchText: text });
    }
    onSearch() {

        if(!this.state.isLoading) {
            this.setState({ isLoading: true, message: "Searching Please Wait" });

            var url = 'http://api.flickr.com/services/rest/?&';
            var data = {
                'method': 'flickr.photos.getRecent',
                'api_key': 'c043751797d8ad538aa39acd913e8435',
                'format': 'json',
                'nojsoncallback': 1,
                'tag': this.state.searchText
            }

            var querystring = Object.keys(data)
                .map(key => key + '=' + encodeURIComponent(data[key]))
                .join('&');

            var url = 'https://api.flickr.com/services/rest/?' + querystring;

            fetch(url)
                .then(response => response.json())
                .then(response => {
                    this.setState({ isLoading: false, message: response.photos.total + " Items Found" });
                    this.props.navigator.push({ id: "result", title: "Search Results - " + this.state.searchText, passProps: { data: response.photos.photo } });
                })
                .catch(error =>
                    this.setState({
                        isLoading: false,
                        message: 'Something bad happened - ' + error
                    })
                );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./resources/logo.png')} style={styles.logo} />
                <View style={styles.banner}>
                    <Text style={styles.title}>Search Flickr Photos</Text>
                    <Text style={styles.description}> Search by name or anything </Text>
                </View>
                <View style={styles.textboxWrapper}>
                    <TextInput style={styles.textbox} onChangeText={this.onSearchTextChange.bind(this)} value={this.state.searchText} placeholder="Search" underlineColorAndroid="#F5FCFF" />
                </View>
                <TouchableHighlight onPress={this.onSearch.bind(this)}>
                    <View style={styles.button}>
                        {(() => {
                            if(this.state.isLoading) {
                                return (<Text style={styles.buttonText}>{this.state.message}</Text>);
                            }
                            else {
                                return (<Text style={styles.buttonText}>Search</Text>)
                            }
                        })()}
                    </View>
                </TouchableHighlight>
                <Text>{this.state.message}</Text>
            </View>
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
    },
    logo: {
    },
    banner: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 24,
    },
    description: {
        fontSize: 16
    },
    textboxWrapper: {
        width: 300,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderColor: '#03A9F5',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 10,
        paddingLeft: 5
    },
    textbox: {
        flex: 1
    },
    button: {
        backgroundColor: '#03A9F5',
        width: 300,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: 'bold'
    }
});

AppRegistry.registerComponent('FlickrPhotoSearchApp', () => FlickrPhotoSearchApp);
