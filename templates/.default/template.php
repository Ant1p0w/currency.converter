<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}
$this->addExternalCss($templateFolder . "/node_modules/element-ui/lib/theme-chalk/index.css");
?>
<div id="currency-converter">
    <currency-converter-component bitrix-sessid="<?=bitrix_sessid()?>" template-folder='<?= $templateFolder ?>' :currencies='<?=\Bitrix\Main\Web\Json::encode($arResult['CURRENCIES'])?>'/>
</div>
