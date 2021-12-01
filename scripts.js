// обязательные параметры для отображение сцены, рендера, камеры.

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer(); //отображает сцены
renderer.setSize( window.innerWidth, window.innerHeight ); //размер рендера
document.body.appendChild( renderer.domElement ); //местоположение рендера
camera.position.z = 3; //отдаленность камеры
scene.background = new THREE.Color( 'grey'); //цвет фона

//для осей хелпер
controls = new THREE.OrbitControls(camera, renderer.domElement); //для прокрутки сцены
controls.addEventListener('change', render);
controls.enableZoom = true;
// конец для осей хелпер

//отобразить оси координат
scene.add(new THREE.AxesHelper(500));

//загрузчик 3д анимаций формата GLTF и glb
const loader = new THREE.GLTFLoader();

// свет точечный
const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set( 1, 1, 1 );
scene.add( pointLight );
//хелпер света точечного
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

//свет конусный
const spotLight = new THREE.SpotLight( 0xffffff, 1 );
spotLight.position.set( -2, 1, 3 );
scene.add( spotLight );
//хелпер для свет конусный
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

//свет заполняющий 
const hemiLight = new THREE.HemisphereLight (0xffffff, 0xffffff, 1);
scene.add( hemiLight );
//хелперы света (показывавет оси расположения света)
const HemisphereLightHelper = new THREE.HemisphereLightHelper( hemiLight, 4 );
scene.add( HemisphereLightHelper );

//добавление самой 3д анимации и включение встроеной анимации в файлах типа GLTF и glb
let flag;
let mixer1;

loader.load('./Wraith_Animated.glb', (gltf1) => {
    flag = gltf1.scene;
    flag.scale.set(3, 3, 3);
    flag.position.y = -1;
    flag.rotation.y = -2;

    // для вывода анимации которая есть в файле glb
    mixer1 = new THREE.AnimationMixer(flag); // у AnimationMixer есть другие методы, я заменила ниже .setTime на .update как поняла я именно тут и ниже мы тянем анимку
    mixer1.clipAction(gltf1.animations[0]).play(); //вывод первой анимации

    scene.add(flag);

});

// тоже обязательно для вывода всего что выше
const animate = function () {
    requestAnimationFrame( animate ); //обязательно
    if(mixer1) {
        mixer1.update(0.01); // типа скорость воспроизвидения анимации, которая внутри файла типа GLTF и glb
    }
    renderer.render( scene, camera );//обязательно
};

animate();

// это обязательно для отображение осей координат используется
function render() {
    renderer.render( scene, camera );
}
            		






// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// camera.position.z = 5;


// const loader = new GLTFLoader();

// loader.load( './skull/scene.gltf', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );




// const animate = function () {
//     requestAnimationFrame( animate );
//     renderer.render( scene, camera );


// };

// animate();
            		