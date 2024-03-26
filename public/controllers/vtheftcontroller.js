// Vehicle Theft Controller
import VTheft from '../models/vtheft.js';

const VTheftController = {
    createVTheft: function(collection, formData) {
        var model = new VTheft;
        console.log('controller create-vtheft');
        console.log(formData);
        model.set({
            owner: formData.owner,
            licenseNo: formData.licenseNo
        });
        console.log(model.toJSON());
        collection.handleSync('create', model);
    },

    toggle: function(collection, model) {
        console.log('controller toggle');
        var options = {
            patch: true,
            newStatus: {status: !model.get("status")},
            wait: true,
            success: function(model, response, options) {
                console.log('Update Successful!', model.toJSON());
            },
            error: function(model, xhr, options) {
                console.error('Update failed');
            }
        };
        collection.handleSync('update', model, options);
    },
    
    editVTheft: function(collection, model, newattributes) {
        console.log('controller edit-vtheft');
        var options = {
            attributes: newattributes,
            wait: true,
            success: function(model, response, options) {
                console.log('Update Successful', model.toJSON());
            },
            error: function(model, xhr, options) {
                console.error('Update failed');
            }
        };
        collection.handleSync('update', model, options);
    }
};

export default VTheftController;