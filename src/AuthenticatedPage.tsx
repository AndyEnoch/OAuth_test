import axios from "axios";
import { useEffect, useState } from "react";

const AuthenticatedPage = () => {
  const [apiData, setApiData] = useState<any>(null);
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "https://reverseti.liamsummers.co.uk/api/info",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setApiData(response.data);
        } catch (error) {
          console.error("Error fetching API data:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Authenticated Data</h1>
      {apiData ? (
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AuthenticatedPage;
