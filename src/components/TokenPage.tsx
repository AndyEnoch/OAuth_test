import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { oauthConfig } from "../config/oauthConfig";

const TokenPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const code = searchParams.get("code");
      const verifier = sessionStorage.getItem("code_verifier");

      if (code && verifier) {
        try {
          const response = await axios.post(oauthConfig.tokenEndpoint, {
            client_id: oauthConfig.clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: oauthConfig.redirectUri,
            code_verifier: verifier,
            scope: "profile email address",
          });

          const { access_token } = response.data;
          sessionStorage.setItem("access_token", access_token);
          navigate("/authenticated");
        } catch (error) {
          console.error("Error exchanging token:", error);
        }
      }
    };

    fetchToken();
  }, [searchParams, navigate]);

  return <h1>Processing OAuth2 Token...</h1>;
};

export default TokenPage;
