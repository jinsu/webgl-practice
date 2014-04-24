var Field = (function(exports) {
  var THREE = exports.THREE;

  // the main three js components;
  var camera, scene, renderer;

  // to keep track of the mouse position
  var mouseX = 0, mouseY = 0;

  // an array to store our particles in
  var particles, geometry, material, i, h, color, colors = [];

  init();
  animate();

  function init() {
    // Camera params:
    camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 4000);
    // Move camera backward. default position is 0.0.0
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.Geometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight);

    makeParticles();

    // the renderer's canvas domElement is added to the body
    document.body.appendChild( renderer.domElement );


    // add the mouse move listener
    document.addEventListener( 'mousemove', onMouseMove, false );
  }

  function animate() {
    exports.requestAnimationFrame(animate);
    render();
  }

  function makeParticles() {
    var vertex;

    // move from z position -1000 (far away) to 1000 (where the camera is)
    // and add a random particle at every pos.

    for (var i=0; i < 100; i++) {
      vertex = new THREE.Vector3();

      // give the particle a random x and y position between -500 and 500
      vertex.x = Math.random() * 1000 - 500;
      vertex.y = Math.random() * 1000 - 500;

      // set its z position
      vertex.z = i*20 - 1000;
      vertex.velocity = new THREE.Vector3(0,0,25 * Math.random());

      // and to the array of particles.
      geometry.vertices.push(vertex);

      colors[i] = new THREE.Color(0xffffff);
      colors[i].setHSL(Math.random(), 1.0, 0.5);
    }

    geometry.colors=colors;

    material = new THREE.ParticleSystemMaterial({size: 20, vertexColors: true});

    particles = new THREE.ParticleSystem(geometry, material);
    particles.sortParticles = true;

    scene.add(particles);
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x - window.innerWidth/2) * 0.1;
    camera.position.y += ( mouseY - camera.position.y ) * 0.1;

    camera.lookAt(scene.position);

    for (var i=0; i < 100; i++) {
      var particle = geometry.vertices[i];
      if (particle.z > 1000) {
        particle.z = -1000 + 50 * Math.random();
        particle.velocity.z = 25*Math.random();
      }
      particle.add(particle.velocity);
    }
    geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);
  }

  function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  // exports.addEventListener("load", update);
})(this);
