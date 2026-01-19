function c(t,s="success"){const n=document.getElementById("toast-container")||o(),e=document.createElement("div");e.className=`toast ${s}`;let a="fa-check-circle";s==="error"&&(a="fa-times-circle"),s==="info"&&(a="fa-info-circle"),s==="warning"&&(a="fa-exclamation-circle"),e.innerHTML=`
        <i class="fas ${a}"></i>
        <span class="toast-message">${t}</span>
    `,n.appendChild(e),e.offsetHeight,e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{n.removeChild(e)},300)},3e3)}function o(){const t=document.createElement("div");return t.id="toast-container",t.className="toast-container",document.body.appendChild(t),t}export{c as s};
