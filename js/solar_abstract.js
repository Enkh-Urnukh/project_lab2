//Enkh-Urnukh Tsolmon
//Project Lab 1
//3D Rendering in Web Browser

let speed1 = 1; //for showing the speed
    let stars = []; //array for stars
    let camera, renderer, sun;
    //objects for planets
    let mercury = new THREE.Object3D();
    let venus = new THREE.Object3D();
    let earth = new THREE.Object3D();
    let mars = new THREE.Object3D();
    let jupiter = new THREE.Object3D();
    let saturn = new THREE.Object3D();
    let uranus = new THREE.Object3D();
    let neptune = new THREE.Object3D();
    let moon = new THREE.Object3D();
    let mesh_mercury, mesh_venus, mesh_earth, mesh_mars, mesh_jupiter, mesh_saturn, mesh_uranus, mesh_neptune, mesh_moon;
    let orbit_color = 0xff0000;
    let planet_size = 0.7; 
    let orbit_size = 15;
    let sun_size=10;
    let scene = new THREE.Scene();
    let planets = [];

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    //background set up
    bg_texture=new THREE.TextureLoader().load( 'img/stars.jpg' );
    bg_texture.userData = {
	    fitTo : 100
    };
    bg_texture.wrapS = THREE.RepeatWrapping;
    bg_texture.wrapT = THREE.RepeatWrapping;
    scene.background = bg_texture;
    let speed = Math.PI/55; //Since there every planets rotate 360 degrees and frames per second
                            //on average is 55, I adjust the speed by doing this
    //textures for the planets
    let sun_texture = new THREE.TextureLoader().load( 'img/sun.jpg' );
    let mercury_texture = new THREE.TextureLoader().load( 'img/mercury.jpg' );
    let venus_texture = new THREE.TextureLoader().load( 'img/venus.jpg' );
    let earth_texture = new THREE.TextureLoader().load( 'img/earth.jpg' );
    let moon_texture = new THREE.TextureLoader().load( 'img/moon.jpg' );
    let mars_texture = new THREE.TextureLoader().load( 'img/mars.jpg' );
    let jupiter_texture = new THREE.TextureLoader().load( 'img/jupiter.jpg' );
    let saturn_texture = new THREE.TextureLoader().load( 'img/saturn.jpg' );
    let saturn_ring_texture = new THREE.TextureLoader().load( 'img/saturn_ring.png' );
    let uranus_texture = new THREE.TextureLoader().load( 'img/uranus.jpg' );
    let neptune_texture = new THREE.TextureLoader().load( 'img/neptune.jpg' );

    //I was about to use RayCaster for clicking on each planet to do something, but not working properly
