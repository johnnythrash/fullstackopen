(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(1),o=t.n(a),c=t(14),r=t.n(c),s=t(3),u=t(0),i=function(e){var n=e.value,t=e.text,a=e.onChange;return Object(u.jsxs)("div",{children:[t,Object(u.jsx)("input",{value:n,onChange:a})]})},l=function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook:"}),Object(u.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(u.jsx)(i,{text:"name: ",value:e.newName,onChange:e.handleNameChange}),Object(u.jsx)(i,{text:"number: ",value:e.newNumber,onChange:e.handleNumberChange}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})]})},d=t(4),m=t.n(d),b="http://192.168.1.26:3005/api/persons",j={getAll:function(){return m.a.get(b)},createPerson:function(e){return m.a.post(b,e)},update:function(e,n){return m.a.put("".concat(b,"/").concat(e),n)},removePerson:function(e){return console.log("".concat(b,"/").concat(e)),m.a.delete("".concat(b,"/").concat(e))}},h=function(e){var n=e.namesToShow,t=e.setPersons,a=e.setConfirmMessage,o=function(e){e.preventDefault();var n=e.target.name,o=parseInt(e.target.id);window.confirm("do you really want to remove ".concat(n,"?"))&&j.removePerson(o).then(j.getAll().then((function(e){t(e.data),console.log(e.data),a({type:"error",message:"removed ".concat(n," from phonebook")}),setTimeout((function(){a(null)}),5e3)}))).catch((function(e){a({type:"error",message:"error, name does not exist on server!"}),console.log(e)}))};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Numbers:"}),Object(u.jsx)("ul",{children:n.map((function(e){return Object(u.jsxs)("li",{children:["Name:",e.name," ",e.number," ",Object(u.jsx)("button",{id:e.id,name:e.name,onClick:o,children:"delete"})]},e.id)}))})]})},f=function(e){var n=e.confirmMessage;return null===n?null:"success"===n.type?Object(u.jsx)("div",{className:"notifySuccess",children:n.message}):"error"===n.type?Object(u.jsx)("div",{className:"notifyError",children:n.message}):void 0},g=(t(38),function(){var e=Object(a.useState)([]),n=Object(s.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),r=Object(s.a)(c,2),d=r[0],m=r[1],b=Object(a.useState)(" "),g=Object(s.a)(b,2),O=g[0],p=g[1],v=Object(a.useState)(""),x=Object(s.a)(v,2),w=x[0],y=x[1],C=Object(a.useState)(null),N=Object(s.a)(C,2),S=N[0],k=N[1];Object(a.useEffect)((function(){j.getAll().then((function(e){o(e.data)}))}),[]);var P=w.length<1?t:t.filter((function(e){return e.name.toUpperCase()===w.toUpperCase()}));return Object(u.jsxs)("div",{children:[Object(u.jsx)(f,{confirmMessage:S}),Object(u.jsx)(i,{text:"filter",value:w,onChange:function(e){return y(e.target.value)}}),Object(u.jsx)(l,{onSubmit:function(e){e.preventDefault();var n={name:d,number:O};if(t.some((function(e){return e.name===d}))){if(window.confirm("".concat(d," is already in phonebook. do you want to replace the number?"))){var a=t.map((function(e){return e.name})).indexOf(d);a?j.update(t[a].id,n).then(j.getAll().then((function(e){o(e.data),k({type:"success",message:"changed number for ".concat(n.name)}),setTimeout((function(){k(null)}),5e3)}))):window.alert("error! couldn't find entry in database")}}else o(t.concat(n)),j.createPerson(n).then((function(e){j.getAll().then((function(e){o(e.data),m(""),p(""),k({type:"success",message:"added ".concat(n.name," to database")}),setTimeout((function(){k(null)}),5e3)}))}))},newName:d,newNumber:O,handleNameChange:function(e){return m(e.target.value)},handleNumberChange:function(e){return p(e.target.value)}}),Object(u.jsx)(h,{namesToShow:P,setConfirmMessage:k,setPersons:o})]})});r.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(g,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.d80619d7.chunk.js.map