const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('mainContent');
const paymentInterface = document.getElementById('paymentInterface');
const plansContainer = document.getElementById('plansContainer');
const videoContainer = document.getElementById('paymentVideoContainer');
const iframe = document.getElementById('paymentIframe');

// ADICIONE SEUS LINKS DE COMPRA AQUI
const checkoutLinks = {
    "MOD IOS": "https://link-do-seu-checkout.com/ios",
    "MOD ANDROID": "https://link-do-seu-checkout.com/android",
    "HS PEITO IOS": "https://link-do-seu-checkout.com/hs-ios",
    "HS PEITO ANDROID": "https://link-do-seu-checkout.com/hs-android"
};

const prices = {
    "MOD IOS": { "5 dias": "24,00$", "7 dias": "27$", "15 dias": "47$" },
    "MOD ANDROID": { "5 dias": "24,00$", "7 dias": "27$", "15 dias": "47$" },
    "HS PEITO IOS": { "5 dias": "26,00$", "7 dias": "30,00$", "15 dias": "44,00$" },
    "HS PEITO ANDROID": { "5 dias": "17,00$", "7 dias": "27,00$", "15 dias": "44,00$" }
};

function openPayment(name, img) {
    document.getElementById('paymentProductTitle').innerText = name;
    document.getElementById('paymentProductImg').src = img || "https://i.ibb.co/HfqKfpgp/IMG-20260302-005923-957.jpg";
    
    // Troca de vídeo no checkout
    if (name.includes("IOS")) {
        videoContainer.style.display = 'block';
        iframe.src = "https://www.youtube.com/embed/H3JPyFBMF58";
    } else if (name.includes("ANDROID")) {
        videoContainer.style.display = 'block';
        iframe.src = "https://www.youtube.com/embed/kRZ1hLNjud0";
    } else {
        videoContainer.style.display = 'none';
    }

    const p = prices[name];
    const link = checkoutLinks[name] || "#";

    plansContainer.innerHTML = `
        <div class="plan-box grow-on-hover" onclick="window.open('${link}', '_blank')">
            <span>5 DIAS</span>
            <span class="plan-price" style="color:#00ff00">${p["5 dias"]}</span>
            <div class="buy-mini-box">COMPRAR</div>
        </div>
        <div class="plan-box grow-on-hover" onclick="window.open('${link}', '_blank')">
            <span>7 DIAS</span>
            <span class="plan-price" style="color:#00ff00">${p["7 dias"]}</span>
            <div class="buy-mini-box">COMPRAR</div>
        </div>
        <div class="plan-box grow-on-hover" onclick="window.open('${link}', '_blank')">
            <span>15 DIAS</span>
            <span class="plan-price" style="color:#00ff00">${p["15 dias"]}</span>
            <div class="buy-mini-box">COMPRAR</div>
        </div>
    `;
    
    mainContent.style.display = 'none';
    paymentInterface.style.display = 'block';
    document.body.classList.add('payment-active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

document.getElementById('backToStore').onclick = () => {
    paymentInterface.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.classList.remove('payment-active');
    iframe.src = "";
};

// Menu lateral
document.getElementById('openMenu').onclick = () => { sidebar.classList.add('active'); overlay.classList.add('active'); };
document.getElementById('closeMenu').onclick = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };
overlay.onclick = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };

document.getElementById('menuVisual').onclick = (e) => { 
    e.preventDefault(); 
    const sub = document.getElementById('subMenuVisual');
    sub.style.display = sub.style.display === 'flex' ? 'none' : 'flex';
};

// Troca de Temas
function setTheme(color) {
    document.documentElement.style.setProperty('--theme', color);
    document.body.style.backgroundImage = `
        radial-gradient(circle at 10% 10%, ${color}33 0%, transparent 50%),
        radial-gradient(circle at 90% 90%, ${color}33 0%, transparent 50%)
    `;
    sidebar.classList.remove('active'); 
    overlay.classList.remove('active');
}

document.getElementById('btnRed').onclick = () => setTheme('#ff3333');
document.getElementById('btnBlue').onclick = () => setTheme('#0055ff');
document.getElementById('btnPurple').onclick = () => setTheme('#9933ff');
document.getElementById('btnGreen').onclick = () => setTheme('#00cc44');

// Filtros
const filterBtns = document.querySelectorAll('.f-btn');
const productItems = document.querySelectorAll('.product-item');

filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.getAttribute('data-filter');
        productItems.forEach(p => {
            p.style.display = (f === 'all' || p.classList.contains(f)) ? 'block' : 'none';
        });
    };
});

// Clique nos produtos
document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-item');
    if (card) {
        const name = card.getAttribute('data-product');
        const img = card.getAttribute('data-img');
        openPayment(name, img);
    }
});

// Notificações de Venda Fake
setInterval(() => {
    const names = ["Ricardo", "Marcos", "Luan", "Julia", "Vitor", "Bruno", "Gabriel"];
    const container = document.getElementById('notification-container');
    if(container) {
        const div = document.createElement('div');
        div.className = 'notification';
        div.innerHTML = `<i class="fas fa-shopping-basket" style="color:var(--theme); margin-right:10px;"></i> 
                         <strong>${names[Math.floor(Math.random()*names.length)]}</strong> acabou de comprar!`;
        container.appendChild(div);
        setTimeout(() => {
            div.style.opacity = '0';
            setTimeout(() => div.remove(), 500);
        }, 4000);
    }
}, 10000);
