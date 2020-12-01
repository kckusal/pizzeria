import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

import { Stack, Flex, Heading, Image, Text, Icon } from "@chakra-ui/react";
import { FiZoomIn } from "react-icons/fi";

import Currency from "components/currency";

const AddToCartButtonWithNoSSR = dynamic(() => import("./AddToCartButton"), {
  ssr: false
});

const DetailedModalOnClickWithNoSSR = dynamic(() => import("./DetailedModal"), {
  ssr: false
});

function MenuItem({ data, horizontal = false, ...restProps }) {
  const { id, title, type, image, price } = data;

  const placeholderImageUrl = useSelector(
    state => state.constants.placeholderImageUrl
  );

  return (
    <Stack
      direction={horizontal ? "row" : "column"}
      width={horizontal ? "full" : "250px"}
      maxWidth="660px"
      height={horizontal ? "130px" : "340px"}
      boxShadow="1"
      bg="white"
      role="group"
      transition="box-shadow 0.3s linear, cursor 0.3s linear"
      _hover={{ boxShadow: 5, cursor: "pointer" }}
      {...restProps}
      zIndex="0"
    >
      <DetailedModalOnClickWithNoSSR id={id}>
        <Flex
          overflow="hidden"
          position="relative"
          width="full"
          height={horizontal ? "full" : "156px"}
          minWidth="155px"
          maxWidth="250px"
          justify="center"
          align="center"
        >
          {price.discountPercent && (
            <Flex
              position="absolute"
              top="0px"
              left="0px"
              bg="gray.800"
              color="gray.200"
              width="full"
              maxWidth="75px"
              height="45px"
              justify="center"
              align="center"
              fontSize="xl"
              zIndex="2"
            >
              <strong>−</strong>
              <Flex ml="1px" mr="2px">
                {price.discountPercent}
              </Flex>
              %
            </Flex>
          )}

          <Flex
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            bg="gray.700"
            color="gray.50"
            zIndex="2"
            px={2}
            py={1}
            fontSize="sm"
            opacity="0"
            align="center"
            _groupHover={{ opacity: 1 }}
          >
            <Icon as={FiZoomIn} mr={1} /> Click here or title for details.
          </Flex>

          <Image
            src={image}
            width="full"
            height={horizontal ? "full" : "auto"}
            objectFit={horizontal ? "contain" : "scale-down"}
            bg="gray.100"
            fallbackSrc={placeholderImageUrl}
            transition="filter 0.3s linear, transform 0.3s linear"
            zIndex={1}
            _groupHover={{
              filter: "brightness(0.8)",
              transform: "scale(1.15)"
            }}
          />
        </Flex>
      </DetailedModalOnClickWithNoSSR>

      <Stack width="full" px={3} py={horizontal ? 3 : 0} spacing={0}>
        <DetailedModalOnClickWithNoSSR id={id}>
          <Heading
            as="h3"
            display="inline-block"
            alignSelf="flex-start"
            fontSize="lg"
            borderBottom="2px solid"
            borderBottomColor="transparent"
            _hover={{ borderBottomColor: "gray.500" }}
          >
            {title}
          </Heading>
        </DetailedModalOnClickWithNoSSR>
        <Text my={0} color="gray.500">
          {type}
        </Text>

        <Stack
          direction={horizontal ? "row" : "column"}
          height="full"
          justify="center"
          align="center"
          pt={2}
          px={2}
          py={horizontal ? 4 : 1}
          spacing={horizontal ? 2 : 4}
        >
          <Currency
            value={price.value}
            sourceCurrencyCode={price.currencyCode}
            justify="center"
            fontSize="1.7rem"
            fontWeight="500"
            width="full"
            my={1}
          />

          <Flex width="full" height="40px" justify="center">
            <AddToCartButtonWithNoSSR itemId={id} />
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MenuItem;
