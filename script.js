let user = document.getElementById('user');
let pass = document.getElementById('pass');
let btn = document.getElementById('btn');
let l = document.querySelector('.load');
let login = document.querySelector('.login');
let error = document.querySelector('.error');
let close = document.getElementById('close');
let x =0;
let text = ["ayoub", "ziad", "mohamed", "mehdi", "wassim","wissam","asia","kosay","siham","soukaina","zakaria","douae","faty","hassan","yasser","iman"];

if(localStorage.name && localStorage.code){
  user.readOnly = true;
  pass.readOnly = true;
  user.value = localStorage.name;
  function enter(){
    if (x<localStorage.code.length){
    pass.value +=  localStorage.code.charAt(x);
       x+=1;
       setTimeout(enter , 200)
    }
  }
  enter();
  setTimeout(function () {
    btn.click()
  },2300)
  
}
close.onclick = function () {
  error.style.display='none';
  login.style.display='flex';
  
}
btn.onclick = function () {

  let index = text.indexOf(user.value.toLowerCase());
  if(index != -1 && pass.value == 'OFPPT@2023'){
   setTimeout(function () {
      login.style.display='none';
    },500)
    setTimeout(function () {
      l.style.display='block';
    },700)
    setTimeout(function () {
    location.href='index1.html';  
    },4700)
    localStorage.code = pass.value;
    localStorage.name = user.value.toLowerCase();
    
  }
  else {
    setTimeout(function () {
      login.style.display='none';
    },500)
    setTimeout(function () {
      l.style.display='block';
    },700)    
    setTimeout(function () {
      error.style.display='flex';
  login.style.display='none';
  l.style.display='none';
    },8000)    
  }
}
user.ondblclick = function () {
  this.readOnly = false;
}
pass.ondblclick = function () {
  this.readOnly = false;
}
 