// Vehicle Theft Model
const VTheft = Backbone.Model.extend({
    defaults: function() {
        return {
            title: "Vehicle Theft",
            owner: "",
            licenseNo: "",
            status: false
        };        
    }
});

export default VTheft;
