let defaults = {
	min: '00',
	sec: '00',
	active: false,
	paused: false,
	resting: false,
	duration_short: 5,
	duration_long: 15,
	duration_work: 55,
	numberOfShort: 3,
	lastVideo: 0
}

chrome.storage.local.get(null, options => {
	for(let key in defaults){
		if(!(key in options)){
			return chrome.storage.local.set(defaults)
		}
		actions[key]&& defaults[key] != options[key] && actions[key](options[key])
	}
})

let timeout_tick = false;
function tick(){
	chrome.storage.local.get(['min', 'sec', 'active', 'resting'], data => {
		min = Number(data.min);
		sec = Number(data.sec);

		if(!data.resting && !data.active){
			clearInterval(timeout_tick)
		}

		if(sec == 0){
			if(min == 0){
				(!data.resting? sound_finished : sound_rest ).play()
				chrome.storage.local.set({resting: !data.resting})
				return
			}
			min--;
			sec = 60;
		}
		sec--;

		if(min < 10){ min = '0' + min }
		if(sec < 10){ sec = '0' + sec }

		chrome.storage.local.set({min, sec})
	})
}

let lap = 0;

let actions = {
	active(value, pause = false){
		clearInterval(timeout_tick)
		if(value){
			timeout_tick = setInterval(tick, 1000)
			if(!pause){
				chrome.storage.local.get(['duration_work'], data => {
					let {duration_work} = data;
					chrome.browserAction.setBadgeBackgroundColor({color: '#000'})
					chrome.storage.local.set({min: duration_work, sec: defaults.sec})
				})
			}
			return
		}

		if(!pause){
			chrome.storage.local.set({
				sec: defaults.sec,
				min: defaults.min,
				paused: false,
				resting: false
			})
		}
	},
	paused(value){
		chrome.storage.local.get('active', data => {
			data.active && actions.active(!value, true)
		})
	},
	resting(value){
		chrome.storage.local.get(['duration_short', 'duration_long', 'numberOfShort', 'active'], data => {
			if(value){
				lap++;
				loadRestWindow()
				if(data.numberOfShort >= lap){
					chrome.browserAction.setBadgeBackgroundColor({color: '#CC0000'})
					chrome.storage.local.set({min: data.duration_short, sec: defaults.sec})
				}else{
					chrome.browserAction.setBadgeBackgroundColor({color: '#04AA6D'})
					chrome.storage.local.set({min: data.duration_long, sec: defaults.sec})
					lap = 0;
				}
			}else{
				restWindowId && chrome.windows.remove(restWindowId)
				actions.active(data.active)
			}
		})
	},
	sec(text){
		chrome.storage.local.get(['min', 'sec', 'active'], data=>{
			chrome.browserAction.setBadgeText(
				{text: data.active? data.min + ':' + data.sec : ''}
			)
		})
	}
}
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  		actions[key] && actions[key](newValue)
  }
});

var sound_finished = new Audio();
sound_finished.src = "finished_work.m4a";

var sound_rest = new Audio();
sound_rest.src = "finished_rest.wav";

let restWindowId = false;
function loadRestWindow(){
	chrome.windows.create({
		focused: true,
		type: 'panel',
		width: window.screen.width,
		height: window.screen.height,
		url: 'chrome-extension://'+chrome.runtime.id+'/rest.html'
	}, w=>{
		restWindowId = w.id;
	})
}

chrome.windows.onRemoved.addListener(id=>{
	if(id == restWindowId){
		chrome.storage.local.get(['resting', 'active'], data => {
			if(data.resting){
				restWindowId = false;
				chrome.storage.local.set({resting: false})
			}
		})
	}
})