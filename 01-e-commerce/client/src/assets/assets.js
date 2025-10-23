import hero from './images/hero.jpg';

import aerospace from "./images/categories/aerospace.jpg";
import energy from './images/categories/energy.jpg';
import housing from './images/categories/housing.jpg';
import hpAuto from './images/categories/hpAuto.jpg';
import industrialTooling from './images/categories/industrialTooling.jpg';
import medical from './images/categories/medical.jpg';



export const assets = {
    hero
}





// Categories ,
// Aerospace & Defence
// Medical & Implants
// High-Performance Automotive
// Industrial Tooling & Molds
// Electronics & Housings
// Energy & Fluid Control
export const categories = [
    {
        id: 1,
        name: "Aerospace & Defence",
        image: aerospace,
        href: "/aerospace"
    },
    {
        id: 2,
        name: "Medical & Implants",
        image: medical,
        href: "/medical"
    },
    {
        id: 3,
        name: "High-Performance Automotive",
        image: hpAuto,
        href: "/hp-auto"
    },
    {
        id: 4,
        name: "Industrial Tooling & Molds",
        image: industrialTooling,
        href: "/industrial-tooling"
    },
    {
        id: 5,
        name: "Electronics & Housings",
        image: housing,
        href: "/housing"
    },
    {
        id: 6,
        name: "Energy & Fluid Control",
        image: energy,
        href: "/energy"
    }
];
