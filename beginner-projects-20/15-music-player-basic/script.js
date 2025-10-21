const tracks = [
  { title:"Track 1 (sample)", src:"https://cdn.pixabay.com/download/audio/2021/09/30/audio_c1ab3c.mp3?filename=ambient-10694.mp3" },
  { title:"Track 2 (sample)", src:"https://cdn.pixabay.com/download/audio/2021/10/26/audio_b0e2b3.mp3?filename=deep-ambient-113274.mp3" }
];
const player = document.getElementById("player");
const now = document.getElementById("now");
let i=0;
function load(){ player.src = tracks[i].src; now.textContent = tracks[i].title; }
document.getElementById("prev").onclick = ()=>{ i=(i-1+tracks.length)%tracks.length; load(); player.play(); };
document.getElementById("next").onclick = ()=>{ i=(i+1)%tracks.length; load(); player.play(); };
load();
