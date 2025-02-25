"use client";
import React from 'react'
import Heading from '../(components)/Heading';


function page() {
    
  return (
    <div>
    <Heading title="Terms & Conditions"></Heading>
        <div className="pl-4">
        <p className="text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit fugit facere harum nemo 
        reprehenderit pariatur iste impedit reiciendis soluta ut consectetur ad numquam molestias in at, 
        veritatis voluptatem aspernatur laboriosam consequatur voluptates rem
         nostrum ea ipsa quae! Mianimi inima.</p>

         <details open>
            <summary className="text-bold hover:text-blue-500 text-md mt-2" style={{cursor: "pointer"}}>Item 1</summary>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, ducimus. Exercitationem facilis 
            ipsa quasi minima earum ipsum fuga aliquam. Molestias mollitia, tempora totam nemo corporis 
            necessitatibus nostrum quidem ipsam eligendi! Quidem provident, nostrum sequi repudiandae blanditiis
             fugit 
            quis dolorem impedit tempora aliquam ea, earum, id assumenda accusantium? Eaque, dolores architecto.</p>

         </details>

         <details close>
            <summary className="text-bold hover:text-blue-500 text-md mt-2" style={{cursor: "pointer"}}>Item 2</summary>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, ducimus. Exercitationem facilis 
            ipsa quasi minima earum ipsum fuga aliquam. Molestias mollitia, tempora totam nemo corporis 
            necessitatibus nostrum quidem ipsam eligendi! Quidem provident, nostrum sequi repudiandae blanditiis
             fugit 
            quis dolorem impedit tempora aliquam ea, earum, id assumenda accusantium? Eaque, dolores architecto.</p>

         </details>

         <details close>
            <summary className="text-bold text-blue-500 text-md mt-2" style={{cursor: "pointer"}}>Item 3</summary>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, ducimus. Exercitationem facilis 
            ipsa quasi minima earum ipsum fuga aliquam. Molestias mollitia, tempora totam nemo corporis 
            necessitatibus nostrum quidem ipsam eligendi! Quidem provident, nostrum sequi repudiandae blanditiis
             fugit 
            quis dolorem impedit tempora aliquam ea, earum, id assumenda accusantium? Eaque, dolores 
            architecto.</p>

         </details>


         
        </div>
    </div>
  )
}

export default page
