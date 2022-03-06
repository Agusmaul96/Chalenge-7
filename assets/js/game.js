// // Fungsi random Komputer
function pilComputer() {
  const comp = Math.floor(Math.random() * 3);
  if (comp === 0) {
    document.getElementById("com-gunting").style.backgroundColor = "#C4C4C4";
    return "gunting";
  } else if (comp === 1) {
    document.getElementById("com-kertas").style.backgroundColor = "#c4c4c4";
    return "kertas";
  } else {
    document.getElementById("com-batu").style.backgroundColor = "#C4C4C4";
    return "batu";
  }
}
// Fungsi Hasil
function getHasil(comp, player) {
  if (player == comp) return "DRAW!";
  if (player == "gunting") return comp == "kertas" ? "YOU WIN!" : "COM WIN!";
  if (player == "kertas") return comp == "gunting" ? "COM WIN!" : "YOU WIN!";
  if (player == "batu") return comp == "kertas" ? "COM WIN" : "YOU WIN!";
}

const player = document.querySelectorAll(".player div");

let comWin = 0,
  playerWin = 0;
const removeAll = () => {
  player.forEach((player) => {
    player.style.backgroundColor = "";
  });
};
// Player Klik Pilihan
player.forEach((player) => {
  player.onclick = () => {
    removeAll();
    player.style.backgroundColor = "#c4c4c4";

    const pilihanComputer = pilComputer();
    const pilihanPlayer = player.className;
    const hasil = getHasil(pilihanComputer, pilihanPlayer);

    document.querySelector(".result .vs-text").style.display = "none";
    document.querySelector(".result .hasil").style.backgroundColor = "green";
    const info = document.querySelector(".hasil");
    // info.setAttribute("src", "asets/img/" + hasil + ".png");
    info.innerHTML = hasil;
    // // log Hasil console
    // console.log("computer :" + pilihanComputer);
    // console.log("player :" + pilihanPlayer);
    // console.log("hasil :" + hasil);
    // fungsi score
    let userWin = document.querySelector(".score .score-player");
    let cpuWin = document.querySelector(".score .score-computer");
    // remove background computer
    if (pilihanComputer == "gunting") {
      document.getElementById("com-batu").style.backgroundColor = "";
      document.getElementById("com-kertas").style.backgroundColor = "";
    } else if (pilihanComputer == "kertas") {
      document.getElementById("com-gunting").style.backgroundColor = "";
      document.getElementById("com-batu").style.backgroundColor = "";
    } else {
      document.getElementById("com-kertas").style.backgroundColor = "";
      document.getElementById("com-gunting").style.backgroundColor = "";
    }
    // fungsi score game
    if (hasil == "YOU WIN!") {
      playerWin++;
      userWin.innerHTML = playerWin;
    } else if (hasil == "COM WIN!") {
      comWin++;
      cpuWin.innerHTML = comWin;
    }
  };
});
