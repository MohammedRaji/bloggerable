!function(){"use strict";for(var e=document.getElementById("navDoc"),t=document.getElementById("navDocToggle"),n=e.getElementsByTagName("a"),a=e.getElementsByClassName("active"),s=window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1),o=0;o<n.length;o++){var c=n[o].href.substring(n[o].href.lastIndexOf("/")+1);c==s&&""!=c&&n[o].classList.add("active"),""==s&&"index.html"==c&&n[o].classList.add("active")}e.scroll(0,a[0].offsetTop-45),t.addEventListener("click",function(){document.body.classList.toggle("show-nav")},!1)}();