const CITY_CENTERS = {
  bengaluru:  { lat: 12.9716,  lon: 77.5946,  name: "Bengaluru" },
  delhi:      { lat: 28.6139,  lon: 77.2090,  name: "Delhi" },
  mumbai:     { lat: 19.0760,  lon: 72.8777,  name: "Mumbai" },
  hyderabad:  { lat: 17.3850,  lon: 78.4867,  name: "Hyderabad" },
  chennai:    { lat: 13.0827,  lon: 80.2707,  name: "Chennai" },
  kolkata:    { lat: 22.5726,  lon: 88.3639,  name: "Kolkata" },
  jaipur:     { lat: 26.9124,  lon: 75.7873,  name: "Jaipur" },
  lucknow:    { lat: 26.8467,  lon: 80.9462,  name: "Lucknow" }
};

let activeCity = "bengaluru";

const SAFETY_DATA = {
  "koramangala":      { day: 82, night: 58, landmarks: ["Apollo Hospital nearby","Well-lit main roads","Active pub street till late"], risks: ["Isolated back lanes at night","Low police visibility after 11 PM"] },
  "mg road":          { day: 90, night: 75, landmarks: ["Metro station","CCTV coverage","Heavy footfall"], risks: ["Crowded — watch for pickpockets"] },
  "indiranagar":      { day: 85, night: 65, landmarks: ["Many open restaurants","Good street lighting","Frequent autos"], risks: ["Party crowd late night","Unlit shortcuts"] },
  "whitefield":       { day: 78, night: 50, landmarks: ["Tech parks with security"], risks: ["Poor public transport at night","Long dark stretches"] },
  "electronic city":  { day: 72, night: 45, landmarks: ["Office security guards"], risks: ["Very isolated at night","Limited auto/cab availability"] },
  "jayanagar":        { day: 88, night: 70, landmarks: ["Busy shopping area","Well-patrolled"], risks: ["Narrow lanes in older sections"] },
  "hsr layout":       { day: 80, night: 62, landmarks: ["Multiple malls","Food streets open late"], risks: ["Poorly lit interior roads"] },
  "btm layout":       { day: 78, night: 55, landmarks: ["Active commercial areas"], risks: ["Crowded bus stops after midnight"] },
  "marathahalli":     { day: 76, night: 52, landmarks: ["Shopping complexes","IT corridor"], risks: ["Traffic chaos","Dark service roads"] },
  "hebbal":           { day: 74, night: 48, landmarks: ["Flyover area with lighting"], risks: ["Highway stretches can be isolated"] },
  "connaught place":  { day: 85, night: 68, landmarks: ["Metro connectivity","Police pickets","CCTV dense zone"], risks: ["Beware touts and scammers","Avoid deserted inner circles at night"] },
  "saket":            { day: 83, night: 65, landmarks: ["Select Citywalk Mall","Good lighting"], risks: ["Isolated park areas after dark"] },
  "hauz khas":        { day: 80, night: 62, landmarks: ["Active village restaurants","Well-known area"], risks: ["Village lanes poorly lit after midnight","Reported harassment near lake"] },
  "lajpat nagar":     { day: 82, night: 60, landmarks: ["Busy market area","Multiple autos"], risks: ["Narrow market lanes","Reduced visibility at night"] },
  "rohini":           { day: 72, night: 45, landmarks: ["Metro connectivity"], risks: ["Poorly lit residential streets","Reported chain-snatchings"] },
  "paharganj":        { day: 65, night: 42, landmarks: ["Near New Delhi Railway Station"], risks: ["High tourist crime area","Avoid at night if possible","Drug activity reported"] },
  "dwarka":           { day: 78, night: 55, landmarks: ["Metro connectivity","Residential colony guards"], risks: ["Long stretches between metro and homes","Limited street lighting"] },
  "chandni chowk":    { day: 70, night: 45, landmarks: ["Heritage area","Police presence"], risks: ["Extremely crowded","Multiple crime incidents reported","Avoid after 10 PM"] },
  "vasant kunj":      { day: 80, night: 60, landmarks: ["Ambience Mall","Good road infrastructure"], risks: ["Forest areas nearby dark at night"] },
  "mayur vihar":      { day: 76, night: 52, landmarks: ["Metro hub","Busy market"], risks: ["Interior colony roads poorly lit"] },
  "bandra":           { day: 88, night: 72, landmarks: ["Active nightlife","Well-lit promenade","Regular police patrolling"], risks: ["Carter Road crowds at night","Petty theft near station"] },
  "andheri":          { day: 80, night: 60, landmarks: ["Metro connectivity","Always-open eateries"], risks: ["MIDC area isolated at night","Crime near station reported"] },
  "colaba":           { day: 85, night: 70, landmarks: ["Tourist area","CCTV coverage","Police visibility"], risks: ["Pickpockets near Gateway of India","Late night street harassment"] },
  "dharavi":          { day: 60, night: 35, landmarks: ["Busy during day"], risks: ["Very poor lighting at night","Limited police presence","Avoid after 9 PM"] },
  "malad":            { day: 76, night: 52, landmarks: ["Shopping malls","Metro nearby"], risks: ["Isolated link road at night"] },
  "versova":          { day: 74, night: 55, landmarks: ["Beach area popular","Fishing community active"], risks: ["Dark beach areas after dark","Limited cab access at odd hours"] },
  "thane":            { day: 78, night: 58, landmarks: ["Multiple malls","Railway connectivity"], risks: ["Station area crowded for theft","Outskirts poorly lit"] },
  "juhu":             { day: 82, night: 65, landmarks: ["Beach active till late","Good road lighting"], risks: ["Isolated beach at night","Late night hawker activity"] },
  "lower parel":      { day: 85, night: 68, landmarks: ["Corporate hub","High security","Well-lit roads"], risks: ["Dead zone on weekends","Construction areas dark"] },
  "marine lines":     { day: 87, night: 72, landmarks: ["Marine Drive well-lit","Regular police patrol"], risks: ["Isolated spots beyond promenade"] },
  "hitech city":      { day: 85, night: 60, landmarks: ["IT corridor security","24/7 cabs available"], risks: ["Isolated outskirts at midnight","Construction zone risks"] },
  "banjara hills":    { day: 88, night: 70, landmarks: ["Upscale area","Good lighting","Regular security"], risks: ["Isolated bungalow lanes at night"] },
  "jubilee hills":    { day: 86, night: 68, landmarks: ["High security residences","Active restaurants"], risks: ["Reported drunk driving incidents","Poorly lit park areas"] },
  "secunderabad":     { day: 80, night: 60, landmarks: ["Cantonment area with security","Major station"], risks: ["Crowded station area","Chain snatching reported"] },
  "charminar":        { day: 72, night: 48, landmarks: ["Heritage police post","Market active till late"], risks: ["Crowded narrow lanes","Night pickpockets","Harassment incidents reported"] },
  "dilsukhnagar":     { day: 74, night: 50, landmarks: ["Active commercial hub"], risks: ["Past bomb blast area — stay alert","Poorly lit interior lanes"] },
  "kukatpally":       { day: 78, night: 55, landmarks: ["Metro connectivity","Shopping malls"], risks: ["Highway stretches dark","Auto refusals at night"] },
  "gachibowli":       { day: 84, night: 62, landmarks: ["International school zone","Good road lighting"], risks: ["Limited public transport late night"] },
  "t nagar":          { day: 82, night: 60, landmarks: ["Busy commercial hub","Active metro","Police posts"], risks: ["Extremely crowded — pickpockets","Narrow lanes near market"] },
  "anna nagar":       { day: 85, night: 68, landmarks: ["Well-planned colony","Good street lights","CCTV"], risks: ["Isolated tower blocks at night"] },
  "mylapore":         { day: 80, night: 62, landmarks: ["Temple area with devotees","Heritage lanes"], risks: ["Dark alleys behind temple","Chain snatching reported"] },
  "velachery":        { day: 76, night: 52, landmarks: ["Phoenix Mall area lit","Metro"], risks: ["Interior housing lanes dark"] },
  "adyar":            { day: 83, night: 65, landmarks: ["Active residential area","Good transport"], risks: ["Isolated riverside paths after dark"] },
  "besant nagar":     { day: 82, night: 63, landmarks: ["Elliott's Beach active till late","Restaurants open"], risks: ["Beach isolated after midnight"] },
  "guindy":           { day: 78, night: 55, landmarks: ["Near airport — security","Industrial area guards"], risks: ["Long isolated stretches near factory"] },
  "omr":              { day: 74, night: 48, landmarks: ["IT corridor security"], risks: ["Very isolated at night","Limited street lighting","Cab cancellations common"] },
  "park street":      { day: 88, night: 72, landmarks: ["Always active","Good CCTV","Police patrolled"], risks: ["Pickpockets in crowd","Post-midnight drunk crowd"] },
  "salt lake":        { day: 82, night: 62, landmarks: ["IT hub security","Planned urban area"], risks: ["Interior sectors isolated at night","Limited autos past midnight"] },
  "howrah":           { day: 68, night: 45, landmarks: ["Station with police presence"], risks: ["Crime around Howrah Bridge","Station surroundings risky at night","Reported muggings"] },
  "new town":         { day: 80, night: 58, landmarks: ["Planned smart city area","Well-lit roads"], risks: ["Some under-construction areas dark"] },
  "esplanade":        { day: 75, night: 52, landmarks: ["Metro hub","Police presence"], risks: ["Extremely crowded — theft-prone","Isolated at night"] },
  "jadavpur":         { day: 76, night: 55, landmarks: ["University area active","Cafes open late"], risks: ["Isolated stretches toward outskirts","Past crime incidents reported"] },
  "ballygunge":       { day: 83, night: 65, landmarks: ["Upscale area","Well-maintained roads"], risks: ["Isolated Dhakuria lake area at night"] },
  "pink city":        { day: 78, night: 55, landmarks: ["Heritage zone police patrols","Hawa Mahal area lit"], risks: ["Tourist touts active","Narrow walled city lanes","Reported harassment of women travelers"] },
  "malviya nagar":    { day: 82, night: 62, landmarks: ["Busy market","Good connectivity"], risks: ["Interior residential pockets dark at night"] },
  "vaishali nagar":   { day: 84, night: 65, landmarks: ["Upscale area","Multiple malls","Good lighting"], risks: ["Petty theft in market areas"] },
  "mansarovar":       { day: 80, night: 58, landmarks: ["Large residential colony","Security guards"], risks: ["Isolated sectors poorly lit"] },
  "raja park":        { day: 78, night: 58, landmarks: ["Active commercial area","Well-known locality"], risks: ["Narrow lanes","Limited late-night transport"] },
  "ajmer road":       { day: 70, night: 45, landmarks: ["Highway with dhabas"], risks: ["Long highway stretches isolated","Vehicle breakdown risk at night"] },
  "hazratganj":       { day: 85, night: 68, landmarks: ["Main commercial hub","Good police presence","Well-lit"], risks: ["Crowded — pickpocket risk","Late night vendor harassment"] },
  "gomti nagar":      { day: 84, night: 66, landmarks: ["New planned area","IT companies","Good security"], risks: ["Some isolated pockets after midnight"] },
  "aminabad":         { day: 72, night: 48, landmarks: ["Active market","Heritage area"], risks: ["Very crowded — harassment reported","Dark after 10 PM","Narrow lanes"] },
  "aliganj":          { day: 80, night: 60, landmarks: ["Residential area","Active market"], risks: ["Interior roads poorly lit"] },
  "alambagh":         { day: 74, night: 50, landmarks: ["Near bus terminal","Railway connectivity"], risks: ["Station surroundings unsafe at night","Reported crime incidents"] },
  "indira nagar":     { day: 82, night: 62, landmarks: ["Active market and restaurants","Good connectivity"], risks: ["Crowded narrow lanes"] },
  "chinhat":          { day: 68, night: 42, landmarks: ["Industrial outskirts"], risks: ["Poorly lit industrial zone","Limited transport at night","Reported incidents"] },
  "default": {
    day: 65, night: 40,
    landmarks: ["Unknown area — proceed with caution"],
    risks: ["Limited safety data available — stay alert","Share your location with someone trusted"]
  }
};

