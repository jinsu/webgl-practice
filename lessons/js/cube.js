var Cube = (function(exports) {
  var THREE = exports.THREE;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  var cube;

  function init() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement ); // Add the canvas element

  var geometry = new THREE.CubeGeometry(2, 2, 2);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  cube = new THREE.Mesh( geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  render();
  }

  function render() {
    exports.requestAnimationFrame(render);
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    renderer.render(scene, camera);
  }

  exports.addEventListener("load", init);

})(this);



