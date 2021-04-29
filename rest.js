m=(...n)=>n.map(t=>this[t]=(...p)=>(n=document.createElement(t),p.map(p=>p+''=={}?Object.assign(n,p):n.append(p)),n))
m('div', 'time', 'i', 'button', 'video', 'br', 'source');

let sourceURL = 'https://sylvan.apple.com/Videos/'
let videos = [
"comp_A001_C004_1207W5_v23_SDR_FINAL_20180706_SDR_2K_AVC.mov",
"g201_TH_804_A001_8_SDR_20191031_SDR_2K_AVC.mov",
"g201_TH_803_A001_8_SDR_20191031_SDR_2K_AVC.mov",
"comp_A114_C001_0305OT_v10_SDR_FINAL_22062018_SDR_2K_AVC.mov",
"comp_A351_C001_v06_SDR_PS_20180725_SDR_2K_AVC.mov",
"SE_A016_C009_SDR_20190717_3m30s_SDR_2K_AVC.mov",
"BO_A012_C031_SDR_20190726_SDR_2K_AVC.mov",
"comp_A007_C017_01156B_v02_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_A012_C014_1223PT_v53_SDR_PS_FINAL_20180709_F0F8700_SDR_2K_AVC.mov",
"comp_A008_C007_011550_CC_v01_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_1223LV_FLARE_v21_SDR_PS_FINAL_20180709_F0F5700_SDR_2K_AVC.mov",
"comp_A006_C003_1219EE_CC_v01_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_A015_C018_0128ZS_v03_SDR_PS_FINAL_20180709__SDR_2K_AVC.mov",
"comp_A013_C012_0122D6_CC_v01_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_A009_C001_010181A_v09_SDR_PS_FINAL_20180725_SDR_2K_AVC.mov",
"RS_A008_C010_SDR_20191218_SDR_2K_AVC.mov",
"PA_A010_C007_SDR_20190717_SDR_2K_AVC.mov",
"PA_A002_C009_SDR_20190730_ALT01_SDR_2K_AVC.mov",
"PA_A001_C007_SDR_20190717_SDR_2K_AVC.mov",
"PA_A004_C003_SDR_20190719_SDR_2K_AVC.mov",
"comp_GMT314_139M_170NC_NORTH_AMERICA_AURORA__COMP_v22_SDR_20181206_v12CC_SDR_2K_AVC.mov",
"comp_A050_C004_1027V8_v16_SDR_FINAL_20180706_SDR_2K_AVC.mov",
"comp_A105_C003_0212CT_FLARE_v10_SDR_PS_FINAL_20180711_SDR_2K_AVC.mov",
"comp_GMT307_136NC_134K_8277_NY_NIGHT_01_v25_SDR_PS_20180907_SDR_2K_AVC.mov",
"comp_N003_C006_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_N008_C003_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_N008_C009_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_N013_C004_PS_v01_SDR_PS_20180925_F1970F7193_SDR_2K_AVC.mov",
"comp_LA_A009_C009_PSNK_v02_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_LA_A006_C004_v01_SDR_FINAL_PS_20180730_SDR_2K_AVC.mov",
"comp_LA_A006_C008_PSNK_ALL_LOGOS_v10_SDR_PS_FINAL_20180801_SDR_2K_AVC.mov",
"comp_LA_A011_C003_DGRN_LNFIX_STAB_v57_SDR_PS_20181002_SDR_2K_AVC.mov",
"comp_LA_A005_C009_PSNK_ALT_v09_SDR_PS_201809134_SDR_2K_AVC.mov",
"comp_LA_A008_C004_ALTB_ED_FROM_FLAME_RETIME_v46_SDR_PS_20180917_SDR_2K_AVC.mov",
"comp_L004_C011_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_L010_C006_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_L012_c002_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_L007_C007_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_LW_L001_C006_PSNK_DENOISE_v02_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_LW_L001_C003__PSNK_DENOISE_v04_SDR_PS_FINAL_20180803_SDR_2K_AVC.mov",
"comp_GMT026_363A_103NC_E1027_KOREA_JAPAN_NIGHT_v18_SDR_PS_20180907_SDR_2K_AVC.mov",
"KP_A010_C002_SDR_20190717_SDR_2K_AVC.mov",
"BO_A014_C023_SDR_20190717_F240F3709_SDR_2K_AVC.mov",
"comp_GMT329_113NC_396B_1105_ITALY_v03_SDR_FINAL_20180706_SDR_2K_AVC.mov",
"comp_GMT329_117NC_401C_1037_IRELAND_TO_ASIA_v48_SDR_PS_FINAL_20180725_F0F6300_SDR_2K_AVC.mov",
"comp_A083_C002_1130KZ_v04_SDR_PS_FINAL_20180725_SDR_2K_AVC.mov",
"g201_WH_D004_L014_SDR_20191031_SDR_2K_AVC.mov",
"comp_HK_H004_C008_PSNK_v19_SDR_PS_20180914_SDR_2K_AVC.mov",
"comp_HK_H004_C013_t9_6M_HB_tag0.mov",
"comp_HK_H004_C010_PSNK_v08_SDR_PS_20181009_SDR_2K_AVC.mov",
"comp_HK_B005_C011_PSNK_v16_SDR_PS_20180914_SDR_2K_AVC.mov",
"comp_H007_C003_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_H004_C007_PS_v02_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_H005_C012_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_H012_C009_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_H004_C009_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_GL_G010_C006_PSNK_NOSUN_v12_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_GL_G004_C010_PSNK_v04_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_GL_G002_C002_PSNK_v03_SDR_PS_20180925_SDR_2K_AVC.mov",
"FK_U009_C004_SDR_20191220_SDR_2K_AVC.mov",
"comp_DB_D001_C005_COMP_PSNK_v12_SDR_PS_20180912_SDR_2K_AVC.mov",
"comp_DB_D001_C001_PSNK_v06_SDR_PS_20180824_SDR_2K_AVC.mov",
"comp_DB_D002_C003_PSNK_v04_SDR_PS_20180914_SDR_2K_AVC.mov",
"comp_DB_D008_C010_PSNK_v21_SDR_PS_20180914_F0F16157_SDR_2K_AVC.mov",
"comp_DB_D011_C010_PSNK_DENOISE_v19_SDR_PS_20180914_SDR_2K_AVC.mov",
"MEX_A006_C008_SDR_20190923_SDR_2K_AVC.mov",
"CR_A009_C007_SDR_20191113_SDR_2K_AVC.mov",
"comp_C004_C003_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_C001_C005_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_CH_C007_C011_PSNK_v02_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_GMT329_113NC_396B_1105_CHINA_v04_SDR_FINAL_20180706_F900F2700_SDR_2K_AVC.mov",
"comp_C003_C003_PS_v01_SDR_PS_20180925_SDR_2K_AVC.mov",
"comp_CH_C007_C004_PSNK_v02_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_CH_C002_C005_PSNK_v05_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov",
"comp_GMT308_139K_142NC_CARIBBEAN_DAY_v09_SDR_FINAL_22062018_SDR_2K_AVC.mov",
"comp_A108_C001_v09_SDR_FINAL_22062018_SDR_2K_AVC.mov",
"comp_A105_C002_v06_SDR_FINAL_25062018_SDR_2K_AVC.mov",
"comp_GMT306_139NC_139J_3066_CALI_TO_VEGAS_v08_SDR_PS_20180824_SDR_2K_AVC.mov",
"DL_B002_C011_SDR_20191122_SDR_2K_AVC.mov",
"BO_A014_C008_SDR_20190719_SDR_2K_AVC.mov",
"BO_A018_C029_SDR_20190812_SDR_2K_AVC.mov",
"comp_GMT060_117NC_363D_1034_AUSTRALIA_v35_SDR_PS_FINAL_20180731_SDR_2K_AVC.mov",
"comp_A001_C001_120530_v04_SDR_FINAL_20180706_SDR_2K_AVC.mov",
"comp_GMT110_112NC_364D_1054_AURORA_ANTARTICA__COMP_FINAL_v34_PS_SDR_20181107_SDR_2K_AVC.mov"
]

