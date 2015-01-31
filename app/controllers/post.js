import Ember from "ember";

export default Ember.ObjectController.extend({
	isEditing: false,
	
	authorlist: function() {
    var selected = this.get('author'); // author from post model
    var content = [];
    if (selected != null) {
      content.push(selected);
    }
     
    this.store.find('author').then(function(realAuthor){ // authors from author model
      // at this point realAuthor is a DS.RecordArray
      // you could turn it into a real array by calling .toArray()
      var a = realAuthor.toArray();
      // then you can call get() on an item to retrieve a property
      var index;
      for (index = 0; index < a.length; ++index) {
        var item = a[index].get('name');
        if (selected !== item) {
          content.push(item);
        }
      }
    });
    
    return content;
  }.property(),
});