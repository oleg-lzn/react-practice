const [destinations, setDestinations] = useState({
  id: 1,
  name: "Paris",
  price: 20,
});

// CREATE
const addDestination = data => {
  setDestinations(prev => ({ ...prev, ...data }));
};

// UPDATE
const updateDestination = (key, value) => {
  setDestinations(prev => ({ ...prev, [key]: value }));
};

// DELETE
const deleteDestination = key => {
  setDestinations(prev => {
    const copy = { ...prev };
    delete copy[key];
    return copy;
  });
};
