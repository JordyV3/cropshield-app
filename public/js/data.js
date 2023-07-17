function data() {

    return {

        isSideMenuOpen: false,
        toggleSideMenu() {
            this.isSideMenuOpen = !this.isSideMenuOpen
        },
        closeSideMenu() {
            this.isSideMenuOpen = false
        },
        isNotificationsMenuOpen: false,
        toggleNotificationsMenu() {
            this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
        },
        closeNotificationsMenu() {
            this.isNotificationsMenuOpen = false
        },
        isProfileMenuOpen: false,
        toggleProfileMenu() {
            this.isProfileMenuOpen = !this.isProfileMenuOpen
        },
        closeProfileMenu() {
            this.isProfileMenuOpen = false
        },
        isPagesMenuOpen: false,
        togglePagesMenu() {
            this.isPagesMenuOpen = !this.isPagesMenuOpen
        },

    }
}

var chart = document.querySelector('#chartline')
var options = {
    series: [{
        name: 'PLANTA SALUDABLE',
        type: 'area',
        data: [540, 536, 533, 531, 527, 526, 525, 525, 524, 523, 523]
    }, {
        name: 'PLANTA ENFERMA TRIPS',
        type: 'line',
        data: [0, 0, 5, 6, 6, 0, 0, 0, 0, 0, 0]
    }],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.35, 1],
    },
    labels: ['D 01', 'D 05', 'D 10', 'D 15', 'D 20', 'D 25', 'D 30', 'D 35', 'D 40',
        'D 45', 'D 50'
    ],
    markers: {
        size: 0
    },
    yaxis: [{
        title: {
            text: 'Siembra D 01',
        },
    },
    {
        opposite: true,
        title: {
            text: 'Actualidad',
        },
    },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " Plantas";
                }
                return y;
            }
        }
    }
};
var chart = new ApexCharts(chart, options);
chart.render();

var chart = document.querySelector('#chartpie')
var options = {
    series: [100, 97.98,96.9,3.1],
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total Análisis',
                    formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 540
                    }
                }
            }
        }
    },
    labels: ['Análisis', 'Nivel de Confianza', 'Plantas Saludables', 'Plantas Enfermas Trips'],
};
var chart = new ApexCharts(chart, options);
chart.render();