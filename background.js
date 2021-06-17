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
	}
	actions.paused(options.paused)
	actions.resting(options.resting)
})

chrome.browserAction.setBadgeBackgroundColor({color: '#000'})

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
				(!data.resting? sound_finished_work : sound_finished_rest ).play()
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
	active(value){
		clearInterval(timeout_tick)

		if(value){
			timeout_tick = setInterval(tick, 1000)

			chrome.storage.local.get(['duration_work'], data => {
				let {duration_work} = data;
				chrome.browserAction.setBadgeBackgroundColor({color: '#000'})
				chrome.storage.local.set({min: duration_work, sec: defaults.sec})
			})
			return
		}

		chrome.storage.local.set({
			sec: defaults.sec,
			min: defaults.min,
			paused: false,
			resting: false
		})
	},
	paused(value){
		chrome.storage.local.get('active', data => {
			value | !data.active ?
				clearInterval(timeout_tick) :
				(timeout_tick = setInterval(tick, 1000))
		})
	},
	resting(value){
		chrome.storage.local.get(['duration_short', 'duration_long', 'numberOfShort', 'active'], data => {
			if(value){
				loadRestWindow()
				let isShortRest = data.numberOfShort >= lap;

				lap = isShortRest? lap + 1 : 0;
				chrome.browserAction.setBadgeBackgroundColor({
					color: isShortRest? '#CC0000' : '#04AA6D'
				})

				chrome.storage.local.set({
					min: data[isShortRest ? 'duration_short' : 'duration_long'],
					sec: defaults.sec
				})
				return
			}

			restWindowId && chrome.windows.remove(restWindowId)
			actions.active(data.active)
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

var sound_finished_work = new Audio();
sound_finished_work.src = "finished_work.m4a";

var sound_finished_rest = new Audio();
sound_finished_rest.src = "finished_rest.wav";

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