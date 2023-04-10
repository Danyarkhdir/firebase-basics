import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const collectionRef = collection(database, "users");
  useEffect(() => {
    // ---------  view data from firebase  ---------
    getDocs(collectionRef)
      .then((response) => {
        setUsers(
          response.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [collectionRef]);

  const updateData = (id) => {
    const docToUpdate = doc(database, "users", id);
    updateDoc(docToUpdate, {
      firstName: "ahmad",
      lastName: "ben",
      email: "ahmed@gmail.com",
      password: "123456",
    })
      .then(() => {
        alert("name updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const deleteData = (id) => {
    const docToDelete = doc(database, "users", id);
    deleteDoc(docToDelete)
      .then(() => {
        alert("User deleted successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="py-12 bg-gray-100 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          User List
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ul className="border border-gray-200 divide-y divide-gray-200 rounded-md">
            {users.map((user) => (
              <li
                key={user.id}
                className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
              >
                <div className="w-0 flex-1 flex items-center">
                  <span className="ml-2 flex-1 w-0 truncate">
                    {user.firstName}
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => {
                      updateData(user.id);
                    }}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Update
                  </button>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => {
                      deleteData(user.id);
                    }}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
