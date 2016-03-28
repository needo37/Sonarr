var Marionette = require('marionette');
var RadioView = require('./RadioView');
var Config = require('Config');

module.exports = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'actionbar-list actionbar-radio-list',
  childView: RadioView,

  attributes: {
    'data-toggle': 'buttons'
  },

  initialize(options) {
    this.menu = options.menu;

    this.setActive();

    this.listenTo(this, 'childview:click', this.childViewClicked);
  },

  setActive() {
    var storedKey = this.menu.defaultAction;

    if (this.menu.storeState) {
      storedKey = Config.getValue(this.menu.menuKey, storedKey);
    }

    if (!storedKey) {
      return;
    }
    this.collection.each(function(model) {
      if (model.get('key').toLocaleLowerCase() === storedKey.toLowerCase()) {
        model.set('active', true);
      } else {
        model.set('active', false);
      }
    });
  },

  childViewClicked(childView) {
    this.children.each(function(view) {
      if (view.model.get('key').toLocaleLowerCase() === childView.model.get('key').toLowerCase()) {
        view.model.set('active', true);
        view.$el.addClass('active');
      } else {
        view.model.set('active', false);
        view.$el.removeClass('active');
      }
    });
  }
});