const INCIDENTS_DATA = {
  bengaluru: [
    { title: "Bellandur Acid Attack Case", year: "2022", area: "Bellandur", severity: "high", desc: "A woman was attacked with acid near a tech park exit. Led to increased CCTV deployment and police patrolling in the area." },
    { title: "Cubbon Park Night Incident", year: "2021", area: "Cubbon Park", severity: "high", desc: "Series of assaults reported inside Cubbon Park after dark. Park now closed to public after 8 PM with enhanced patrolling." },
    { title: "Majestic Area Harassment Series", year: "2023", area: "KSR Bus Stand", severity: "high", desc: "Multiple women reported harassment at the bus stand and surrounding areas during late hours. Police deployed additional female officers." },
    { title: "HSR Layout Chain Snatching Spree", year: "2022", area: "HSR Layout", severity: "moderate", desc: "Over 12 chain-snatching incidents on two-wheelers targeting women returning from work. Gang later arrested by Bengaluru police." },
    { title: "Marathahalli Bridge Mugging", year: "2023", area: "Marathahalli", severity: "moderate", desc: "Pedestrian mugging incidents near bridge underpass. Better lighting installed and beat patrol increased." }
  ],
  delhi: [
    { title: "December 16 Gangrape Case", year: "2012", area: "South Delhi", severity: "high", desc: "The Nirbhaya case — a horrific gang rape that shook the nation and led to major amendments in India's rape laws (Criminal Law Amendment Act 2013)." },
    { title: "Priyanka Reddy Parallel Case", year: "2019", area: "Mahipalpur", severity: "high", desc: "Attack on a veterinarian in Delhi-NCR region sparked massive protests. Led to renewed demand for fast-track courts." },
    { title: "Rohini Sector Stalking Case", year: "2023", area: "Rohini", severity: "high", desc: "A woman was followed for weeks before the stalker attacked. Police emphasized the importance of reporting early." },
    { title: "Chandni Chowk Eve-Teasing Incident", year: "2022", area: "Chandni Chowk", severity: "moderate", desc: "Viral video of group harassment of women tourists near metro station led to arrest of 6 individuals." },
    { title: "Paharganj Robbery Series", year: "2023", area: "Paharganj", severity: "high", desc: "Multiple solo women travelers robbed near hotel area at night. Travel advisories issued for women to avoid the area after dark." }
  ],
  mumbai: [
    { title: "Shakti Mills Gang Rape", year: "2013", area: "Lower Parel", severity: "high", desc: "Two incidents at abandoned Shakti Mills sparked outrage. Mumbai High Court sentenced accused under amended rape laws." },
    { title: "Marine Drive Stalking Case", year: "2022", area: "Marine Drive", severity: "moderate", desc: "Reported harassment at the promenade. Led to increased police presence along Marine Drive post 10 PM." },
    { title: "Andheri Station Assault", year: "2023", area: "Andheri West", severity: "high", desc: "A woman was assaulted near the station parking area late at night. Prompted CCTV expansion around suburban railway stations." },
    { title: "Dharavi Chain Snatching Wave", year: "2022", area: "Dharavi", severity: "high", desc: "Over 30 chain snatching incidents in 3 months targeting women on two-wheelers. Police crackdown resulted in 8 arrests." },
    { title: "Juhu Beach Harassment Incident", year: "2023", area: "Juhu", severity: "moderate", desc: "Group of men filmed and harassed women at the beach after midnight. Viral footage led to police action and arrests." }
  ],
  hyderabad: [
    { title: "Disha Case / Priyanka Reddy Murder", year: "2019", area: "Shamshabad Toll", severity: "high", desc: "A 27-year-old veterinarian was gang-raped and murdered. Led to Disha Act (2019) for faster trials of rape cases in Telangana." },
    { title: "Jubilee Hills Gang Rape", year: "2022", area: "Jubilee Hills", severity: "high", desc: "A minor was gang-raped after a party. Case highlighted failure of safety systems in affluent areas. Multiple minors arrested." },
    { title: "Hi-Tech City Cab Assault", year: "2023", area: "Hi-Tech City", severity: "high", desc: "A woman IT professional was assaulted by an unverified cab driver. Led to mandatory driver verification checks by app cab companies." },
    { title: "Charminar Area Harassment", year: "2022", area: "Charminar", severity: "moderate", desc: "Series of chain-snatchings and harassment incidents reported near the heritage site. Increased beat patrolling introduced." },
    { title: "Dilsukhnagar Serial Stalker", year: "2023", area: "Dilsukhnagar", severity: "high", desc: "A woman was followed for 6 days before filing a complaint. Police arrested the accused and launched an awareness campaign." }
  ],
  chennai: [
    { title: "Guduvanchery Murder Case", year: "2019", area: "Guduvanchery", severity: "high", desc: "A woman engineer was murdered after reporting harassment. Case highlighted need for better police response to women's complaints." },
    { title: "Velachery Auto Assault", year: "2022", area: "Velachery", severity: "high", desc: "An auto driver assaulted a woman passenger late at night. Led to mandatory panic button installation in autos." },
    { title: "T Nagar Theft Spree", year: "2023", area: "T Nagar", severity: "moderate", desc: "Women targeted for bag snatching during Diwali shopping rush. Additional personnel deployed by Tamil Nadu police." },
    { title: "OMR IT Corridor Incident", year: "2023", area: "OMR", severity: "high", desc: "A woman was attacked after midnight on Old Mahabalipuram Road while waiting for a cab. Triggered demand for better street lighting." },
    { title: "Marina Beach Night Harassment", year: "2022", area: "Marina Beach", severity: "moderate", desc: "Multiple incidents of eve-teasing at the beach during night hours. Police deployed additional women officers." }
  ],
  kolkata: [
    { title: "R.G. Kar Medical College Case", year: "2024", area: "Shyambazar", severity: "high", desc: "A trainee doctor was raped and murdered inside RG Kar Medical College. Triggered massive nationwide protests (Reclaim the Night movement)." },
    { title: "Park Street Rape Case", year: "2012", area: "Park Street", severity: "high", desc: "A woman was gang-raped after being taken from Park Street. The case brought focus to women's safety in Kolkata." },
    { title: "Howrah Station Robbery", year: "2023", area: "Howrah", severity: "high", desc: "A group of women returning from work were robbed at knifepoint near Howrah Station. Area flagged as high-risk after 10 PM." },
    { title: "Salt Lake Sector 5 Stalking", year: "2023", area: "Salt Lake", severity: "moderate", desc: "IT employee stalked by motorbike gang. Police arrested 3 and increased patrolling in the Sector 5 area." },
    { title: "Jadavpur Eve Teasing", year: "2022", area: "Jadavpur", severity: "moderate", desc: "Series of eve-teasing incidents near the university campus reported by students. Student unions held protests demanding safer streets." }
  ],
  jaipur: [
    { title: "Pink City Tourist Harassment", year: "2023", area: "Walled City", severity: "high", desc: "International women tourists repeatedly harassed in the Old City lanes. Led to Tourist Police expansion and awareness boards in tourist areas." },
    { title: "Ajmer Road Highway Assault", year: "2022", area: "Ajmer Road", severity: "high", desc: "A woman driver was forced to stop and attacked late at night on the highway. Patrols increased on all national highways passing through Jaipur." },
    { title: "Vaishali Nagar Chain Snatching", year: "2023", area: "Vaishali Nagar", severity: "moderate", desc: "Multiple women targeted by snatchers on motorcycles. A gang of 5 was arrested after police used CCTV footage." },
    { title: "Mansarovar Park Attack", year: "2022", area: "Mansarovar", severity: "high", desc: "A woman jogging in a park was attacked at dawn. Led to installation of CCTV and regular police rounds in parks." },
    { title: "Sindhi Camp Night Robbery", year: "2023", area: "Sindhi Camp", severity: "moderate", desc: "Women passengers at the bus terminal targeted for bag snatching after midnight. Increased security personnel posted." }
  ],
  lucknow: [
    { title: "Gomti Nagar Stalking & Murder", year: "2021", area: "Gomti Nagar", severity: "high", desc: "A young woman was stalked and murdered by a rejected suitor. Case led to stricter anti-stalking enforcement in Uttar Pradesh." },
    { title: "Hazratganj Group Harassment", year: "2023", area: "Hazratganj", severity: "moderate", desc: "Group harassment of women during a public festival captured on CCTV. Several arrested. Led to safe zone designations in main market areas." },
    { title: "Aminabad Market Assault", year: "2022", area: "Aminabad", severity: "high", desc: "A woman was assaulted in a narrow market lane at night. Market now cleared by police by 10 PM with mandatory lighting compliance." },
    { title: "Alambagh Bus Stand Attack", year: "2022", area: "Alambagh", severity: "high", desc: "A woman waiting for a late-night bus was robbed and assaulted. Initiative launched for shelter zones with CCTV at all major bus stands." },
    { title: "Chinhat Industrial Zone Incident", year: "2023", area: "Chinhat", severity: "high", desc: "A factory worker was attacked while returning on foot through the industrial zone late at night. Well-lit transport route demanded by workers." }
  ]
};

