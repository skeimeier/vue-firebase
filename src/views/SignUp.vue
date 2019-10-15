<template>
  <div class="sign-up">
    <v-form v-model="valid">
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 sm10 md8 lg6>
            <v-toolbar color="teal" dark>
              <div>
                <h3 class="headline mb-0">{{ $t("signUp") }}</h3>
              </div>
            </v-toolbar>
            <v-card class="sk-login">
              <v-text-field
                v-model="email"
                prepend-icon="person"
                :rules="[rules.required, rules.email]"
                type="text"
                name="input-10-1"
                label="Emailadresse"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Passwort"
                :hint="t_hint"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
              <v-card-actions>
                <v-layout justify-center>
                  <v-btn @click="signUp">{{ $t("btn.signUp") }}</v-btn>
                  <v-spacer></v-spacer>
                  <span>
                    {{ $t("auth.goBack") }}
                    <router-link to="/login">{{ $t("btn.login") }}</router-link>.
                  </span>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

 <script>
import firebase from "firebase";

export default {
  name: "signUp",
  data() {
    return {
      t_hint: this.$t("auth.min8chr"),
      show1: true,
      show2: false,
      email: "",
      password: "",
      valid: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        email: v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      }
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log("user:", user.email);
            this.$router.replace("home");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>


<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.v-card.sk-login {
  padding: 30px 30px 0px 30px;
}
</style>  
