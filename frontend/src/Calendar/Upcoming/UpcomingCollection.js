var Backbone = require('backbone');
var moment = require('moment');
var EpisodeModel = require('Series/EpisodeModel');

module.exports = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/calendar',
  model: EpisodeModel,

  comparator(model1, model2) {
    var airDate1 = model1.get('airDateUtc');
    var date1 = moment(airDate1);
    var time1 = date1.unix();

    var airDate2 = model2.get('airDateUtc');
    var date2 = moment(airDate2);
    var time2 = date2.unix();

    if (time1 < time2) {
      return -1;
    }

    if (time1 > time2) {
      return 1;
    }

    return 0;
  }
});