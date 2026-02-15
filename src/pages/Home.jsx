import { useState } from "react";
import Insignia from "../components/insignia";
import UsersList from "../components/UsersList";
import CreateUser from "../components/CreateUser";

function Home() {
  const [credentials, setCredentials] = useState({
    username: "Antonio López",
    password: "password123",
    role: "administrador",
  });

  return (
    <div className="min-h-screen w-[95%] mx-auto py-8 flex flex-col gap-8">
      <div className="text-center ">
        <h1 className="text-4xl font-bold">Proyecto del módulo de programación de aplicaciones utilizando frameworks</h1>
        <p className="text-sm text-gray-600 mt-2">Usuario: {credentials.username} | Rol: {credentials.role}</p>
        <Insignia />
      </div>
      <div>
        <UsersList credentials={credentials} />
      </div>
      <div>
        <CreateUser credentials={credentials} />
      </div>
    </div>
  );
}

export default Home;
