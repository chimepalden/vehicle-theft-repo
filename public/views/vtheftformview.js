// Vehicle Theft Form view
import VTheftForm from '../models/vtheftform.js'
import VTheftController from '../controllers/vtheftcontroller.js';
// import '../css/vtheftform.css';

const VTheftFormView = Backbone.View.extend({
    id: 'vtheft-form-view',
    tagName: 'div',
    className: 'card',
    events: {
        'submit': 'submitForm'
    },
    initialize: function(options) {
        this.form = new VTheftForm;
        this.collection = options.collection;
    },
    render: function() {
        var self = this;
        $.ajax({
            url: '../templates/vtheftform-template.html',
            method: 'GET',
            success: function(templateContent) {
                // setting html content of the view element
                self.$el.html(templateContent);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching template: ', error);
            }
        });
        // var template = $('#vtheft-form-template').html();
        // this.$el.html(template);
        return this;
    },
    submitForm: function(event) {
        event.preventDefault();
        var formData = {
            owner: $('#owner-input').val(),
            licenseNo: $('#license-no-input').val()
        }
        VTheftController.createVTheft(this.collection, formData);
        this.$('#owner-input').val('');
        this.$('#license-no-input').val('');
    }
});

export default VTheftFormView;