const CRIME_DATA = {
  bengaluru: [
    { type: "Harassment / Eve-teasing", risk: "high", percent: 72, desc: "Highest incidents reported near IT corridors, parks, and public transport hubs." },
    { type: "Chain Snatching", risk: "high", percent: 68, desc: "On two-wheelers, especially targeting women commuters on arterial roads at night." },
    { type: "Stalking", risk: "medium", percent: 52, desc: "Reported frequently near residential areas and metro stations." },
    { type: "Robbery / Mugging", risk: "medium", percent: 48, desc: "Incidents near underpasses, isolated stretches, and late-night bus stops." },
    { type: "Cab / Auto Safety", risk: "medium", percent: 45, desc: "Unverified drivers and route deviation incidents reported by women passengers." }
  ],
  delhi: [
    { type: "Sexual Assault", risk: "high", percent: 85, desc: "Delhi reports the highest rate of crimes against women among all Indian metros." },
    { type: "Harassment / Eve-teasing", risk: "high", percent: 82, desc: "Widespread across markets, buses, and isolated roads especially after dark." },
    { type: "Robbery / Snatching", risk: "high", percent: 75, desc: "Common in crowded areas like Chandni Chowk, Paharganj, and bus terminals." },
    { type: "Stalking", risk: "high", percent: 70, desc: "High incidence, particularly in outer Delhi residential areas and parks." },
    { type: "Acid Attack", risk: "medium", percent: 38, desc: "Cases reported more in fringe districts; multiple convictions have been secured." }
  ],
  mumbai: [
    { type: "Petty Theft / Pickpocketing", risk: "high", percent: 78, desc: "Very common on local trains, crowded markets, and tourist spots." },
    { type: "Harassment", risk: "medium", percent: 60, desc: "Incidents near railway stations, nightlife areas, and isolated beaches at night." },
    { type: "Chain Snatching", risk: "high", percent: 70, desc: "On two-wheelers in suburban areas; high incidence in Dharavi and Malad." },
    { type: "Domestic Violence", risk: "high", percent: 65, desc: "Mumbai reports significant domestic violence cases, highest in dense chawl areas." },
    { type: "Cab / Auto Safety", risk: "medium", percent: 50, desc: "Incidents of harassment by cab and autorickshaw drivers, especially after midnight." }
  ],
  hyderabad: [
    { type: "Sexual Assault", risk: "high", percent: 72, desc: "Several high-profile cases have made Hyderabad a focal point for women's safety laws." },
    { type: "Chain Snatching", risk: "high", percent: 74, desc: "Major issue across the city, particularly in Old City and outskirts." },
    { type: "Stalking", risk: "high", percent: 68, desc: "Frequently reported near IT companies, colleges, and residential areas." },
    { type: "Harassment", risk: "medium", percent: 62, desc: "Reported in Charminar area, Dilsukhnagar, and during festival seasons." },
    { type: "Cab Safety Violations", risk: "high", percent: 66, desc: "Multiple assault cases involving app cab drivers led to Telangana regulations." }
  ],
  chennai: [
    { type: "Harassment", risk: "medium", percent: 58, desc: "Reported in public transport, market areas, and beaches during late hours." },
    { type: "Chain Snatching", risk: "high", percent: 65, desc: "Common in Mylapore, T Nagar, and OMR, particularly targeting motorists." },
    { type: "Stalking", risk: "medium", percent: 52, desc: "Incidents reported near IT parks and college campuses in south Chennai." },
    { type: "Theft in Transit", risk: "medium", percent: 55, desc: "Auto and cab overcharging combined with harassment; some violent incidents." },
    { type: "Beach Safety", risk: "medium", percent: 48, desc: "Marina and Besant Nagar beaches unsafe after 10 PM — groups of men loitering." }
  ],
  kolkata: [
    { type: "Workplace Safety Violations", risk: "high", percent: 75, desc: "RG Kar case highlighted systemic failures in institutional safety for women." },
    { type: "Chain Snatching", risk: "high", percent: 70, desc: "Buses, crowded markets, and trams are hotspots for jewelry theft." },
    { type: "Harassment on Public Transport", risk: "high", percent: 68, desc: "Local buses and metro stations report frequent harassment incidents." },
    { type: "Night-time Robbery", risk: "high", percent: 65, desc: "Howrah and parts of North Kolkata see high robbery after 10 PM." },
    { type: "Stalking", risk: "medium", percent: 55, desc: "Reported in Salt Lake, Jadavpur, and residential areas of South Kolkata." }
  ],
  jaipur: [
    { type: "Tourist Harassment", risk: "high", percent: 76, desc: "Women tourists face high incidence of harassment, especially in Old City lanes." },
    { type: "Chain Snatching", risk: "high", percent: 70, desc: "On motorcycles in market areas and residential colonies at night." },
    { type: "Road Assault / Highway Crime", risk: "high", percent: 65, desc: "Long highway stretches around Jaipur are isolation-risk zones at night." },
    { type: "Eve-teasing", risk: "medium", percent: 60, desc: "Persistent issue near colleges, malls, and crowded bazaars." },
    { type: "Robbery at Bus Stands", risk: "medium", percent: 55, desc: "Sindhi Camp and Narayan Singh Circle bus stands are frequent crime spots." }
  ],
  lucknow: [
    { type: "Stalking & Honour-related Violence", risk: "high", percent: 78, desc: "UP has one of India's highest rates of honour-related crimes. Stalking before violence is common." },
    { type: "Harassment in Public Spaces", risk: "high", percent: 74, desc: "Markets like Aminabad, Hazratganj, and Alambagh report frequent incidents." },
    { type: "Robbery & Snatching", risk: "high", percent: 68, desc: "Night-time snatching near bus stands and poorly lit roads is a persistent issue." },
    { type: "Domestic Violence", risk: "high", percent: 72, desc: "Lucknow records high domestic violence rates, often underreported." },
    { type: "Eve-teasing", risk: "medium", percent: 62, desc: "Reported near colleges, public parks, and during festive seasons." }
  ]
};

