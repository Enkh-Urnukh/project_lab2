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
    let sun_size=4;
    let scene = new THREE.Scene();
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

    //orbits for each planets
    let orbit_setup = function(){
        let geometry = new THREE.CircleGeometry(5.79/2,32);
        let material = new THREE.LineBasicMaterial( { color : orbit_color } );
       
        geometry.vertices.shift(); //removes center vertex
        let mercury_orbit = new THREE.LineLoop( geometry, material );
        scene.add(mercury_orbit);
		
		geometry = new THREE.CircleGeometry(10.81/2,100);
        geometry.vertices.shift(); //removes center vertex
        let venus_orbit = new THREE.LineLoop(geometry, material);
        scene.add(venus_orbit);

        geometry = new THREE.CircleGeometry(14.96/2,100);
        geometry.vertices.shift(); //removes center vertex
        let earth_orbit = new THREE.LineLoop(geometry, material);
        scene.add(earth_orbit);

        geometry = new THREE.CircleGeometry(22.79/2,100);
        geometry.vertices.shift(); //removes center vertex
        let mars_orbit = new THREE.LineLoop(geometry, material);
        scene.add(mars_orbit);

        geometry = new THREE.CircleGeometry(77.84/2,100);
        geometry.vertices.shift(); //removes center vertex
        let jupiter_orbit = new THREE.LineLoop(geometry, material);
        scene.add(jupiter_orbit);

        geometry = new THREE.CircleGeometry(142.7/2,100);
        geometry.vertices.shift(); //removes center vertex
        let saturn_orbit = new THREE.LineLoop(geometry, material);
        scene.add(saturn_orbit);

        geometry = new THREE.CircleGeometry(287.06/2,100);
        geometry.vertices.shift(); //removes center vertex
        let uranus_orbit = new THREE.LineLoop(geometry, material);
        scene.add(uranus_orbit);

        geometry = new THREE.CircleGeometry(449.97/2,100);
        geometry.vertices.shift(); //removes center vertex
        let neptune_orbit = new THREE.LineLoop(geometry, material);
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
        
        geometry = new THREE.SphereGeometry(sun_size/277,40,40);
        material = new THREE.MeshPhongMaterial({map: mercury_texture});
        mesh_mercury= new THREE.Mesh(geometry, material);
        mesh_mercury.position.x=5.79/2;
        mercury.add(mesh_mercury);

        geometry = new THREE.SphereGeometry(sun_size/113,40,40);
        material = new THREE.MeshPhongMaterial({map: venus_texture});
        mesh_venus = new THREE.Mesh(geometry, material);
        mesh_venus.position.x=10.81/2;
        venus.add(mesh_venus);

        geometry = new THREE.SphereGeometry(sun_size/108,40,40);
        material = new THREE.MeshPhongMaterial({map: earth_texture});
        mesh_earth= new THREE.Mesh(geometry, material);
        mesh_earth.position.x=14.96/2;
        mesh_earth.rotation.x+=Math.PI/2;
        earth.add(mesh_earth);

        geometry = new THREE.SphereGeometry(sun_size/208,40,40);
        material = new THREE.MeshPhongMaterial({map: mars_texture});
        mesh_mars= new THREE.Mesh(geometry, material);
        mesh_mars.position.x=22.79/2;
        mesh_mars.rotation.x+=Math.PI/2;
        mars.add(mesh_mars);
        
        geometry = new THREE.SphereGeometry(sun_size/9.7,40,40);
        material = new THREE.MeshPhongMaterial({map: jupiter_texture});
        mesh_jupiter= new THREE.Mesh(geometry, material);
        mesh_jupiter.position.x=77.84/2;
        mesh_jupiter.rotation.x+=Math.PI/2;
        jupiter.add(mesh_jupiter);

        geometry = new THREE.SphereGeometry(sun_size/11.4,40,40);
        material = new THREE.MeshPhongMaterial({map: saturn_texture});
        mesh_saturn= new THREE.Mesh(geometry, material);
        mesh_saturn.position.x=142.7/2;
        mesh_saturn.rotation.x+=Math.PI/2;
        saturn.add(mesh_saturn);
        
        geometry = new THREE.TorusGeometry(sun_size/11.4+0.3,0.2,2, 40);
        material = new THREE.MeshPhongMaterial({map: saturn_ring_texture});
        mesh_ring = new THREE.Mesh(geometry, material);
        mesh_ring.position.x=142.7/2;
        //mesh_ring.rotation.x=1.7;
        saturn.add(mesh_ring);


        geometry = new THREE.SphereGeometry(sun_size/26.8,40,40);
        material = new THREE.MeshPhongMaterial({map: uranus_texture});
        mesh_uranus= new THREE.Mesh(geometry, material);
        mesh_uranus.position.x=287/2;
        mesh_uranus.rotation.x+=Math.PI/2;
        uranus.add(mesh_uranus);

        geometry = new THREE.SphereGeometry(sun_size/27.7,40,40);
        material = new THREE.MeshPhongMaterial({map: neptune_texture});
        mesh_neptune= new THREE.Mesh(geometry, material);
        mesh_neptune.position.x=449.7/2;
        mesh_neptune.rotation.x+=Math.PI/2;
        neptune.add(mesh_neptune);

        geometry = new THREE.SphereGeometry(sun_size/400,40,40);
        material = new THREE.MeshPhongMaterial({map: moon_texture});
        mesh_moon = new THREE.Mesh(geometry, material);
        mesh_moon.position.x = 14.96/2+4;
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
    };

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
        renderer.render(scene, camera);
        requestAnimationFrame(mainAnimation);
    };

    initial();
    mainAnimation();