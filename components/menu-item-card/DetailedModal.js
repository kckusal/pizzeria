import React from "react";
import { useSelector } from "react-redux";

import {
  Image,
  Flex,
  Stack,
  Tag,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";

import AddToCartButton from "./AddToCartButton";
import Currency from "components/currency";

function DetailedModalOnClick({ id, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const placeholderImageUrl = useSelector(
    state => state.constants.placeholderImageUrl
  );
  const item = useSelector(state => state.menu.itemsById[id]);

  return (
    <>
      {id &&
        React.Children.only(children) &&
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: onOpen
            });
          }
          return child;
        })}
      {id && (
        <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <span>{item.title}</span>
              <Flex fontSize="md" color="gray.500">
                {item.type}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Stack} spacing={6}>
              <Flex justify="center">
                <Image
                  src={item.image}
                  width="full"
                  maxWidth="360px"
                  maxHeight="250px"
                  fallbackSrc={placeholderImageUrl}
                  objectFit="contain"
                />
              </Flex>

              <Stack>
                <Flex fontSize="lg" fontWeight="500">
                  Ingredients
                </Flex>
                <Wrap>
                  {item.ingredients.split(",").map((ing, i) => (
                    <WrapItem as={Tag} alignItems="center" key={`${ing}-${i}`}>
                      {ing}
                    </WrapItem>
                  ))}
                </Wrap>
              </Stack>
            </ModalBody>

            <Flex
              as={ModalFooter}
              justify="space-between"
              height="80px"
              align="center"
              fontSize="xl"
            >
              <Currency
                value={item.price.value}
                sourceCurrencyCode={item.price.currencyCode}
                fontSize="3xl"
                fontWeight="500"
              />

              <AddToCartButton itemId={id} />
            </Flex>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default DetailedModalOnClick;
