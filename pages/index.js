import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  const users = [
    {
      username: 'admin',
      password: '123'
    },
  ];

  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = data;

  const checkUser = () => {
    const usercheck = users.find(user => (user.username === username && user.password === password));
    if (usercheck) {
      router.push("/calculator")
      console.log("Login successful");
    } else {
      console.log("Wrong password or username");
    }
  }

  const changeValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();

  }

  return (
  <>
<div style={{textAlign: 'center',padding:'22%'}}>
					<>
						<h3 >Login Form</h3>

				<form onSubmit={handleSubmit}>
				<div>
					<input
					type="text"
					name="username"
					value={username}
					placeholder="Enter Username"
					required
					onChange={changeValue}
					/>
				</div><br/>
				<div>
					<input
					type="password"
					name="password"
					value={password}
					placeholder="Enter Password"
					required
					onChange={changeValue}
					/>
				</div><br/>
				<div>
					<button type="submit" >
					Login Here
					</button>
				</div>
				</form>
				</>
				</div>    
        
  </>
  )
}
