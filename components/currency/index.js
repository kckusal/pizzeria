import { useSelector } from "react-redux";

import { Flex, Box } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";

function Currency({
  value,
  currency = "usd",
  noPrefix = false,
  noSuffix = false,
  ...restProps
}) {
  const { prefix, suffix } = useSelector(
    state => state.app.currency.optionsByCode[state.app.currency.currentCode]
  );

  return (
    <Flex align="center" {...restProps}>
      {!noPrefix && (
        <Box as="span" mr={1} fontWeight="500">
          {prefix}
        </Box>
      )}

      <CurrencyFormat
        value={value}
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