function nextVideoSrc(multiplier = 1){
	lastVideo += multiplier;
	if(!videos[lastVideo]){
		lastVideo = multiplier>0 ? 0 : (videos.length-1);
	}
	chrome.storage.local.set({lastVideo})
	node_video.src = sourceURL + videos[lastVideo];
}

let node_video;
document.body.appendChild(
	node_video = video({autoplay: true, onended:e=>nextVideoSrc(1)})
)

document.body.appendChild(
	div({id: 'controls'},
		button('Stop timer', {onclick(e){
			chrome.storage.local.set({active: false})
		}}),
		button('Back to work', {onclick(e){
			chrome.storage.local.set({resting: false})
		}}),
		br(),
		button('<', {onclick:e=> nextVideoSrc(-1) }),
		button('Random', {onclick(e){
			lastVideo = Math.floor(Math.random() * videos.length) - 1;
			nextVideoSrc(1)
		}}),
		button('>', {onclick:e=> nextVideoSrc(1) }),
		time(node_min = i('00'), ':', node_sec = i('00'))
	)
)

let lastVideo = 0;
chrome.storage.local.get('lastVideo', r=>{
	lastVideo = r.lastVideo;
	nextVideoSrc(0)
})

let actions = {
	min(value){
		node_min.textContent = value
	},
	sec(value){
		node_sec.textContent = value
	}
}

chrome.storage.local.get(null, options => {
	for(let key in options){
		actions[key] && actions[key]( options[key] )
	}
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		actions[key] && actions[key](newValue)
  }
});