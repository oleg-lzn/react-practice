const [destinations, setDestinations] = useState([]);

const addDestination = newDestination =>
  setDestinations(prev => [...prev, newDestination]);

const getDestination = id => destinations.find(dest => dest.id === id);

const updateDestination = (id, data) =>
  setDestinations(prev =>
    prev.map(dest => (dest.id === id ? { ...dest, ...data } : dest))
  );

const deleteDestination = id =>
  setDestinations(prev => prev.filter(dest => dest.id !== id));
