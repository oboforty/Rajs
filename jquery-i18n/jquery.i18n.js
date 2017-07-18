/*!
 * jQuery i18n plugin
 * @requires jQuery v1.1 or later
 *
 * See https://github.com/recurser/jquery-i18n
 *
 * Licensed under the MIT license.
 *
 * Version: 1.1.1 (Sun, 05 Jan 2014 05:26:50 GMT)
 */
(function ($) {
    /**
     * i18n provides a mechanism for translating strings using a jscript dictionary.
     *
     */

    var __slice = Array.prototype.slice;

    /*
     * i18n property list
     */
    var i18n = {

        dict: null,

        /**
         * load()
         *
         * Load translations.
         *
         * @param  property_list i18n_dict : The dictionary to use for translation.
         */
        load: function (i18n_dict) {
            if (this.dict !== null) {
                $.extend(this.dict, i18n_dict);
            } else {
                this.dict = i18n_dict;
            }
        },

        /**
         * applyDom()
         *
         * Reload translations. Define data-trans-key="TRANSLATIONKEY" in your html elements
         */
        applyDom: function () {
            $("[data-translated!=1][data-trans-key]").each(function (i, e) {
                $(this)._t($(this).attr("data-trans-key"));
                $(this).attr("data-translated", 1);
            });
        },

        /**
         * _()
         *
         * Looks the given string up in the dictionary and returns the translation if
         * one exists. If a translation is not found, returns the original word.
         *
         * @param  string str           : The string to translate.
         * @param  property_list params.. : params for using printf() on the string.
         *
         * @return string               : Translated word.
         */
        _: function (str) {
            var dict = this.dict, args;
            if (dict && dict.hasOwnProperty(str)) {
                str = dict[str];
            } else {
              return null;
            }

            if (arguments.length > 2) {
                args = [];
                args[0] = str;
                args[1] = __slice.call(arguments);
                args[1] = args[1].slice(1);
            } else {
                args = __slice.call(arguments);
                args[0] = str;
            }
            // Substitute any params.
            return this.printf.apply(this, args);
        },

        /*
         * printf()
         *
         * Substitutes %s with parameters given in list. %%s is used to escape %s.
         *
         * @param  string str    : String to perform printf on.
         * @param  string args   : Array of arguments for printf.
         *
         * @return string result : Substituted string
         */
        printf: function (str, args) {
            if (typeof args === "object") {
                str = str.replace(/{{\w+}}/g, function (all) {
                    var sKey = all.substring(2, all.length - 2);
                    return args[sKey] || all;
                });
            } else if (typeof args === "array") {
                str = str.replace(/{{\w+}}/g, function (all) {
                    var sKey = parseInt(all.substring(2, all.length - 2));
                    return args[sKey] || all;
                });
            }

            return str;
        }

    };

    /*
     * _t()
     *
     * Allows you to translate a jQuery selector.
     *
     * eg $('h1')._t('some text')
     *
     * @param  string str           : The string to translate .
     * @param  property_list params : Params for using printf() on the string.
     *
     * @return element              : Chained and translated element(s).
    */
    $.fn._t = function (str, params) {
      //var target = $(this).attr('data-trans-target');
      var trans = i18n._.apply(i18n, arguments);

      if (!trans)
        return;

      var target = $(this).attr('data-trans-target');

      if (typeof target === "undefined")
          target = "html";
      
      if (target == "html")
          return $(this).html(trans);
      else if (target == "value")
          return $(this).val(trans);
      else
          return $(this).attr(target, trans);
    };

    $._t = function (str, params) {
        return i18n._.apply(i18n, arguments);
    };

    $.i18n = i18n;
})(jQuery);
