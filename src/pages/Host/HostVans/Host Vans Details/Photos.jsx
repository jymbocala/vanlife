import React from "react";
import { useOutletContext } from "react-router-dom";


export default function Photos() {
  const {currentVan} = useOutletContext();

  return (
    <section className="host-van-detail__bottom">
      <img src={currentVan.imageUrl} className="host-van-detail-image" alt="" />
    </section>
  )
}