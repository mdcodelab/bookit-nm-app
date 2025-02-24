"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { FaBuilding } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { PiBuildings } from "react-icons/pi";
import { TbBuildingStore, TbBuildingWarehouse } from "react-icons/tb";
import { HiBuildingLibrary } from "react-icons/hi2";

export function Accordeon() {
  const [openId, setOpenId] = useState(0);

  function handleToggle(id) {
    setOpenId((prevState) => (prevState === id ? null : id));
  }

  return (
    <div className="accordeon-wrapper">
      <details className="accordeon" open={openId === 0} onClick={() => handleToggle(0)}>
        <summary className="summary">
          <span className="icon"><FaBuilding /></span>
          <Image 
            src="/images/room-1.jpg" 
            className="img" 
            draggable="false" 
            alt="Room 1" 
            width={200} 
            height={400} 
          />
        </summary>
        <div className="details-content-wrapper">
          <h3>Grand Conference Hall</h3>
          <p>A spacious room with modern amenities, suitable for large conferences and events.</p>
        </div>
      </details>

      <details className="accordeon" open={openId === 1} onClick={() => handleToggle(1)}>
        <summary className="summary">
          <span className="icon"><BiBuildings /></span>
          <Image 
            src="/images/room-2.jpg" 
            className="img" 
            draggable="false" 
            alt="Room 2" 
            width={200} 
            height={400} 
          />
        </summary>
        <div className="details-content-wrapper">
          <h3>Executive Meeting Room</h3>
          <p>Ideal for executive meetings and small group discussions.</p>
        </div>
      </details>

      <details className="accordeon" open={openId === 2} onClick={() => handleToggle(2)}>
        <summary className="summary">
          <span className="icon"><PiBuildings /></span>
          <Image 
            src="/images/room-3.jpg" 
            className="img" 
            draggable="false" 
            alt="Room 3" 
            width={200} 
            height={400} 
          />
        </summary>
        <div className="details-content-wrapper">
          <h3>Creative Hub</h3>
          <p>Equipped with the latest technology, perfect for training sessions and workshops.</p>
        </div>
      </details>

      <details className="accordeon" open={openId === 3} onClick={() => handleToggle(3)}>
        <summary className="summary">
          <span className="icon"><TbBuildingStore /></span>
          <Image 
            src="/images/room-4.jpg" 
            className="img" 
            draggable="false" 
            alt="Room 4" 
            width={200} 
            height={400} 
          />
        </summary>
        <div className="details-content-wrapper">
          <h3>Training Room</h3>
          <p>A vibrant space designed for brainstorming sessions and creative workshops.</p>
        </div>
      </details>

      <details className="accordeon" open={openId === 4} onClick={() => handleToggle(4)}>
        <summary className="summary">
          <span className="icon"><FaBuilding /></span>
          <Image 
            src="/images/room-5.jpg" 
            className="img" 
            draggable="false" 
            alt="Room 5" 
            width={200} 
            height={400} 
          />
        </summary>
        <div className="details-content-wrapper">
          <h3>Quiet Meeting Room</h3>
          <p>A small, quiet space ideal for private meetings and interviews.</p>
        </div>
      </details>

      <details className="accordeon" open={openId === 5} onClick={() => handleToggle(5)}>
        <summary className="summary">
          <span className="icon"><HiBuildingLibrary /></span>
          <Image 
            src="/images/large_conference.jpg" 
            className="img" 
            draggable="false" 
            alt="Large Conference Room" 
            width={200} 
            height={400} 
          />
        </summary>
        <div className="details-content-wrapper">
          <h3>Conference Hall</h3>
          <p>A small, quiet space ideal for private meetings and interviews.</p>
        </div>
      </details>

      
    </div>
  );
}
