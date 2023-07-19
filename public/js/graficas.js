const URL_ENDPOINT_1 = 'https://rest-api-cropshield-production.up.railway.app/api/analisis-semana/';

const user = document.getElementById('usuarioId').textContent;

getGrafico1();

async function getGrafico1() {

    const userId = user
    const response = await fetch(`${URL_ENDPOINT_1}${userId}`);
    const data = await response.json();
    length = data.data.length;

    semanas = [];
    plantas = [];
    for (i = 0; i < length; i++) {
        semanas.push(data.data[i].semana);
        plantas.push(data.data[i].plantas_enfermas);
    }

    new Chart(document.getElementById("myChart1"), {
        type: 'line',
        data: {
            labels: semanas,
            datasets: [
                {
                    label: "Plantas Enfermas",
                    data: plantas,
                    borderColor: ["#FADBD8"],
                    backgroundColor: ["#FDEDEC"],
                    fill: false,
                    borderWidth: 3,
                    borderCapStyle: 'round',
                    borderJoinStyle: 'round',
                    pointBorderColor: ["#F1948A"],
                    pointBackgroundColor: '#F1948A',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: ["#FADBD8"],
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 20,
                    pointStyle: 'circle',
                }
            ]
        },
        options: {
            responsive: true,
            // scales: {
            //     yAxes: [{
            //         display: true,
            //         ticks: {
            //             min:-1,
            //         }
            //     }]
            // },
            plugins: {
                filler: {
                    propagate: false,
                },
                title: {
                    display: true,
                    text: 'Presencia de Trips'
                }
            },
        },
    });
}

const URL_ENDPOINT_2 = 'https://rest-api-cropshield-production.up.railway.app/api/analisis-clase/';
getGrafico2();

async function getGrafico2() {
    const userId = user;
    const response = await fetch(`${URL_ENDPOINT_2}${userId}`);
    const data = await response.json();
    length = data.data.length;

    plantaSana = [];
    plantaEnferma = [];
    for (i = 0; i < length; i++) {
        plantaSana.push(data.data[i].numero_datos_saludables);
        plantaEnferma.push(data.data[i].numero_datos_enfermas);
    }

    new Chart(document.getElementById("myChart2"), {
        type: 'doughnut',
        data: {
            labels: [
                'Planta Enferma Trips',
                'Planta Saludable',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [plantaEnferma, plantaSana],
                backgroundColor: [
                    '#FDEDEC',
                    '#D6EAF8',
                ],
                // hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                filler: {
                    propagate: false,
                },
                title: {
                    display: true,
                    text: 'Presencia de Trips'
                }
            },
        },
    });
}

const URL_ENDPOINT_3 = 'https://rest-api-cropshield-production.up.railway.app/api/analisis-semana/';
getGrafico3();

async function getGrafico3() {
    const userId = user
    const response = await fetch(`${URL_ENDPOINT_3}${userId}`);
    const data = await response.json();
    length = data.data.length;

    semana = [];
    plantas = [];
    for (i = 0; i < length; i++) {
        semana.push(data.data[i].semana);
        plantas.push(data.data[i].plantas_enfermas);
    }


    new Chart(document.getElementById("myChart3"), {
        type: 'bar',
        data: {
            labels: semana,
            datasets: [
                {
                    label: "Plantas Enfermas",
                    backgroundColor: ["#FADBD8", "#FDEDEC", "#F9E79F", "#D5F5E3", "#D6EAF8", "#F5EEF8", "#FDEBD0", "#E8DAEF", "#F2D7D5", "#F8F9F9"],
                    data: plantas
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            title: {
                display: true,
                text: 'Presencia de Trips - Semana'
            }
        }
    });
}

const URL_ENDPOINT_4 = "https://rest-api-cropshield-production.up.railway.app/api/analisis-combo/"

getGrafico4();

async function getGrafico4() {
    const userId = user
    const response = await fetch(`${URL_ENDPOINT_4}${userId}`);
    const data = await response.json();
    length = data.data.length;

    edadPlantas = [];
    plantaSanasEdad = [];
    plnantaEnfermasEdad = [];
    for (i = 0; i < length; i++) {
        edadPlantas.push(data.data[i].edad);
        plantaSanasEdad.push(data.data[i].plantas_enfermas);
        plnantaEnfermasEdad.push(data.data[i].plantas_sanas);

    }

    new Chart(document.getElementById("myChart4"), {
        type: 'line',
        data: {
            labels: edadPlantas,
            datasets: [{
                data: plnantaEnfermasEdad,
                label: "Plantas Enfermas Trips",
                borderColor: '#F1948A',
                fill: false
            }, {
                data: plantaSanasEdad,
                label: "Plantas Saludables",
                borderColor: '#7FB3D5',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Relacion Número Plantas/Edades'
            },
            scales: {
              y: {
                min: 10,
                max: 50,
              }
            }
          },
    });
}