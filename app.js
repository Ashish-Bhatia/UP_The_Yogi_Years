
(function(){
"use strict";
var d=window.YOGI_DATA;
var root=document.getElementById("content");
var sidebar=document.getElementById("sidebar");
var scrim=document.getElementById("scrim");
var menu=document.getElementById("menuButton");
var headerTitle=document.getElementById("headerTitle");
var activeChart="households";
function safe(v){return String(v==null?"":v).replace(/[&<>"']/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x];});}
function cite(ids){return (ids||[]).map(function(id){var s=d.sources.find(function(x){return x.id===id;});return s?'<a class="reference" href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer" title="'+safe(s.title)+'">'+id+' ↗</a>':"";}).join(" ");}
function tag(t){return '<span class="eyebrow">'+safe(t)+'</span>';}
function arrow(){return '<span aria-hidden="true">↗</span>';}
function aTopic(x){return '#/dossier/'+x.id;}
function linkClass(href){return (window.location.hash===href||(href==="#/"&&!window.location.hash))?' active':'';}
function groups(){
 var result={};d.topics.forEach(function(t){(result[t.group]||(result[t.group]=[])).push(t);});
 return result;
}
function buildNav(){
 var nav='<a class="nav-link'+linkClass("#/")+'" href="#/"><span>◫</span> The overview</a>'+
 '<a class="nav-link'+linkClass("#/timeline")+'" href="#/timeline"><span>◷</span> Year by year</a>'+
 '<a class="nav-link'+linkClass("#/compare")+'" href="#/compare"><span>≡</span> Compare the numbers</a>'+
 '<a class="nav-link'+linkClass("#/topics")+'" href="#/topics"><span>▦</span> All investigations</a>'+
 '<a class="nav-link'+linkClass("#/districts")+'" href="#/districts"><span>⌖</span> 75 districts</a>';
 var gs=groups();Object.keys(gs).forEach(function(g){
  nav+='<div class="nav-section">'+safe(g)+'</div>';
  gs[g].forEach(function(t){nav+='<a class="nav-link nav-indent'+linkClass(aTopic(t))+'" href="'+aTopic(t)+'">'+safe(t.nav)+'</a>';});
 });
 nav+='<div class="nav-section">THE DESK</div>'+
 '<a class="nav-link'+linkClass("#/evidence")+'" href="#/evidence">Source library <span class="nav-number">'+d.sources.length+'</span></a>'+
 '<a class="nav-link'+linkClass("#/method")+'" href="#/method">Methods & limitations</a>'+
 '<a class="nav-link'+linkClass("#/open-questions")+'" href="#/open-questions">Open questions <span class="nav-number">'+d.backlog.length+'</span></a>';
 document.getElementById("navigation").innerHTML=nav;
}
function pageHead(kicker,title,deck){
 return '<div class="page-title">'+tag(kicker)+'<h1>'+title+'</h1><p class="lead">'+deck+'</p></div>';
}
function topicTile(t){return '<a class="topic-tile" href="'+aTopic(t)+'">'+tag(t.eyebrow)+'<h3>'+safe(t.title)+'</h3><p>'+safe(t.deck)+'</p><div class="tile-bottom"><span>'+safe(t.verdict)+'</span><b>Read story ↗</b></div></a>';}
function metricTile(m){return '<div class="metric"><span class="metric-name">'+safe(m.label)+'</span><strong>'+safe(m.n)+'</strong><small>'+safe(m.sub)+'</small>'+cite([m.source])+'</div>';}
function home(){
 var feature=["economy","budgets","law","health","poverty","industry"].map(function(id){return d.topics.find(function(x){return x.id===id;});});
 return '<section class="hero">'+
 '<div class="hero-content">'+tag('AN INDEPENDENT PUBLIC RECORD  /  2017–2026')+
 '<h1>Uttar Pradesh.<br><em>The Yogi Years.</em></h1>'+
 '<p>What changed? Who gained? What remains unresolved? A chronological, evidence-led examination of government, everyday life and the economy since March 2017.</p>'+
 '<div class="hero-actions"><a class="cta primary" href="#/topics">Explore the investigations <span>↗</span></a><a class="cta ghost" href="#/method">How we assess claims</a></div>'+
 '<div class="hero-foot"><span>Independent analysis</span><span>Last research check: 18 Oct 2026</span><span>75 districts</span></div>'+
 '</div><div class="hero-photo" role="img" aria-label="Illustrative stock photograph of the Taj Mahal in Uttar Pradesh"><div class="photo-label">UTTAR PRADESH · STOCK PHOTOGRAPHY / UNSPLASH</div></div></section>'+
 '<section class="section intro"><div class="section-top">'+tag('THE FIRST READING')+'<h2>Progress is visible.<br><span>The full story is more complicated.</span></h2>'+
 '<p>The evidence documents gains in basic services, poverty reduction and infrastructure. It also shows a persistent income gap, weak child nutrition outcomes, budget execution shortfalls and unresolved legal and governance questions. These findings do not amount to a single political score.</p></div>'+
 '<div class="metrics-grid">'+d.metrics.map(metricTile).join("")+'</div></section>'+
 '<section class="section"><div class="section-heading">'+tag('THE CENTRAL QUESTION')+'<h2>Start with the comparisons</h2><p>Same indicator, defined years, original source. Do not confuse projections with outcomes.</p></div>'+charts(true)+'</section>'+
 '<section class="section"><div class="section-heading"><div>'+tag('THE INVESTIGATIONS')+'<h2>Follow the evidence</h2></div><a class="text-link" href="#/topics">Browse every subject ↗</a></div><div class="topic-grid">'+feature.map(topicTile).join("")+'</div></section>'+
 '<section class="feature-band"><div>'+tag('75 DISTRICTS · 18 DIVISIONS')+'<h2>A state average hides local realities.</h2><p>Bundelkhand, the western industrial belt, Purvanchal and the Terai cannot be evaluated using one headline number. District dossiers require verified local comparisons.</p><a class="cta primary" href="#/districts">Open the district directory ↗</a></div><div class="feature-stat"><span>57.74 — 74.19</span><small>District score range in UP’s own 2023–24 SDG publication. This is not the NITI national score.</small>'+cite(["S05"])+'</div></section>'+
 '<section class="section"><div class="section-heading"><div>'+tag('THE CHRONOLOGY')+'<h2>Dates change the story</h2></div><a class="text-link" href="#/timeline">Full timeline ↗</a></div>'+timelineItems(d.timeline.slice(-5))+'</section>'+
 '<section class="ethics-strip"><span class="round-icon">i</span><p><strong>Evidence before conclusions.</strong> Published proposals are not commissioned projects. Registered offences are not the full extent of crime. One survey is not proof of political causation. Every source and outstanding gap is disclosed.</p><a href="#/method">Read methodology ↗</a></section>';
}
function timelineItems(rows){return '<div class="timeline-list">'+rows.map(function(t){return '<article class="time-item"><div class="time-date">'+safe(t.date)+'</div><div class="time-content"><span class="mini-label">'+safe(t.type)+'</span><h3>'+safe(t.title)+'</h3><p>'+safe(t.body)+'</p><div>'+cite(t.refs)+'</div></div></article>';}).join("")+'</div>';}
function timeline(){return pageHead("2017 → 2026","The chronology","A dated record of major political, social, economic and judicial turning points. Dates describe the event, not the date a claim became statistically measurable.")+
 '<div class="filterbar"><label for="eraFilter">Filter by event type</label><select id="eraFilter"><option value="all">All events</option>'+[...new Set(d.timeline.map(function(t){return t.type;}))].map(function(t){return '<option value="'+safe(t)+'">'+safe(t)+'</option>';}).join("")+'</select><span id="timelineCount"></span></div><div id="timelineMount"></div>';}
function topicsPage(){return pageHead("OUR BEATS","The investigations","A growing collection of research dossiers spanning public finances, livelihoods, health, education, law, roads, politics and district inequality. Each opens with evidence, context and unresolved questions.")+
 '<div class="searchrow"><input id="topicSearch" type="search" placeholder="Search themes, questions or keywords…" aria-label="Search investigations"><span>'+d.topics.length+' ongoing dossiers</span></div><div class="topic-grid" id="topicResults">'+d.topics.map(topicTile).join("")+'</div>';}
function dossier(t){
 return '<article class="reading">'+
 '<div class="article-hero"><a class="back-link" href="#/topics">← All investigations</a>'+tag(t.group+' / '+t.eyebrow)+
 '<h1>'+safe(t.title)+'</h1><p class="article-deck">'+safe(t.deck)+'</p>'+
 '<div class="article-meta"><span>RESEARCH NOTE · 18 OCT 2026</span><span>'+safe(t.verdict)+'</span><span>'+t.sources.length+' cited records</span></div></div>'+
 '<div class="article-layout"><div class="article-text"><p class="opening">'+safe(t.lead)+'</p>'+
 t.sections.map(function(s,i){return '<section class="article-section"><div class="paragraph-index">'+String(i+1).padStart(2,"0")+'</div><h2>'+safe(s[0])+'</h2><p>'+safe(s[1])+'</p></section>';}).join("")+
 '<div class="finding"><span>THE EVIDENCE SAYS</span><p>'+safe(t.takeaway)+'</p></div>'+
 '<div class="article-sources"><h2>Original records</h2><p>Source IDs are clickable and lead to the underlying publication.</p>'+t.sources.map(function(id){var s=d.sources.find(function(x){return x.id===id;});return s?'<a href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer"><b>'+id+'</b><span>'+safe(s.title)+'<small>'+safe(s.org)+' · '+safe(s.type)+'</small></span><span>↗</span></a>':"";}).join("")+'</div>'+
 '</div><aside class="article-aside"><div class="aside-sticky"><span class="mini-label">READING NOTE</span><h3>What makes this a finding?</h3><p>We distinguish independently measured outcomes, official announcements, unresolved allegations and editorial interpretation.</p><a class="text-link" href="#/method">See the assessment framework ↗</a><hr><h3>Related questions</h3>'+d.topics.filter(function(x){return x.id!==t.id && x.group===t.group;}).slice(0,3).map(function(x){return '<a class="related" href="'+aTopic(x)+'">'+safe(x.nav)+' ↗</a>';}).join("")+'</div></aside></div></article>';
}
function chartMarkup(c){
 var all=(c.items||[]).map(function(x){return x.score!==undefined?x.score:Math.max(x.before,x.after);});
 var max=Math.max.apply(null,all)||1;
 if(c.id==="capital")max=160000;
 else max=Math.max(100,max);
 var bar=function(value,name){return '<div class="bar-line"><span class="bar '+name+'" style="width:'+Math.max(.6,(value/max*100))+'%"></span><b>'+Number(value).toLocaleString("en-IN")+'</b></div>';};
 var list=c.items.map(function(i){
 return '<div class="chart-row"><div class="chart-name">'+safe(i.name)+'</div><div class="chart-bars">'+(i.score!==undefined?bar(i.score,"after"):bar(i.before,"before")+bar(i.after,"after"))+'</div></div>';
 }).join("");
 var legend=c.id==="sdg"?'<span><i class="legend-dot after"></i> NITI index score</span>':c.id==="capital"?'<span><i class="legend-dot before"></i> Budget estimate</span><span><i class="legend-dot after"></i> Actual</span>':c.id==="spending"?'<span><i class="legend-dot before"></i> State average FY2025–26</span><span><i class="legend-dot after"></i> UP FY2026–27</span>':c.id==="water"?'<span><i class="legend-dot before"></i> 15 Aug 2019</span><span><i class="legend-dot after"></i> Oct 2026 dashboard</span>':'<span><i class="legend-dot before"></i> 2015–16</span><span><i class="legend-dot after"></i> 2020–21</span>';
 return '<div class="chart-exhibit"><div class="chart-top"><div>'+tag(c.unit)+'<h3>'+safe(c.title)+'</h3></div><div class="chart-legend">'+legend+'</div></div><div class="chart-rows">'+list+'</div><p class="chart-caption">'+safe(c.note)+' '+cite([c.source])+'</p></div>';
}
function charts(compact){return '<div class="chart-switch" role="group" aria-label="Choose comparison">'+d.comparisons.map(function(c){return '<button type="button" data-chart="'+safe(c.id)+'" class="chart-tab'+(activeChart===c.id?' selected':'')+'">'+safe(c.title.split(":")[0])+'</button>';}).join("")+'</div><div id="chartMount">'+chartMarkup(d.comparisons.find(function(x){return x.id===activeChart;})||d.comparisons[0])+'</div>'+(compact?'<a class="text-link chart-exit" href="#/compare">All charts and definitions ↗</a>':'');}
function compare(){return pageHead("BEFORE & AFTER","Compare the evidence","Side-by-side statistical views with reference periods, definitions, units and primary sources. Use the tabs to change datasets.")+charts(false)+
 '<section class="section inset-section"><div class="section-heading">'+tag('INTERPRETING THE NUMBERS')+'<h2>Three traps to avoid</h2></div><div class="three-col"><div><h3>Nominal ≠ real</h3><p>Price inflation can increase current-price GSDP without equivalent growth in actual production.</p></div><div><h3>Spending ≠ service</h3><p>Budgets allocate funds. Audited expenditure, physical completion and citizen outcomes are different measures.</p></div><div><h3>Correlation ≠ cause</h3><p>Pre/post government comparisons reveal patterns. They do not isolate the contribution of Union schemes, economic trends or previous investments.</p></div></div></section>';
}
function districtPage(){
 return pageHead("75 DISTRICTS / 18 DIVISIONS","The district directory","Geography is the next frontier of this investigation. This is a complete district index, not a completed district-level evidence audit.")+
 '<div class="district-intro"><strong>42 front-runners · 33 performers</strong><p>UP’s own 2023–24 district SDG publication reports scores from 57.74 to 74.19. We are not assigning unverified individual scores to districts. '+cite(["S05"])+'</p></div>'+
 '<div class="searchrow"><input id="districtSearch" type="search" placeholder="Find a district or division…" aria-label="Find a district"><span id="districtCount">75 districts</span></div><div id="districtResults" class="district-grid">'+regionList(d.regions)+'</div>'+
 '<section class="ethics-strip"><span class="round-icon">?</span><p><strong>What is missing?</strong> District-specific trends for school learning, maternal health, welfare utilisation, road access, FIRs, local wages, water and air quality. These require validated extracts from official publications.</p><a href="#/open-questions">Gap register ↗</a></section>';
}
function regionList(regions){return regions.map(function(r){return '<div class="district-box"><span class="mini-label">'+safe(r.name)+' division</span><h3>'+r.districts.length+' districts</h3><ul>'+r.districts.map(function(x){return '<li>'+safe(x)+'</li>';}).join("")+'</ul></div>';}).join("");}
function evidence(){
 return pageHead("PROVENANCE","The source library","A curated, growing library of directly linked publications, reports and records. Primary data are preferred; government claims and independent interpretation are labelled separately.")+
 '<div class="searchrow"><input id="sourceSearch" type="search" placeholder="Search source ID, institution or title…" aria-label="Find a source"><span id="sourceCount">'+d.sources.length+' records</span></div>'+
 '<div id="sourceResults">'+sourceRows(d.sources)+'</div>';
}
function sourceRows(src){return '<div class="source-list">'+src.map(function(s){return '<a class="source-row" href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer"><span class="source-id">'+s.id+'</span><span class="source-body"><strong>'+safe(s.title)+'</strong><small>'+safe(s.org)+' · '+safe(s.type)+'</small></span><span class="source-arrow">↗</span></a>';}).join("")+'</div>';}
function openQuestions(){
 return pageHead("WHAT IS NOT YET VERIFIED","The open investigation ledger","A transparent backlog of specific data-collection tasks. This prevents incomplete reporting from being presented as a finished evaluation.")+
 '<div class="gap-list">'+d.backlog.map(function(b,i){return '<article class="gap"><span class="priority '+b.priority.toLowerCase()+'">'+b.priority+'</span><div><h3>'+safe(b.theme)+'</h3><p>'+safe(b.task)+'</p></div><small>#'+String(i+1).padStart(2,"0")+'</small></article>';}).join("")+'</div>';
}
function method(){
 return pageHead("EDITORIAL STANDARDS","How this investigation works","The goal is to make every finding testable, including findings favourable to the government and findings critical of it.")+
 '<div class="method-grid">'+[
 ["01","Start before March 2017","Define a baseline wherever a comparable pre-government series exists. Prefer several earlier years over a single cherry-picked observation."],
 ["02","Track the full period","Use dated source records from 2017 through October 2026, with survey fieldwork dates, financial years and release dates kept distinct."],
 ["03","Compare like with like","Check population denominators, inflation, index methodology, sampling, case definitions and whether the comparator is UP or an all-state average."],
 ["04","Separate four claim classes","Distinguish official statements, reported administrative data, survey/audited outcomes and judicially established findings. Allegations remain allegations."],
 ["05","Avoid false attribution","State and Union programmes overlap. Economic cycles, the pandemic, demographic trends and inherited projects affect outcomes. Pre/post change is not causal proof."],
 ["06","Publish uncertainty","Label budget estimates (BE), revised estimates (RE), actuals, projections, survey confidence and missing local records."],
 ["07","Use fair contradiction","Record plausible government explanations and serious criticism with evidence. Correct facts rather than balancing claims mechanically."],
 ["08","Keep a revision trail","Every later edition should preserve a dated evidence ledger, corrections log, original links and claims withdrawn or updated."]
 ].map(function(item){return '<article class="method-card"><span>'+item[0]+'</span><h3>'+item[1]+'</h3><p>'+item[2]+'</p></article>';}).join("")+'</div>'+
 '<section class="method-callout"><h2>What this edition is</h2><p>A research-backed foundation with '+d.topics.length+' editorial dossiers, '+d.sources.length+' linked sources, interactive comparisons, an event chronology, a 75-district index and a transparent backlog. It is <strong>not</strong> an assertion that every scheme, district, police case, rupee of public spending or allegation since 2017 has already been verified.</p><h2>Images and licensing</h2><p>Editorial stock imagery is illustrative. It is not treated as evidence of a government outcome. Taj Mahal photography is embedded from Unsplash and linked to the platform’s licensing terms. No invented archival photos or fabricated charts appear.</p><h2>Corrections</h2><p>Propose corrections with the exact claim, a reliable source, publication date and the necessary replacement. Use the public repository issue tracker. Content is dated 18 October 2026 and requires future source rechecks.</p><a class="cta primary" href="https://github.com/Ashish-Bhatia/UP_The_Yogi_Years/issues" target="_blank" rel="noopener noreferrer">Submit evidence or correction ↗</a></section>';
}
function closeMenu(){document.body.classList.remove("menu-open");menu.setAttribute("aria-expanded","false");}
function route(){
 var route=decodeURIComponent(location.hash.replace(/^#\/?/,"")||"");
 var spl=route.split("/");
 var content;
 if(!route){content=home();headerTitle.textContent="The overview";}
 else if(spl[0]==="dossier"){var t=d.topics.find(function(x){return x.id===spl[1];});content=t?dossier(t):pageHead("404","Not found","That dossier does not exist.");headerTitle.textContent=t?t.nav:"Not found";}
 else {var routes={"timeline":timeline,"topics":topicsPage,"compare":compare,"districts":districtPage,"evidence":evidence,"method":method,"open-questions":openQuestions};content=routes[route]?routes[route]():pageHead("404","Page not found","Choose a section from the navigation.");headerTitle.textContent=({"timeline":"Year by year","topics":"Investigations","compare":"Compare the numbers","districts":"75 districts","evidence":"The source library","method":"Methods & limitations","open-questions":"Open questions"})[route]||"Not found";}
 root.innerHTML=content;
 buildNav();closeMenu();window.scrollTo(0,0);wirePage(route);
 document.title=(headerTitle.textContent==="The overview"?"UP - The Yogi Years":headerTitle.textContent+" | UP - The Yogi Years");
}
function wirePage(route){
 root.querySelectorAll("[data-chart]").forEach(function(b){b.addEventListener("click",function(){activeChart=b.getAttribute("data-chart");root.querySelectorAll("[data-chart]").forEach(function(t){t.classList.toggle("selected",t===b);});var c=d.comparisons.find(function(x){return x.id===activeChart;});document.getElementById("chartMount").innerHTML=chartMarkup(c);});});
 var f=document.getElementById("eraFilter");if(f){var rerender=function(){var v=f.value;var rows=d.timeline.filter(function(t){return v==="all"||t.type===v;});document.getElementById("timelineMount").innerHTML=timelineItems(rows);document.getElementById("timelineCount").textContent=rows.length+" entries";};f.addEventListener("change",rerender);rerender();}
 var ds=document.getElementById("districtSearch");if(ds){ds.addEventListener("input",function(){var q=ds.value.trim().toLowerCase();var rs=d.regions.map(function(r){return {name:r.name,districts:r.districts.filter(function(x){return !q||r.name.toLowerCase().includes(q)||x.toLowerCase().includes(q);})};}).filter(function(r){return r.districts.length;});document.getElementById("districtResults").innerHTML=regionList(rs)||'<p class="empty">No matching districts</p>';document.getElementById("districtCount").textContent=rs.reduce(function(n,r){return n+r.districts.length;},0)+" districts";});}
 var ts=document.getElementById("topicSearch");if(ts){ts.addEventListener("input",function(){var q=ts.value.toLowerCase();var out=d.topics.filter(function(t){return [t.title,t.deck,t.group,t.nav,t.lead].join(" ").toLowerCase().includes(q);});document.getElementById("topicResults").innerHTML=out.map(topicTile).join("")||'<p class="empty">No matching investigations</p>';});}
 var ss=document.getElementById("sourceSearch");if(ss){ss.addEventListener("input",function(){var q=ss.value.toLowerCase();var out=d.sources.filter(function(s){return [s.id,s.title,s.org,s.type].join(" ").toLowerCase().includes(q);});document.getElementById("sourceResults").innerHTML=sourceRows(out);document.getElementById("sourceCount").textContent=out.length+" records";});}
}
menu.addEventListener("click",function(){var opened=document.body.classList.toggle("menu-open");menu.setAttribute("aria-expanded",opened?"true":"false");});
scrim.addEventListener("click",closeMenu);
window.addEventListener("hashchange",route);
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu();});
route();
})();