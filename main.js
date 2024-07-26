/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");



class ThreeJSContainer {
    scene;
    light;
    hourHand;
    minuteHand;
    secondHand;
    renderer; // レンダラーをプロパティに追加
    camera; // カメラをプロパティに追加
    group;
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)
    createRendererDOM = (cameraPos) => {
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer(); // レンダラーをプロパティに設定
        this.renderer.setSize(window.innerWidth, window.innerHeight); // 初期サイズをウィンドウサイズに設定
        this.renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x495ed));
        this.renderer.shadowMap.enabled = true; // シャドウマップを有効にする
        // カメラの設定
        this.camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        let orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(this.camera, this.renderer.domElement);
        this.createScene();
        this.createClock();
        // 毎フレームのupdateを呼んで，render
        // requestAnimationFrame により次フレームを呼ぶ
        let render = (time) => {
            orbitControls.update();
            this.updateClock();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        // ウィンドウのリサイズイベントを処理
        window.addEventListener('resize', this.onWindowResize);
        this.renderer.domElement.style.cssFloat = "left";
        this.renderer.domElement.style.margin = "10px";
        return this.renderer.domElement;
    };
    // ウィンドウのリサイズイベントハンドラ
    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight; // カメラのアスペクト比を更新
        this.camera.updateProjectionMatrix(); // カメラのプロジェクションマトリックスを更新
        this.renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを更新
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        // // グリッド表示
        // const gridHelper = new THREE.GridHelper( 10,);
        // this.scene.add( gridHelper );  
        // 軸表示
        // const axesHelper = new THREE.AxesHelper( 5 );
        // this.scene.add( axesHelper );
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        let lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        //環境マッピングを行う
        const urls = [
            "05_r.png",
            "05_l.png",
            "05_u.png",
            "05_d.png",
            "05_f.png",
            "05_b.png"
        ];
        // テクスチャのロード
        const cubeTextureLoader = new three__WEBPACK_IMPORTED_MODULE_2__.CubeTextureLoader();
        const textureMapping = cubeTextureLoader.load(urls);
        this.scene.background = textureMapping;
        // 環境マッピングの正10角形を表示
        const mappingGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.DodecahedronBufferGeometry(0.1, 0);
        const mappingMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
            envMap: textureMapping,
            opacity: 0.5,
            roughness: 1,
            reflectivity: 1
        });
        // 時計周辺を回るオ4つのブジェクト群
        const objGroup = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        const mapping1 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(mappingGeometry, mappingMaterial);
        mapping1.position.x = 1.2;
        const mapping2 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(mappingGeometry, mappingMaterial);
        mapping2.position.x = -1.2;
        const mapping3 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(mappingGeometry, mappingMaterial);
        mapping3.position.y = 1.2;
        const mapping4 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(mappingGeometry, mappingMaterial);
        mapping4.position.y = -1.2;
        objGroup.add(mapping1, mapping2, mapping3, mapping4);
        this.scene.add(objGroup);
        //時計一番外側のトーラス
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.TorusGeometry(2, 0.15, 24, 130);
        const params = {
            color: 0xffffff,
            transmission: 1.6,
            opacity: 1,
            metalness: 0,
            roughness: 0,
            ior: 1.5,
            thickness: 5,
            specularIntensity: 1,
            specularColor: 0xffffff,
            dispersion: 5,
        };
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
            color: params.color,
            transmission: params.transmission,
            opacity: params.opacity,
            metalness: params.metalness,
            roughness: params.roughness,
            ior: params.ior,
            envMapIntensity: 0.9,
            transparent: true,
            specularIntensity: params.specularIntensity,
            side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide,
        });
        const torus = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geometry, material);
        // torus.rotateY(0.6);
        this.scene.add(torus);
        // 集団制御用のグループを作成
        this.group = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        this.scene.add(this.group);
        // // 60個の小さな球体を作成
        for (let i = 0; i < 60; i++) {
            // 球体作成
            const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
                color: 0xffffff,
                transmission: 1.6,
                opacity: 1,
                metalness: 0,
                roughness: 0.4,
                ior: 1.5,
                specularIntensity: 1,
            });
            const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.05, 16, 16);
            const mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geometry, material);
            //配置座標計算
            const radian = i / 60 * Math.PI * 2;
            mesh.position.set(1.5 * Math.cos(radian), 1.5 * Math.sin(radian), 0);
            // グループに追加
            this.group.add(mesh);
        }
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            requestAnimationFrame(update);
            mapping1.rotation.y += 0.02;
            mapping2.rotation.y += 0.02;
            mapping3.rotation.x += 0.02;
            mapping4.rotation.x += 0.02;
            objGroup.rotation.z += 0.01;
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update();
        };
        requestAnimationFrame(update);
    };
    // 時計の作成
    createClock = () => {
        // 時計の盤面を作成
        let clockFaceGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.CircleGeometry(1.5, 12);
        let clockFaceMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.5,
            emissive: 0x000fff,
            side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide,
            wireframe: true
        });
        let clockFace = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(clockFaceGeometry, clockFaceMaterial);
        this.scene.add(clockFace);
        // 時計の針の作成
        // let handGeometry = new THREE.BoxGeometry(0.02, 0.5, 0.02);
        let handGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0, 0.09, 1);
        handGeometry.translate(0, 0.5, 0); // 回転の中心を移動
        // 時
        let hourHandMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
            color: 0x00ffff,
            transmission: 1.6,
            opacity: 1,
            metalness: 0,
            roughness: 0,
            ior: 1.5,
            reflectivity: 0,
            specularIntensity: 1,
        });
        this.hourHand = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(handGeometry, hourHandMaterial);
        this.scene.add(this.hourHand);
        // 分
        let minuteHandMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
            color: 0xffff00,
            transmission: 1.6,
            opacity: 1,
            metalness: 0,
            roughness: 0,
            ior: 1.3,
            reflectivity: 0,
            specularIntensity: 1,
        });
        this.minuteHand = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(handGeometry, minuteHandMaterial);
        this.minuteHand.scale.set(1, 1.3, 1);
        this.scene.add(this.minuteHand);
        // 秒
        let secondHandMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
            color: 0xff00ff,
            transmission: 1.6,
            opacity: 1,
            metalness: 0,
            roughness: 0,
            ior: 1.4,
            reflectivity: 0,
            specularIntensity: 1,
        });
        this.secondHand = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(handGeometry, secondHandMaterial);
        this.secondHand.scale.set(0.8, 1.5, 0.8);
        this.scene.add(this.secondHand);
    };
    previousSeconds = -1; // 前回の秒数を保存するプロパティ
    // 時計の更新
    updateClock = () => {
        let now = new Date();
        let seconds = now.getSeconds(); // 現在の秒数
        let minutes = now.getMinutes();
        let hours = now.getHours() % 12;
        // group内の要素を取得
        const children = this.group.children;
        // Tweenでコントロールする変数定義
        let tweeninfo = { scale: 1.0, positionZ: 0.0 };
        // groupのインデックスを対応させるために分岐
        if (seconds <= 15 && seconds !== this.previousSeconds) {
            const mesh1 = children[15 - seconds];
            let updateScale = () => {
                mesh1.scale.set(tweeninfo.scale, tweeninfo.scale, tweeninfo.scale);
                mesh1.position.z = tweeninfo.positionZ;
            };
            // Tweenの作成
            const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo).to({ scale: 3, positionZ: 1.0 }, 1000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Elastic.Out).onUpdate(updateScale);
            const tweenBack = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo).to({ scale: 1, positionZ: 0.0 }, 1000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.InOut).onUpdate(updateScale);
            // アニメーションの開始
            tween.start();
            tween.chain(tweenBack);
        }
        else if (seconds !== this.previousSeconds) {
            const mesh1 = children[60 - (seconds - 15)];
            let updateScale = () => {
                mesh1.scale.set(tweeninfo.scale, tweeninfo.scale, tweeninfo.scale);
                mesh1.position.z = tweeninfo.positionZ;
            };
            // Tweenの作成
            const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo).to({ scale: 3, positionZ: 1.0 }, 1000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Elastic.Out).onUpdate(updateScale);
            const tweenBack = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo).to({ scale: 1, positionZ: 0.0 }, 1000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.InOut).onUpdate(updateScale);
            tween.start();
            tween.chain(tweenBack);
        }
        // 時計の針の回転を更新
        this.secondHand.rotation.z = -seconds * (Math.PI / 30); // 1秒に6°回転 (PI/30)
        this.minuteHand.rotation.z = -minutes * (Math.PI / 30) - seconds * (Math.PI / 1800);
        // わずかに動く分を補正する
        this.hourHand.rotation.z = -hours * (Math.PI / 6) - minutes * (Math.PI / 360);
        // 前回の秒数を更新
        this.previousSeconds = seconds;
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 3));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XG5pbXBvcnQgKiBhcyBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBob3VySGFuZDogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIG1pbnV0ZUhhbmQ6IFRIUkVFLk1lc2g7XG4gICAgcHJpdmF0ZSBzZWNvbmRIYW5kOiBUSFJFRS5NZXNoO1xuICAgIHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7IC8vIOODrOODs+ODgOODqeODvOOCkuODl+ODreODkeODhuOCo+OBq+i/veWKoFxuICAgIHByaXZhdGUgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTsgLy8g44Kr44Oh44Op44KS44OX44Ot44OR44OG44Kj44Gr6L+95YqgXG4gICAgcHJpdmF0ZSBncm91cDogVEhSRUUuR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKVxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9IChjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7IC8vIOODrOODs+ODgOODqeODvOOCkuODl+ODreODkeODhuOCo+OBq+ioreWumlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIOWIneacn+OCteOCpOOCuuOCkuOCpuOCo+ODs+ODieOCpuOCteOCpOOCuuOBq+ioreWumlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8vIOOCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8vIOOCq+ODoeODqeOBruioreWumlxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBsZXQgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2xvY2soKTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcbiAgICAgICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBsZXQgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNsb2NrKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICAvLyDjgqbjgqPjg7Pjg4njgqbjga7jg6rjgrXjgqTjgrrjgqTjg5njg7Pjg4jjgpLlh6bnkIZcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44Km44Kj44Oz44OJ44Km44Gu44Oq44K144Kk44K644Kk44OZ44Oz44OI44OP44Oz44OJ44OpXG4gICAgcHJpdmF0ZSBvbldpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vIOOCq+ODoeODqeOBruOCouOCueODmuOCr+ODiOavlOOCkuabtOaWsFxuICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7IC8vIOOCq+ODoeODqeOBruODl+ODreOCuOOCp+OCr+OCt+ODp+ODs+ODnuODiOODquODg+OCr+OCueOCkuabtOaWsFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7IC8vIOODrOODs+ODgOODqeODvOOBruOCteOCpOOCuuOCkuabtOaWsFxuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIFxuICAgICAgICAvLyAvLyDjgrDjg6rjg4Pjg4nooajnpLpcbiAgICAgICAgLy8gY29uc3QgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKCAxMCwpO1xuICAgICAgICAvLyB0aGlzLnNjZW5lLmFkZCggZ3JpZEhlbHBlciApOyAgXG5cbiAgICAgICAgLy8g6Lu46KGo56S6XG4gICAgICAgIC8vIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlciggNSApO1xuICAgICAgICAvLyB0aGlzLnNjZW5lLmFkZCggYXhlc0hlbHBlciApO1xuICAgICAgICAvLyDjg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgbGV0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuICAgICAgXG5cbiAgICAgICAgLy/nkrDlooPjg57jg4Pjg5Tjg7PjgrDjgpLooYzjgYZcbiAgICAgICAgY29uc3QgdXJscyA9IFtcbiAgICAgICAgICAgIFwiMDVfci5wbmdcIixcbiAgICAgICAgICAgIFwiMDVfbC5wbmdcIixcbiAgICAgICAgICAgIFwiMDVfdS5wbmdcIixcbiAgICAgICAgICAgIFwiMDVfZC5wbmdcIixcbiAgICAgICAgICAgIFwiMDVfZi5wbmdcIixcbiAgICAgICAgICAgIFwiMDVfYi5wbmdcIlxuICAgICAgICBdXG4gICAgICAgIC8vIOODhuOCr+OCueODgeODo+OBruODreODvOODiVxuICAgICAgICBjb25zdCBjdWJlVGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5DdWJlVGV4dHVyZUxvYWRlcigpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlTWFwcGluZyA9IGN1YmVUZXh0dXJlTG9hZGVyLmxvYWQodXJscyk7XG4gICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IHRleHR1cmVNYXBwaW5nO1xuICAgICAgICAvLyDnkrDlooPjg57jg4Pjg5Tjg7PjgrDjga7mraMxMOinkuW9ouOCkuihqOekulxuICAgICAgICBjb25zdCBtYXBwaW5nR2VvbWV0cnkgPSBuZXcgVEhSRUUuRG9kZWNhaGVkcm9uQnVmZmVyR2VvbWV0cnkoMC4xLDApO1xuICAgICAgICBjb25zdCBtYXBwaW5nTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwoe1xuICAgICAgICAgICAgZW52TWFwOiB0ZXh0dXJlTWFwcGluZyxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgICAgIHJvdWdobmVzczogMSxcbiAgICAgICAgICAgIHJlZmxlY3Rpdml0eTogMSBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOaZguioiOWRqOi+uuOCkuWbnuOCi+OCqjTjgaTjga7jg5bjgrjjgqfjgq/jg4jnvqRcbiAgICAgICAgY29uc3Qgb2JqR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgY29uc3QgbWFwcGluZzEgPSBuZXcgVEhSRUUuTWVzaChtYXBwaW5nR2VvbWV0cnksbWFwcGluZ01hdGVyaWFsKTtcbiAgICAgICAgbWFwcGluZzEucG9zaXRpb24ueCA9IDEuMjtcbiAgICAgICAgY29uc3QgbWFwcGluZzIgPSBuZXcgVEhSRUUuTWVzaChtYXBwaW5nR2VvbWV0cnksbWFwcGluZ01hdGVyaWFsKTtcbiAgICAgICAgbWFwcGluZzIucG9zaXRpb24ueCA9IC0xLjI7XG4gICAgICAgIGNvbnN0IG1hcHBpbmczID0gbmV3IFRIUkVFLk1lc2gobWFwcGluZ0dlb21ldHJ5LG1hcHBpbmdNYXRlcmlhbCk7XG4gICAgICAgIG1hcHBpbmczLnBvc2l0aW9uLnkgPSAxLjI7XG4gICAgICAgIGNvbnN0IG1hcHBpbmc0ID0gbmV3IFRIUkVFLk1lc2gobWFwcGluZ0dlb21ldHJ5LG1hcHBpbmdNYXRlcmlhbCk7XG4gICAgICAgIG1hcHBpbmc0LnBvc2l0aW9uLnkgPSAtMS4yO1xuICAgICAgICBvYmpHcm91cC5hZGQobWFwcGluZzEsbWFwcGluZzIsbWFwcGluZzMsbWFwcGluZzQpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChvYmpHcm91cCk7XG5cbiAgICAgICAgLy/mmYLoqIjkuIDnlarlpJblgbTjga7jg4jjg7zjg6njgrlcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyLCAwLjE1LCAyNCwgMTMwKTtcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAsXG4gICAgICAgICAgICBpb3I6IDEuNSxcbiAgICAgICAgICAgIHRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIHNwZWN1bGFySW50ZW5zaXR5OiAxLFxuICAgICAgICAgICAgc3BlY3VsYXJDb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICBkaXNwZXJzaW9uOiA1LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiBwYXJhbXMuY29sb3IsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IHBhcmFtcy50cmFuc21pc3Npb24sXG4gICAgICAgICAgICBvcGFjaXR5OiBwYXJhbXMub3BhY2l0eSxcbiAgICAgICAgICAgIG1ldGFsbmVzczogcGFyYW1zLm1ldGFsbmVzcyxcbiAgICAgICAgICAgIHJvdWdobmVzczogcGFyYW1zLnJvdWdobmVzcyxcbiAgICAgICAgICAgIGlvcjogcGFyYW1zLmlvcixcbiAgICAgICAgICAgIGVudk1hcEludGVuc2l0eTogMC45LFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBzcGVjdWxhckludGVuc2l0eTogcGFyYW1zLnNwZWN1bGFySW50ZW5zaXR5LFxuICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdG9ydXMgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAvLyB0b3J1cy5yb3RhdGVZKDAuNik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRvcnVzKTtcblxuICAgICAgICAvLyDpm4blm6PliLblvqHnlKjjga7jgrDjg6vjg7zjg5fjgpLkvZzmiJBcbiAgICAgICAgdGhpcy5ncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmdyb3VwKTtcblxuICAgICAgICAvLyAvLyA2MOWAi+OBruWwj+OBleOBqueQg+S9k+OCkuS9nOaIkFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwgNjA7IGkrKyl7XG4gICAgICAgICAgICAvLyDnkIPkvZPkvZzmiJBcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICAgICAgdHJhbnNtaXNzaW9uOiAxLjYsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAwLjQsXG4gICAgICAgICAgICAgICAgaW9yOiAxLjUsXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJJbnRlbnNpdHk6IDEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDUsMTYsMTYpO1xuICAgICAgICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgLy/phY3nva7luqfmqJnoqIjnrpdcbiAgICAgICAgICAgIGNvbnN0IHJhZGlhbiA9IGkgLyA2MCAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgbWVzaC5wb3NpdGlvbi5zZXQoXG4gICAgICAgICAgICAgICAgMS41ICogTWF0aC5jb3MocmFkaWFuKSxcbiAgICAgICAgICAgICAgICAxLjUgKk1hdGguc2luKHJhZGlhbiksXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vIOOCsOODq+ODvOODl+OBq+i/veWKoFxuICAgICAgICAgICAgdGhpcy5ncm91cC5hZGQobWVzaCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgbWFwcGluZzEucm90YXRpb24ueSArPSAwLjAyO1xuICAgICAgICAgICAgbWFwcGluZzIucm90YXRpb24ueSArPSAwLjAyO1xuICAgICAgICAgICAgbWFwcGluZzMucm90YXRpb24ueCArPSAwLjAyO1xuICAgICAgICAgICAgbWFwcGluZzQucm90YXRpb24ueCArPSAwLjAyO1xuICAgICAgICAgICAgb2JqR3JvdXAucm90YXRpb24ueiArPSAwLjAxO1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuXG4gICAgLy8g5pmC6KiI44Gu5L2c5oiQXG4gICAgcHJpdmF0ZSBjcmVhdGVDbG9jayA9ICgpID0+IHtcbiAgICAgICAgLy8g5pmC6KiI44Gu55uk6Z2i44KS5L2c5oiQXG4gICAgICAgIGxldCBjbG9ja0ZhY2VHZW9tZXRyeSA9IG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgxLjUsIDEyKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBjbG9ja0ZhY2VNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsIFxuICAgICAgICAgICAgcm91Z2huZXNzOiAwLjUsXG4gICAgICAgICAgICBlbWlzc2l2ZTogMHgwMDBmZmYsXG4gICAgICAgICAgICBzaWRlOlRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgICAgICB3aXJlZnJhbWU6IHRydWUgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgbGV0IGNsb2NrRmFjZSA9IG5ldyBUSFJFRS5NZXNoKGNsb2NrRmFjZUdlb21ldHJ5LCBjbG9ja0ZhY2VNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGNsb2NrRmFjZSk7XG5cbiAgICAgICAgLy8g5pmC6KiI44Gu6Yed44Gu5L2c5oiQXG4gICAgICAgIC8vIGxldCBoYW5kR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4wMiwgMC41LCAwLjAyKTtcbiAgICAgICAgbGV0IGhhbmRHZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAsMC4wOSwxKTtcbiAgICAgICAgaGFuZEdlb21ldHJ5LnRyYW5zbGF0ZSgwLCAwLjUsIDApOyAvLyDlm57ou6Ljga7kuK3lv4PjgpLnp7vli5VcbiAgICAgICAgLy8g5pmCXG4gICAgICAgIGxldCBob3VySGFuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHsgXG4gICAgICAgICAgICBjb2xvcjogMHgwMGZmZmYsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAsXG4gICAgICAgICAgICBpb3I6IDEuNSxcbiAgICAgICAgICAgIHJlZmxlY3Rpdml0eTowLFxuICAgICAgICAgICAgc3BlY3VsYXJJbnRlbnNpdHk6IDEsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmhvdXJIYW5kID0gbmV3IFRIUkVFLk1lc2goaGFuZEdlb21ldHJ5LCBob3VySGFuZE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5ob3VySGFuZCk7XG4gICAgICAgIC8vIOWIhlxuICAgICAgICBsZXQgbWludXRlSGFuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHsgXG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmMDAsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAsXG4gICAgICAgICAgICBpb3I6IDEuMyxcbiAgICAgICAgICAgIHJlZmxlY3Rpdml0eTowLFxuICAgICAgICAgICAgc3BlY3VsYXJJbnRlbnNpdHk6IDEsXG4gICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5taW51dGVIYW5kID0gbmV3IFRIUkVFLk1lc2goaGFuZEdlb21ldHJ5LCBtaW51dGVIYW5kTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLm1pbnV0ZUhhbmQuc2NhbGUuc2V0KDEsIDEuMywgMSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWludXRlSGFuZCk7XG4gICAgICAgIC8vIOenklxuICAgICAgICBsZXQgc2Vjb25kSGFuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHsgXG4gICAgICAgICAgICBjb2xvcjogMHhmZjAwZmYsXG4gICAgICAgICAgICB0cmFuc21pc3Npb246IDEuNixcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAsXG4gICAgICAgICAgICBpb3I6IDEuNCxcbiAgICAgICAgICAgIHJlZmxlY3Rpdml0eTowLFxuICAgICAgICAgICAgc3BlY3VsYXJJbnRlbnNpdHk6IDEsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlY29uZEhhbmQgPSBuZXcgVEhSRUUuTWVzaChoYW5kR2VvbWV0cnksIHNlY29uZEhhbmRNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2Vjb25kSGFuZC5zY2FsZS5zZXQoMC44LCAxLjUsIDAuOCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuc2Vjb25kSGFuZCk7ICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmV2aW91c1NlY29uZHM6IG51bWJlciA9IC0xOyAvLyDliY3lm57jga7np5LmlbDjgpLkv53lrZjjgZnjgovjg5fjg63jg5Hjg4bjgqNcbiAgICAvLyDmmYLoqIjjga7mm7TmlrBcbiAgICBwcml2YXRlIHVwZGF0ZUNsb2NrID0gKCkgPT4ge1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IHNlY29uZHMgPSBub3cuZ2V0U2Vjb25kcygpOyAvLyDnj77lnKjjga7np5LmlbBcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBub3cuZ2V0TWludXRlcygpO1xuICAgICAgICBsZXQgaG91cnMgPSBub3cuZ2V0SG91cnMoKSAlIDEyO1xuICAgICAgICAvLyBncm91cOWGheOBruimgee0oOOCkuWPluW+l1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZ3JvdXAuY2hpbGRyZW47XG4gICAgICAgIC8vIFR3ZWVu44Gn44Kz44Oz44OI44Ot44O844Or44GZ44KL5aSJ5pWw5a6a576pXG4gICAgICAgIGxldCB0d2VlbmluZm8gPSAge3NjYWxlOiAxLjAsIHBvc2l0aW9uWjogMC4wfTtcbiAgICAgICAgLy8gZ3JvdXDjga7jgqTjg7Pjg4fjg4Pjgq/jgrnjgpLlr77lv5zjgZXjgZvjgovjgZ/jgoHjgavliIblspBcbiAgICAgICAgaWYoIHNlY29uZHMgPD0gMTUgJiYgc2Vjb25kcyAhPT0gdGhpcy5wcmV2aW91c1NlY29uZHMpe1xuICAgICAgICAgICAgY29uc3QgbWVzaDEgPSBjaGlsZHJlblsxNS1zZWNvbmRzXTtcbiAgICAgICAgICAgIGxldCB1cGRhdGVTY2FsZSA9ICgpID0+e1xuICAgICAgICAgICAgICAgIG1lc2gxLnNjYWxlLnNldCh0d2VlbmluZm8uc2NhbGUsdHdlZW5pbmZvLnNjYWxlLHR3ZWVuaW5mby5zY2FsZSk7XG4gICAgICAgICAgICAgICAgbWVzaDEucG9zaXRpb24ueiA9IHR3ZWVuaW5mby5wb3NpdGlvblo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUd2VlbuOBruS9nOaIkFxuICAgICAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvKS50byh7IHNjYWxlOiAzLHBvc2l0aW9uWjogMS4wIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dCkub25VcGRhdGUodXBkYXRlU2NhbGUpO1xuICAgICAgICAgICAgY29uc3QgdHdlZW5CYWNrID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mbykudG8oeyBzY2FsZTogMSxwb3NpdGlvblogOiAwLjAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkNpcmN1bGFyLkluT3V0KS5vblVwZGF0ZSh1cGRhdGVTY2FsZSk7XG4gICAgICAgICAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjga7plovlp4tcbiAgICAgICAgICAgIHR3ZWVuLnN0YXJ0KCk7XG4gICAgICAgICAgICB0d2Vlbi5jaGFpbih0d2VlbkJhY2spO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyAhPT0gdGhpcy5wcmV2aW91c1NlY29uZHMpe1xuICAgICAgICAgICAgY29uc3QgbWVzaDEgPSBjaGlsZHJlbls2MC0oc2Vjb25kcy0xNSldO1xuICAgICAgICAgICAgbGV0IHVwZGF0ZVNjYWxlID0gKCkgPT57XG4gICAgICAgICAgICAgICAgbWVzaDEuc2NhbGUuc2V0KHR3ZWVuaW5mby5zY2FsZSx0d2VlbmluZm8uc2NhbGUsdHdlZW5pbmZvLnNjYWxlKTtcbiAgICAgICAgICAgICAgICBtZXNoMS5wb3NpdGlvbi56ID0gdHdlZW5pbmZvLnBvc2l0aW9uWjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFR3ZWVu44Gu5L2c5oiQXG4gICAgICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pLnRvKHsgc2NhbGU6IDMscG9zaXRpb25aOiAxLjAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0KS5vblVwZGF0ZSh1cGRhdGVTY2FsZSk7XG4gICAgICAgICAgICBjb25zdCB0d2VlbkJhY2sgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvKS50byh7IHNjYWxlOiAxLHBvc2l0aW9uWiA6IDAuMCB9LCAxMDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuQ2lyY3VsYXIuSW5PdXQpLm9uVXBkYXRlKHVwZGF0ZVNjYWxlKTtcbiAgICAgICAgICAgIHR3ZWVuLnN0YXJ0KCk7XG4gICAgICAgICAgICB0d2Vlbi5jaGFpbih0d2VlbkJhY2spO1xuXG4gICAgICAgIH0gXG4gICAgICAgIC8vIOaZguioiOOBrumHneOBruWbnui7ouOCkuabtOaWsFxuICAgICAgICB0aGlzLnNlY29uZEhhbmQucm90YXRpb24ueiA9IC1zZWNvbmRzICogKE1hdGguUEkgLyAzMCk7IC8vIDHnp5Ljgas2wrDlm57ou6IgKFBJLzMwKVxuICAgICAgICB0aGlzLm1pbnV0ZUhhbmQucm90YXRpb24ueiA9IC1taW51dGVzICogKE1hdGguUEkgLyAzMCkgLSBzZWNvbmRzICogKE1hdGguUEkgLyAxODAwKTtcbiAgICAgICAgLy8g44KP44Ga44GL44Gr5YuV44GP5YiG44KS6KOc5q2j44GZ44KLXG4gICAgICAgIHRoaXMuaG91ckhhbmQucm90YXRpb24ueiA9IC1ob3VycyAqIChNYXRoLlBJIC8gNikgLSBtaW51dGVzICogKE1hdGguUEkgLyAzNjApO1xuXG4gICAgICAgIC8vIOWJjeWbnuOBruenkuaVsOOCkuabtOaWsFxuICAgICAgICB0aGlzLnByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG5cbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00obmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMykpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHItNzhkMzkyXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9