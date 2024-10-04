import axios from "axios";
import { useEffect, useState } from "react";

type PaymentMethod = {
  brand: string;
  funding: string;
  last4: string;
  exp_month: string;
  exp_year: string;
};

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country_id: string;
  postal_code: string;
  share_data: boolean;
  registered_on: string;
  subscribed: boolean;
  payment_method: PaymentMethod;
  login_link: string;
};

const AuthenticatedPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(
            "https://reverseti.liamsummers.co.uk/api/info",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching API data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <div style={styles.header}>
      <h1>{loading ? "Loading..." : "Authenticated Data"}</h1>
      {error ? (
        <div style={styles.error}>{error}</div>
      ) : userData ? (
        <div style={styles.card}>
          <h2>{`${userData.first_name} ${userData.last_name}`}</h2>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${userData.address1}, ${userData.address2}, ${userData.city}, ${userData.state}, ${userData.country_id}, ${userData.postal_code}`}
          </p>
          <p>
            <strong>Registered On:</strong>{" "}
            {new Date(userData.registered_on).toLocaleDateString()}
          </p>
          <p>
            <strong>Subscribed:</strong> {userData.subscribed ? "Yes" : "No"}
          </p>

          <h3>Payment Method</h3>
          <p>
            <strong>Brand:</strong> {userData.payment_method.brand}
          </p>
          <p>
            <strong>Funding:</strong> {userData.payment_method.funding}
          </p>
          <p>
            <strong>Last 4 digits:</strong> **** **** ****{" "}
            {userData.payment_method.last4}
          </p>
          <p>
            <strong>Expiry:</strong>{" "}
            {`${userData.payment_method.exp_month}/${userData.payment_method.exp_year}`}
          </p>

          <a href={userData.login_link} style={styles.link}>
            Login to account
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  header: {
    margin: "20px auto",
    width: "fit-content",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default AuthenticatedPage;
