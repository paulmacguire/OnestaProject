"use client"; // No se por qué tuve que poner esto para que pueda funcionar el useEffect.
import { useEffect, useState } from "react";

export default function Home() {
  const [frutasInfo, setFrutasInfo] = useState([]);
  const [cosechasInfo, setCosechasInfo] = useState([]);
  const [growers, setGrowers] = useState([]);
  const [selectedGrower, setSelectedGrower] = useState(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("https://testapi.onesta.farm/v1/commodities/")
      .then((response) => response.json())
      .then((data) => {
        setFrutasInfo(data.commodities);
      });
  }, []);

  useEffect(() => {
    fetch("https://testapi.onesta.farm/v1/harvests/")
      .then((response) => response.json())
      .then((data) => {
        setCosechasInfo(data.harvests);
      });
  }, []);

  useEffect(() => {
    fetch("https://testapi.onesta.farm/v1/growers/")
      .then((response) => response.json())
      .then((data) => {
        setGrowers(data.growers);
      });
  }, []);

  useEffect(() => {
    fetch("https://testapi.onesta.farm/v1/clients/")
      .then((response) => response.json())
      .then((data) => {
        setClientes(data.clients);
      });
  }, []);

  const cosechasDict = {};

  cosechasInfo.forEach((cosecha) => {
    const { id, grower, farm, client, commodity, variety } = cosecha;

    const data = {
      cliente: {
        name: client.name,
        lastName: client.lastName,
        email: client.email,
      },
      commodity: {
        name: commodity.name,
      },
      farm: {
        name: farm.name,
        address: farm.address,
      },
      grower: {
        name: grower.name,
        lastName: grower.lastName,
        email: grower.email,
      },
      variety: {
        name: variety.name,
      },
    };

    cosechasDict[id] = data;
  });

  // Objeto con las variedades de cada fruta
  const variedadesDict = frutasInfo.reduce((dict, fruta) => {
    const { name, varieties } = fruta;
    dict[name] = varieties.map((variedad) => variedad.name);
    return dict;
  }, {});


  // Función para manejar el click en un agricultor	
  const handleGrowerClick = (grower) => {
    setSelectedGrower(grower);
  };

  // Función para obtener las cosechas asociadas a un cliente específico
  const getCosechasPorCliente = (cliente) => {
    const cosechasPorCliente = {};
    Object.entries(cosechasDict).forEach(([cosechaId, cosecha]) => {
      const cosechaCliente = cosecha.cliente;
      if (
        cosechaCliente.name === cliente.name &&
        cosechaCliente.lastName === cliente.lastName
      ) {
        cosechasPorCliente[cosechaId] = cosecha;
      }
    });
    return cosechasPorCliente;
  };

  return (
    <div>
      <h1 className="text-4xl font-madera text-center flex justify-center items-center my-6">
        ¡Bienvenido a la página de frutas!
      </h1>
      <h2 className="text-3xl font-madera flex mx-4 my-6">
        Apartado de frutas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-4 mx-4">
        {Object.keys(variedadesDict).length !== 0 ? (
          Object.keys(variedadesDict).map((fruta) => (
            <div key={fruta}>
              <h2 className="text-2xl font-madera">{fruta}</h2>
              <div className="py-4">
                <div className="w-64">
                  <div className="bg-gray-50 p-5 rounded-xl hover:scale-110 cursor-pointer transition-transform duration-300">
                    <img src="/frutas/frutas.jpg" alt="" />
                  </div>
                  <h3 className="font-madera">Variedades:</h3>
                  {variedadesDict[fruta].map((variedad) => (
                    <li
                      className="font-hs-regular text-base text-gray-500 my-2 ml-4"
                      key={variedad}
                    >
                      {variedad}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-3xl font-madera flex mx-4 my-6">
            Apartado de growers
          </h2>
          <table className="mx-auto bg-gray-50 border border-gray-300 rounded">
            <thead className="font-madera bg-blue-50 border-b-2 border-blue-200">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody className="font-hs-regular">
              {growers.length !== 0 ? (
                growers.map((grower) => (
                  <tr
                    key={grower.id}
                    className={`${
                      selectedGrower && selectedGrower.id === grower.id
                        ? "bg-gray-200"
                        : "bg-gray-50"
                    }`}
                    onClick={() => handleGrowerClick(grower)}
                  >
                    <td className="text-gray-700 font-bold pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center hover:underline">
                      {grower.id}
                    </td>
                    <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                      {grower.name}
                    </td>
                    <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                      {grower.lastName}
                    </td>
                    <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                      {grower.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center "
                  >
                    Cargando...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedGrower && (
          <div className="flex-1 p-4 my-16">
            <h2 className="text-xl font-madera">
              Detalles del agricultor seleccionado:
            </h2>
            <p className="font-hs-regular text-base text-gray-700 my-2">
              Nombre: {selectedGrower.name}
            </p>
            <p className="font-hs-regular text-base text-gray-700 my-2">
              Apellido: {selectedGrower.lastName}
            </p>
            <p className="font-hs-regular text-base text-gray-700 my-2">
              Email: {selectedGrower.email}
            </p>
            <h3 className="text-lg font-madera my-2">Granjas asociadas:</h3>
            {selectedGrower.farms && selectedGrower.farms.length !== 0 ? (
              selectedGrower.farms.map((farm) => (
                <div
                  key={farm.id}
                  className="bg-gray-200 p-4 my-2 border border-gray-300 rounded"
                >
                  <p className="font-hs-regular text-base text-gray-700">
                    ID: {farm.id}
                  </p>
                  <p className="font-hs-regular text-base text-gray-700">
                    Dirección: {farm.address}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-hs-regular text-base text-gray-700 my-2">
                No hay granjas asociadas a este agricultor.
              </p>
            )}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-madera flex mx-4 my-6">
        Apartado de cosechas
      </h2>
      <table className="mx-auto bg-gray-50 bg-gray-50 border border-gray-300 rounded-lg">
        <thead className="font-madera bg-blue-50 border-b-2 border-blue-200">
          <tr>
            <th>ID</th>
            <th>Nombre Cliente</th>
            <th>Mail Cliente</th>
            <th>Nombre Cosecha</th>
            <th>Nombre Granja</th>
            <th>Dirección Granja</th>
            <th>Nombre Grower</th>
            <th>Variedades Cosecha</th>
          </tr>
        </thead>
        <tbody className="font-hs-regular">
          {Object.keys(cosechasDict).length !== 0 ? (
            Object.keys(cosechasDict).map((cosecha) => (
              <tr key={cosecha}>
                <td className="text-gray-700 font-bold pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center hover:underline">
                  {cosecha}
                </td>
                <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                  {cosechasDict[cosecha].cliente.name +
                    " " +
                    cosechasDict[cosecha].cliente.lastName}
                </td>
                <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                  {cosechasDict[cosecha].cliente.email}
                </td>
                <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                  {cosechasDict[cosecha].commodity.name}
                </td>
                <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                  {cosechasDict[cosecha].farm.name}
                </td>
                <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                  {cosechasDict[cosecha].farm.address}
                </td>
                <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                  {cosechasDict[cosecha].grower.name +
                    " " +
                    cosechasDict[cosecha].grower.lastName}
                </td>
                <td className="text-gray-700 pl-4 pr-4 pt-2 pb-2 text-center justify-center items-center ">
                  {cosechasDict[cosecha].variety.name}
                </td>
              </tr>
            ))
          ) : (
            <p>Cargando...</p>
          )}
        </tbody>
      </table>

      <div className="my-6 mx-4">
        <h2 className="text-3xl font-madera mb-6">Apartado de clientes</h2>
        {clientes.map((cliente) => (
          <div key={cliente.id} className="mb-6 border rounded-lg p-4">
            <h2 className="text-xl font-madera font-bold mb-2">
              {cliente.name} {cliente.lastName}
            </h2>
            <p>Email: {cliente.email}</p>
            <h3 className="text-lg font-madera mt-4">Cosechas asociadas:</h3>
            {Object.entries(getCosechasPorCliente(cliente)).map(
              ([cosechaId, cosecha]) => (
                <div key={cosechaId} className="border rounded p-2 mt-2 font-hs-regular">
                  <p>
                    <b>Commodity:</b> {cosecha.commodity.name}
                  </p>
                  <p>
                    <b>Farm:</b> {cosecha.farm.name} - {cosecha.farm.address}
                  </p>
                  <p>
                    <b>Grower:</b> {cosecha.grower.name} {cosecha.grower.lastName}
                  </p>
                  <p> <b>Variety:</b> {cosecha.variety.name}</p>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
