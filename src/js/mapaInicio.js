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
                <p class="text-indigo-600 font-bold">${analisis.categoria.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-2">${analisis?.titulo}</h1>
                <img src="/uploads/${analisis?.imagen}" alt="Imagen de la propiedad ${analisis.titulo}">
                <p class="text-gray-600 font-bold">${analisis.cultivo.nombre}</p>
                <a href="/analisis/${analisis.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase">Ver Analisis</a>
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