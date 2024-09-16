import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const loggedData = useContext(UserContext);
  const navigate = useNavigate();

  const [userCreds, setUserCreds] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: "Dummy Msg"
  });

  function handleInput(event) {
    setUserCreds((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(userCreds);

    try {
      const response = await fetch("https://nutri-track.onrender.com/users"); // Fetch all users
      const users = await response.json();

      // Check if email exists in users
      const foundUser = users.find(
        (user) =>
          user.email === userCreds.email && user.password === userCreds.password
      );

      if (!foundUser) {
        // Email or password is incorrect
        setMessage({
          type: "error",
          text: "Incorrect email or password"
        });
        setTimeout(() => {
          setMessage({
            type: "invisible-msg",
            text: "Dummy Msg"
          });
        }, 5000);
      } else {
        // Login successful, save user to localStorage
        localStorage.setItem("nutrify-user", JSON.stringify(foundUser));
        loggedData.setLoggedUser(foundUser); // Set the context with the user
        navigate("/track"); // Redirect to the track page
      }
    } catch (err) {
      console.log(err);
      setMessage({
        type: "error",
        text: "An error occurred. Please try again."
      });
    }
  }

  return (
    <section className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login To Nutri-track</h1>

        <input
          className="inp"
          required
          type="email"
          onChange={handleInput}
          placeholder="Enter Email"
          name="email"
          value={userCreds.email}
        />

        <input
          className="inp"
          maxLength={8}
          type="password"
          onChange={handleInput}
          placeholder="Enter Password"
          name="password"
          value={userCreds.password}
        />

        <button className="btn">Login</button>

        <p>
          Don't Have an Account? <Link to="/register">Register Now</Link>
        </p>

        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
}
