import { ChakraProvider } from "@chakra-ui/react";

import theme from "configs/site.theme";

function AppProvider({ children, ...restProps }) {
  return (
    <ChakraProvider resetCSS theme={theme} {...restProps}>
      {children}
    </ChakraProvider>
  );
}

export default AppProvider;
