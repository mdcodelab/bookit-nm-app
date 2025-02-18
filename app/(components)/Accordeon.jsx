"use client";
import React from 'react';
import { useState } from 'react';
import { FaBuilding } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { PiBuildings } from "react-icons/pi";
import { TbBuildingStore } from "react-icons/tb";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FaBuildingWheat } from "react-icons/fa6";
import { HiBuildingLibrary } from "react-icons/hi2";


function Accordeon() {
  const[openId, setOpenId]=useState(0);
  function handleToggle(id) {
    //e.preventDefault();
    setOpenId((prevState) => prevState == id ? id : null)
  }

  return (
    <div className="accordeon-wrapper">
    <details name="accordeon" id="details-1" className="accordeon" open={openId ===0} 
    onClick={()=>handleToggle(0)}>
      <summary className="summary">
        <span className="icon"><FaBuilding /></span>
        <img src="/images/room-1.jpg" className="img" draggable="false" alt="Room 1" />
      </summary>
      <div className="details-content-wrapper">
        <h3>Grand Conference Hall</h3>
        <p>A spacious room with modern amenities, suitable for large conferences and events.</p>
      </div>
    </details>

      <details className="accordeon">
        <summary className="summary" open={openId === 1} onClick={() => handleToggle(1)}>
        <span className="icon"><BiBuildings></BiBuildings></span>
        <img src="/images/room-2.jpg" className="img" draggable="false" alt="Room 2" />
        </summary>

        <div className="details-content-wrapper">
        <h3>Executive Meeting Room</h3>
        <p>Ideal for executive meetings and small group discussions.</p>
      </div>
      </details>

      <details className="accordeon">
        <summary className="summary" open={openId === 1} onClick={() => handleToggle(2)} >
        <span className="icon"><PiBuildings></PiBuildings></span>
        <img src="/images/room-3.jpg" className="img" draggable="false" alt="Room 3" />
        </summary>

        <div className="details-content-wrapper">
        <h3>Creative Hub</h3>
        <p>Equipped with the latest technology, perfect for training sessions and workshops.</p>
      </div>
      </details>

      <details className="accordeon">
        <summary className="summary" open={openId === 1} onClick={() => handleToggle(2)} >
        <span className="icon"><TbBuildingStore></TbBuildingStore></span>
        <img src="/images/room-4.jpg" className="img" draggable="false" alt="Room 4" />
        </summary>

        <div className="details-content-wrapper">
        <h3>Training Room</h3>
        <p>A vibrant space designed for brainstorming sessions and creative workshops.</p>
      </div>
      </details>

      <details className="accordeon">
        <summary className="summary" open={openId === 1} onClick={() => handleToggle(2)} >
        <span className="icon"><FaBuilding></FaBuilding></span>
        <img src="/images/room-5.jpg" className="img" draggable="false" alt="Room 5" />
        </summary>

        <div className="details-content-wrapper">
        <h3>Quiet Meeting Room</h3>
        <p>A small, quiet space ideal for private meetings and interviews.</p>
      </div>
      </details>

      <details className="accordeon">
        <summary className="summary" open={openId === 1} onClick={() => handleToggle(2)} >
        <span className="icon"><HiBuildingLibrary></HiBuildingLibrary></span>
        <img src="/images/large_conference.jpg" className="img" draggable="false" alt="Room 5" />
        </summary>

        <div className="details-content-wrapper">
        <h3>Conference Hall</h3>
        <p>A small, quiet space ideal for private meetings and interviews.</p>
      </div>
      </details>

      <details className="accordeon">
        <summary className="summary" open={openId === 1} onClick={() => handleToggle(2)} >
        <span className="icon"><FaBuildingWheat></FaBuildingWheat></span>
        <img src="/images/school.jpg" className="img" draggable="false" alt="Room 5" />
        </summary>

        <div className="details-content-wrapper">
        <h3>Conference Hall</h3>
        <p>It is ideal for schools and universities.</p>
      </div>
      </details>

  
    </div>
  )
}

export default Accordeon
