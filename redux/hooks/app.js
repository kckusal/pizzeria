import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { changeCurrency as createChangeCurrency } from "redux/actions";

function useAppSettings() {
  const dispatch = useDispatch();

  const currency = useSelector(state => state.app.currency);

  const changeCurrency = useCallback(newCurrencyCode => {
    if (currency.currentCode !== newCurrencyCode) {
      dispatch(createChangeCurrency(newCurrencyCode));
    }
  });

  // { v: 500, cod: "npr"  }, "eur"
  const convertCurrency = useCallback(
    (source, targetCurrencyCode, fixedToNPlaces = 2) => {
      const { value, currencyCode } = source;

      const sourceValueInDollar = parseFloat(
        Number(value) /
          Number(currency.optionsByCode[currencyCode].ratePerDollar)
      ).toFixed(10);

      return {
        value: Number(
          parseFloat(
            sourceValueInDollar *
              currency.optionsByCode[targetCurrencyCode].ratePerDollar
          ).toFixed(fixedToNPlaces)
        ),
        currencyCode: targetCurrencyCode
      };
    }
  );

  return { currency, changeCurrency, convertCurrency };
}

export default useAppSettings;
