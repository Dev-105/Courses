let main = document.querySelector('main');
let nameall = ['base de donne','Html','python','css','php','js']
let linkall = ['https://youtube.com/playlist?list=PLF2W_rB6QiYA_sntTNR4XK_aVMKs9sx4E&si=sYSCk-k0zK2ThwGS','https://youtube.com/playlist?list=PLknwEmKsW8OuN04Odt2sJqt4aAnkp-iYA&si=z8xqkgNRxeBnMl0h','https://youtube.com/playlist?list=PLknwEmKsW8OsG8dnisr_-2WGyx7lpgGEE&si=qXGk1cAW3xBBOTqi','https://youtube.com/playlist?list=PLknwEmKsW8Os7rKViMCL8x6irVJT7McSS&si=j1bfpN4gJh5hSPzA','https://youtube.com/playlist?list=PLSiLeKadTQ7mfep8d_FXWLnoARZyXJ5ob&si=qbmma7Q-nBiSkt-h','https://youtube.com/playlist?list=PLknwEmKsW8OuTqUDaFRBiAViDZ5uI3VcE&si=5CQ8RYglZBFk1BZu']
function  lang(name , link ) {
  let a = document.createElement('a')
  a.href = link ;
  a.textContent = name   
  let div = document.querySelector('main').appendChild(a); 
}
for (let i = 0 ; i<nameall.length; i++ ) {
  lang(nameall[i],linkall[i],i);
  
}
let back = document.getElementById('back');
let fo = document.getElementById('for');
back.onclick = function () {
  setTimeout(function () {
    location.href= ' index.html';
  },2000)
}
fo.onclick = function () {
  setTimeout(function () {
    location.href= ' index2.html';
  },2000)
}
document.getElementById('lmp').onclick= function () {
  location.href='lmp.png'
}

document.getElementById('grp').onclick=function () {
  location.href='https://wa.me/212633549914'
}
document.getElementById('about').onclick=function () {
  location.href='https://www.myway.ac.ma/fr'
}