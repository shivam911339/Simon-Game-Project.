let gameSeq=[];
let userSeq=[];

//for choose random button
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let h2=document.querySelector("h2"); 

document.addEventListener("keypress",function() {
    if(started==false)
    {
        console.log("Game is started");
        started=true;
    }
    levelUp();

});
function gameFlash(btn)
{
    btn.classList.add("flash");
    //class ko remove karenge
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);

}
function userFlash(btn)
{
    btn.classList.add("userflash");
    //class ko remove karenge
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);

}

function levelUp()
{
    //user sequence reset ho jayega phir sa sab enter karna padega for checking sequence
    userSeq=[];

    level++;
    h2.innerText=`Level ${level}`;
    //random button ko choose karega.
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`)
    //game sequence ka andar new color ad ho jayega.
    gameSeq.push(randColor);
    gameFlash(randbtn);
}
//jo color user na press kiya hai kya wo game sequence sa milta hai
function checkAns(idx)
{
    //check level for which color in that level

    if(userSeq[idx]===gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function()
        {
            document.querySelector("body").style.backgroundColor="white";

        },150);
        reset();

    }
}


//user click kare to flash ho.
function btnPress()
{
    // button press karne ka baad kon sa kaam hona chahiye.
    let btn=this;
    userFlash(btn);

    //fetch color
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

//btnPress as callback add kar diya.
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}