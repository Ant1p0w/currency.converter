<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\SystemException;

class CCurrencyConverter extends CBitrixComponent
{
    protected $currencyList = [];

    protected function checkModules()
    {
        if (!Loader::includeModule('currency')) {
            throw new SystemException(Loc::getMessage('CMI_CURRENCY_MODULE_NOT_INSTALLED'));
        }
    }

    protected function prepareData()
    {

        $by = "date";
        $order = "desc";

        $db_rate = CCurrencyRates::GetList($by, $order, []);
        while ($ar_rate = $db_rate->Fetch()) {
            $this->currencyList[] = $ar_rate;
        }

    }

    protected function formatResult()
    {
        foreach ($this->currencyList as $currency) {
            $this->arResult['CURRENCIES'][] = [
                'id'   => (int)$currency['ID'],
                'name' => $currency['CURRENCY'],
                'rate' => [
                    'rate' => (int)$currency['RATE'],
                    'created_at' => $currency['DATE_RATE']
                ],
            ];
        }
    }

    public function executeComponent()
    {
        try {
            $this->checkModules();
            $this->prepareData();
            $this->formatResult();

            if ($this->startResultCache()) {
                $this->includeComponentTemplate();
            }
        } catch (SystemException $e) {
            ShowError($e->getMessage());
        }
        return $this->arResult;
    }
}

;
