"use client"

import { useState } from "react"

const initialTeams = [
{name:"RCB",w:8,l:4,nrr:1.02,pts:16},
{name:"GT",w:8,l:5,nrr:0.42,pts:16},
{name:"SRH",w:7,l:5,nrr:0.31,pts:14},
{name:"PBKS",w:6,l:5,nrr:0.30,pts:13},
{name:"RR",w:6,l:5,nrr:0.01,pts:12},
{name:"CSK",w:6,l:6,nrr:0.00,pts:12},
{name:"KKR",w:5,l:6,nrr:-0.03,pts:11},
{name:"DC",w:5,l:7,nrr:-0.99,pts:10},
{name:"MI",w:4,l:8,nrr:-0.50,pts:8},
{name:"LSG",w:4,l:8,nrr:-0.70,pts:8},
]

const matches = [
["RCB","PBKS","61"],
["DC","RR","62"],
["CSK","SRH","63"],
["RR","LSG","64"],
["KKR","MI","65"],
["GT","CSK","66"],
["SRH","RCB","67"],
["LSG","PBKS","68"],
["MI","RR","69"],
["KKR","DC","70"],
]

export default function Home(){

const [teams,setTeams]=useState(initialTeams)
const [selected,setSelected]=useState<Record<number,string>>({})

function addWin(team:string,index:number){

if(selected[index]) return

const loser =
matches[index][0]===team
?matches[index][1]
:matches[index][0]

const updated = teams.map((t)=>{

if(t.name===team){

return{
...t,
pts:t.pts+2,
w:t.w+1,
nrr:+(t.nrr+0.15).toFixed(2)
}

}

if(t.name===loser){

return{
...t,
l:t.l+1,
nrr:+(t.nrr-0.15).toFixed(2)
}

}

return t

})

updated.sort(
(a,b)=>b.pts-a.pts || b.nrr-a.nrr
)

setTeams(updated)

setSelected({
...selected,
[index]:team
})

}

function resetAll(){

setTeams(initialTeams)
setSelected({})

}

return(

<div className="min-h-screen bg-black text-white p-6">

<h1 className="text-4xl font-bold text-center mb-6">
🏏 IPL Predictor
</h1>

<button
onClick={resetAll}
className="bg-red-600 px-4 py-3 rounded-xl mb-6"
> 
ResetPredictions
</button>

<div className="bg-zinc-900 rounded-3xl p-5 mb-8">

<h2 className="text-2xl font-bold mb-4">
Points Table
</h2>

<div className="grid grid-cols-7 font-bold border-b p-2">
<div>#</div>
<div>Team</div>
<div>M</div>
<div>W</div>
<div>L</div>
<div>NRR</div>
<div>Pts</div>
</div>

{teams.map((t,index)=>(

<div
key={t.name}
className="grid grid-cols-7 p-2 border-b"
>

<div>{index+1}</div>
<div>{t.name}</div>
<div>{t.w+t.l}</div>
<div>{t.w}</div>
<div>{t.l}</div>
<div>{t.nrr>0?"+":""}{t.nrr}</div>
<div>{t.pts}</div>

</div>

))}

</div>

<h2 className="text-2xl font-bold mb-4">
Upcoming Matches
</h2>

{matches
.filter((_,index)=>!selected[index])
.map((m,index)=>(

<div
key={index}
className="bg-zinc-900 p-3 rounded-2xl mb-3"
>

<p>
IPL Match {m[2]}
</p>

<p className="mb-3">
{m[0]} vs {m[1]}
</p>

<div className="flex gap-3">

<button
disabled={!!selected[index]}
onClick={()=>addWin(m[0],index)}
className="flex-1 bg-blue-600 py-2 rounded-xl disabled:bg-gray-700"
> 
{m[0]}
</button>

<button
disabled={!!selected[index]}
onClick={()=>addWin(m[1],index)}
className="flex-1 bg-red-600 py-2 rounded-xl disabled:bg-gray-700"
> 
{m[1]}
</button>

</div>

</div>

))}

</div>

)

}