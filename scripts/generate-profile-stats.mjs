import { mkdir, writeFile } from 'node:fs/promises';
function renderCards(data,theme){
 const dark=theme==="dark",bg=dark?"#22272e":"#ffffff",border=dark?"#444c56":"#d0d7de",fg=dark?"#adbac7":"#24292f",muted=dark?"#909dab":"#57606a",accent=dark?"#6cb6ff":"#0969da",purple=dark?"#b392f0":"#8250df";
 const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
 const number=n=>Number(n).toLocaleString("en-US");
 const frame=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="9" fill="${bg}" stroke="${border}"/><g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif">${body}</g></svg>\n`;
 const t=(x,y,s,color=fg,size=15,weight=400,anchor="start")=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(s)}</text>`;
 const pct=data.prs?100*data.merged/data.prs:0;
 const rows=[["Public pull requests",number(data.prs)],["Merged pull requests",number(data.merged)],["Public issues opened",number(data.issues)]];
 const stats=frame(560,220,t(24,33,"GitHub activity",accent,19,600)+t(24,54,"LUC4N3X · Public contributions",muted,12)+rows.map(([label,value],i)=>t(24,88+i*31,label,fg,15,500)+t(335,88+i*31,value,fg,16,600,"end")).join("")+`<circle cx="457" cy="111" r="46" fill="none" stroke="${border}" stroke-width="7"/><circle cx="457" cy="111" r="46" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(pct*2*Math.PI*46/100).toFixed(2)} ${(2*Math.PI*46).toFixed(2)}" transform="rotate(-90 457 111)"/>`+t(457,116,pct.toFixed(1)+"%",fg,20,600,"middle")+t(457,177,"PRs merged",muted,12,400,"middle")+t(24,200,"Updated "+data.date+" · GitHub public API",muted,11));
 const pin=frame(480,144,t(24,32,"LUC4N3X / Levyra-deepsound",accent,18,600)+t(24,61,"Open-source music player for Android and Windows.",fg,14)+t(24,81,"Music discovery, synced lyrics and local playback.",fg,14)+`<circle cx="30" cy="112" r="6" fill="${purple}"/>`+t(43,117,"Kotlin",muted,13)+t(138,117,"Stars  "+number(data.stars),fg,13,500)+t(267,117,"Forks  "+number(data.forks),fg,13,500));
 return {stats,pin};
}
const token=process.env.GITHUB_TOKEN;
if (!token) throw new Error('GITHUB_TOKEN is required');
async function api(path) {
  const response=await fetch('https://api.github.com'+path,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});
  if(!response.ok) throw new Error('GitHub API returned '+response.status+' for '+path);
  return response.json();
}
async function count(query) {
  const result=await api('/search/issues?per_page=1&q='+encodeURIComponent(query));
  if(result.incomplete_results || !Number.isSafeInteger(result.total_count)) throw new Error('Incomplete search results: '+query);
  return result.total_count;
}
const [project,prs,merged,issues]=await Promise.all([api('/repos/LUC4N3X/Levyra-deepsound'),count('author:LUC4N3X type:pr is:public'),count('author:LUC4N3X type:pr is:merged is:public'),count('author:LUC4N3X type:issue is:public')]);
if(merged>prs || !Number.isSafeInteger(project.stargazers_count) || !Number.isSafeInteger(project.forks_count)) throw new Error('Invalid GitHub statistics');
const data={prs,merged,issues,stars:project.stargazers_count,forks:project.forks_count,date:new Date().toISOString().slice(0,10)};
await mkdir('assets/stats',{recursive:true});
for(const theme of ['dark','light']) for(const [kind,svg] of Object.entries(renderCards(data,theme))) await writeFile('assets/stats/'+kind+'-'+theme+'.svg',svg);
