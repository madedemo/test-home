(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const m="https://books-backend.p.goit.global/books/top-books",p=document.querySelector(".container"),l=document.createElement("div");l.classList.add("books");p.appendChild(l);b(m);async function b(e){try{const n=(await axios.get(e)).data;console.log("Response Data:",n),n.forEach(s=>{f(s)})}catch(o){console.error("Error fetching books:",o)}}function f(e){const o=document.createElement("div");o.classList.add("category-container");const n=document.createElement("div");n.classList.add("category"),n.textContent=e.list_name,o.appendChild(n);const s=document.createElement("div");s.classList.add("books-group");for(let t=0;t<5;t++)if(e.books[t]){const r=e.books[t];g(s,r)}o.appendChild(s),l.appendChild(o)}function g(e,o){const n=document.createElement("div");n.classList.add("book"),n.innerHTML=`
    <div class="book__cover-inner">
      <img src="${o.book_image}" />
      <div class="book__cover--darkened"></div>
    </div>
    <div class="book__info">
      <div class="book__title">${o.title}</div>
      <div class="book__author">${o.author}</div>
    </div>
  `,e.appendChild(n),n.querySelector(".book__cover-inner").addEventListener("click",()=>h(o._id))}const i=document.querySelector(".modal");async function h(e){try{const o=`https://books-backend.p.goit.global/books/${e}`,s=await(await fetch(o)).json();i.classList.add("modal--show"),document.body.classList.add("stop-scrolling"),i.innerHTML=`
      <div class="modal__card">
        <img class="modal__book-cover" src="${s.book_image}" alt="">
        <h2>
          <span class="modal__book-title">${s.title}</span>
          <span class="modal__book-author"> - ${s.author}</span>
        </h2>
        <button type="button" class="modal__button-action">${d(s)?"Delete from shopping":"Add to shoping"}</button>
        <button type="button" class="modal__button-close">Закрыть</button>
      </div>
    `;const t=document.querySelector(".modal__button-action");t.addEventListener("click",()=>{d(s)?(k(s),t.textContent="Rem book"):(v(s),t.textContent="Add book")}),document.querySelector(".modal__button-close").addEventListener("click",()=>_())}catch(o){console.error("Error fetching book details:",o)}}function _(){i.classList.remove("modal--show"),document.body.classList.remove("stop-scrolling")}function c(){return JSON.parse(localStorage.getItem("cart"))||[]}function u(e){localStorage.setItem("cart",JSON.stringify(e))}function d(e){return c().some(n=>n.title===e.title&&n.author===e.author)}function k(e){let o=c();o=o.filter(n=>!(n.title===e.title&&n.author===e.author)),u(o),console.log("book removed:",e.title)}function v(e){let o=c();o.push(e),u(o),console.log("book added:",e.title)}console.log("shoping:",c());
//# sourceMappingURL=commonHelpers.js.map
