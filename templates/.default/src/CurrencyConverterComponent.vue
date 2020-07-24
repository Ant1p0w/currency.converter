<template>
    <div class="currency-converter" v-loading="loading">
        <h1 class="currency-converter__title">Валютный калькулятор</h1>
        <div class="currency-converter__row" v-if="currencies.length >= 2">
            <div class="currency-converter__form-container">
                <el-form label-position="top" ref="converterForm" label-width="120px">
                    <el-form-item label="Обменять" prop="price">
                        <el-input v-model="price"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="Из" prop="currency_from">
                                <el-select v-model="currency_from" placeholder="Select">
                                    <el-option
                                        v-for="currency in currencies"
                                        :key="currency.id"
                                        :label="currency.name"
                                        :value="currency.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="text-center" :span="8">
                            <el-form-item>
                                <el-button icon="el-icon-refresh" circle @click="switchCurrencies"></el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="На" prop="currency_from">
                                <el-select v-model="currency_to" placeholder="Select">
                                    <el-option
                                        v-for="currency in currencies"
                                        :key="currency.id"
                                        :label="currency.name"
                                        :value="currency.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="currency-converter__result">
                <strong>Вы получите</strong>
                <div class="currency-converter__result-value">
                    {{result_value}}
                </div>
                <div class="currency-converter__result-currency">
                    {{result_currency}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CurrencyConverterComponent',
        props: {
            bitrixSessid: String,
            templateFolder: String,
            currencies: Array
        },
        data: function () {
            return {
                loading: true,
                price: 10000,
                currency_from: '',
                currency_to: ''
            }
        },
        mounted() {
            this.loading = false;
            this.currency_from = this.currencies[0].id;
            this.currency_to = this.currencies[1].id;
        },
        computed: {
            currency_from_rate: function () {
                if (this.currencies.length) {
                    return this.currencies.find(currency => currency.id === this.currency_from).rate.rate;
                }
            },
            currency_to_rate: function () {
                if (this.currencies.length) {
                    return this.currencies.find(currency => currency.id === this.currency_to).rate.rate;
                }
            },
            currency_from_name: function () {
                if (this.currencies.length) {
                    return this.currencies.find(currency => currency.id === this.currency_from).name;
                }
            },
            currency_to_name: function () {
                if (this.currencies.length) {
                    return this.currencies.find(currency => currency.id === this.currency_to).name;
                }
            },
            result_value: function () {
                if (this.currency_from_rate && this.currency_from_rate) {
                    let price = this.price / this.currency_from_rate * this.currency_to_rate;
                    return this.formatCurrency(price, this.currency_to_name);
                }
            },
            result_currency: function () {
                if (this.currency_from_rate && this.currency_from_rate) {
                    let from = this.formatCurrency(1, this.currency_from_name);
                    let to = this.formatCurrency(1 / this.currency_from_rate * this.currency_to_rate, this.currency_to_name);
                    return from + ' = ' + to;
                }
            }
        },
        methods: {
            formatCurrency: function (value, name) {
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: name
                }).format(value);
            },
            switchCurrencies: function () {
                let old_to = this.currency_to;
                this.currency_to = this.currency_from;
                this.currency_from = old_to;
            }
        },
    }
</script>
<style lang="scss"></style>
