<template>
  
    
    <v-form v-model="valid">
      <v-container>
       <v-layout justify-center>
      
       <v-flex xs12 sm10 md8 lg6 >
          <v-toolbar color="teal" dark>
            <div>
              <h3 class="headline mb-0">
                {{ $t("signIn") }}
              </h3>
            </div>
        </v-toolbar>
        <v-card class="sk-login">
          <div >
          <v-text-field
                v-model="email"
                prepend-icon="person"
                :rules="[rules.required, rules.email]"
                type="email"
                name="input-10-1"
                label="Email"
                @click:append="show1 = !show1"
            ></v-text-field>
            </div>
            <div>
            <v-text-field
                v-model="password"
                prepend-icon="lock"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Passwort"
                :hint= "t_hint"
                counter
                placeholder="password"
                @click:append="show2 = !show2"
            ></v-text-field>
            </div>
          <v-card-actions>
            <v-layout justify-center> 
              <v-btn @click="login">{{ $t("btn.login") }}</v-btn>
              <v-spacer></v-spacer>           
              <p>{{ $t("auth.noAccout") }} <router-link to="/sign-up">{{$t("auth.create")}}</router-link></p>              
            </v-layout>
          </v-card-actions> 
        </v-card>
       </v-flex>
      </v-layout>
     
    </v-container>
    </v-form>
</template>

<script>
  import firebase from 'firebase';
  import app from "@/App";

  export default {
    name: 'login',
    data() {
      return {
        t_hint: this.$t("auth.min8chr"),
        show1: true,
        show2: false,
        valid: false,
        email: '',
        password: '',
        Messages: null,
        rules: {
          required: value => !!value || this.$t("auth.required"),
          min: v => v.length >= 8 || this.$t("auth.min8chr"),
          email: v => /.+@.+\..+/.test(v) || this.$t("auth.emailFormat") 
        }
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          () => {
            /*var dbRef = firebase.database().ref();
            dbRef.once("value")
              .then(function(snapshot) {
                  var key = snapshot.key; // null
                  var value = snapshot.val();
                  var childKey = snapshot.child("filme").key;
                  var childVal = snapshot.child("filme").val();
                  console.log("key:",key);
                  console.log("val:",value);
                  console.log(childKey);
                  console.log(childVal);
              });
            */
             // console.log("DB :",db.ref('filme').child("id/77"));
             app.loggedIn = true;
             this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
.v-card.sk-login{
    padding : 30px 30px 0px 30px 
  } 
</style>