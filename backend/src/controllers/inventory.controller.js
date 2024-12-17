const inventory = [
    { id: 1, name: "Hammer", category: "Tools", stock: 50, price: 15.99 },
    { id: 2, name: "Nails (1kg)", category: "Materials", stock: 200, price: 5.49 },
    { id: 3, name: "Screwdriver", category: "Tools", stock: 30, price: 7.99 },
    { id: 4, name: "Paint Bucket", category: "Paint", stock: 20, price: 25.0 },
    { id: 5, name: "Drill Machine", category: "Tools", stock: 10, price: 99.99 },
    { id: 6, name: "Wood Plank", category: "Materials", stock: 15, price: 12.5 },
  ];
  
  const getInventory = (req, res) => {
    res.status(200).json(inventory);
  };
  
  export  { getInventory };
  