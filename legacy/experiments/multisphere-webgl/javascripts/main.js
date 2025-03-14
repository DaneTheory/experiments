var mouseX = 0, mouseY = 0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var innerColor = 0xff0000,
    outerColor = 0xff9900;
var innerSize = 55,
    outerSize = 60;    

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x000000, 0 ); // background

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




// Mesh
var group = new THREE.Group();
scene.add(group);

// Lights
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 128, 128 );
scene.add( directionalLight );

// Sphere Wireframe Inner
var sphereWireframeInner = new THREE.Mesh(
  new THREE.DodecahedronGeometry( innerSize, 2 ),
  new THREE.MeshLambertMaterial({ 
    color: innerColor,
    ambient: innerColor,
    wireframe: true,
    transparent: true, 
    //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/alphamap.jpg' ),
    shininess: 0
  })
);
scene.add(sphereWireframeInner);

// Sphere Wireframe Outer
var sphereWireframeOuter = new THREE.Mesh(
  new THREE.DodecahedronGeometry( outerSize, 2 ),
  new THREE.MeshLambertMaterial({ 
    color: outerColor,
    ambient: outerColor,
    wireframe: true,
    transparent: true,
    //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/alphamap.jpg' ),
    shininess: 0 
  })
);
scene.add(sphereWireframeOuter);


// Sphere Glass Inner
var sphereGlassInner = new THREE.Mesh(
  new THREE.SphereGeometry( innerSize, 32, 32 ),
  new THREE.MeshPhongMaterial({ 
    color: innerColor,
    ambient: innerColor,
    transparent: true,
    shininess: 25,
    //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/twirlalphamap.jpg' ),
    opacity: 0.3,
  })
);
scene.add(sphereGlassInner);

// Sphere Glass Outer
var sphereGlassOuter = new THREE.Mesh(
  new THREE.SphereGeometry( outerSize, 32, 32 ),
  new THREE.MeshPhongMaterial({ 
    color: outerColor,
    ambient: outerColor,
    transparent: true,
    shininess: 25,
    //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/twirlalphamap.jpg' ),
    opacity: 0.3,
  })
);
scene.add(sphereGlassOuter);

// Particles Outer
var geometry = new THREE.Geometry();
for (i = 0; i < 35000; i++) {
  
  var x = -1 + Math.random() * 2;
  var y = -1 + Math.random() * 2;
  var z = -1 + Math.random() * 2;
  var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  x *= d;
  y *= d;
  z *= d;
   
  var vertex = new THREE.Vector3(
         x * outerSize,
         y * outerSize,
         z * outerSize
  );
   
  geometry.vertices.push(vertex);

}


var particlesOuter = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
  size: 0.1,
  color: outerColor,
  //map: THREE.ImageUtils.loadTexture( 'javascripts/particletextureshaded.png' ),
  transparent: true,
  })
);
scene.add(particlesOuter);

// Particles Inner
var geometry = new THREE.Geometry();
for (i = 0; i < 35000; i++) {
  
  var x = -1 + Math.random() * 2;
  var y = -1 + Math.random() * 2;
  var z = -1 + Math.random() * 2;
  var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  x *= d;
  y *= d;
  z *= d;
   
  var vertex = new THREE.Vector3(
         x * outerSize,
         y * outerSize,
         z * outerSize
  );
   
  geometry.vertices.push(vertex);

}


var particlesInner = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
  size: 0.1,
  color: innerColor,
  //map: THREE.ImageUtils.loadTexture( 'javascripts/particletextureshaded.png' ),
  transparent: true,
  })
);
scene.add(particlesInner);

// Starfield
var geometry = new THREE.Geometry();
for (i = 0; i < 5000; i++) {
  var vertex = new THREE.Vector3();
  vertex.x = Math.random()*2000-1000;
  vertex.y = Math.random()*2000-1000;
  vertex.z = Math.random()*2000-1000;
  geometry.vertices.push(vertex);
}
var starField = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
  size: 2,
  color: 0xffff99
  })
);
scene.add(starField);

camera.position.z = -110;

/*var renderModel = new THREE.RenderPass( scene, camera );
var effectBloom = new THREE.BloomPass( 2.5, 4, 0.01, 1024 );
var effectFilm = new THREE.FilmPass( 0.90, 0.9, 2048, false );

effectFilm.renderToScreen = false;

composer = new THREE.EffectComposer( renderer );

composer.addPass( renderModel );
composer.addPass( effectBloom );
composer.addPass( effectFilm );*/


var time = new THREE.Clock();

var render = function () {  
  camera.position.x = mouseX * 0.05;
  camera.position.y = -mouseY * 0.05;
  camera.lookAt(scene.position);

  sphereWireframeInner.rotation.x += 0.002;
  sphereWireframeInner.rotation.z += 0.002;
  
  sphereWireframeOuter.rotation.x += 0.001;
  sphereWireframeOuter.rotation.z += 0.001;
  
  sphereGlassInner.rotation.y += 0.005;
  sphereGlassInner.rotation.z += 0.005;

  sphereGlassOuter.rotation.y += 0.01;
  sphereGlassOuter.rotation.z += 0.01;

  particlesOuter.rotation.y += 0.0005;
  particlesInner.rotation.y -= 0.002;
  
  starField.rotation.y -= 0.002;

  var innerShift = Math.abs(Math.cos(( (time.getElapsedTime()+2.5) / 20)));
  var outerShift = Math.abs(Math.cos(( (time.getElapsedTime()+5) / 10)));

  starField.material.color.setHSL(Math.abs(Math.cos((time.getElapsedTime() / 10))), 1, 0.5);

  sphereWireframeOuter.material.color.setHSL(0, 1, outerShift);
  sphereGlassOuter.material.color.setHSL(0, 1, outerShift);
  particlesOuter.material.color.setHSL(0, 1, outerShift);

  sphereWireframeInner.material.color.setHSL(0.08, 1, innerShift);
  particlesInner.material.color.setHSL(0.08, 1, innerShift);
  sphereGlassInner.material.color.setHSL(0.08, 1, innerShift);

  sphereWireframeInner.material.opacity = Math.abs(Math.cos((time.getElapsedTime()+0.5)/0.9)*0.5);
  sphereWireframeOuter.material.opacity = Math.abs(Math.cos(time.getElapsedTime()/0.9)*0.5);


  directionalLight.position.x = Math.cos(time.getElapsedTime()/0.5)*128;
  directionalLight.position.y = Math.cos(time.getElapsedTime()/0.5)*128;
  directionalLight.position.z = Math.sin(time.getElapsedTime()/0.5)*128;

  renderer.render(scene, camera);
  //renderer.clear();
  //composer.render(time.getElapsedTime());
  requestAnimationFrame(render);  
};

render();


// Mouse and resize events
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove( event ) {
  mouseX = event.clientX - window.innerWidth/2;
  mouseY = event.clientY - window.innerHeight/2;
}