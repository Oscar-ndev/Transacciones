import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navegacion() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-2">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <i className="bi bi-house-door me-2"></i>
                    Inicio
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="d-flex flex-column flex-lg-row gap-2 w-100 justify-content-lg-end">
                        <NavLink
                            to="/transacciones"
                            className={({isActive}) => 
                                `btn rounded-pill px-3 ${isActive ? 
                                'bg-white text-primary fw-bold' : 
                                'text-white bg-primary bg-opacity-10 hover-bg-opacity-25'}`
                            }
                        >
                            <i className="bi bi-credit-card me-2"></i>
                            Transacciones
                        </NavLink>

                        <NavLink
                            to="/estatus"
                            className={({isActive}) => 
                                `btn rounded-pill px-3 ${isActive ? 
                                'bg-white text-primary fw-bold' : 
                                'text-white bg-primary bg-opacity-10 hover-bg-opacity-25'}`
                            }
                        >
                            <i className="bi bi-toggle-on me-2"></i>
                            Cambiar Estatus
                        </NavLink>

                        <NavLink
                            to="/referencia"
                            className={({isActive}) => 
                                `btn rounded-pill px-3 ${isActive ? 
                                'bg-white text-primary fw-bold' : 
                                'text-white bg-primary bg-opacity-10 hover-bg-opacity-25'}`
                            }
                        >
                            <i className="bi bi-search me-2"></i>
                            Buscar Referencia
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
