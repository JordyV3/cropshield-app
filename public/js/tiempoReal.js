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

/***/ "./src/js/tiempoReal.js":
/*!******************************!*\
  !*** ./src/js/tiempoReal.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar tamano = 400;\nvar video = document.getElementById(\"video\");\nvar canvas = document.getElementById(\"canvas\");\nvar otrocanvas = document.getElementById(\"otrocanvas\");\nvar ctx = canvas.getContext(\"2d\");\nvar currentStream = null;\nvar facingMode = \"user\";\n\nvar modelo = null;\n\n(async () => {\n  modelo = await tf.loadLayersModel(\"/model/model.json\");\n  console.log(\"Modelo cargado\");\n})();\n\nwindow.onload = function () {\n  mostrarCamara();\n}\n\nfunction mostrarCamara() {\n  var opciones = {\n    audio: false,\n    video: {\n      width: tamano, height: tamano\n    }\n  }\n\n  if (navigator.mediaDevices.getUserMedia) {\n    navigator.mediaDevices.getUserMedia(opciones)\n      .then(function (stream) {\n        currentStream = stream;\n        video.srcObject = currentStream;\n        procesarCamara();\n        predecir();\n      })\n      .catch(function (err) {\n        alert(\"No se pudo utilizar la camara :(\");\n        console.log(err);\n        alert(err);\n      })\n  } else {\n    alert(\"No existe la funcion getUserMedia\");\n  }\n}\n\nfunction cambiarCamara() {\n  if (currentStream) {\n    currentStream.getTracks().forEach(track => {\n      track.stop();\n    });\n  }\n\n  facingMode = facingMode == \"user\" ? \"environment\" : \"user\";\n\n  var opciones = {\n    audio: false,\n    video: {\n      facingMode: facingMode, width: tamano, height: tamano\n    }\n  };\n\n\n  navigator.mediaDevices.getUserMedia(opciones)\n    .then(function (stream) {\n      currentStream = stream;\n      video.srcObject = currentStream;\n    })\n    .catch(function (err) {\n      console.log(\"Oops, hubo un error\", err);\n    })\n}\n\nfunction procesarCamara() {\n  ctx.drawImage(video, 0, 0, tamano, tamano, 0, 0, tamano, tamano);\n  setTimeout(procesarCamara, 20);\n}\n\nfunction predecir() {\n  if (modelo != null) {\n    resample_single(canvas, 100, 100, otrocanvas);\n\n    var ctx2 = otrocanvas.getContext(\"2d\");\n    var imgData = ctx2.getImageData(0, 0, 100, 100);\n\n    var arr = [];\n    var arr100 = [];\n\n    for (var p = 0; p < imgData.data.length; p += 4) {\n      var rojo = imgData.data[p] / 255;\n      var verde = imgData.data[p + 1] / 255;\n      var azul = imgData.data[p + 2] / 255;\n\n      var gris = (rojo + verde + azul) / 3;\n\n      arr100.push([gris]);\n      if (arr100.length == 100) {\n        arr.push(arr100);\n        arr100 = [];\n      }\n    }\n\n    arr = [arr];\n\n    var tensor = tf.tensor4d(arr);\n    var resultado = modelo.predict(tensor).dataSync();\n\n    var respuesta;\n    if (resultado <= .5) {\n      respuesta = \"PLANTA ENFERMA DE TRIPS\";\n    } else {\n      respuesta = \"PLANTA SALUDABLE\";\n    }\n    document.getElementById(\"resultado\").innerHTML = respuesta;\n\n  }\n\n  setTimeout(predecir, 150);\n}\n\nfunction resample_single(canvas, width, height, resize_canvas) {\n  var width_source = canvas.width;\n  var height_source = canvas.height;\n  width = Math.round(width);\n  height = Math.round(height);\n\n  var ratio_w = width_source / width;\n  var ratio_h = height_source / height;\n  var ratio_w_half = Math.ceil(ratio_w / 2);\n  var ratio_h_half = Math.ceil(ratio_h / 2);\n\n  var ctx = canvas.getContext(\"2d\");\n  var ctx2 = resize_canvas.getContext(\"2d\");\n  var img = ctx.getImageData(0, 0, width_source, height_source);\n  var img2 = ctx2.createImageData(width, height);\n  var data = img.data;\n  var data2 = img2.data;\n\n  for (var j = 0; j < height; j++) {\n    for (var i = 0; i < width; i++) {\n      var x2 = (i + j * width) * 4;\n      var weight = 0;\n      var weights = 0;\n      var weights_alpha = 0;\n      var gx_r = 0;\n      var gx_g = 0;\n      var gx_b = 0;\n      var gx_a = 0;\n      var center_y = (j + 0.5) * ratio_h;\n      var yy_start = Math.floor(j * ratio_h);\n      var yy_stop = Math.ceil((j + 1) * ratio_h);\n      for (var yy = yy_start; yy < yy_stop; yy++) {\n        var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;\n        var center_x = (i + 0.5) * ratio_w;\n        var w0 = dy * dy; //pre-calc part of w\n        var xx_start = Math.floor(i * ratio_w);\n        var xx_stop = Math.ceil((i + 1) * ratio_w);\n        for (var xx = xx_start; xx < xx_stop; xx++) {\n          var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;\n          var w = Math.sqrt(w0 + dx * dx);\n          if (w >= 1) {\n            continue;\n          }\n\n          weight = 2 * w * w * w - 3 * w * w + 1;\n          var pos_x = 4 * (xx + yy * width_source);\n\n          gx_a += weight * data[pos_x + 3];\n          weights_alpha += weight;\n\n          if (data[pos_x + 3] < 255)\n            weight = weight * data[pos_x + 3] / 250;\n          gx_r += weight * data[pos_x];\n          gx_g += weight * data[pos_x + 1];\n          gx_b += weight * data[pos_x + 2];\n          weights += weight;\n        }\n      }\n      data2[x2] = gx_r / weights;\n      data2[x2 + 1] = gx_g / weights;\n      data2[x2 + 2] = gx_b / weights;\n      data2[x2 + 3] = gx_a / weights_alpha;\n    }\n  }\n\n  ctx2.putImageData(img2, 0, 0);\n}\n\n//# sourceURL=webpack://cropshield-app/./src/js/tiempoReal.js?");

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
/******/ 	__webpack_modules__["./src/js/tiempoReal.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;