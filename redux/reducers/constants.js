const initialState = {
  appName: "Pizzeria",
  appLogoUrl: "",

  placeholderImageUrl: "https://via.placeholder.com/150",

  deliveryCost: {
    currencyCode: "usd",
    value: 20
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