function getSafetyScore(locationName, timeOfDay) {
  const name = locationName.toLowerCase();
  for (let key in SAFETY_DATA) {
    if (key !== "default" && name.includes(key)) {
      const d = SAFETY_DATA[key];
      return { score: timeOfDay === "night" ? d.night : d.day, landmarks: d.landmarks, risks: d.risks };
    }
  }
  return {
    score: timeOfDay === "night" ? SAFETY_DATA.default.night : SAFETY_DATA.default.day,
    landmarks: SAFETY_DATA.default.landmarks,
    risks: SAFETY_DATA.default.risks
  };
}

function renderIncidents(city) {
  const list = document.getElementById('incidents-list');
  const incidents = INCIDENTS_DATA[city];
  if (!incidents) { list.innerHTML = '<p class="placeholder-text">No data available for this city yet.</p>'; return; }
  list.innerHTML = incidents.map(i => `
    <div class="incident-card ${i.severity === 'high' ? '' : 'moderate'}">
      <div class="incident-title">${i.title}</div>
      <div class="incident-meta">📅 ${i.year} &nbsp;•&nbsp; 📍 ${i.area}</div>
      <div class="incident-desc">${i.desc}</div>
    </div>
  `).join('');
}

function renderCrimes(city) {
  const list = document.getElementById('crimes-list');
  const crimes = CRIME_DATA[city];
  if (!crimes) { list.innerHTML = '<p class="placeholder-text">No crime data available for this city yet.</p>'; return; }
  const colorMap = { high: '#ef4444', medium: '#fbbf24', low: '#22d3a5' };
  list.innerHTML = crimes.map(c => `
    <div class="crime-stat">
      <div class="crime-stat-header">
        <span class="crime-type">${c.type}</span>
        <span class="crime-risk ${c.risk}">${c.risk.toUpperCase()} RISK</span>
      </div>
      <div class="crime-bar-bg">
        <div class="crime-bar-fill" style="width: ${c.percent}%; background: ${colorMap[c.risk]};"></div>
      </div>
      <div class="crime-desc">${c.desc}</div>
    </div>
  `).join('');
}