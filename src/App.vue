<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user" @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("menue.logout") }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left color="teal" dark>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-text-field flat v-if="loggedIn()" prepend-icon="person" readonly :value="user.email"></v-text-field>
        <v-btn v-if="loggedIn()" flat to="home">Home</v-btn>
        <v-btn v-if="loggedIn()" flat @click="logout">{{ $t("menue.logout") }}</v-btn>
        <v-btn v-if="!loggedIn()" flat to="login">{{ $t("menue.login") }}</v-btn>
        <v-btn v-if="!loggedIn()" flat to="sign-up">{{ $t("menue.signup") }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import "vuetify/dist/vuetify.min.css";
//import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: {},
      sideNav: false
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("user looged out");
          this.$router.replace("login");
        });
    },
    loggedIn: function() {
      //this.user = firebase.auth().currentUser;
      console.log("user: ", this.user.email);
      return this.user;
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: this.$t("menue.signup"), link: "sign-up" },
        { icon: "lock_open", title: this.$t("menue.login"), link: "login" }
      ];
      if (this.user) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "View Meetups",
            link: "/meetups"
          },
          { icon: "save_alt", title: "add file", link: "/filepicker" },
          { icon: "person", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    }
  }
};
</script>

<style>
</style>
