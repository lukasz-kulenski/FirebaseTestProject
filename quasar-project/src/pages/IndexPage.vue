<template>
  <q-page class="flex flex-center column q-gutter-xl q-py-md">
    <div class="column text-center q-gutter-md">
      <span class="text-h6">Register Section</span>
      <q-input
        outlined
        rounded
        dense
        label="Email"
        v-model="registerForm.email"
      />
      <q-input
        outlined
        rounded
        dense
        label="Password"
        v-model="registerForm.password"
      />

      <q-btn
        @click="firebaseRegister"
        flat
        dense
        rounded
        label="Register"
        class="bg-primary text-white"
      />
    </div>

    <div class="column text-center q-gutter-md">
      <span class="text-h6">Login Section</span>
      <q-input outlined rounded dense label="Email" v-model="loginForm.email" />
      <q-input
        outlined
        rounded
        dense
        label="Password"
        v-model="loginForm.password"
      />

      <q-btn
        @click="firebaseLogin"
        flat
        dense
        rounded
        label="Login"
        class="bg-primary text-white"
      />

      <q-btn
        @click="firebaseLogout"
        flat
        dense
        rounded
        label="Logout"
        class="bg-primary text-white"
      />
    </div>

    <div class="column text-center q-gutter-md">
      <span class="text-h6">Change Email Section</span>
      <q-input
        outlined
        rounded
        dense
        label="Current password"
        v-model="changeEmailVariable.currentPassword"
      />
      <q-input
        outlined
        rounded
        dense
        label="New email"
        v-model="changeEmailVariable.newEmail"
      />

      <q-btn
        @click="firebaseChangeEmail"
        flat
        dense
        rounded
        label="Change Email"
        class="bg-primary text-white"
      />
    </div>

    <div class="column text-center q-gutter-md">
      <span class="text-h6">Change Password Section</span>
      <q-input
        outlined
        rounded
        dense
        label="Current password"
        v-model="changePasswordVariable.currentPassword"
      />
      <q-input
        outlined
        rounded
        dense
        label="New password"
        v-model="changePasswordVariable.newPassword"
      />

      <q-btn
        @click="firebaseChangePassword"
        flat
        dense
        rounded
        label="Change Password"
        class="bg-primary text-white"
      />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { auth } from "src/boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";

const registerForm = ref({
  email: "",
  password: "",
});

const firebaseRegister = () => {
  createUserWithEmailAndPassword(
    auth,
    registerForm.value.email,
    registerForm.value.password
  )
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user registered");

      sendEmailVerification(auth.currentUser).then(() => {
        console.log("email verification sent");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error: ", error);
    });
};

const loginForm = ref({
  email: "",
  password: "",
});

const firebaseLogin = () => {
  signInWithEmailAndPassword(
    auth,
    loginForm.value.email,
    loginForm.value.password
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("login method: signed in");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("login method: error: ", error);
    });
};

const firebaseLogout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log("error: ", error);
    });
};

const firebaseAuthStateChanged = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("auth state changed: user signed in");
      const uid = user.uid;
    } else {
      console.log("auth state changed: user signed out");
    }
  });
};

const changePasswordVariable = ref({
  currentPassword: "",
  newPassword: "",
});

const firebaseChangePassword = () => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(
    user.email,
    changePasswordVariable.value.currentPassword
  );

  reauthenticateWithCredential(user, credential)
    .then(() => {
      console.log("User re-authenticated");

      updatePassword(user, changePasswordVariable.value.newPassword)
        .then(() => {
          console.log("password updated");
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    })
    .catch((error) => {
      console.log("re auth error: ", error);
    });
};

const changeEmailVariable = ref({
  currentPassword: "",
  newEmail: "",
});

const firebaseChangeEmail = () => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(
    user.email,
    changeEmailVariable.value.currentPassword
  );

  reauthenticateWithCredential(user, credential)
    .then(() => {
      console.log("User re-authenticated");

      updateEmail(user, changeEmailVariable.value.newEmail)
        .then(() => {
          console.log("email updated");
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    })
    .catch((error) => {
      console.log("re auth error: ", error);
    });
};

onMounted(() => {
  firebaseAuthStateChanged();
});
</script>