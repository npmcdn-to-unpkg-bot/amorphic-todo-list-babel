module.exports.controller = function(objectTemplate, getTemplate) {
	
  var Todo = getTemplate('./models/todo.js').Todo;

  var Controller = objectTemplate.create('Controller', {
    selectedTodo: {
      type: Todo
    },
    todos: {
      type: Array, 
      of: Todo, 
      value: []
    },
    displayedTodos: {
      type: Array,
      of: Todo,
      value: []
    },
    completeTodos: {
      type: Array, 
      of: Todo, 
      value: []
    },
    remainingTodos: {
      type: Array,
      of: Todo,
      value: []
    },
    todoDescription: {
      type: String
    },
    todoIsComplete: {
      type: Boolean
    },
    todoIsEditing: {
      type: Boolean
    },
    pluralizedItem: {
      type: String
    },
    filter: {
      type: String,
      value: 'all'
    },
    filterClass: function(filterName) {
      if (filterName === this.filter) { return 'selected'; }
      return '';
    },
    setFilter: function(filterName) {
      this.filter = filterName;
      this.updateDisplayedTodos();
    },
    setTodoComplete: function(todo) {
      this.selectedTodo = todo;
      this.toggleTodoCompletion();
    },
    updateDisplayedTodos: function () {
      if (this.filter === 'all') {
        this.displayedTodos = this.todos;
      } else if (this.filter === 'active' ) {
        this.displayedTodos = this.remainingTodos;
      } else {
        this.displayedTodos = this.completeTodos;
      }
    },
    updateTodoCollections: function () {
      this.updateRemainingTodos();
      this.updatePluralizedItem();
      this.updateDisplayedTodos();
    },
    updateRemainingTodos: function(){
      var remainingTodos = [];
      var completeTodos = [];
      var todo;
      for (var i = 0; i < this.todos.length; i++) {
        todo = this.todos[i];
        if (!todo.isComplete) { remainingTodos.push(todo); }
        if (todo.isComplete) { completeTodos.push(todo); }
      }
      this.remainingTodos = remainingTodos;
      this.completeTodos = completeTodos;
    },
    addTodo: function() {
      var todos = this.todos;
      var newTodo = new Todo(this.todoDescription);
      todos.push(newTodo);
      this.todoDescription = '';
      this.todos = todos;
      this.updateTodoCollections();
    },
    destroyTodo: function() {
      if (this.selectedTodo) {
        var ix = _.indexOf(this.todos, this.selectedTodo);
        if (ix >= 0) { this.todos.splice(ix, 1); }
        this.selectedTodo = null;
        this.updateTodoCollections();
      }
    },
    clearCompletedTodos: function() {
      var todos = [];
      for (var i = 0; i < this.todos.length; i++) {
        var todo = this.todos[i];
        if (!todo.isComplete) { todos.push(todo); }
      }
      this.todos = todos;
      this.updateTodoCollections();
    },
    completedClass: function(todo) {
      return todo.isComplete ? 'completed' : '';
    },
    startSaveTodo: function(todo) {
      this.selectedTodo = todo;
      this.saveTodo();
    },
    saveTodo: function() {
      if (this.selectedTodo) {
        var selectedTodo = this.selectedTodo;
        var ix = _.indexOf(this.todos, selectedTodo);
        selectedTodo.isEditing = false;
        this.todos[ix] = selectedTodo;
        this.selectedTodo = null;
        this.updateTodoCollections();
      }
    },
    setEditingTodo: function(todo) {
      this.selectedTodo = todo;
      this.editTodo();
    },
    editTodo: function() {
      if (this.selectedTodo) {
        var selectedTodo = this.selectedTodo;
        var ix = _.indexOf(this.todos, selectedTodo);
        selectedTodo.isEditing = true;
        this.todos[ix] = selectedTodo;
        this.selectedTodo = null;
      }
    },
    toggleTodoCompletion: function() {
      if (this.selectedTodo) {
        var selectedTodo = this.selectedTodo;
        var ix = _.indexOf(this.todos, selectedTodo);
        this.todos[ix] = selectedTodo;
        this.selectedTodo = null;
        this.updateTodoCollections();
      }
    },
    updatePluralizedItem: function() {
      if (this.remainingTodos.length === 1) { 
        this.pluralizedItem = 'item';
      } else {
        this.pluralizedItem = 'items';
      }
    }
  });

  return {
    Controller: Controller
  };
};
