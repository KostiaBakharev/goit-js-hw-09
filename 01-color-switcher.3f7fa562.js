function t(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}document.querySelector("button[data-start]").addEventListener("click",(function(){document.querySelector("[data-start]").disabled=!0,document.querySelector("[data-stop]").disabled=!1,e||(e=setInterval((()=>{document.body.style.backgroundColor=t(),console.log(`Background color changed to: ${t()}`)}),1e3))})),document.querySelector("[data-stop]").addEventListener("click",(function(){e&&(clearInterval(e),e=null,document.querySelector("[data-start]").disabled=!1,document.querySelector("[data-stop]").disabled=!0,console.log("Color generation stopped."))}));let e;document.querySelector("[data-stop]").disabled=!0;
//# sourceMappingURL=01-color-switcher.3f7fa562.js.map