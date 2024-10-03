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
    const authUrl = `${oauthConfig.authorizationEndpoint}?response_type=code&client_id=${oauthConfig.clientId}&redirect_uri=${oauthConfig.redirectUri}&scope=${oauthConfig.scopes}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Welcome to the OAuth2 PKCE App</h1>
      <button onClick={loginWithOAuth}>Login with OAuth2</button>
    </div>
  );
};

export default WelcomePage;
