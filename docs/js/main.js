console.log(">> Ready... go! :)");let a=[],r=JSON.parse(localStorage.getItem("cart"))||[];const p=document.querySelector(".search-form"),f=document.querySelector(".search-input"),l=document.querySelector(".cart-list"),u=document.querySelector(".products-list"),m=document.querySelector(".cart-total"),h=document.querySelector(".clearCart-btn"),b=document.querySelector(".buyCart-btn");function i(c){console.log("Renderizando productos:",c),u.innerHTML="";for(const e of c){const t=e.image||"https://placehold.co/600x400",o=r.find(g=>g.id===e.id),d=document.createElement("li");d.innerHTML=`
            <article>
                <img src='${t}' alt='${e.title}' width='150' height='200'/>
                <div class= "product-info">
                <h3>${e.title}</h3>
                <p>${e.price} €</p>
                <button 
                class='productAdd-btn ${o?"productDelete-btn":""}'
                data-id='${e.id}'>
                ${o?"Eliminar":"Añadir"}
                </button>
                </div>
            </article>
            `,u.appendChild(d)}const n=document.querySelectorAll(".productAdd-btn");for(const e of n)e.addEventListener("click",y)}function s(){l.innerHTML="";let c=0,n=0;for(const t of r){c+=t.price*t.quantity,n+=t.quantity;const o=document.createElement("li");o.innerHTML=`
      <article class="cart-item">
      <img src='${t.image||"https://placehold.co/50x50"}'
      alt='${t.title}'
      width='50' height='50' />
      <div class="cart-info">
      <h4>${t.title}</h4>
                <p>${t.price} €
                x${t.quantity}</p>
                </div>
            <div class="cart-actions">
            <button class='cartIncrease-btn' data-id='${t.id}'><img src="./images/mas.png" alt="Sumar unidad" width='10' height='10' /></button>
            <button class="cartDecrease-btn" data-id='${t.id}'><img src="./images/menos.png" alt="Restar unidad" width='10' height='10' /></button>
            <button class="cartRemove-btn" data-id='${t.id}'><img src="./images/cruz.png" alt="Cancelar artículo" width='10' height='10' /></button>
                </div>
                </article>
                `,l.appendChild(o)}m.textContent=`Total ${c.toFixed(2)} € | ${n} artículo${n!==1?"s":""}`,h.classList.toggle("hidden",r.length===0),b.classList.toggle("hidden",r.length===0);const e=[{selector:".cartIncrease-btn",handler:I},{selector:".cartDecrease-btn",handler:C},{selector:".cartRemove-btn",handler:S}];for(const t of e){const o=document.querySelectorAll(t.selector);for(const d of o)d.addEventListener("click",t.handler)}}function y(c){const n=parseInt(c.currentTarget.dataset.id);if(r.find(t=>t.id===n))r=r.filter(t=>t.id!==n);else{const t=a.find(o=>o.id===n);r.push({...t,quantity:1})}localStorage.setItem("cart",JSON.stringify(r)),i(a),s()}function I(c){const n=parseInt(c.currentTarget.dataset.id),e=r.find(t=>t.id===n);e&&e.quantity++,localStorage.setItem("cart",JSON.stringify(r)),s()}function C(c){const n=parseInt(c.currentTarget.dataset.id),e=r.find(t=>t.id===n);e&&(e.quantity--,e.quantity<=0&&(r=r.filter(t=>t.id!==n),i(a))),localStorage.setItem("cart",JSON.stringify(r)),s()}function S(c){const n=parseInt(c.currentTarget.dataset.id);r.findIndex(e=>e.id===n),r=r.filter(e=>e.id!==n),localStorage.setItem("cart",JSON.stringify(r)),i(a),s()}function $(){r=[],localStorage.removeItem("cart"),i(a),s()}function q(){fetch("https://fakestoreapi.com/products").then(c=>c.json()).then(c=>{a=c,i(a),s()}).catch(c=>{console.error("Error con la API principal, usando la de backup",c),fetch("https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json").then(n=>n.json()).then(n=>{a=n,i(a),s()})})}h.addEventListener("click",$);p.addEventListener("submit",c=>{c.preventDefault();const n=f.value.toLowerCase(),e=a.filter(t=>t.title.toLowerCase().includes(n));i(e)});q();
//# sourceMappingURL=main.js.map
