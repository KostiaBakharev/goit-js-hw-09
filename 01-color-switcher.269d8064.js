!function(){function t(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}var e;document.querySelector("button[data-start]").addEventListener("click",(function(){e||(document.querySelector("[data-start]").disabled=!0,document.querySelector("[data-stop]").disabled=!1,(e=setInterval((function(){document.body.style.backgroundColor=t(),console.log("Background color changed to: ".concat(t()))}),1e3))&&(document.querySelector(".wrap").style.backgroundColor="inherit"))})),document.querySelector("[data-stop]").addEventListener("click",(function(){e&&(clearInterval(e),e=null,document.querySelector("[data-start]").disabled=!1,document.querySelector("[data-stop]").disabled=!0,console.log("Color generation stopped."))}))}();
//# sourceMappingURL=01-color-switcher.269d8064.js.map