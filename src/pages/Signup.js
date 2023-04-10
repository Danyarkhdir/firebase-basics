import React, { useState } from "react";
import {
  getAuth,
  //   createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database } from "../firebaseConfig";

export default function Signup() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collectionRef = collection(database, "users");
  const handleSubmit = (event) => {
    event.preventDefault();
    addDoc(collectionRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
      .then(() => {
        alert("User added successfully");
      })
      .catch((error) => {
        alert(error.message);
      });

    // ---------  Authentication with firebase  ---------
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((response) => {
    //     console.log(`User { ${response.user.email} } created`);
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     console.log(`User can not create because =>  ${error.message} `);
    //   });
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((response) => {
    //     console.log(`User { ${response.user.email} } created`);
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     console.log(`User can not create because =>  ${error.message} `);
    //   });
  };
  const [isLoading, setIsLoading] = useState(false);

  function handleGoogleSignin() {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(`User ${response.user.email} signed in successfully`);
        navigate("/");
        console.log("Responsee : ");
        console.log(response.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`User can not sign in because =>  ${error.message}`);
        setIsLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mt-7">
                <button
                  onClick={handleGoogleSignin}
                  disabled={isLoading}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8dUf_k1neAIDIeONRJUtqL6kpjf2y0EstWvY9JHw_A&s"
                    alt="Google Logo"
                    className="w-5 h-5 mr-2"
                  />
                  {isLoading ? "Signing up..." : "Sign up with Google"}
                </button>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
