const PROJECT_URL = "https://gnjmwcwsfmqjuuktbqsg.supabase.co"
const PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imduam13Y3dzZm1xanV1a3RicXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYzOTU4ODIsImV4cCI6MTk3MTk3MTg4Mn0.wHq_IbEop8_EEY6DduUhRtvSynZsMRmyFKspZYVZB6s"

const connection = supabase.createClient(PROJECT_URL, PUBLIC_ANON_KEY)

const registerUser = async (firstname, lastname, email, password) => {
  const { user, session, error } = await connection.auth.signUp(
    {
      email,
      password
    },
    {
      data: {
        firstname,
        lastname
      }
    }
  )

  return user;
}

const signInUser = async (email, password) => {
  const { user, session, error } = await connection.auth.signIn(
    {
      email,
      password
    }
  )
  console.log("user: ", user)
  console.log("session: ", connection.auth.session())

}

const getProducts = async (category, ascending = null) => {
  console.log("ascending: ", ascending)
  if (ascending == null) {
    alert("no sort")
    const { data, error } = await connection
      .from('products')
      .select("*, category(*), product_images:product_images_productId_fkey(src),type(description)")
      .eq("categoryId", category)
    return { data, error }

  } else {

    const { data, error } = await connection
      .from('products')
      .select("*, category(*), product_images:product_images_productId_fkey(src),type(description)")
      .eq("categoryId", category)
      .order("price", { ascending })
    return { data, error }

  }
}
const findProducts = async (query) => {

  const { data, error } = await connection
    .from('products')
    .select("*, category(*), product_images:product_images_productId_fkey(src),type(description)")
    .ilike("name", `%${query}%`)
  return { data, error }
}

const findProduct = async (id) => {
  const { data, error } = await connection
    .from('products')
    .select("*, category(*), product_images:product_images_productId_fkey(src),type(description)")
    .eq("id", id)

  return { data, error }
}

const addToCart = async (userId, productId, quantity) => {
  // check if product is already on cart
  const cartItem = await connection
    .from('cart')
    .select("*", { count: 'exact' })
    .match({ productId, userId })

  if (cartItem.count == 0) {
    // if product is not yet on cart
    const { data, error } = await connection
      .from('cart')
      .insert([
        {
          productId,
          userId,
          quantity
        }
      ])
    return { data, error }

  } else {
    // if exist
    const { data, error } = await connection
      .from('cart')
      .update({ quantity: Number(cartItem.data[0].quantity) + Number(quantity) })
      .eq("productId", cartItem.data[0].productId)

    return { data, error }

  }
}

const getCartItems = async (userId) => {
  const { data, error } = await connection
    .from('cart')
    .select("*, products:productId(*,type(description),product_images:product_images_productId_fkey(src),category(description))")
    .eq("userId", userId)
    .order('id', { ascending: false })

  return { data, error }
}

const updateCart = async (item) => {
  if (item.quantity != undefined) {
    const { data, error } = await connection
      .from('cart')
      .update({ quantity: item.quantity })
      .eq("id", item.itemId)

    return { data, error }
  } else {
    const { data, error } = await connection
      .from('cart')
      .update({ isChecked: item.isChecked })
      .eq("id", item.itemId)

    return { data, error }
  }

}

const addToOrders = async (order) => {
  const userId = await connection.auth.user().id;
  const { data, error } = await connection
    .from('orders')
    .insert([
      {
        userId,
        price: order.price,
        status: 0,
        address: order.address
      }
    ])

  console.log("order data: ", data)
  // save shipping address
  await connection.auth.update({
    data: { shippingAddress: order.address }
  })
  var suborders = []
  if (data) {

    for (let product of order.products) {
      const result = await connection
        .from('suborders')
        .insert([
          {
            orderId: data[0].id,
            productId: product.id,
            quantity: product.quantity,
            price: product.price
          }
        ])
      if (result.data && !suborders.includes(product.cartId)) {
        suborders.push(product.cartId)
      }
    }

    // remove products from cart
    for (let sub of suborders) {
      console.log("cartId: ", sub)
      const { data, error } = await connection
        .from("cart")
        .delete()
        .match({ id: sub })
    }
  }

  return { data, error }
}

const getOrders = async () => {
  const user = await connection.auth.user();

  const { data, error } = await connection
    .from('orders')
    .select("*, suborders:id(*,products(*,product_images:product_images_productId_fkey(src)))")
    .eq("userId", user.id)
    .order("id", { ascending: false })

  return { data, error }
}

const removeCartItem = async (id) => {
  const { data, error } = await connection
    .from("cart")
    .delete()
    .match({ id })
}
