import React, { useState, useEffect } from "react";
import "../server";

export default function Vans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/vans/")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  // const vansElements = vans.map(van => {
  //   return (
  //     <div key={van.id} className="van-tile">
  //       <img src={van.imageUrl} alt={`${van.name}`}/>
  //       <div className="van-info">
  //         <h3>{van.name}</h3>
  //         <p>
  //           ${van.price}
  //           <span>/day</span>
  //         </p>
  //       </div>
  //       <i className={`van-type ${van.type} selected`}>{van.type}</i>
  //     </div>
  //   );
  // });

  return (
    <>
      <h1>Vans Page!</h1>
      {vansElements}
    </>
  );
}
