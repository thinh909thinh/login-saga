import React from "react";
import { connect } from "react-redux";

import LoginForm from "./components/LoginForm";
import SecretPage from "./components/SecretPage";

const App = ({ isLoggedIn, pendingLogin, user, onSubmit, onLogout }) => (
  <>
    {(!isLoggedIn && <LoginForm pendingLogin={pendingLogin} />) || (
      <SecretPage />
    )}
    {pendingLogin && <p style={{ textAlign: "center" }}>Please wait...</p>}
  </>
);

const mapStateToProps = ({ isLoggedIn, pendingLogin, user }) => ({
  isLoggedIn,
  pendingLogin,
  user,
});

export default connect(mapStateToProps)(App);
