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

eval("__webpack_require__.r(__webpack_exports__);\n(function(){\n    const lat = 15.1218016;\n    const lng = -89.3757965;\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);\n\n    let markers = new L.FeatureGroup().addTo(mapa)\n\n    let analisis = [];\n\n    const filtros = {\n        categoria: '',\n        cultivo: ''\n    }\n\n    const categoriasSelect = document.querySelector('#categorias');\n    const cultivosSelect = document.querySelector('#cultivos');\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa)\n\n    categoriasSelect.addEventListener('change', e => {\n        filtros.categoria = +e.target.value\n        filtrarAnalisis();\n    })\n\n    cultivosSelect.addEventListener('change', e => {\n        filtros.precio = +e.target.value\n        filtrarAnalisis();\n    })\n\n    const obtenerAnalisis = async () => {\n        try {\n            const url = '/api/analisis'\n            const respuesta = await fetch(url)\n            analisis = await respuesta.json()\n            mostrarAnalisis(analisis)\n        } catch (error) {\n            console.log(error)\n        }\n    }\n\n    const mostrarAnalisis = analisis => {\n\n        markers.clearLayers()\n\n        analisis.forEach(analisis => {\n            const marker = new L.marker([analisis?.lat, analisis?.lng ], {\n                autoPan: true\n            })\n            .addTo(mapa)\n            .bindPopup(`\n                <p class=\"text-emerald-600 font-bold\">${analisis.categoria.nombre}</p>\n                <h1 class=\"text-xl font-extrabold uppercase my-2\">${analisis?.titulo}</h1>\n                <img src=\"/uploads/${analisis?.imagen}\" alt=\"Imagen de la propiedad ${analisis.titulo}\">\n                <p class=\"text-gray-600 font-bold\">${analisis.cultivo.nombre}</p>\n                <a href=\"/analisis/${analisis.id}\" class=\"bg-emerald-600 block p-2 text-center font-bold uppercase\">Ver Analisis</a>\n            `)\n            markers.addLayer(marker)\n        })\n    }\n\n    const filtrarAnalisis = () => {\n        const resultado = analisis.filter( filtrarCategoria ).filter( filtrarCultivo )\n        mostrarAnalisis(resultado)\n    }\n\n\n    const filtrarCategoria = analisis => filtros.categoria ? analisis.categoriaId === filtros.categoria : analisis\n    \n     const filtrarCultivo = analisis => filtros.precio ? analisis.cultivoId === filtros.cultivo : analisis\n\n\n    obtenerAnalisis()\n\n\n})()\n\n//# sourceURL=webpack://cropshield-app/./src/js/mapaInicio.js?");

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