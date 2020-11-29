import { useSelector } from "react-redux";

import { Flex, Box } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";

function Currency({
  value,
  sourceCurrencyCode,
  noPrefix = false,
  noSuffix = false,
  ...restProps
}) {
  const { prefix, suffix, ratePerDollar: targetRatePerDollar } = useSelector(
    state =>
      state.app.currency.optionsByCode[state.app.currency.currentCode || "usd"]
  );

  const sourceRatePerDollar = useSelector(
    state => state.app.currency.optionsByCode[sourceCurrencyCode]?.ratePerDollar
  );

  const valueInDollars = value * sourceRatePerDollar;
  const valueInTargetCurrency = valueInDollars * targetRatePerDollar;

  return (
    <Flex align="center" {...restProps}>
      {!noPrefix && (
        <Box as="span" mr={1} fontWeight="500">
          {prefix}
        </Box>
      )}

      <CurrencyFormat
        value={parseFloat(valueInTargetCurrency).toFixed(2)}
        displayType="text"
        thousandSeparator={true}
      />

      {!noSuffix && (
        <Box as="span" ml={1}>
          {suffix}
        </Box>
      )}
    </Flex>
  );
}

export default Currency;
