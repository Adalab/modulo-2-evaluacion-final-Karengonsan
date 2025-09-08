console.log(">> Ready... go! :)");let a=[],c=JSON.parse(localStorage.getItem("cart"))||[];const g=document.querySelector(".search-form"),m=document.querySelector(".search-input"),l=document.querySelector(".cart-list"),u=document.querySelector(".products-list"),f=document.querySelector(".cart-total"),h=document.querySelector(".clearCart-btn"),b=document.querySelector(".buyCart-btn");function i(n){console.log("Renderizando productos:",n),u.innerHTML="";for(const r of n){const t=r.image||"https://placehold.co/600x400",o=c.find(p=>p.id===r.id),d=document.createElement("li");d.innerHTML=`
            <article>
                <img src='${t}' alt='${r.title}' width='150' height='200'/>
                <div class= "product-info">
                <h3>${r.title}</h3>
                <p>${r.price} €</p>
                <button 
                class='productAdd-btn ${o?"productDelete-btn":""}'
                data-id='${r.id}'>
                ${o?"Eliminar":"Añadir"}
                </button>
                </div>
            </article>
            `,u.appendChild(d)}const e=document.querySelectorAll(".productAdd-btn");for(const r of e)r.addEventListener("click",y)}function s(){l.innerHTML="";let n=0,e=0;for(const t of c){n+=t.price*t.quantity,e+=t.quantity;const o=document.createElement("li");o.innerHTML=`
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
                `,l.appendChild(o)}f.textContent=`Total ${n.toFixed(2)} € | ${e} artículo${e!==1?"s":""}`,h.classList.toggle("hidden",c.length===0),b.classList.toggle("hidden",c.length===0),[{selector:".cartIncrease-btn",handler:I},{selector:".cartDecrease-btn",handler:C},{selector:".cartRemove-btn",handler:S}].forEach(t=>{document.querySelectorAll(t.selector).forEach(d=>d.addEventListener("click",t.handler))})}function y(n){const e=parseInt(n.currentTarget.dataset.id);if(c.find(t=>t.id===e))c=c.filter(t=>t.id!==e);else{const t=a.find(o=>o.id===e);c.push({...t,quantity:1})}localStorage.setItem("cart",JSON.stringify(c)),i(a),s()}function I(n){const e=parseInt(n.currentTarget.dataset.id),r=c.find(t=>t.id===e);r&&r.quantity++,localStorage.setItem("cart",JSON.stringify(c)),s()}function C(n){const e=parseInt(n.currentTarget.dataset.id),r=c.find(t=>t.id===e);r&&(r.quantity--,r.quantity<=0&&(c=c.filter(t=>t.id!==e))),localStorage.setItem("cart",JSON.stringify(c)),i(a),s()}function S(n){const e=parseInt(n.currentTarget.dataset.id);c=c.filter(r=>r.id!==e),localStorage.setItem("cart",JSON.stringify(c)),i(a),s()}function $(){c=[],localStorage.removeItem("cart"),i(a),s()}function q(){fetch("https://fakestoreapi.com/products").then(n=>n.json()).then(n=>{a=n,i(a),s()}).catch(n=>{console.error("Error con la API principal, usando la de backup",n),fetch("https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json").then(e=>e.json()).then(e=>{a=e,i(a),s()})})}h.addEventListener("click",$);g.addEventListener("submit",n=>{n.preventDefault();const e=m.value.toLowerCase(),r=a.filter(t=>t.title.toLowerCase().includes(e));i(r)});q();
//# sourceMappingURL=main.js.map
