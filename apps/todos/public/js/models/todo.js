module.exports.todo = function (objectTemplate) {
  var Todo = objectTemplate.create('Todo', {
    description: {
      type: String
    },
    isComplete: {
      type: Boolean
    },
    isEditing: {
      type: Boolean
    },
    createdAt: {
      type: Date, 
      rule: 'datetime'
    },
    init: function (description) {
      this.description = description;
      this.isComplete = false;
      this.isEditing = false;
      this.createdAt = new Date();
    }
  });

  return {
    Todo: Todo
  };
};
