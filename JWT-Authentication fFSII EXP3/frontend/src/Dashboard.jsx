import { useEffect } from "react";
import axios from "axios";

function Dashboard() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.get("http://localhost:5000/api/auth/dashboard", {
          headers: {
            Authorization: token,
          },
        });
      } catch (err) {
        alert("Unauthorized");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Welcome to Dashboard</h1>
    </div>
  );
}

export default Dashboard;