export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Grocery", label: "Grocery" },
      { id: "Snacks", label: "Snacks" },
      { id: "Beverages", label: "Beverages" },
      { id: "Dairy", label: "Dairy" },
      { id: "Household", label: "Household" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "Lipton", label: "Lipton" },
      { id: "Hilal", label: "Hilal" },
      { id: "Shan", label: "Shan" },
      { id: "Nestle", label: "Nestle" },
      { id: "Unilever", label: "Unilever" },
      { id: "pepsi", label: "pepsi" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "Grocery",
    label: "Grocery",
    path: "/shop/listing",
  },
  {
    id: "Snacks",
    label: "Snacks",
    path: "/shop/listing",
  },
  {
    id: "Beverages",
    label: "Beverages",
    path: "/shop/listing",
  },
  {
    id: "Dairy",
    label: "Dairy",
    path: "/shop/listing",
  },
  {
    id: "Household",
    label: "Household",
    path: "/shop/listing",
  },
 
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  Grocery: "Grocery",
  Snacks: "Snacks",
  Beverages: "Beverages",
  Dairy: "Dairy",
  Household: "Household",
};

export const brandOptionsMap = {
  Lipton: "Lipton",
  Hilal: "Hilal",
  Shan: "Shan",
  Nestle: "Nestle",
  Unilever: "Unilever",
  pepsi: "pepsi",
};

export const filterOptions = {
  category: [
    { id: "Grocery", label: "Grocery" },
    { id: "Snacks", label: "Snacks" },
    { id: "Beverages", label: "Beverages" },
    { id: "Dairy", label: "Dairy" },
    { id: "Household", label: "Household" },
  ],
  brand: [
    { id: "Lipton", label: "Lipton" },
    { id: "Hilal", label: "Hilal" },
    { id: "Shan", label: "Shan" },
    { id: "Nestle", label: "Nestle" },
    { id: "Unilever", label: "Unilever" },
    { id: "pepsi", label: "pepsi" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
