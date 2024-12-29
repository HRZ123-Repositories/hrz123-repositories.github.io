{\rtf1\ansi\ansicpg1252\cocoartf1265\cocoasubrtf210
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0\fs24 \cf0 document.getElementById('post-form').addEventListener('submit', async (e) => \{\
    e.preventDefault();\
    const content = document.getElementById('post-content').value;\
    const response = await fetch('http://localhost:3000/api/posts', \{\
        method: 'POST',\
        headers: \{\
            'Content-Type': 'application/json'\
        \},\
        body: JSON.stringify(\{ content \})\
    \});\
    if (response.ok) \{\
        const post = await response.json();\
        document.getElementById('posts').innerHTML += `<li>$\{post.content\}</li>`;\
        document.getElementById('post-content').value = '';\
    \}\
\});\
\
async function fetchPosts() \{\
    const response = await fetch('http://localhost:3000/api/posts');\
    const posts = await response.json();\
    document.getElementById('posts').innerHTML = posts.map(post => `<li>$\{post.content\}</li>`).join('');\
\}\
\
fetchPosts();}