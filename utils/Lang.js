artjs.Lang = artjs.utils.Lang = {
  _name: 'Lang',
  
  setLang: function(lang) {
    this._lang = lang;
  },
  
  getLang: function(lang) {
    return this._lang;
  },
  
  t: function() {
    var path = artjs.$A(arguments);
    
    this._node = this._translations[this._lang];
    
    artjs.Array.each(path, this._updateNode, this);
    
    return this._node;
  },
  
  _updateNode: function(i) {
    this._node = this._node[i];
  },
  
  _lang: 'en',
  
  _translations: {
    en: {
      datepicker: {
        months: [
          'January', 
          'February', 
          'March', 
          'April', 
          'May', 
          'June', 
          'July', 
          'August', 
          'September', 
          'October', 
          'November', 
          'December'
        ],
        days: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
      }
    },
    
    pl: {
      datepicker: {
        months: [
          'Styczeń', 
          'Luty', 
          'Marzec', 
          'Kwiecień', 
          'Maj', 
          'Czerwiec', 
          'Lipiec', 
          'Sierpień', 
          'Wrzesień', 
          'Październik', 
          'Listopad', 
          'Grudzień'
        ],
        days: ['Nd', 'Po', 'Wt', 'Śr', 'Cz', 'Pt', 'So']
      }
    }
  }
};
