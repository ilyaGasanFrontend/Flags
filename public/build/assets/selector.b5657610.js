$(document).ready(function(V){if($("#hiddenX").val()=="")var y=[],Y=[],M=[],L=[],D=[];else var y=$("#hiddenX").val().split(","),Y=$("#hiddenY").val().split(","),M=$("#hiddenWidth").val().split(","),L=$("#hiddenHeight").val().split(","),D=$("#hiddenCategory").val().split(",");var W=[];console.log($("#hiddenX").val().split(","));const c=Object.freeze({CreatingElements:1,EditingElements:2,DeletingElements:3});var O=$(".dropdown-menu"),h=$(".canvas");$(".hidden-form"),$(".action-el");var w=c.CreatingElements;const F=new Image;F.src=$(".img__current").attr("src"),F.onload=function(){},$(h).css("width",F.width),$(h).css("height",F.height);const j="square",R="prev__elemnt__objects";var k=0,q=0,A=!1,a="",_,z,S,I="deletting__button",C="editing__button",p=$("input[name='radio_category']:checked").val(),b=$("#span_"+p).css("color");$("input[type='radio']").click(function(){p=$("input[name='radio_category']:checked").val(),b=$("#span_"+p).css("color")}),$(h).on("click",".square",function(i){switch(w){case c.EditingElements:break;case c.DeletingElements:$(this).toggleClass("active__square__el__obj__changing");let t=$(this).attr("id").substring(j.length),s=$(".canvas").children(".square"),e=$(".dropdown-menu-obj").children();$(e[t]).remove(),$(s[t]).remove(),s=$(".canvas").children(".square"),e=$(".dropdown-menu-obj").children();for(let n=0;n<s.length;n++)$(s[n]).attr("id",j+n),$(e[n]).attr("id",R+n),$(e[n]).children(".number").html(n+1);break}}),$(h).on("mousedown",function(i){switch(w){case c.CreatingElements:k=i.originalEvent.layerX/o,q=i.originalEvent.layerY/o;var t=$("<div>",{class:"square point__events"});a="#"+j+$(".canvas").children(".square").length,_=a,k=parseInt($(h).css("width"))/2+k,q=parseInt($(h).css("height"))/2+q,z=k,S=q,$(t).attr("id","square"+$(".canvas").children(".square").length),$(h).append(t),$(a).css("top",q),$(a).css("left",k),$(a).css("width",0),$(a).css("height",0),$(a).css("color",b),A=!0,k=i.clientX,q=i.clientY;break;case c.EditingElements:break}}),$(h).on("mouseleave",function(i){if(A){A=!1;let t=h.children();$(t[t.length-1]).remove()}}),$(h).on("mousemove",function(i){switch(w){case c.CreatingElements:if(A){var t=(i.originalEvent.clientX-k)/o,s=(i.originalEvent.clientY-q)/o;if(t>=0&&s>=0)$(a).css("left",z),$(a).css("top",S),$(a).css("width",t),$(a).css("height",s);else{if(t<0&&s<0){var e=parseInt($(h).css("width"))/2+i.originalEvent.layerX/o,n=parseInt($(h).css("height"))/2+i.originalEvent.layerY/o;$(a).css("left",parseInt(e)),$(a).css("top",parseInt(n)),$(a).css("width",parseInt(Math.abs(t))),$(a).css("height",parseInt(Math.abs(s)))}if(t<0&&s>0){var e=parseInt($(h).css("width"))/2+i.originalEvent.layerX/o,n=S;$(a).css("left",parseInt(e)),$(a).css("top",parseInt(n)),$(a).css("width",parseInt(Math.abs(t))),$(a).css("height",parseInt(Math.abs(s)))}if(t>0&&s<0){var e=z,n=parseInt($(h).css("height"))/2+i.originalEvent.layerY/o;$(a).css("left",parseInt(e)),$(a).css("top",parseInt(n)),$(a).css("width",parseInt(Math.abs(t))),$(a).css("height",parseInt(Math.abs(s)))}}}break}}),$(".canvas").on("mouseup",function(){switch(w){case c.CreatingElements:A=!1,parseInt($(_).css("width"))<20&&parseInt($(_).css("height"))<20&&($(_).css("width",20),$(_).css("height",20),$(_).css("border-radius","50%"),$(_).css("top",parseInt($(_).css("top"))-parseInt($(_).css("height"))/2),$(_).css("left",parseInt($(_).css("left"))-parseInt($(_).css("width"))/2)),console.log(F.height),$(a).css("width",(V.clientX-k)/o),$(a).css("height",(V.clientY-q)/o),y.push($(a).css("left")),Y.push($(a).css("top")),M.push($(a).css("width")),L.push($(a).css("height")),D.push($("input[name='radio_category']:checked").val()),$("#hiddenX").val(y),$("#hiddenY").val(Y),$("#hiddenWidth").val(M),$("#hiddenHeight").val(L),$("#hiddenCategory").val(D);let E=$(".canvas").children(".square").length-1;var i=$(".obj-table");console.log(b.substring(0,b.length-1)+", 0.4)");var t=$("<tr>",{id:"table_row_"+E,class:"table-row",style:"background-color: "+b.substring(0,b.length-1)+", 0.25)"}),s=$("<td>",{class:"number"}),e=$("<td>",{class:"desmetr"}),n=$("<td>",{class:"table-action"}),g=$("<a>",{class:"button__editing",id:`${C}${$(".canvas").children(".square").length-1}`}),m=$("<a>",{class:"button__deletting",id:`${I}${$(".canvas").children(".square").length-1}`}),d=$("<div>",{class:"prev__elemnt__objects dropdown-item"}),l=$("<div>",{class:"number"}),r=$("<div>",{class:"desmetr"}),u=$("<a>",{class:"button__deletting",id:`${I}${$(".canvas").children(".square").length-1}`}),v=$("<a>",{class:"button__editing",id:`${C}${$(".canvas").children(".square").length-1}`}),f=$("<div>",{class:"wrapper__buttons"});$("<input>",{type:"hidden",id:`x[${$(".canvas").children(".square").length-1}]`,value:$(a).css("left")}),$("<input>",{type:"hidden",name:"y","wire:model":"y",value:$(a).css("top")}),$("<input>",{type:"hidden",name:"width","wire:model":"width",value:$(a).css("width")}),$("<input>",{type:"hidden",name:"height","wire:model":"height",value:$(a).css("height")}),console.log($(a).css("left")),console.log(y);var x='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle me-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',B='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 align-middle me-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';$(r).html($("input[name=color_selector]:checked").next().html()),$(l).html($(".canvas").children(".square").length),$(d).append(l),$(d).append(r),$(i).append(t),console.log($("#span_"+p).text()),$(s).html($(".canvas").children(".square").length),$(t).append(s),$(e).html($("#span_"+p).text()),$(t).append(e);var H='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle me-1"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',X='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 align-middle me-2"> <polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"> </path> <line x1="10" y1="11" x2="10" y2="17"> </line> <line x1="14" y1="11" x2="14" y2="17"> </line> </svg>';$(g).append(H),$(n).append(g),$(m).append(X),$(n).append(m),$(t).append(n),$(u).append(B),$(v).append(x),$(f).append(u,v),$(d).append(f),$(d).attr("id",`prev__elemnt__objects${$(".canvas").children(".square").length-1}`),$(O).append(d);break}}),$(".obj-table").on("mouseenter",".button__editing",function(i){let t=$(this).attr("id").substring(C.length);console.log(t);let s=$(".canvas").children(".square");$(s[t]).toggleClass("active__square__el__obj__edititng"),console.log("over")}),$(".obj-table").on("mouseleave",".button__editing",function(i){let t=$(this).attr("id").substring(C.length),s=$(".canvas").children(".square");$(s[t]).toggleClass("active__square__el__obj__edititng")}),$(".obj-table").on("click",".button__editing",function(i){if(w!=c.EditingElements){let d=function(l){var r=l.target,u=(parseFloat(r.getAttribute("data-x"))||0)+l.dx/o,v=(parseFloat(r.getAttribute("data-y"))||0)+l.dy/o;r.style.transform="translate("+u+"px, "+v+"px)",r.setAttribute("data-x",u),r.setAttribute("data-y",v)};var t=d;w=c.EditingElements,$("#flag").val("EditingInProgress");let s=$(".categories").children(),e=$(this).attr("id").substring(C.length),n=$("#hidden-category-"+e).val();for(let l=0;l<s.length;l++)console.log($(s[l]).children(".form-check-input").attr("id").substr(6),p),$(s[l]).children(".form-check-input").attr("id").substr(6)==n&&($(s[l]).children(".form-check-input").prop("checked",!0),p=n,b=$("#span_"+p).css("color"));let g=$(".canvas").children(".square");console.log(e,"1111111111111111111");let m=$(".obj-table").children(".table-row").children(".table-action");$(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>'),$(g[e]).toggleClass("point__events"),$(m[e]).children(".button__deletting").toggleClass("button__deletting__disabled"),$("input[type='radio']").toggleClass("categories-editing"),$("input[type='radio']").toggleClass("categories-default"),$($(".obj-table").children(".table-row")[e]).toggleClass("table-row-editing"),$($(".obj-table").children(".table-row").children(".desmetr")[e]).toggleClass("desmetr-editing");for(let l=0;l<g.length;l++)l!=parseInt(e)&&($(g[l]).toggleClass("hidden__squares"),$(m[l]).toggleClass("hidden__tools"));$(".categories-editing").click(function(){p=$("input[name='radio_category']:checked").val(),b=$("#span_"+p).css("color"),$(".active__square__el__obj__edititng").css("color",b),console.log($("#span_"+p).text()),$(".desmetr-editing").text($("#span_"+p).text()),$(".table-row-editing").css("background",b.substring(0,b.length-1)+", 0.25)")}),interact(g[e]).resizable({edges:{left:!0,right:!0,bottom:!0,top:!0},listeners:{move(l){var r=l.target,u=parseFloat(r.getAttribute("data-x"))||0,v=parseFloat(r.getAttribute("data-y"))||0;r.style.width=l.rect.width*(1/o)+"px",r.style.height=l.rect.height*(1/o)+"px",u+=l.deltaRect.left*(1/o),v+=l.deltaRect.top*(1/o),r.style.transform="translate("+u+"px,"+v+"px)",r.setAttribute("data-x",u),r.setAttribute("data-y",v)}},modifiers:[interact.modifiers.restrictEdges({outer:"parent"}),interact.modifiers.restrictSize({min:{width:2,height:1}})],inertia:!0}),interact(g[e]).draggable({inertia:!0,modifiers:[interact.modifiers.restrictRect({restriction:"parent",endOnly:!0})],autoScroll:!0,listeners:{move:d,end(l){var r=l.target.querySelector("p");r&&(r.textContent="moved a distance of "+Math.sqrt(Math.pow(l.pageX-l.x0,2)+Math.pow(l.pageY-l.y0,2)|0).toFixed(2)+"px")}}}),window.dragMoveListener=d}else{w=c.CreatingElements;let s=$(".canvas").children(".square"),e=$(this).attr("id").substring(C.length),n=$(".obj-table").children(".table-row").children(".table-action");$(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'),$(s[e]).toggleClass("point__events"),$("input[type='radio']").toggleClass("categories-editing"),$("input[type='radio']").toggleClass("categories-default"),$($(".obj-table").children(".table-row")[e]).toggleClass("table-row-editing"),$($(".obj-table").children(".table-row").children(".desmetr")[e]).toggleClass("desmetr-editing");for(let E=0;E<s.length;E++)E!=parseInt(e)&&($(s[E]).toggleClass("hidden__squares"),$(n[E]).toggleClass("hidden__tools"));$(n[e]).children(".button__deletting").toggleClass("button__deletting__disabled");let g=$("#square"+e).css("left"),m=$("#square"+e).css("top");g=g.substring(0,g.length-2),m=m.substring(0,m.length-2),console.log("oldX",g,m);let d=$(s[e]).css("transform"),l=0,r=0;d!="none"&&(d=d.substring(7),d=d.substring(0,d.length-1),l=d.split(",")[4],r=d.split(",")[5]),console.log(l,r);let u=$("#hiddenX").val().split(","),v=$("#hiddenY").val().split(",");console.log(u);let f=u[e],x=v[e];f=f.substring(0,f.length-2),f=parseFloat(g)+parseFloat(l)+"px",x=x.substring(0,x.length-2),x=parseFloat(m)+parseFloat(r)+"px",console.log(f,x),u[e]=f,v[e]=x,$("#hiddenX").val(u),$("#hiddenY").val(v);let B=$("#hiddenWidth").val().split(",");B[e]=$("#square"+e).css("width"),console.log("width",B),$("#hiddenWidth").val(B);let H=$("#hiddenHeight").val().split(",");H[e]=$("#square"+e).css("height"),$("#hiddenHeight").val(H);let X=$("#hiddenCategory").val().split(",");console.log(X),X[e]=p,$("#hiddenCategory").val(X),console.log(X)}}),$(".obj-table").on("mouseenter",".button__deletting",function(i){let t=$(this).attr("id").substring(I.length),s=$(".canvas").children(".square");$(s[t]).toggleClass("active__square__el__obj__deletting")}),$(".obj-table").on("mouseleave",".button__deletting",function(i){let t=$(this).attr("id").substring(I.length),s=$(".canvas").children(".square");$(s[t]).toggleClass("active__square__el__obj__deletting")}),$(".obj-table").on("click",".button__deletting",function(i){let t=$(this).attr("id").substring(I.length),s=$(".canvas").children(".square"),e=$(".obj-table").children(".table-row");console.log(y),console.log(y[0]),console.log(t),W.push(parseInt(t)),y.splice(t,1),Y.splice(t,1),M.splice(t,1),L.splice(t,1),D.splice(t,1),$("#hiddenX").val(y),$("#hiddenY").val(Y),$("#hiddenWidth").val(M),$("#hiddenHeight").val(L),$("#hiddenCategory").val(D),console.log("ID",W),$(e[t]).remove(),$(s[t]).remove(),console.log($(".canvas").children(".square").length),$(".canvas").children(".square").length==0?$("#hidden_delete").val(0):$("#hidden_delete").val(W),s=$(".canvas").children(".square"),e=$(".obj-table").children(".table-row"),console.log(e,"!!!!!!!!!!!!!!!!!!!",t);for(let n=0;n<s.length;n++)console.log($(s[n]).attr("id")),$(s[n]).attr("id",j+n),$(e[n]).attr("id","table_row_"+n),$(e[n]).children(".number").html(n+1),$($(e[n]).children()[2]).attr("id","hidden-category-"+n),$(e[n]).children(".table-action").children(".button__deletting").attr("id",I+n),$(e[n]).children(".table-action").children(".button__editing").attr("id",C+n)}),$(".canvas").on("mouseenter",".square",function(i){switch(w){case c.EditingElements:$(this).toggleClass("active__square__el__obj__changing");let t=$(this).attr("id").substring(j.length),s=$(".dropdown-menu-obj").children();$(s[t]).toggleClass("active__menu__el__obj__changing");break;case c.DeletingElements:$(this).toggleClass("active__square__el__obj__deletting");let e=$(this).attr("id").substring(j.length),n=$(".dropdown-menu-obj").children();$(n[e]).toggleClass("active__menu__el__obj__deletting");break}}),$(".canvas").on("mouseleave",".square",function(i){switch(w){case c.EditingElements:$(this).toggleClass("active__square__el__obj__changing");let t=$(this).attr("id").substring(j.length),s=$(".dropdown-menu-obj").children();$(s[t]).toggleClass("active__menu__el__obj__changing");break;case c.DeletingElements:$(this).toggleClass("active__square__el__obj__deletting");let e=$(this).attr("id").substring(j.length),n=$(".dropdown-menu-obj").children();$(n[e]).toggleClass("active__menu__el__obj__deletting");break}});function P(i,t){i.addEventListener?"onwheel"in document?i.addEventListener("wheel",t):"onmousewheel"in document?i.addEventListener("mousewheel",t):i.addEventListener("MozMousePixelScroll",t):text.attachEvent("onmousewheel",t)}var o=1;P(text,function(i){var t=i.deltaY||i.detail||i.wheelDelta;t>0?o+=.05:o-=.05,text.style.transform=text.style.WebkitTransform=text.style.MsTransform="scale("+o+")",i.preventDefault()})});
