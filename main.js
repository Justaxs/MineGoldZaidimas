import zaidimoAtvaizdavimas from './modules/turinioAtvaizdavimas.js';
import { uzkrautiParduotuvesPrekes, parduotiAuksa } from './modules/parduotuvesFunkcijos.js';
import { atnaujintiEnergijaIrAuksa, auksoKasimas, perkrautiEnergija } from './modules/kasimoFunkcijos.js';

document.querySelector('#kasimoMygtukas').addEventListener('click', function () {
    zaidimoAtvaizdavimas('kasimas');
});

document.querySelector('#parduotuvesMygtukas').addEventListener('click', function () {
    zaidimoAtvaizdavimas('parduotuve');
});

document.querySelector('.pardavimoMygtukas').addEventListener('click', parduotiAuksa);

document.querySelector('.kasimoMygtukas').addEventListener('click', auksoKasimas);

setInterval(perkrautiEnergija, 60000);

atnaujintiEnergijaIrAuksa();

uzkrautiParduotuvesPrekes();

