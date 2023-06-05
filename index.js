//DECLARANDO PLAY DO JOGO
const selecionarCaixa= document.querySelector(".selecionar"),
selectXBtn= selecionarCaixa.querySelector(".playerX");
caixa = document.querySelector(".caixa");
///////////////////////////////////////////////////////////////////

//DECLARANDO CRIAÇÕO DO JOGO
const celulas = document.querySelectorAll(".celula");
const JOGADOR_X = "X";
const JOGADOR_O = "O";
let fim= false;
let playerXIcon = "fas fa-times";
let playerOIcon = "fas fa-circulo";
///////////////////////////////////////////////////////////////////

//DECLARANDO COMBINAÇÕES ==> MATRIZ
const Combinacoes = [
    [0,1,2],[3,4,5],
    [6,7,8],[0,3,6],
    [1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
    
]

///////////////////////////////////////////////////////////////////


//COMEÇAR JOGO

window.onload = () =>{
  selectXBtn.onclick = ()=>{
    selecionarCaixa.classList.add("hide");
    caixa.classList.add("show")
  }

}

function clickedBox(elemento){
  if (playerXIcon.classList.contains("players")){
    elemento.innerHTML = `<i class="${playerXIcon}"></i>`;
  }
}

//CLICK NA CELULA

document.addEventListener("click", (event) =>{
  if(event.target.matches(".celula")){
    jogar(event.target.id, JOGADOR_X);
    setTimeout(() => bot(), 500) ;
    
  }
});


//VEZ DO BOT CHECAR SE HÁ CELULAS DISPONÍVEIS PARA JOGAR

function bot(){
  const vezDoBot = []
     for(index in celulas){
       if(!isNaN(index)){
        if(
           !celulas[index].classList.contains("X") &&
           !celulas[index].classList.contains("O")
          ){
            vezDoBot.push(index);
          }

       }
  }


  const posicoes = Math.floor(
    Math.random() * vezDoBot.length
   );
   if(!fim){
    jogar(vezDoBot[posicoes],JOGADOR_O);  
   } 
  
   
}



function jogar (id, jogo){
   const celula = document.getElementById(id);
   
   celula.textContent = jogo;
   celula.classList.add(jogo);
  
   checarVencedor(jogo);
}


//CHECAR SE HOUVE ALGUM VENCEDOR

function checarVencedor(jogo){
  const vencedor = Combinacoes.some((com) =>{
     return com.every((index) => {
       return celulas[index].classList.contains(jogo);
     })
  });

  if (vencedor){
        encerrarJogo(jogo);
  }else if (checarEmpate()){
       encerrarJogo();
 
  }
}


//CHECAR SE HOUVE ALGUM EMPATE

function checarEmpate(){
   let x = 0
   let o = 0

   for (index in celulas){
    if(!isNaN(index)){
        if(celulas[index].classList.contains(JOGADOR_X)){
            x++;
        }
    
        if(celulas[index].classList.contains(JOGADOR_O)){
            o++;
        }
    }
   
   }
   return x + o === 9 ? true : false;
}
    

//ENCERRAR O JOGO CASO HAJA UN VENCEDOR OU DE EMPATE

function  encerrarJogo(vencedor = null){
  fim = true
const blackScreen = document.getElementById("black-screen");
const h2 = document.createElement("h2");
const h3 = document.createElement("h3");
let mensagem = null;

blackScreen.style.display = "block";
blackScreen.appendChild(h2);
blackScreen.appendChild(h3);


    if (vencedor){

      h2.innerHTML =`O PLAYER <span>${vencedor}</span> VENCEU !!!`;
       
   }else {
        h2.innerHTML = "EMPATE";
   }
   
   let segundos = 3;
   setInterval(() =>{
   h3.innerHTML = `Reiniciando em ${segundos--}`;
   }, 1000);

   setTimeout(()=> location.reload(), 4000);

   
 }

 