/*     function onDocumentMouseDown( event ) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
        raycaster.setFromCamera( mouse, camera ); 
        // calculate objects intersecting the picking ray var intersects =     
        var intersects = raycaster.intersectObjects( planets ); 
       
        for ( var i = 0; i < intersects.length; i++ ) { 
          intersects[ i ].object.material.color.set( 0xff0000 ); 
        }
      
    
    } */
    function colorChange(selectObject){
        if (selectObject.value == "blue")
            orbit_color = 0x0000ff;
        else if (selectObject.value == "red")
            orbit_color = 0xff0000;
        else if (selectObject.value == "gray")
            orbit_color = 0xb0b0b0;
        else if (selectObject.value == "yellow")
            orbit_color = 0xffff00;

    }
    //orbits for each planets
    let orbit_setup = function(){
        let geometry = new THREE.CircleGeometry(orbit_size, 100);
        let material = new THREE.LineBasicMaterial( { color : orbit_color } );
        geometry.vertices.shift(); //removes center vertex
        let mercury_orbit = new THREE.LineLoop( geometry, material );
        scene.add(mercury_orbit);

        geometry = new THREE.CircleGeometry(2*orbit_size, 100);
        geometry.vertices.shift(); //removes center vertex
        let venus_orbit = new THREE.LineLoop( geometry, material );
        scene.add(venus_orbit);

        geometry = new THREE.CircleGeometry(3*orbit_size, 100);
        geometry.vertices.shift(); //removes center vertex
        let earth_orbit = new THREE.LineLoop( geometry, material );
        scene.add(earth_orbit);

        geometry = new THREE.CircleGeometry(4*orbit_size, 100);
        geometry.vertices.shift(); //removes center vertex
        let mars_orbit = new THREE.LineLoop( geometry, material );
        scene.add(mars_orbit);

        geometry = new THREE.CircleGeometry(5*orbit_size, 100);
        geometry.vertices.shift(); //removes center vertex
        let jupiter_orbit = new THREE.LineLoop( geometry, material );
        scene.add(jupiter_orbit);

        geometry = new THREE.CircleGeometry(6*orbit_size, 100);
        geometry.vertices.shift(); //removes center vertex
        let saturn_orbit = new THREE.LineLoop( geometry, material );
        scene.add(saturn_orbit);

        geometry = new THREE.CircleGeometry(7*orbit_size, 100);
        geometry.vertices.shift(); //removes center vertex
        let uranus_orbit = new THREE.LineLoop( geometry, material );
        scene.add(uranus_orbit);

        geometry = new THREE.CircleGeometry(8*orbit_size, 100);
        geometry.vertices.shift(); //removes center vertex
        let neptune_orbit = new THREE.LineLoop( geometry, material );
        scene.add(neptune_orbit);
    }    

    //functions for adjusting speed   
    let decreaseSpeed=function(){
        if (speed1 >0){
        speed -= Math.PI/55; //since rotation is 360 degrees and frames per second is 50-60
                            //on average it is 55 fps, we adjust speed this way
        speed1--;
        document.getElementById("speed").innerHTML=speed1 + " days per second";
        }
    }
    let increaseSpeed=function(){
         speed += Math.PI/55;
        speed1++;
        document.getElementById("speed").innerHTML=speed1 + " days per second";
        
    }
    //creating solar system
    //orbit size is fixed, which is convenient to look how all the planets move   
    let createSolarSystem = function() {
        let geometry = new THREE.SphereGeometry(sun_size,40,40);
        let material = new THREE.MeshPhongMaterial({map: sun_texture});
        sun = new THREE.Mesh(geometry, material);
        sun.add(mercury,venus,earth,mars,jupiter,saturn,uranus,neptune);
        earth.add(moon);
        
        
        geometry = new THREE.SphereGeometry(planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: mercury_texture});
        mesh_mercury= new THREE.Mesh(geometry, material);
        mesh_mercury.position.x=orbit_size;
        mercury.add(mesh_mercury);
       

        geometry = new THREE.SphereGeometry(2.48*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: venus_texture});
        mesh_venus = new THREE.Mesh(geometry, material);
        mesh_venus.position.x=2*orbit_size;
        venus.add(mesh_venus);

        geometry = new THREE.SphereGeometry(2.62*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: earth_texture});
        mesh_earth= new THREE.Mesh(geometry, material);
        mesh_earth.position.x=3*orbit_size;
        mesh_earth.rotation.x+=Math.PI/2;
        earth.add(mesh_earth);
        planets.push(mesh_earth);

        geometry = new THREE.SphereGeometry(1.39*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: mars_texture});
        mesh_mars= new THREE.Mesh(geometry, material);
        mesh_mars.position.x=4*orbit_size;
        mesh_mars.rotation.x+=Math.PI/2;
        mars.add(mesh_mars);
        
        geometry = new THREE.SphereGeometry(7.31*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: jupiter_texture});
        mesh_jupiter= new THREE.Mesh(geometry, material);
        mesh_jupiter.position.x=5*orbit_size;
        mesh_jupiter.rotation.x+=Math.PI/2;
        jupiter.add(mesh_jupiter);

        geometry = new THREE.SphereGeometry(4.31*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: saturn_texture});
        mesh_saturn= new THREE.Mesh(geometry, material);
        mesh_saturn.position.x=6*orbit_size;
        mesh_saturn.rotation.x+=Math.PI/2;
        saturn.add(mesh_saturn);
        
        geometry = new THREE.TorusGeometry(5,1.25,2, 40);
        material = new THREE.MeshPhongMaterial({map: saturn_ring_texture});
        mesh_ring = new THREE.Mesh(geometry, material);
        mesh_ring.position.x=6*orbit_size;
        //mesh_ring.rotation.x=1.7;
        saturn.add(mesh_ring);


        geometry = new THREE.SphereGeometry(3.31*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: uranus_texture});
        mesh_uranus= new THREE.Mesh(geometry, material);
        mesh_uranus.position.x=7*orbit_size;
        mesh_uranus.rotation.x+=Math.PI/2;
        uranus.add(mesh_uranus);

        geometry = new THREE.SphereGeometry(4.31*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: neptune_texture});
        mesh_neptune= new THREE.Mesh(geometry, material);
        mesh_neptune.position.x=8*orbit_size;
        mesh_neptune.rotation.x+=Math.PI/2;
        neptune.add(mesh_neptune);

        geometry = new THREE.SphereGeometry(0.71*planet_size,40,40);
        material = new THREE.MeshPhongMaterial({map: moon_texture});
        mesh_moon = new THREE.Mesh(geometry, material);
        mesh_moon.position.x = 3*orbit_size+4;
        moon.add(mesh_moon);

        scene.add(sun); //adding everything to the scene
    }

	// creating stars = not accurate, but just for little decoration
    // creates stars every frames on a random position
    // they move towards the camera, which is z direction
	function addStars(){
		for ( var z= -1000; z < 1000; z+=20 ) {
		    let geometry   = new THREE.SphereGeometry(0.5, 32, 32)
		    let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		    let star = new THREE.Mesh(geometry, material)
		    star.position.x= Math.random()*window.innerWidth-Math.random()*window.innerWidth*2;
		    star.position.y=Math.random()*window.innerHeight-Math.random()*window.innerHeight*2;
            star.position.z = z;	
		    star.scale.x = star.scale.y = 1;
		    scene.add(star); 
			stars.push(star); 
		}
	}
	function animateStars() {
		for(var i=0; i<stars.length; i++) {
			star = stars[i]; 
			star.position.z +=  i/10;
			if(star.position.z>2000) star.position.z-=3000; 
					
		}
			
	}

    //initialization for renderer, camera, light
    let initial = function() {
        //camera setup
        camera = new THREE.PerspectiveCamera(75, 
                        window.innerWidth / window.innerHeight, 
                        1, 1000);
        camera.position.z = 200;
        camera.position.y = 0;
        camera.position.x = 0;

        //light creation
        let light = new THREE.PointLight(0xffffff,2,100); //sun light
        light.position.set(0,0,0)//sun's position
        let light1 = new THREE.AmbientLight(0xffffff); //ambient light for everything
        scene.add(light);
        scene.add(light1);

        //creating the renderer
        renderer = new THREE.WebGLRenderer();   
        renderer.setSize(window.innerWidth, window.innerHeight-50);
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        document.body.appendChild(renderer.domElement);

        createSolarSystem(); //creating solar system
        orbit_setup(); //creating the orbits
        addStars(); //adding stars
        document.getElementById("speed").innerHTML=speed1 + " days per second"; 
    
       // renderer.domElement.addEventListener( 'click', onDocumentMouseDown );
    };

    let render = function(){
        orbit_setup();
        renderer.render(scene, camera);
    }

    //function for planets rotations
    let rotation = function(){
        mesh_earth.rotation.y +=speed;
        earth.rotation.z += speed/365;
        mesh_mercury.rotation.y +=speed/59;
        mercury.rotation.z += speed/88;
        mesh_venus.rotation.y +=speed/243;
        venus.rotation.z += speed/224;
        mesh_mars.rotation.y +=speed;
        mars.rotation.z += speed/687;
        mesh_jupiter.rotation.y +=speed/2.4;
        jupiter.rotation.z += speed/365/11.8;
        mesh_saturn.rotation.y +=speed/2.3;
        saturn.rotation.z += speed/365/29;
        mesh_uranus.rotation.y +=speed/24/17;
        uranus.rotation.z += speed/365/84;
        mesh_neptune.rotation.y +=speed/24/16;
        neptune.rotation.z += speed/365/165;
    }
    
    //main loop, on average 55 frames per second
    let mainAnimation = function() {
        animateStars();
        rotation();
        render();
        //colorChange();
        requestAnimationFrame(mainAnimation);
    
    };

    initial();
    mainAnimation();