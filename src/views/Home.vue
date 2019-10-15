<template>
  <div class="home">
    <v-container>
      <!-- <v-btn @click="doUser">Benutzer anlegen</v-btn>
      <v-btn @click="doImport">Importieren</v-btn>
      -->
      <v-btn @click="getfilmDB" :loading="isLoading">get DB</v-btn>
      <v-form>
        <v-text-field prepend-icon="search" v-model="filterPattern" type="text"></v-text-field>
      </v-form>
      <div v-if="filme.length" class="h1">Hier kommen die {{ filme.length }} Filme</div>
      <v-data-table
        :headers="headers"
        :items="filme"
        :search="filterPattern"
        :expand="expand"
        class="elevation-3"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="v">
              <v-img :src="poster_sm(props.item.poster_path)" width="100px"></v-img>
            </td>
            <td class="teal--text text-darken-5 headline text-truncate">{{ props.item.origTitle }}</td>
            <td class="text-xs-center">{{ props.item.release_date }}</td>
            <td class="text-xs-center">{{ props.item.imdbRating }}</td>
            <td class="text-xs-left">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" dark small color="teal">
                    <v-icon dark small>launch</v-icon>
                  </v-btn>
                </template>
                <span>{{props.item.full_filename}}</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card flat>
            <v-card-text>{{ props.item.overview }}</v-card-text>
          </v-card>
        </template>
      </v-data-table>
      <!-- 
      <div v-if="tmdbinfo.length"> 
            <li v-for="film in filme" :key=film.fbID> 
                {{film.origTitle }} {{ releaseDate(film.tmdbID) }}
             <v-btn fab dark small color="teal">
                <v-icon dark>launch</v-icon>
            </v-btn> 
            </li>
       </div>     
      -->
    </v-container>
  </div>
</template>

<script>
//import firebase from "firebase/app";
//import "firebase/auth";
import firebase from "firebase";
import db from "@/firebase/init";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      currentUser: firebase.auth().currentUser,
      headers: [
        {
          text: "Poster",
          class: "teal--text title font-weight-black font-italic"
        },
        {
          text: "Filmtitel",
          align: "left",
          sortable: false,
          value: "origTitle",
          class: "text-truncate teal--text title font-weight-black font-italic"
        },
        {
          text: "Erscheinungsjahr",
          align: "center",
          value: "release_date",
          class: "teal--text title font-weight-black font-italic"
        },
        {
          text: "IMDB Bewertung",
          align: "center",
          value: "imdbRating",
          class: "teal--text title font-weight-black font-italic"
        },
        {
          text: "Detail",
          sortable: false,
          value: "id",
          class: "teal--text title font-weight-black font-italic"
        }
      ],

      filme: [],
      filmeShaddow: [],
      tmdbinfo: [],
      filterPattern: "",
      isLoading: false
    };
  },
  methods: {
    doUser: function() {
      console.log("aktueller User:", this.currentUser);
      db.collection("users")
        .where("uid", "==", this.currentUser.uid)
        .get()
        .then(() => {
          alert("user war schon angelegt");
        })
        .catch(() => {
          db.collection("users")
            .add({
              uid: this.currentUser.uid,
              email: this.currentUser.email
            })
            .then(() => {})
            .catch(err => {
              alert(err);
            });
        });
    },
    doImport: function() {
      axios
        .get("https://flimse-json-db.firebaseio.com/filme.json")
        .then(response => {
          return response.data;
        })
        .then(data => {
          var filmArray = [];
          for (let key in data) {
            data[key].fbID = key;
            filmArray.push(data[key]);
          }
          this.filme = filmArray;
        })
        .then(() => {
          console.log(this.filme.length);
          this.doExport();
        });
    },
    doExport: function() {
      this.filme.forEach((film, i) => {
        var tmdbInfo = {};

        if (i > 9) {
          tmdbInfo = film.info;

          delete film.info;
          film.userId = this.currentUser.uid;
          // db.collection('filme').add(film)
          //     .then( () => {

          //     })
          //     .catch(err => {
          //       alert(err)
          //     })
          var docRef = db.collection("tmdbinfo").doc(String(film.tmdbID));
          docRef.get().then(doc => {
            if (!doc.exists) {
              db.collection("tmdbinfo")
                .doc(String(film.tmdbID))
                .set(tmdbInfo)
                .then(() => {
                  console.log("tmdb hinzugefügt");
                })
                .catch(err => {
                  alert(err);
                });
            } else {
              console.log("tmdb war schon da");
            }
          });
        }
      });
    },
    getfilmDB: function() {
      this.isLoading = true;
      db.collection("tmdbinfo")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            var info = doc.data();
            info.id = doc.id;
            this.tmdbinfo.push(info);
          });
          console.log(this.tmdbinfo.length, "tmdbinfos");
          this.isLoading = false;
        });

      db.collection("filme")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            var film = doc.data();
            film.id = doc.id;
            film.release_date = this.releaseDate(film.tmdbID);
            film.overview = this.overview(film.tmdbID);
            this.filme.push(film);
          });
          this.filmeShaddow = this.filme;
          console.log(this.filme.length, "filme");
        });
    },
    doFilter: function() {
      this.filme = this.filmeShaddow;
      var filtered = this.filme.filter(film => {
        return film.origTitle.toLowerCase().includes(this.filterPattern);
      });
      this.filme = filtered;
    },
    releaseDate: function(id) {
      var n = this.tmdbinfo.findIndex(info => {
        return info.id == id;
      });
      if (this.tmdbinfo[n]) {
        return this.tmdbinfo[n].release_date
          ? this.tmdbinfo[n].release_date
          : "unknown";
      } else {
        return "unknown";
      }
    },
    overview: function(id) {
      var n = this.tmdbinfo.findIndex(info => {
        return info.id == id;
      });
      if (this.tmdbinfo[n]) {
        return this.tmdbinfo[n].overview
          ? this.tmdbinfo[n].overview
          : "unknown";
      } else {
        return "unknown";
      }
    },
    poster_sm: function(hash) {
      if (hash) {
        return "http://image.tmdb.org/t/p/w154" + hash;
      } else {
        return "";
      }
    }
  }
};
</script>

