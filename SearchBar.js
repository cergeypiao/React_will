import React, { Component } from "react";

import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage,
  FlatList
} from "react-native";

const AUTH_TOKEN = "auth_token";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.getPosts();
  }
  async getPosts() {
    // this.setState({showProgress: true})
    let auth_token = await AsyncStorage.getpost(AUTH_TOKEN);
    this.setState({ loading: true });
    fetch("https://rankss.herokuapp.com/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Access: auth_token
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          loading: false,
          data: posts
        });
        this.arrayholder = response.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(post => {
      const postData = `${post.title.toLowerCase()} ${post.body.toLowerCase()}`;
      const textData = text.toLowerCase();
      return postData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
  };

  renderHeader = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.inputContainer}
          placeholder="Search"
          //onChangeText={this.props.onChangeText}
          onChangeText={text => this.searchFilterFunction(text)}
          //value={this.props.searchText}
          //onSubmit={this.handleSubmit}
        />

        <TouchableOpacity onPress={this.props.onSearch}>
          <Text>Search</Text>
        </TouchableOpacity>
        {this.props.renderResults
          ? this.props.renderResults(this.state.q)
          : this.props.children}
      </View>
    );
  };
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignposts: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderpost={({ post }) => (
            <View
              title={`${post.title} ${post.body}`}
              thumb={{ uri: post.images.thumb }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={post => post.id}
          postSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

// render() {
// return (
// <View style={styles.searchContainer}>
// <TextInput
//  underlineColorAndroid="transparent"
//style={styles.inputContainer}
// placeholder="Search"
// onChangeText={this.props.onChangeText}
// value={this.props.searchText}
// onChangeQuery={this._handleChangeQuery}
// onSubmit={this._handleSubmit}
///>

//<TouchableOpacity onPress={this.props.onSearch}>
// <Text>Search</Text>
//</TouchableOpacity>
//{this.props.renderResults
//? this.props.renderResults(this.state.q)
//: this.props.children}
//</View>
//);
//  }
//}

const styles = {
  searchContainer: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    paddingBottom: 13,
    paddingTop: 13,
    flexDirection: "row",
    overflow: "hidden"
  },
  input: {
    marginLeft: 6
  },
  inputContainer: {
    borderBottomWidth: 0,
    width: "80%",
    backgroundColor: "#dcdce1",
    borderRadius: 9,
    height: 36,
    marginLeft: 15,
    marginRight: 15
  },
  rightIconContainerStyle: {
    marginRight: 8
  },
  leftIconContainerStyle: {
    marginLeft: 8
  }
};

export default SearchBar;
