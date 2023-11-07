function atnaujintiEnergijaIrAuksa() {
    fetch('http://localhost:3000/zaidejas')
        .then(response => response.json())
        .then(duomenys => {
            // console.log(duomenys);
            const energija = document.querySelector('#energija');
            const auksoGabaleliai = document.querySelector('.auksoGabaleliai');
            energija.textContent = '';
            const energijosTekstas = document.createTextNode(`${duomenys.energija}`);
            energija.appendChild(energijosTekstas);

            auksoGabaleliai.textContent = '';
            duomenys.auksoGabaleliai.forEach(auksas => {

                const divasAuksui = document.createElement('div');
                divasAuksui.classList.add('auksas');

                const auksasHTML = document.createTextNode(`Gold: ${auksas}g`);
                divasAuksui.appendChild(auksasHTML);

                auksoGabaleliai.appendChild(divasAuksui);
            });
        });
}

function randomSkaicius() {
    return Math.random() * 0.9 + 0.1;
}

function energijosPanaudojimas() {
    return Math.ceil(Math.random() * 10);
}

function auksoKasimas() {

    fetch('http://localhost:3000/zaidejas')
        .then(response => response.json())
        .then(duomenys => {
            // console.log(duomenys.energija);
            if (duomenys.energija <= 0) {
                if (duomenys.neigiamaEnergija) {
                    alert("You don't have enough energy to dig!");
                    return;
                }
            }

            const energijosSunaudojimas = energijosPanaudojimas();
            const gaunamasAuksoKiekis = randomSkaicius();
            duomenys.auksoGabaleliai.push(gaunamasAuksoKiekis.toFixed(1));
            duomenys.energija -= energijosSunaudojimas;

            fetch('http://localhost:3000/zaidejas', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(duomenys)
            })
                .then(() => {
                    // console.log(duomenys);
                    const auksoGabaleliai = document.querySelector('.auksoGabaleliai');
                    const divasAuksui = document.createElement('div');
                    divasAuksui.classList.add('auksas');

                    const auksasTekstas = document.createTextNode(`Gold: ${gaunamasAuksoKiekis.toFixed(1)}g`);
                    divasAuksui.appendChild(auksasTekstas);
                    auksoGabaleliai.appendChild(divasAuksui);

                    const energijosAtnaujinimas = document.querySelector('#energija');
                    energijosAtnaujinimas.textContent = '';
                    const energijosTekstas = document.createTextNode(`${duomenys.energija}`);
                    energijosAtnaujinimas.appendChild(energijosTekstas);
                })
        })
}

function perkrautiEnergija() {
    fetch('http://localhost:3000/zaidejas')
        .then(response => response.json())
        .then(duomenys => {
            if (duomenys.energija > 100) {
                // console.log(duomenys.energija);
            } else {
                duomenys.energija = Math.min(duomenys.energija + 1, 100);
            }

            fetch('http://localhost:3000/zaidejas', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(duomenys)
            });
        })
        .then(() => {
            atnaujintiEnergijaIrAuksa();
        })
}


export { atnaujintiEnergijaIrAuksa, auksoKasimas, perkrautiEnergija }