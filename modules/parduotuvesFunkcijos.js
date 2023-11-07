import { atnaujintiEnergijaIrAuksa } from './kasimoFunkcijos.js';

function prekiuSukurimas(parduotuvesPrekes) {

    parduotuvesPrekes.forEach(preke => {
        // console.log(preke);
        const prekiuDivas = document.createElement('div');
        prekiuDivas.classList.add('energijosPaketas');

        const prekesPavadinimas = document.createElement('h3');
        const prekesPavadinimsHTML = document.createTextNode(`${preke.energija} energy`);
        prekesPavadinimas.appendChild(prekesPavadinimsHTML);

        const prekesKaina = document.createElement('span');
        const prekesKainaHTML = document.createTextNode(`price: ${preke.kaina}`);
        prekesKaina.appendChild(prekesKainaHTML);

        const pirkimoMygtukas = document.createElement('button');
        const pirkimoMygtukasHTML = document.createTextNode('Buy');
        pirkimoMygtukas.appendChild(pirkimoMygtukasHTML);
        pirkimoMygtukas.classList.add('pirkimoMygtukas');
        pirkimoMygtukas.addEventListener('click', () => prekesPirkimas(preke));

        prekiuDivas.append(prekesPavadinimas, prekesKaina, pirkimoMygtukas);
        document.querySelector('.parduotuvesPrekes').appendChild(prekiuDivas);
    });
}

export default function uzkrautiParduotuvesPrekes() {
    fetch('http://localhost:3000/parduotuve')
        .then(response => response.json())
        .then(duomenys => {
            // console.log(duomenys);
            const parduotuvesPrekes = Object.values(duomenys);
            prekiuSukurimas(parduotuvesPrekes);
        })
}

function prekesPirkimas(preke) {
    fetch('http://localhost:3000/zaidejas')
        .then(response => response.json())
        .then(zaidejas => {
            // console.log(zaidejas);
            if (zaidejas.pinigai >= preke.kaina) {
                zaidejas.energija += preke.energija;
                zaidejas.pinigai -= preke.kaina;

                return fetch('http://localhost:3000/zaidejas', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(zaidejas)
                });
            } else {
                console.log(preke);
                alert('Not enough money!');
            }
        })
        .then(response => response.json())
        .then(atnaujintiZaideja => {
            // console.log(atnaujintiZaideja);
            atnaujintiEnergijaIrAuksa();
            atnaujintiPinigus(atnaujintiZaideja.pinigai);

            alert(`You have successfully purchased ${preke.energija} energy for ${preke.kaina}$!`);
        })
}

function parduotiAuksa() {
    fetch('http://localhost:3000/zaidejas')
        .then(response => response.json())
        .then(duomenys => {
            const visoAukso = duomenys.auksoGabaleliai.reduce((accumulator, value) => accumulator + parseFloat(value), 0);

            if (visoAukso > 0) {
                const uzdarbis = Math.round(visoAukso * 30);
                duomenys.pinigai += uzdarbis;
                duomenys.auksoGabaleliai = [];

                fetch('http://localhost:3000/zaidejas', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(duomenys)
                })
                    .then(() => {
                        const zaidimoPinigai = document.querySelectorAll('.visiPinigai');
                        zaidimoPinigai.forEach(pinigai => {
                            pinigai.textContent = `${duomenys.pinigai}$`;
                        });
                        const auksas = document.querySelector('.auksoGabaleliai');
                        auksas.textContent = '';
                        alert(`You've sold all your gold for ${uzdarbis}$!`);
                    });
            } else {
                alert(`You don't have gold, come back later!`);
            }
        });
}

function atnaujintiPinigus(naujaPiniguReiksme) {
    const zaidimoPinigai = document.querySelectorAll('.visiPinigai');
    zaidimoPinigai.forEach(pinigai => {
        pinigai.textContent = '';
        const atnaujintiPinigai = document.createTextNode(`${naujaPiniguReiksme}$`);
        pinigai.appendChild(atnaujintiPinigai);
        // console.log(naujaPiniguReiksme);
    });
}

export { uzkrautiParduotuvesPrekes, parduotiAuksa }