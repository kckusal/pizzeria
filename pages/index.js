import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import {
  Stack,
  Flex,
  Heading,
  Wrap,
  WrapItem,
  Image,
  Text,
  Button
} from "@chakra-ui/react";

import AppContainer from "components/AppContainer";
import SEO from "components/seo";
import Currency from "components/currency";

function MenuItemCounter({ data }) {
  const [count, setCount] = useState(0);
  const incrementBtnRef = useRef();

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - 1, 0));
  };

  const addToCart = () => {
    if (count === 0) {
      incrementBtnRef.current.focus();
      return;
    }
  };

  return (
    <>
      <Flex justify="center" fontSize="1.3rem" pt={2}>
        <Button size="sm" fontSize="1.5rem" pt={0} pb="2px" onClick={decrement}>
          -
        </Button>
        <Text as="span" width="40px" mx={2} textAlign="center">
          {count}
        </Text>
        <Button
          ref={incrementBtnRef}
          size="sm"
          fontSize="1.5rem"
          pt="0px"
          pb="2px"
          onClick={increment}
        >
          +
        </Button>
      </Flex>

      <Button colorScheme="primary" onClick={addToCart}>
        Add to Cart : &nbsp; <Currency value={data.price * count} />
      </Button>
    </>
  );
}

function MenuItem({ data, ...restProps }) {
  const { title, type, image, price, discount } = data;
  const placeholderImageUrl = useSelector(
    state => state.constants.placeholderImageUrl
  );

  return (
    <Stack
      as={WrapItem}
      width="234px"
      height="400px"
      boxShadow="1"
      bg="white"
      role="group"
      transition="box-shadow 0.3s linear, cursor 0.3s linear"
      _hover={{ boxShadow: 4, cursor: "pointer" }}
      {...restProps}
    >
      <Flex overflow="hidden" position="relative">
        {discount && (
          <Flex
            position="absolute"
            top="0px"
            left="0px"
            bg="gray.800"
            color="gray.200"
            width="65px"
            height="45px"
            justify="center"
            align="center"
            fontSize="xl"
            zIndex="2"
          >
            <strong>- </strong>
            {discount}
          </Flex>
        )}

        <Image
          src={image}
          width="full"
          fallbackSrc={placeholderImageUrl}
          transition="filter 0.3s linear, transform 0.3s linear"
          zIndex={1}
          _groupHover={{ filter: "brightness(0.8)", transform: "scale(1.2)" }}
        />
      </Flex>

      <Stack width="full" px={3} spacing={0}>
        <Heading as="h3" fontSize="lg">
          {title}
        </Heading>
        <Text color="gray.500">{type}</Text>

        <Stack pt={2} spacing={4}>
          <Currency value={price} justify="center" fontSize="2.1rem" />

          <MenuItemCounter data={data} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function Home({ menu: { items } }) {
  return (
    <AppContainer>
      <SEO
        title="Menu"
        description="View today's available items in Pizzeria's menu."
      />

      <Stack width="full" height="full" py={8}>
        <Heading as="h1" fontSize="2xl" textAlign="center">
          Today's Menu
        </Heading>

        <Flex pt={2}>
          ** All the shown prices are discounts- and VAT- inclusive.
        </Flex>

        <Wrap pt={8} spacing={8}>
          {items.map((item, i) => (
            <MenuItem key={i} data={item} />
          ))}
        </Wrap>
      </Stack>
    </AppContainer>
  );
}

Home.getInitialProps = async () => {
  return {
    menu: {
      items: [
        {
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/f863041741c3f9ee037075aed8012aa3.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "20",
          currency: "usd"
        },

        {
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/d091ceb09c21e319a51cc8df10784dfb.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "40",
          currency: "usd"
        },

        {
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/07251fc98d3c680af6f65c672eccc26a.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "25",
          currency: "usd",
          discount: "50%"
        },

        {
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/de184c7f73f381efcd5e79ef61ea7b95.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "30",
          currency: "usd"
        },

        {
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/065e0d76b81b09780c04e8ce95a423ad.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "28",
          currency: "usd"
        }
      ]
    }
  };
};
