console.log(">> Ready... go! :)");let r=[],c=JSON.parse(localStorage.getItem("cart"))||[];const y=document.querySelector(".search-form"),b=document.querySelector(".search-input"),l=document.querySelector(".cart-list"),u=document.querySelector(".products-list"),C=document.querySelector(".cart-total"),g=document.querySelector(".clearCart-btn"),p=document.querySelector(".buyCart-btn"),h=document.querySelector(".buyCartHiddenMessage"),m=document.querySelector("#audioMagic");function i(e){console.log("Renderizando productos:",e),u.innerHTML="";for(const a of e){const t=a.image||"https://placehold.co/600x400",o=c.find(f=>f.id===a.id),d=document.createElement("li");d.innerHTML=`
            <article>
                <img src='${t}' alt='${a.title}' width='150' height='200'/>
                <div class= "product-info">
                <h3>${a.title}</h3>
                <p>${a.price} €</p>
                <button 
                class='productAdd-btn ${o?"productDelete-btn":""}'
                data-id='${a.id}'>
                ${o?"Eliminar":"Añadir"}
                </button>
                </div>
            </article>
            `,u.appendChild(d)}const n=document.querySelectorAll(".productAdd-btn");for(const a of n)a.addEventListener("click",I)}function s(){l.innerHTML="";let e=0,n=0;for(const t of c){e+=t.price*t.quantity,n+=t.quantity;const o=document.createElement("li");o.innerHTML=`
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
                `,l.appendChild(o)}C.textContent=`Total ${e.toFixed(2)} € | ${n} artículo${n!==1?"s":""}`,g.classList.toggle("hidden",c.length===0),p.classList.toggle("hidden",c.length===0),[{selector:".cartIncrease-btn",handler:S},{selector:".cartDecrease-btn",handler:q},{selector:".cartRemove-btn",handler:v}].forEach(t=>{document.querySelectorAll(t.selector).forEach(d=>d.addEventListener("click",t.handler))})}function I(e){const n=parseInt(e.currentTarget.dataset.id);if(c.find(t=>t.id===n))c=c.filter(t=>t.id!==n);else{const t=r.find(o=>o.id===n);c.push({...t,quantity:1})}localStorage.setItem("cart",JSON.stringify(c)),i(r),s()}function S(e){const n=parseInt(e.currentTarget.dataset.id),a=c.find(t=>t.id===n);a&&a.quantity++,localStorage.setItem("cart",JSON.stringify(c)),s()}function q(e){const n=parseInt(e.currentTarget.dataset.id),a=c.find(t=>t.id===n);a&&(a.quantity--,a.quantity<=0&&(c=c.filter(t=>t.id!==n))),localStorage.setItem("cart",JSON.stringify(c)),i(r),s()}function v(e){const n=parseInt(e.currentTarget.dataset.id);c=c.filter(a=>a.id!==n),localStorage.setItem("cart",JSON.stringify(c)),i(r),s()}function $(){c=[],localStorage.removeItem("cart"),i(r),s()}function L(){h.classList.add("active");const e=h.querySelector(".modal-content");e.style.animation="none",e.offsetWidth,e.style.animation=null,m.currentTime=0,m.play()}function T(){fetch("https://fakestoreapi.com/products").then(e=>e.json()).then(e=>{r=e,i(r),s()}).catch(e=>{console.error("Error con la API principal, usando la de backup",e),fetch("https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json").then(n=>n.json()).then(n=>{r=n,i(r),s()})})}g.addEventListener("click",$);y.addEventListener("submit",e=>{e.preventDefault();const n=b.value.toLowerCase(),a=r.filter(t=>t.title.toLowerCase().includes(n));i(a)});p.addEventListener("click",L);T();
//# sourceMappingURL=main.js.map
