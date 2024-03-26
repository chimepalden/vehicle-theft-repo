// Vehicle Theft Collection View
import VTheftView from '../views/vtheftview.js';

const VTheftCollectionView = Backbone.View.extend({
    tagName: 'tbody',
    initialize: function(options) {
        this.collection = options.collection;
        this.listenTo(this.collection, 'modelCreated', this.addNewVTheft);
    },
    render: function() {
        this.$el.empty();
        this.collection.each(function(model) {
            var vtheftView = new VTheftView({ model: model, collection: this.collection });
            this.$el.append(vtheftView.render().el);
        }, this); // Ensure 'this' refers to the view within the loop
        return this;
    },
    addNewVTheft: function(newModel) {
        var vTheftView = new VTheftView({model: newModel, collection: this.collection});
        this.$el.append(vTheftView.render().el);
        // this.render(); // re-renders whole collection view, a different approach.
    }
});

export default VTheftCollectionView;