m=(...n)=>n.map(t=>this[t]=(...p)=>(n=document.createElement(t),p.map(p=>p+''=={}?Object.assign(n,p):n.append(p)),n))
m('div', 'time', 'i', 'input', 'button', 'h3', 'label', 'select', 'option');

let node_main, node_min, node_sec, node_duration_long, node_duration_short, node_duration_work, node_numberOfShort;
document.body.appendChild(
	node_main = div({id: 'timer', onchange: saveInput},
		div({className: 'disabled hiddenByDefault'},
			h3('Settings'),
			label('Work:',
				node_duration_work = input({
					type:'number',
					name: 'duration_work',
					min: '0',
					value: '55'
				}),
			'min'),
			label('Rest cycle:',
				node_numberOfShort = select({name: 'numberOfShort'},
					option('Long after 1 short', {value: 1}),
					option('Long after 2 short', {value: 2}),
					option('Long after 3 short', {value: 3, selected: true}),
					option('Long after 4 short', {value: 4}),
					option('Long after 5 short', {value: 5}),
					option('Long after 6 short', {value: 6}),
					option('Long after 7 short', {value: 7}),
				)
			),
			label('Short rest:',
				node_duration_short = input({
					type:'number',
					name: 'duration_short',
					min: '0',
					value: '5'
				}),
			'min'),
			label('Long rest:',
				node_duration_long = input({
					type:'number',
					name: 'duration_long',
					min: '0',
					value:'15'
				}),
			'min'),
			button('Start timer', {
				className: 'darker',
				name:'active',
				value: true,
				onclick: saveInput
			})
		),
		div({className: 'active hiddenByDefault'},
			h3('Working'),
			time(node_min = i('00'), ':', node_sec = i('00')),
			button('Take a break', {
				name: 'resting',
				value: true,
				onclick: saveInput
			}),
			button('Pause', {
				className: 'pause hiddenByDefault',
				name: 'paused',
				value: true,
				onclick: saveInput
			}),
			button('Unpause', {
				className: 'unpause darker hiddenByDefault',
				name: 'paused',
				value: false,
				onclick: saveInput
			}),
			button('Stop timer', {
				className: 'darker',
				name:'active',
				value: false,
				onclick: saveInput
			})
		)
	)
)

function saveInput(e){
	let data = {}
	let {name, value, nodeName} = e.target;

	data[name] = nodeName == "BUTTON"? value == 'true' : value;

	chrome.storage.local.set(data);
}

let actions = {
	active(value){
		node_main.classList.remove(value ? 'disabled' : 'active')
		node_main.classList.add(value ? 'active' : 'disabled')
	},
	paused(value){
		node_main.classList.remove(value ? 'pause' : 'unpause')
		node_main.classList.add(value ? 'unpause' : 'pause')
	},
	duration_long(value){
		node_duration_long.value = value
	},
	duration_short(value){
		node_duration_short.value = value
	},
	duration_work(value){
		node_duration_work.value = value
	},
	min(value){
		node_min.textContent = value
	},
	sec(value){
		node_sec.textContent = value
	},
	numberOfShort(value){
		node_numberOfShort.value = value - 0
	}
}
chrome.storage.local.get(null, options => {
	for(let key in options){
		actions[key] && actions[key]( options[key] )
	}
})

let observable = {
	active: true,
	paused: true,
	min: true,
	sec: true
}
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  		actions[key] && observable[key] && actions[key](newValue)
  }
});