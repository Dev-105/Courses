const layouts = ['cart', 'my-tickets', 'store', 'more', 'profile'];
let layout = localStorage.page || 'my-tickets';
let html5QrCode;
let codeContent = null;
async function loading() {
    // if (navigator.onLine) {

    // } else {

    //     if (localStorage.isactive != 1) {
    //         window.location.href = 'client.html'
    //     }
    //     return;
    // }
    loadingDiv = document.getElementById('loading');
    loadingDiv.innerHTML = `
        <div class="loading">
            <img src="./tram.png" alt="tram" class="img-tram-logo">
            <div class="reload-logo"></div>
        </div>
  `;
    // if (localStorage.cle) {

    //     let data = await callapi(localStorage.cle);
    //     if (!data.data.isactive) {
    //         localStorage.isactive = 0;
    //     }

    // }
    // else {
    //     window.location.href = 'client.html';
    // }
    setTimeout(() => {
        loadingDiv.innerHTML = '';
        if (localStorage.codeTicket) {
            toggleTram();
        }
    }, 3000);
}
function editName() {
    let name = prompt('Enter your name');
    if (name === null || name.trim() === '') {
        alert('Invalid name. Please enter a valid name.');
        return;
    }
    localStorage.setItem('client', name);
    topDiv();
}
function editID() {
    let id = prompt('Enter your ID');
    if (id === null || id.trim() === '') {
        alert('Invalid ID. Please enter a valid ID.');
        return;
    }
    localStorage.setItem('clientID', id);
    topDiv();
}
function topDiv() {
    const topDiv = document.getElementById('top');
    topDiv.classList.remove('more-height-top');
    topDiv.innerHTML = `
        <h1>${layout.replace('-', ' ')}</h1>
    `;
    if (layout == 'more') {
        topDiv.classList.add('more-height-top');
        topDiv.innerHTML = `
        <div class="profile">
                <img src="./profile.png" alt="profile">
                <h2>
                    <p>${localStorage.getItem('client') || 'Guest'}</p><i onclick="editName()" class="bi bi-pencil-square"></i>
                </h2>
        </div>
    `;
    }
    info();
    content(true);
}
function error() {
    errorDiv = document.getElementById('error');
    setTimeout(() => {
        errorDiv.innerHTML = `
        <div class="error">
            <div class="error-content">
                <span><i class="bi bi-exclamation-triangle-fill"></i> An error has occurred, Please try again.</span>
               <button>OK</button>
            </div>
        </div>
       `;
        errorDiv.querySelector('button').addEventListener('click', () => {
            errorDiv.innerHTML = '';
        });
    }, 300);

}
function footer() {
    const footerUl = document.getElementById('footer-ul');
    const footerLis = footerUl.querySelectorAll('li');
    footerLis.forEach((li, index) => {
        li.addEventListener('click', () => {
            footerLis.forEach(li => li.classList.remove('clicked-li'));
            li.classList.add('clicked-li');
            layout = layouts[index];
            localStorage.page = layout;
            topDiv();
        });
    });
    footerLis[layouts.indexOf(layout)].click();

}
function info() {
    const infoDiv = document.getElementById('info');
    infoDiv.classList.remove('hide-bg');
    switch (layout) {
        case 'cart':
            infoDiv.innerHTML = `
                <div class="info-cart">
                    <p>Your have <b>1 product</b> in your cart</p>
                </div>
            `;
            break;
        case 'store':
            infoDiv.innerHTML = `
                <div class="info-store">
                    <select name="store" id="store-select">
                        <option value="ticket">Ticket</option>
                        <option value="abonnement">Abonnement</option>
                    </select>
                </div>
            `;
            break;
        case 'my-tickets':
            infoDiv.innerHTML = `
                <div class="info-tickets">
                    <p>Activated Tickets</p>
                    <div></div>
                    <p class="clicked-info-tickets">Available Tickets</p>
                </div>
            `;
            break;
        case 'more':
            infoDiv.classList.add('hide-bg');
            infoDiv.innerHTML = `
            <div class="info-more">
                <div class="client-id">
                    <i class="bi bi-qr-code"></i>
                    <p onclick="editID()">Client ID : ${localStorage.getItem('clientID') || 'Not set'}</p>
                </div>
                <div class="power">
                    <i class="bi bi-power"></i>
                </div>
            </div>
            `;
            break;
        default:
            break;
    }
    const infoTicketsDiv = infoDiv.querySelector('.info-tickets');
    let toggletickets = true;
    if (infoTicketsDiv) {
        const ps = infoTicketsDiv.querySelectorAll('p');
        ps.forEach(p => {
            p.addEventListener('click', () => {
                ps.forEach(p => p.classList.remove('clicked-info-tickets'));
                p.classList.add('clicked-info-tickets');
                toggletickets = !toggletickets;
                content(toggletickets);
            });
        });
    }
    const storeSelect = infoDiv.querySelector('#store-select');
    if (storeSelect) {
        content(true);
        storeSelect.addEventListener('change', () => {
            const selectedValue = storeSelect.value;
            if (selectedValue === 'ticket') {
                content(true);
            } else {
                content(false);
            }
        });
    }
}
function content(ticket = true) {
    let time = new Date(localStorage.time);
    let day = String(time.getDate()).padStart(2, '0');
    let month = String(time.getMonth() + 1).padStart(2, '0');
    let year = time.getFullYear();
    let hours = String(time.getHours()).padStart(2, '0');
    let minutes = String(time.getMinutes()).padStart(2, '0');
    let endHours = String(time.getHours() + 1).padStart(2, '0');
    let lineend = `${day} /${month}/${year} at ${endHours}:${minutes} `;
    const contentDiv = document.getElementById('content');
    contentTicket = ticket;
    ticket = ticket ? '<img src="./ticket.jpg" style="width: 90%;" alt="ticket">' : '<img src="./abonnement.jpg" alt="ticket">';
    switch (layout) {
        case 'cart':
            contentDiv.innerHTML = `
                <div class="cart-content">
                <img src="./ticket.jpg" style="width: 90%;" alt="ticket">
                <div class="cart-form">
                    <div class="checkbox">
                        <input type="checkbox" id="accept">
                        <label for="accept">I accept <b><u>the T&Cs and the TOS</u></b></label>
                    </div>
                    <div class="total">
                        <p><span>Total</span> <span>MAD7.00</span></p>
                        <button onclick="error()">Validate my cart</button>
                    </div>
                </div>
            </div>
            `;
            break;
        case 'store':
            contentDiv.innerHTML = `
                <div class="store-content" onclick="error()">
                    ${ticket}
                </div>
            `;
            break;
        case 'my-tickets':
            if (contentTicket) {
                contentDiv.innerHTML = `
                    <div class="ticket-content">
                        <div class="title">
                            <span><i class="bi bi-ticket-perforated-fill"></i><b>1</b></span>
                            <p><b>Ticket unitaire</b></p>
                        </div>
                        <button onclick="camera()">
                            Activate ticket
                        </button>
                </div>
                `;
            }
            else {
                if (localStorage.codeTicket) {
                    contentDiv.innerHTML = `
                        <div class="ticket-content">
                    <div class="title">
                        <span><i class="bi bi-person-fill-check"></i><b>1</b></span>
                        <p><b>Ticket unitaire</b></p>
                    </div>
                    <div onclick="toggleTram()" class="ticket-body">
                        <div class="time">
                            <p>Valid until</p>
                            <p><i style="color: red;" class="bi bi-calendar-x"></i> <b
                                    tyle="color: black;"><span class="end-time">${lineend}</span></b></p>
                        </div>
                        <div class="between"></div>
                        <div class="going">
                            <span><i style="color: green;" class="bi bi-circle-fill"></i> ongoing</span>
                            <div class="scan-logo">
                                <i class="bi bi-qr-code"></i>

                            </div>
                        </div>
                    </div>
                    <button onclick="camera()">
                        Activate ticket
                    </button>
                </div>
                `;
                }
                else {
                    contentDiv.innerHTML = '';
                }

            }

            break;
        case 'more':
            contentDiv.innerHTML = `
                    <div class="more-content" >
                        <img onclick="setTimeout(() => {
                    error();
                }, 1000);" src="./more.jpg" alt="">
                        <div/>
                `;
            break;
        default:
            break;
    }
}
async function login(key) {
    const api = 'api.php';
    const errorP = document.getElementById('error-p');
    let data = await callapi(key);
    if (data.status == 'success') {
        let user = data.data;
        if (!user.isactive) {
            errorP.textContent = "your account is not active";
            return false;
        }
        localStorage.isactive = user.isactive;
        localStorage.cle = user.cle;
        window.location.href = 'index.html'
        // return true ;
    }
    else {
        errorP.textContent = "you don't have an account";
        return false;
    }

}
async function callapi(key) {
    let res = await fetch('api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key })
    })

    let data = await res.json();
    return data
}
function getcode() {
    const codeInput = document.getElementById('codeInput').value;
    codeContent = codeInput;
    stockCode()
    camera(false);
    // stopQR();
}
function QR() {
    html5QrCode = new Html5Qrcode("qr-code");

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        onScanSuccess
    ).catch(err => {

        // fallback → front camera
        html5QrCode.start(
            { facingMode: "user" },
            { fps: 10, qrbox: 250 },
            onScanSuccess
        ).catch(err => {
        });
    });
}
function onScanSuccess(decodedText) {
    codeContent = decodedText;
    stockCode();
    camera(false);
    // stopQR();
}
async function stopQR() {
    if (!html5QrCode) return;

    try {
        await html5QrCode.stop();
        await html5QrCode.clear();

    } catch (err) {

    }

    const video = document.querySelector("#qr-code video");

    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    document.getElementById("qr-code").innerHTML = "";
    let s = document.querySelector('script[src="./qr.js"]') || document.getElementById('scriptqrcode');
    s.remove();
    console.log(s);

    // camera(false);
    let camerDiv = document.getElementById('camera');
    camerDiv.classList.add('hidden');
    Brightness(false);
}
function camera(active = true) {
    let camerDiv = document.getElementById('camera');
    if (active) {
        camerDiv.classList.remove('hidden');
        let s = document.createElement('script');
        s.id = 'scriptqrcode';
        s.src = './qr.js'
        document.body.appendChild(s);
        console.log(s);

        Brightness();
        // QR();
        s.onload = () => {
            QR();
        };
        return
    }
    stopQR()
    
}
function stockCode() {
    let newCode = codeContent.split('+');
    let time = new Date();
    console.log(time);

    if (parseInt(newCode[0]) != 239 || parseInt(newCode[0]) < 200) {
        codeContent = newCode[0];
    }
    else {
        codeContent = newCode[1];
    }
    localStorage.codeTicket = codeContent;
    localStorage.time = time;
    toggleTram();
}
function tramTicker() {
    let getcolor = true;
    let colorbtn1 = document.getElementById('circle1');
    let colorbtn2 = document.getElementById('circle2');
    colorbtn1.style.background = localStorage.color1 ? localStorage.color1 : 'browen';
    colorbtn2.style.background = localStorage.color2 ? localStorage.color2 : 'yellow';
    let picker = document.getElementById('color')
    document.getElementById('circle1').ondblclick = () => {
        getcolor = true;
        picker.click();
    }
    document.getElementById('circle2').ondblclick = () => {
        getcolor = false;
        picker.click();
    }
    picker.addEventListener('input', () => {
        let color = picker.value;
        if (getcolor) {
            colorbtn1.style.background = color;
            localStorage.color1 = color
        } else {
            colorbtn2.style.background = color;
            localStorage.color2 = color
        }
    })


    const circle = document.getElementById("circles");
    let isDragging = false;

    circle.addEventListener('pointerdown', (e) => {
        isDragging = true;
        circle.setPointerCapture(e.pointerId); // مهم باش يبقى يتبعك
    });

    document.addEventListener('pointermove', (e) => {
        if (!isDragging) return;

        circle.style.position = 'fixed';
        circle.style.left = (e.clientX - 120) + 'px';
        circle.style.top = (e.clientY - 90) + 'px';
    });

    document.addEventListener('pointerup', () => {
        isDragging = false;
        circle.style.position = 'absolute';
        circle.style.removeProperty('top');
        circle.style.removeProperty('left');
    });

    let bgGreen = document.getElementById('bgGreen');
    let time = new Date(localStorage.time);
    function getProgress(start) {
        const now = new Date();

        const end = new Date(start.getTime() + 60 * 60 * 1000);
        let progress = (now - start) / (end - start);

        progress = Math.max(0, Math.min(1, progress));

        return Math.floor(progress * 100);
    }

    bgGreen.style.width = getProgress(time) + '%';

    setInterval(() => {
        bgGreen.style.width = getProgress(time) + '%';
    }, 5000);

    let classTimestart = document.querySelectorAll('.start-time');
    let classTimeend = document.querySelectorAll('.end-time');
    let day = String(time.getDate()).padStart(2, '0');
    let month = String(time.getMonth() + 1).padStart(2, '0');
    let year = time.getFullYear();

    let hours = String(time.getHours()).padStart(2, '0');
    let minutes = String(time.getMinutes()).padStart(2, '0');

    // start line
    let linestart = `${day} /${month}/${year} at ${hours}:${minutes} `;

    // end line (+1 hour)
    let endHours = String(time.getHours() + 1).padStart(2, '0');

    let lineend = `${day} /${month}/${year} at ${endHours}:${minutes} `;
    classTimestart.forEach(s => {
        s.textContent = linestart;
    });
    classTimeend.forEach(s => {
        s.textContent = lineend;
    });
    let nbTram = document.getElementById('nbTram');
    nbTram.textContent = 'Transport number ' + localStorage.codeTicket;
}
function Brightness(isactive = true) {
    let brightness = document.getElementById('brightness');
    if (isactive) brightness.classList.add('hidden');
    else brightness.classList.remove('hidden');

}
function toggleTram(start = true, toggle = true) {
    tramTicker();
    let ticketContainer = document.getElementById('tramTicket');
    let infoTicketTram = document.querySelector('.info-ticket-tram');
    let infoScanTram = document.querySelector('.info-scan-tram');

    if (start) {
        ticketContainer.classList.remove('hidden');
        if (toggle) {
            infoTicketTram.classList.remove('hidden');
            infoScanTram.classList.add('hidden');
            Brightness(false)
        }
        else {
            Brightness()
            infoTicketTram.classList.add('hidden');
            infoScanTram.classList.remove('hidden');
        }
    }
    else {
        ticketContainer.classList.add('hidden');

    }
}
function Console() {
    let interval = null;
    let devtoolsOpen = false;
    function HackerConsole() {

        console.clear();

        // 🎯 Header
        console.log(
            "%cSYSTEM INITIALIZING...",
            "color:lime;background:black;font-size:18px;font-weight:bold;padding:6px;"
        );

        console.log(
            "%cACCESSING MAINFRAME...\n",
            "color:#00ff88;font-size:14px;"
        );

        // 🧠 Matrix line (smaller + structured)
        function randomBinaryLine(len = 40) {
            let line = "";
            for (let i = 0; i < len; i++) {
                line += Math.random() > 0.5 ? "1" : "0";
            }
            return line;
        }
        function randomBG() {
            return Math.random() > 0.5 ? 'background:black;padding:20px 10px;' : '';
        }
        // ⚡ cleaner interval (less spam)
        const interval = setInterval(() => {
            console.log(
                "%c" + randomBinaryLine(),
                "color:#00ff00;font-family:monospace;font-size:12px;" + randomBG()
            );
        }, 100); // 👈 slowed down باش مايبقاش spam

        // 💬 structured messages
        setTimeout(() => {
            console.log("\n%c[STATUS] Checking firewall...", "color:cyan;font-weight:bold;");
            console.log("%c[STATUS] Connecting to main node...", "color:cyan;");
        }, 1500);

        setTimeout(() => {
            console.log("\n%c[WARNING] Security layer bypassed", "color:red;font-weight:bold;");
            console.log("%c[INFO] Encryption disabled", "color:lime;");
        }, 3000);

        // 🛑 stop clean
        setTimeout(() => {
            clearInterval(interval);

            console.log("\n%cSESSION CLOSED",
                "color:red;font-size:18px;font-weight:bold;background:black;padding:4px;");

        }, 8000);
    }
    function stopHackerConsole() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            console.log("%cSESSION CLOSED", "color:red;font-weight:bold;");
        }
    }
    function detectDevTools() {
        const threshold = 160;

        setInterval(() => {
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;

            if (widthDiff > threshold || heightDiff > threshold) {

                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    HackerConsole(); // 👈 ملي يتحل console
                }

            } else {

                if (devtoolsOpen) {
                    devtoolsOpen = false;
                    stopHackerConsole(); // 👈 ملي يتسد
                }
            }
        }, 500);
    }
    detectDevTools();
} Console()