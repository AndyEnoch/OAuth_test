import { useEffect, useState } from "react";
import { oauthConfig } from "../config/oauthConfig";
import { generateCodeVerifier, generateCodeChallenge } from "../utils/pkce";

const WelcomePage = () => {
  const [codeVerifier, setCodeVerifier] = useState("");

  useEffect(() => {
    const verifier = generateCodeVerifier();
    setCodeVerifier(verifier);
    sessionStorage.setItem("code_verifier", verifier);
  }, []);

  const loginWithOAuth = async () => {
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const authUrl = `${oauthConfig.authorizationEndpoint}?response_type=code&client_id=${oauthConfig.clientId}&redirect_uri=${oauthConfig.redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = authUrl;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the OAuth2 PKCE App</h1>
      <button style={styles.button} onClick={loginWithOAuth}>
        Login with OAuth2
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
};

export default WelcomePage;
