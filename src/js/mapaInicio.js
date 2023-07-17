(function(){
    const lat = 15.1218016;
    const lng = -89.3757965;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);

    let markers = new L.FeatureGroup().addTo(mapa)

    let analisis = [];

    const filtros = {
        categoria: '',
        cultivo: ''
    }

    const categoriasSelect = document.querySelector('#categorias');
    const cultivosSelect = document.querySelector('#cultivos');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)

    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value
        filtrarAnalisis();
    })

    cultivosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value
        filtrarAnalisis();
    })

    const obtenerAnalisis = async () => {
        try {
            const url = '/api/analisis'
            const respuesta = await fetch(url)
            analisis = await respuesta.json()
            mostrarAnalisis(analisis)
        } catch (error) {
            console.log(error)
        }
    }

    const mostrarAnalisis = analisis => {

        markers.clearLayers()

        analisis.forEach(analisis => {
            const marker = new L.marker([analisis?.lat, analisis?.lng ], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <p class="mr-2 text-sm font-medium text-indigo-800">${analisis.categoria.nombre}</p>
                <h2 class="my-5 text-center sm:text-2xl text-lg font-semibold leading-7 text-gray-900 my-50">${analisis?.titulo}</h2>
                <img style="height: 200px;" class="h-full w-full rounded-md object-cover" src="/uploads/${analisis?.imagen}" alt="Imagen de la propiedad ${analisis.titulo}">
                <p class="mt-4 text-gray-600">${analisis.cultivo.nombre}</p>

                <a href="/analisis/${analisis.id}" style="color: white;" class="text-withe rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white w-full text-center hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block font-bold text-white p-2 uppercase rounded">Ver Analisis</a>
            `)
            markers.addLayer(marker)
        })
    }

    const filtrarAnalisis = () => {
        const resultado = analisis.filter( filtrarCategoria ).filter( filtrarCultivo )
        mostrarAnalisis(resultado)
    }


    const filtrarCategoria = analisis => filtros.categoria ? analisis.categoriaId === filtros.categoria : analisis
    
     const filtrarCultivo = analisis => filtros.precio ? analisis.cultivoId === filtros.cultivo : analisis


    obtenerAnalisis()


})()