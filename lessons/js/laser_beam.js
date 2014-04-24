var beams = (function(exports) {
  var THREE = exports.THREE;

  var scene, camera, renderer;
  var mouseX=0, mouseY=0;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    makeLightBeam();

    document.addEventListener('mousemove', onMouseMove, false);

    animate();
  }

  function makeLightBeam() {
    var mat = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:true});
    var rec1 = new THREE.Mesh(new THREE.PlaneGeometry(100, 500), mat);
    scene.add(rec1);
  }

  function animate() {
    exports.requestAnimationFrame(animate);
    render();
  }

  function render() {
    camera.position.x += ( mouseX - camera.position.x ) * 0.1;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.1;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  function onMouseMove(event) {
    mouseX = event.clientX - (window.innerWidth / 2);
    mouseY = event.clientY - (window.innerHeight / 2);
  }

  exports.addEventListener("load", init);

})(this);
