 song = "";
 song1 = "";

scoreleftWrist = 0;
scorerightWrist = 0;
st1 = "";

 leftWristX = 0;
 leftWristY = 0;

 rightWristX = 0;
 rightWristY = 0;

 function preload(){
     song = load("oldTownRoad.mp3");
     song1 = load("Doja Cat Woman.mp3");
 }

 function setUp(){
     canvas = createCanvas(600, 500);
     canvas.center();
     video = createCapture(VIDEO);
     video.hide();
     poseNet = ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);
 }

 function modelLoaded(){
     console.log('PoseNet is Initialized');
 }

 function gotPoses(results){
     if( results.length >0){
         console.log(results);
         leftWristX = results[0].pose.leftWrist.x;
         leftWristY = results[0].pose.leftWrist.y;

         rightWristX = results[0].pose.rightWrist.x;
         rightWristY = results[0].pose.rightWrist.y;
         scoreleftWrist = results[0].pose.keypoints[9].score;
         scorerightWrist = results[0].pose.keypoints[10].score;
         
     }
 }
 
 function draw(){
     image(video, 0,0, 600, 500);
     fill("#FF0000");
     stroke("#FF0000");
     st1 = song.isPlaying();
     if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(st1 == false){
            song.play();
            document.getElementById("header").innerHTML = "OLDTOWNROAD is Playing";
        }
     }
     st1 = song1.isPlaying();
     if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song.stop();
        if(st1 == false){
            song1.play();
            document.getElementById("header").innerHTML = "Woman is Playing";
        }
     }
 }