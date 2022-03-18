var trex, trex_running, edges;
var groundImage ,chao;
var chaoinvisivel
var nuvem, nuvem2
var obstaculos, cacto1,cacto2,cacto3,cacto4,cacto5,cacto6
var score=0
var grupodenuvens,grupodecactos;
var estadodejogo="inicio"
var trexassustado
var gameover, restart,gameover2,restart2
var pular, morrer, checkpoint

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvem = loadImage("cloud.png")
  cacto1=loadImage("obstacle1.png")
  cacto2=loadImage("obstacle2.png")
  cacto3=loadImage("obstacle3.png")
  cacto4=loadImage("obstacle4.png")
  cacto5=loadImage("obstacle5.png")
  cacto6=loadImage("obstacle6.png")
  trexassustado=loadImage("trex_collided.png")
  restart2=loadImage("restart.png")
  gameover2=loadImage("gameOver.png")
  pular=loadSound("jump.mp3")
  morrer=loadSound("checkpoint.mp3")
  checkpoint=loadSound("die.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(60,height-30,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trexassustado",trexassustado)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  chao= createSprite(width/2,height-20)
  chao.addImage(groundImage)
  chaoinvisivel= createSprite(width/2,height-10,width,15)
  chaoinvisivel.visible=false
  grupodenuvens=new Group()
    grupodecactos=new Group()
  trex.debug=false 
  //trex.setCollider("circle",0,0,40)
  trex.setCollider("rectangle",0,0,240,100,0)
  gameover=createSprite(width/2,height/2)
  gameover.addImage(gameover2)
  restart=createSprite(width/2+100,height/2+50)
  restart.addImage(restart2)
  restart.scale = 0.5;
  gameover.visible=false
  restart.visible=false
  
}


function draw(){
  //definir a cor do plano de fundo 
  background("lavender");
  text ("pontos "+score,width-100,20)
  if (score>0&&score%100===0){
    checkpoint.play()
  }
  //registrando a posição y do trex
  console.log(trex.y)
  if (estadodejogo==="inicio") {
  score=score+Math.round( frameCount/120)

    //pular quando tecla de espaço for pressionada 
  if(touches.length>0||keyDown("space")&&trex.y>height-60){
    trex.velocityY = -10;
    pular.play()
    touches=[]
    
  }
  
  trex.velocityY = trex.velocityY + 0.5;
 chao.velocityX=-(5+score/100)
  if (chao.x<0){
  chao.x=chao.width/2
}
 criadordenuvens()
  criadordecactos()
  if(trex.isTouching(grupodecactos)){ 
  estadodejogo="game over ;-;"
  morrer.play()
  //trex.velocityY = -13;
}
}
else if(estadodejogo==="game over ;-;"){ 
chao.velocityX=0
trex.velocityY=0
grupodecactos.setVelocityXEach(0)
grupodenuvens.setVelocityXEach(0)
trex.changeAnimation("trexassustado",trexassustado)
grupodenuvens.setLifetimeEach(-1)
grupodecactos.setLifetimeEach(-1)
gameover.visible=true
restart.visible=true
  if(touches.length>0||keyDown("space")||mousePressedOver(restart)){ 
  console.log("quique") 
   volta()
   touches=[]
  }  
}

  
 
 //impedir que o trex caia
  trex.collide(chaoinvisivel)

  drawSprites();
 
}
function criadordenuvens(){
  if (frameCount%50===0){
  nuvem2=createSprite(width+10,100)
  nuvem2.addImage(nuvem)
  nuvem2.velocityX=-5
  nuvem2.y=Math.round(random(5,height/2))
  nuvem2.depth=trex.depth
  trex.depth=trex.depth+1
  nuvem2.lifetime=700
  grupodenuvens.add(nuvem2)
}
}
function volta(){
  console.log("funcao")
  estadodejogo="inicio"
  gameover.visible=false
  restart.visible=false
  grupodecactos.destroyEach()
  grupodenuvens.destroyEach()
  trex.changeAnimation("running", trex_running);
  score=0
}


function criadordecactos(){
  if (frameCount%50===0){
    obstaculos= createSprite(width+10,height-30)
    obstaculos.velocityX=-(5+score/100)
    obstaculos.scale=0.7 
    var escolha=Math.round(random(1,6))
    switch (escolha) {
      case 1:obstaculos.addImage(cacto1)
        break;
       case 2:obstaculos.addImage(cacto2)
        break;
       case 3:obstaculos.addImage(cacto3)
        break;
       case 4:obstaculos.addImage(cacto4)
        break;
       case 5:obstaculos.addImage(cacto5)
        break;
      case 6:obstaculos.addImage(cacto6)
        break;
      default:
        break;

    }
    obstaculos.lifetime=700
    grupodecactos.add(obstaculos)
}
}