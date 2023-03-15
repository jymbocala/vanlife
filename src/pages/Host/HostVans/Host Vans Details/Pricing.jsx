import React from "react";
import { useOutletContext } from "react-router-dom";


export default function Pricing() {
  const {currentVan} = useOutletContext();

  return (
    <section className="host-van-detail__bottom">
      <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    </section>
  )
}