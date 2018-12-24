import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView } from "react-native";
import { Card, Button, CardSection } from "../components";
import Pagination from "../components/Pagination";
import axios from "axios";

const AUTH_TOKEN = "auth_token";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //isLogged: "",
      //showProgress: false,
      authToken: "",
      posts: [],
      page: 1,
      pages: 0
    };
  }

  componentDidMount() {
    // this.getToken();
    axios
      .get("https://rankss.herokuapp.com/posts")
      .then(response => this.setState({ posts: response.data.posts }));
  }

  async getToken() {
    try {
      let authToken = await AsyncStorage.getItem(AUTH_TOKEN);
      if (!authToken) {
        this.props.navigation.navigate("Logout");
      } else {
        this.setState({ authToken: authToken });
        //this.setState({ isLogged: true });
      }
    } catch (error) {
      console.log("Something went wrong");
      this.props.navigation.navigate("Logout");
    }
  }

  onPostShow = post => {
    this.props.navigation.navigate("PostShow", { post });
  };

  render() {
    const { navigate } = this.props.navigation;
    var posts = this.state.posts.map(post => {
      return (
        <View key={post.id}>
          <Text onPress={() => this.onPostShow(post)}>{post.title}</Text>
        </View>
      );
    });

    return (
      <Card>
        <ScrollView>{posts}</ScrollView>
      </Card>
    );
  }
}

export default Home;
