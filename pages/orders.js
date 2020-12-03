import { useState, useEffect } from "react";

import {
  Stack,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Tag
} from "@chakra-ui/react";

import useUser from "redux/hooks/user";
import useMenu from "redux/hooks/menu";
import AppContainer from "components/AppContainer";
import Currency from "components/currency";
import WithNoSSR from "components/WithNoSSR";
import SEO from "components/seo";

function OrderItem({ data }) {
  const { itemsById } = useMenu();

  return (
    <Stack
      bg="white"
      boxShadow={1}
      px={3}
      py={4}
      spacing={4}
      maxWidth={500}
      role="group"
      _hover={{ boxShadow: 3, bg: "gray.50", cursor: "pointer" }}
    >
      <Flex fontSize="0.95rem" align="center">
        <Flex mr={2}>Order Date: </Flex>
        {data.createdAt && new Date(data.createdAt).toLocaleString()}
      </Flex>

      <Stack spacing={0}>
        <Flex align="center">
          <Stat>
            <StatLabel color="gray.500">Delivery Fees</StatLabel>
            <StatNumber>
              <Currency
                sourceCurrencyCode={data.currencyCode}
                value={data.deliveryCost}
                fontSize="lg"
              />
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel color="gray.500">Sum Total</StatLabel>
            <StatNumber>
              <Currency
                sourceCurrencyCode={data.currencyCode}
                value={data.sumTotal}
                fontSize="lg"
              />
            </StatNumber>
          </Stat>
        </Flex>
      </Stack>

      <Stack>
        <Flex fontSize="md" fontWeight="500">
          Items & their quantities:
        </Flex>

        <Stack direction="row" flexWrap="wrap" spacing={2} fontSize="sm">
          {Object.entries(data.items).map(item => (
            <Flex as={Tag} key={item[0]} px={2} fontWeight="400" align="center">
              <span>{itemsById[item[0]].title}: &nbsp;</span>
              <strong> {item[1]}</strong>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function Orders() {
  const { authenticated, data: { orders } = {} } = useUser();

  return (
    <AppContainer>
      <WithNoSSR>
        <SEO title="Orders" description="View your order history." />

        {authenticated ? (
          <Stack width="full" height="full" py={8}>
            <Flex fontSize="2xl" fontWeight="500">
              Order History
            </Flex>

            <Stack spacing={6}>
              {orders && orders.length > 0 ? (
                orders.map(order => {
                  return <OrderItem key={order.createdAt} data={order} />;
                })
              ) : (
                <Flex>No orders found.</Flex>
              )}
            </Stack>
          </Stack>
        ) : (
          <Flex
            mx="auto"
            my={6}
            fontSize="xl"
            justify="center"
            height="200px"
            align="center"
          >
            You must be logged in to see your order history.
          </Flex>
        )}
      </WithNoSSR>
    </AppContainer>
  );
}
