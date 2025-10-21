const quotes = [
  "Học là cuộc phiêu lưu không hồi kết.",
  "Code hôm nay, thành quả ngày mai.",
  "Đơn giản là tối thượng của tinh tế."
];
document.getElementById("btn").onclick = ()=>{
  const i = Math.floor(Math.random()*quotes.length);
  document.getElementById("q").textContent = quotes[i];
};
