import{u as c,i as r,g as i,c as p}from"./CfSAKuXS.js";import{e as l,K as m,N as d,o as h,h as u,g as o}from"./DU3geLts.js";const f=`
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' -e js,html,css server.js"
  }
}
`,g=`
import express from 'express'

const app = express()
const port = 3111

app.get('/api/message', (req, res) => {
  setTimeout(() => res.send('Welcome to a WebContainers app! 🥳'), 1000)
})
app.use('/', express.static('public'))

app.listen(port, () => {
  console.log('App is live at http://localhost:' + port)
})
`,b=`
<html>
<head>
    <link rel="stylesheet" href="./style.css"/>
</head>
<body>
<h1>Home Page</h1>
<p class="response">Fetching message...</p>
<script src="./script.js"><\/script>
<script>doSomething()<\/script>
</body>
</html>
`,x=`
function doSomething() {
fetch('/api/message')
.then((response) => response.text())
.then((data) => (document.querySelector('.response').innerHTML = data))
}
`,y=`
body {
font-family: Arial, Helvetica, sans-serif;
}

h1 {
color: #99cc33;
}
`,w=l({__name:"SandboxDemoDefaults",setup(_){const n={"server.js":{file:{contents:g}},"package.json":{file:{contents:f}},public:{directory:{"index.html":{file:{contents:b}},"script.js":{file:{contents:x}},"style.css":{file:{contents:y}}}}},{boot:t,isBooting:a}=c();r(t);const s=i();return m(async()=>{await(await t).mount(n),await s.bootstrap(),s.editorTabs.open("./public/index.html")}),d(()=>{var e;return(e=s.container.value)==null?void 0:e.teardown()}),(e,v)=>(h(),u(o(p),{booting:o(a),"hide-solve-button":""},null,8,["booting"]))}});export{w as _};
