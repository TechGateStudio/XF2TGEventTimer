(function(){
	var styleOneShemeRow = function(a,b,c) { 
		return '<span style="{0}">{1}</span> {2} '.replace('{0}', a).replace('{1}', b).replace('{2}', c); 
	},
	styleTwoShemeRow = function(a,b,c) { 
		return '<dl><dt style="{0}">{1}</dt><dd>{2}</dd></dl>'.replace('{0}', a).replace('{1}', b).replace('{2}', c); 
	},
	parseDate = function(input, format) {
		format = format || 'yyyy-mm-dd HH:MM'; // default format
		var parts = input.match(/(\d+)/g), 
		i = 0, fmt = {};
		// extract date-part indexes from the format
		format.replace(/(yyyy|dd|mm|HH|MM)/g, function(part) { fmt[part] = i++; });
		
		return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']], parts[fmt['HH']], parts[fmt['MM']]);
	},
	getUnixTime = function(date) { 
		return Math.round((date ? parseDate(date) : new Date()).getTime() / 1000); 
	};
	jQuery.fn.EventTimer = function(data){
		if (!data.endTime){
			return;
		}
		
		var target = this,

		timer = setInterval(function(){
			
			var time = getUnixTime(data.endTime) - getUnixTime();
			
			if (time < 0)
			{
				if (data.endMessage)
				{
					if (data.endJob)
					{
						data.endJob(target);
					}
					
					target.html(data.endMessage);
				}

				clearTimeout(timer);
				return;
			}
			
			var s = time, 
			
			m = s / 60, 
			h = m / 60, 
			d = h / 24;

			h = (d - Math.floor(d)) * 24;
			m = (h - Math.floor(h)) * 60;
			s = (m - Math.floor(m)) * 60;
			
			d = Math.floor(d);
			h = Math.floor(h);
			m = Math.floor(m);
			s = Math.floor(s);
			
			var html = '';
			
			switch(data.styleType)
			{
				case 1:
					html += '<div class="pair">';
					html += styleTwoShemeRow('', d, XF.phrase('units_days'));
					html += styleTwoShemeRow('', h, XF.phrase('units_hours'));
					html += styleTwoShemeRow('', m, XF.phrase('units_minutes'));
					html += styleTwoShemeRow('', s, XF.phrase('units_seconds'));
					html += '</div>';
				break;
				default:
					html += styleOneShemeRow('', d, XF.phrase('units_days'));
					html += styleOneShemeRow('', h, XF.phrase('units_hours'));
					html += styleOneShemeRow('', m, XF.phrase('units_minutes'));
					html += styleOneShemeRow('', s, XF.phrase('units_seconds'));
			}
			
			target.html(html);
			
		}, 1000);
	};
	
})();