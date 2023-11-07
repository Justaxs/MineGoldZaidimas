export default function zaidimoAtvaizdavimas(turinys) {
    const kasimoPuslapis = document.querySelector('#kasimas');
    const parduotuvesPuslapis = document.querySelector('#parduotuve');
    const pardavimoMygtukas = document.querySelector('#auksoPardavimas');

    kasimoPuslapis.style.display = 'none';
    parduotuvesPuslapis.style.display = 'none';
    pardavimoMygtukas.style.display = 'none';

    if (turinys === 'kasimas') {
        kasimoPuslapis.style.display = 'block';
    } else if (turinys === 'parduotuve') {
        parduotuvesPuslapis.style.display = 'block';
        pardavimoMygtukas.style.display = 'block';
    }
}

fetch('http://localhost:3000/zaidejas')
    .then(response => response.json())
    .then(duomenys => {
        // console.log(duomenys);
        const visiPinigai = document.querySelectorAll('.visiPinigai');
        visiPinigai.forEach(pinigai => {
            // console.log(pinigai);
            const piniguTekstas = document.createTextNode(`${duomenys.pinigai}$`);
            pinigai.appendChild(piniguTekstas);
        });
    });