// Vehicle Theft Collection
import VTheft from "../models/vtheft.js";

const VTheftCollection = Backbone.Collection.extend({
    model: VTheft,
    handleSync: function(method, model, options) {
        var localStorageKey = "vtheft-collection-backbone-v3.0.0";
        switch (method) {
            case 'read':
                var data = localStorage.getItem(localStorageKey);
                if(data) {
                    this.set(JSON.parse(data));
                }
                break;
            case 'create':
                console.log('collection create');
                var storedData = JSON.parse(localStorage.getItem(localStorageKey)) || [];
                storedData.push(model.toJSON());
                localStorage.setItem(localStorageKey, JSON.stringify(storedData));
                this.add(model, options);
                this.trigger('modelCreated', model);
                break;
            case 'update':
                console.log('collection update');
                var storedData = JSON.parse(localStorage.getItem(localStorageKey)) || [];  
                var index = this.indexOf(model);
                if(index !== -1) {
                    if(options.patch && options.newStatus) {
                        console.log('updated patch');
                        // _.extend() merges/patches properties from modelData into storedData[index]
                        model.set('status', options.newStatus.status)
                        storedData[index] = _.extend(storedData[index], model.toJSON());
                    } else {
                        model.set({
                            owner: options.attributes.newOwner,
                            licenseNo: options.attributes.newLicenseNo
                        })
                        storedData[index] = model.toJSON();
                    }    
                    localStorage.setItem(localStorageKey, JSON.stringify(storedData));
                    if(options.success) {
                        options.success(model, null, options);
                    }
                    if(!this.get(model)) {
                        this.add(model, options);
                        this.trigger('modelUpdated', model);
                    }
                } else {
                    if(options.error) {
                        options.error(model, {status: 404, statusText: 'Not Found'}, options);
                    } 
                }
                break;
            case 'delete':
                localStorage.removeItem(localStorageKey);
                break;
        }
    },
    initialize: function() {
        this.handleSync('read');
    }
});

export default VTheftCollection;