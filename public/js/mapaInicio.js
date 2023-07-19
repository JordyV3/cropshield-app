/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function(){\n    const lat = 15.1218016;\n    const lng = -89.3757965;\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);\n\n    let markers = new L.FeatureGroup().addTo(mapa)\n\n    let analisis = [];\n\n    const filtros = {\n        categoria: '',\n        cultivo: ''\n    }\n\n    const categoriasSelect = document.querySelector('#categorias');\n    const cultivosSelect = document.querySelector('#cultivos');\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa)\n\n    categoriasSelect.addEventListener('change', e => {\n        filtros.categoria = +e.target.value\n        filtrarAnalisis();\n    })\n\n    cultivosSelect.addEventListener('change', e => {\n        filtros.precio = +e.target.value\n        filtrarAnalisis();\n    })\n\n    const obtenerAnalisis = async () => {\n        try {\n            const url = '/api/analisis'\n            const respuesta = await fetch(url)\n            analisis = await respuesta.json()\n            mostrarAnalisis(analisis)\n        } catch (error) {\n            console.log(error)\n        }\n    }\n\n    const mostrarAnalisis = analisis => {\n\n        markers.clearLayers()\n\n        analisis.forEach(analisis => {\n            const marker = new L.marker([analisis?.lat, analisis?.lng ], {\n                autoPan: true\n            })\n            .addTo(mapa)\n            .bindPopup(`\n            <div class=\"max-w-sm bg-white text-center rounded-lg  dark:bg-gray-800 dark:border-gray-700\">\n                <h5 class=\"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white\">${analisis?.titulo}</h5>\n                <p class=\"mb-3 font-normal text-gray-700 dark:text-gray-400\">${analisis?.descripcion}</p>\n                <img style=\"height: 150px;\" class=\"h-full w-full rounded-md object-cover\" src=\"${analisis?.imagen}\" alt=\"Imagen de la propiedad ${analisis.titulo}\">\n                <a href=\"/analisis/${analisis.id}\" style=\"color: white;\" class=\"mt-5 text-withe rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white w-full text-center hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block font-bold text-white p-2 uppercase rounded\">Ver Analisis</a>\n            </div>\n            `)\n            markers.addLayer(marker)\n        })\n    }\n\n    const filtrarAnalisis = () => {\n        const resultado = analisis.filter( filtrarCategoria ).filter( filtrarCultivo )\n        mostrarAnalisis(resultado)\n    }\n\n\n    const filtrarCategoria = analisis => filtros.categoria ? analisis.categoriaId === filtros.categoria : analisis\n    \n     const filtrarCultivo = analisis => filtros.precio ? analisis.cultivoId === filtros.cultivo : analisis\n\n\n    obtenerAnalisis()\n\n\n})()\n\n//# sourceURL=webpack://cropshield-app/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;