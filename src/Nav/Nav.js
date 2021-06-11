import React from 'react'
import "./nav-bar.css"
export default function Navbar() {
    return (
        <div className="col-lg-1 col-12 menu d-sm-flex d-flex d-lg-block justify-content-center align-items-center">
            <div><i className="fas fa-home icon mt-lg-4"></i></div>
            <div><i className="far fa-user icon"></i></div>
            <div><i className="fas fa-map-marker-alt icon d-none d-sm-block"></i></div>
            <div><i className="fas fa-th icon"></i></div>
            <div style={{color:"rgb(216, 197, 75)"}}><i className="fas fa-cloud icon "></i></div>
            <div><i className="fas fa-cog icon"></i></div>
        </div>
    )
}





