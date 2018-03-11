var Task = Backbone.Model.extend({
	defaults: {
		"title": '',
		"status": ''
	}
});
var Tasks = Backbone.Collection.extend({

});

var tasks = new Tasks();

var TaskView = Backbone.View.extend({
	model: new Task(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.task-list-template').html())
	},
	events: {
		'click .edit-task': 'editTask',
		'click .delete-task': 'deleteTask',
		'click .update-task': 'updateTask',
		'click .cancel-task': 'cancelTask'
	},
	editTask: function() {
		console.log("you are click on edit button");
		$('.edit-task').hide();
		$('.delete-task').hide();
		this.$('.update-task').show();
		this.$('.cancel-task').show();
		var taskTitle = this.$('.title').html();
		var taskStatus= this.$('.status').html();
		this.$('.title').html('<input type="text" class="form-control title-update" value="'+ taskTitle +'">');
		this.$('.status').html('<input type="text" class="form-control status-update" value="'+ taskStatus +'">');
	},
	updateTask: function() {
		this.model.set('title', $('.title-update').val());
		this.model.set('status', $('.status-update').val());
	},
	cancelTask: function() {
		tasksView.render();
	},
	deleteTask: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var TasksView = Backbone.View.extend({
	model: tasks,
	el: $('.tasks-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		}, this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(task){
			self.$el.append((new TaskView({model:task})).render().$el);
		});
		return this;
	}
});

var tasksView = new TasksView();

$(document).ready(function(){
	$('.add-task').on('click', function() {
		var task = new Task({
			title:$('.task-title').val(),
			status:$('.task-status').val()
		});
		console.log(task);
		tasks.add(task);
		$('.task-title').val('');
		$('.task-status').val('');
	});
});