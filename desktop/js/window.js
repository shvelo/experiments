var win = {
	settings : {
			taskbar : '.tasks',
			default_icon : 'images/icons/default.png',
			default_class : 'window',
			container : 'body'
		},
	windows : [],
	find : function(id) {
		for ( var i = 0; i < win.windows.length; i++) {
			if (win.windows[i].id == id)
				return i;
		}
	},
	open : function(title, content, icon) {
		if (!icon)
			icon = this.settings.default_icon;
		var taskbar = this.settings.taskbar;
		var win_class = this.settings.default_class;
		var id = Math.round((new Date().getTime() / 1000000)
				- new Date().getMilliseconds() - Math.random() * 11);
		$('body')
				.append(
						'<div class="'+win_class+'" data-id="'
								+ id
								+ '"><div class="bar"><img class="icon" src="'
								+ icon
								+ '"><div class="title">'
								+ title
								+ '</div><div class="controls"><div class="control destroy">X</div><div class="control minimize">&ndash;</div></div></div><div class="content">'
								+ content + '</div></div>');
		$(taskbar).append(
				$('<div data-id="' + id
						+ '" class="task"><img class="icon" src="' + icon
						+ '">' + title + '</div>'));
		var new_win = {
			j : $("."+win_class+"[data-id=" + id + "]"),
			id : id,
			taskItem : $(taskbar).find('[data-id="' + id + '"]'),
			minimized : false,
			destroy : function() {
				this.j.draggable("destroy");
				this.j.fadeOut('fast').remove();
				this.taskItem.fadeOut('fast').remove();
				win.windows.splice(win.windows.find(this.id), 1);
			},
			minimize : function() {
				this.j.draggable("destroy");
				this.j.fadeOut('fast');
				this.minimized = true;
			},
			restore : function() {
				this.j.fadeIn('fast');
				this.j.draggable({
					containment : win.settings.container,
					handle : '.bar'
				});
				this.minimized = false;
				this.j.data('minimized', 'false');
			},
			activate : function() {
				var taskbar = win.settings.taskbar;
				var win_class = win.settings.default_class;
				$("."+win_class).removeClass('active');
				$(taskbar).find('.task').removeClass('active');
				if (this.minimized)
					this.restore();
				this.j.addClass("active");
				$(taskbar).find('.task[data-id="'+this.id+'"]').addClass('active');
			}
		};
		new_win.j.draggable({
			containment : win.settings.container,
			handle : '.bar'
		}).css({
			top : win.windows.length * 10 + 50,
			left : win.windows.length * 20 + 50
		}).disableSelection();
		this.windows[this.windows.length] = new_win;
		new_win.activate();
		this.reset_controls();		
		return new_win;
	},
	reset_controls : function() {
		var taskbar = this.settings.taskbar;
		var win_class = this.settings.default_class;
		$("."+win_class).find(".control.destroy").click(function() {
			var id = $(this).parent().parent().parent().data('id');
			win.windows[win.find(id)].destroy();
		});
		$("."+win_class).find(".control.minimize").click(function() {
			var id = $(this).parent().parent().parent().data('id');
			win.windows[win.find(id)].minimize();
		});
		$("."+win_class).mousedown(function() {
			var id = $(this).attr('data-id');
			win.windows[win.find(id)].activate();
		});
		$(taskbar).find('.task').click(function() {
			var id = $(this).attr('data-id');
			win.windows[win.find(id)].activate();
		});
	}
};