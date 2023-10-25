"use client";

import React from "react";
import { Box, Input } from "@mui/material";
import Button from "@mui/material/Button";
import Navbar from "@/components/Navigation/Navbar";

function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  let user_id = 0;

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.status === "success") {
        user_id = data.id;
        window.location.href = data.redirect;
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("Response from server:", data);

      if (data.status === "success") {
        user_id = data.id;
        window.location.href = data.redirect;
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/guest/");
      const data = await response.json();
      user_id = data.id;
      window.location.href = data.redirect;
    } catch (error) {
      console.error("Error during guest login:", error);
      console.log(user_id);
      // this is here just to use user_id so there are no errors
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "10%",
        }}
      >
        <div>
          <p> Username </p>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ bgcolor: "text.disabled", height: 50, width: 300 }}
          />
        </div>
        <div style={{ padding: "4%" }}>
          <p> Password </p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ bgcolor: "text.disabled", height: 50, width: 300 }}
          />
        </div>
        <Button
          onClick={handleLogin}
          sx={{ height: 50, width: 100, border: "1px solid grey" }}
        >
          Login
        </Button>
        <Button onClick={handleRegister} sx={{ padding: "4%" }}>
          Register user
        </Button>
        <Button onClick={handleGuestLogin} sx={{ padding: "4%" }}>
          Enter as guest
        </Button>
      </Box>
    </div>
  );
}

export default LoginPage;
