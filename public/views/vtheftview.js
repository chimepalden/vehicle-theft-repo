// Vehicle Theft View
import VTheftController from "../controllers/vtheftcontroller.js";

const VTheftView = Backbone.View.extend({
    id: 'vtheft-item',
    tagName: 'tr',
    events: {
        "click .toggle-status" : "toggleStatus",
        "click .activate-edit-vtheft" : "activateEditVtheft",
        "click .apply-edit-vtheft" : "applyEditVtheft",
        "click .cancel-edit-vtheft" : "cancelEditVtheft",
    },
    initialize: function() {
        this.originalAttributes = {};
        this.listenTo(this.model, 'change:status', this.render);
    },
    render: function() {
        var template = _.template($('#vtheft-template').html());
        this.$el.html(template(this.model.toJSON()));
        return this;
    },
    toggleStatus: function(event) {
        var clickedButtonId = event.target.id;
        var oldStatus = this.model.get('status');
        console.log('old-status: ', oldStatus);
        if((clickedButtonId == "recovered" && oldStatus == false) || (clickedButtonId == "stolen" && oldStatus == true)) {
            console.log('call toggle');
            VTheftController.toggle(this.collection, this.model);
        }
    },
    activateEditVtheft: function(event) {
        this.$('.toggle button').prop('disabled', true);

        if(_.isEmpty(this.originalAttributes)) {
            this.originalAttributes = {
                owner: this.model.get('owner'),
                licenseNo: this.model.get('licenseNo')
            };
        }

        this.$el.addClass("editing");
        var ownerText = this.model.get('owner');
        var licenseNoText = this.model.get('licenseNo');

        this.$('.table-primary:eq(0)').html('<input type="text" class="form-control owner-input" value="' + ownerText + '">');
        this.$('.table-primary:eq(1)').html('<input type="text" class="form-control license-no-input" value="' + licenseNoText + '">');
        this.$('.table-primary:eq(3)').html('<button type="submit" class="apply-edit-vtheft btn">Apply</button><button type="submit" class="cancel-edit-vtheft btn">Cancel</button>');
    },
    applyEditVtheft: function(event) {
        var newAttributes = {
            newOwner: this.$('.owner-input').val(),
            newLicenseNo: this.$('.license-no-input').val()
        }
        // this.model.set({
        //     owner: newAttributes.newOwner,
        //     licenseNo: newAttributes.newLicenseNo
        // });
        VTheftController.editVTheft(this.collection, this.model, newAttributes);
        this.$el.removeClass('editing');
        this.$('.toggle button').prop('disabled', false);
        this.render();
    },
    cancelEditVtheft: function(event) {
        if(!_.isEmpty(this.originalAttributes)) {
            this.model.set(this.originalAttributes);
            this.originalAttributes = {};
        }
        this.$el.removeClass('editing');
        this.$('.toggle button').prop('disabled', false);
        this.render();
    }
});

export default VTheftView;