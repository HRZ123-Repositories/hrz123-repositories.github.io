{\rtf1\ansi\ansicpg1252\cocoartf1265\cocoasubrtf210
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0\fs24 \cf0 const express = require('express');\
const cors = require('cors');\
const app = express();\
const PORT = 3000;\
\
app.use(cors());\
app.use(express.json());\
\
let posts = [];\
\
app.get('/api/posts', (req, res) => \{\
    res.json(posts);\
\});\
\
app.post('/api/posts', (req, res) => \{\
    const post = \{ content: req.body.content \};\
    posts.push(post);\
    res.json(post);\
\});\
\
app.listen(PORT, () => \{\
    console.log(`Server is running on http://localhost:$\{PORT\}`);\
\});}