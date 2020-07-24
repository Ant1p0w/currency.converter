import CurrencyConverterComponent from './CurrencyConverterComponent';
import Vue from 'vue'
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-Ru'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

Vue.use(ElementUI);

new Vue({
    el: '#currency-converter',
    components: {
        CurrencyConverterComponent,
    },
});
