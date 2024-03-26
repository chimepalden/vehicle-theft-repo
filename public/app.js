// import VTheft from './models/vtheft.js';
import VTheftCollection from './collections/vtheftcollection.js';
import VTheftCollectionView from './views/vtheftcollectionview.js'
import VTheftFormView from './views/vtheftformview.js';
// import VTheftController from './controllers/vtheftcontroller.js';

$(function() {
    var vtheftCollection = new VTheftCollection();
    var vtheftFormView = new VTheftFormView({
        collection: vtheftCollection
    });
    var vtheftCollectionView = new VTheftCollectionView({
        collection: vtheftCollection
    });

    $('#vtheft-form-container').html(vtheftFormView.render().el);
    $('#vtheft-collection-table').append(vtheftCollectionView.render().el);
});