/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  sails.getInvalidIdMsg = function (opts) {

    if (opts.id && isNaN(parseInt(opts.id))) {
      return "Primary key specfied is invalid (incorrect type).";
    }
    if (opts.fk && isNaN(parseInt(opts.fk))) {
      return "Foreign key specfied is invalid (incorrect type).";
    }
    return null;        // falsy
  }

  sails.bcrypt = require('bcrypt');
  const saltRounds = 10;
  const hash = await sails.bcrypt.hash('123456', saltRounds);

  await User.createEach([
    { "username": "user", "password": hash, "email": "user@gmail.com", gender: "female", age: 22 },
    { "username": "user2", "password": hash, "email": "user2@gmail.com", gender: "male", age: 21 },
    // etc.
  ]);

  if (await Item.count() > 0) {
    return done();
  }

  const user = await User.findOne({ username: "user" });
  const userId = user.id;
  const user2 = await User.findOne({ username: "user2" });
  const user2Id = user2.id;

  await Item.createEach([
    {
      name: "tshirt1", category: "top", style: "holiday", remark: "This is a T-shirt",
      image_URL: "https://res.cloudinary.com/teepublic/image/private/s--iIpdpqFc--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829017:production:blanks:qe3008lhp5hquxmwp4a0,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_285,q_90,w_285/v1548276441/production/designs/4066543_0",
      temperature: "25", season: "summer", wind: "medium", material: "cotton", color: "white", userId: userId
    },
    {
      name: "bottom1", category: "bottom", style: "holiday", remark: "This is a shorts",
      image_URL: "https://factory.jcrew.com/s7-img-facade/E8819_DM1256",
      temperature: "25", season: "summer", wind: "medium", material: "denim", color: "white", userId: userId
    },
    {
      name: "tshirt2", category: "top", style: "daily", remark: "This is a pink T-shirt",
      image_URL: "https://cdn.shopify.com/s/files/1/1285/7087/products/LOST_IN_JAPAN_launching_5.18_b171bbcc-3eb1-40c8-acb7-ddc8a26d06ed_1024x1024.png?v=1527262491",
      temperature: "25", season: "summer", wind: "medium", material: "cotton", color: "pink", userId: userId
    },
    {
      name: "tshirt3", category: "top", style: "daily", remark: "This is a black T-shirt",
      image_URL: "https://cdn.shopify.com/s/files/1/2029/4253/products/Damb_Back_2a3cc4cc-06c2-488e-8918-2e7a1cde3dfc_530x@2x.jpg?v=1503962227",
      temperature: "25", season: "summer", wind: "medium", material: "cotton", color: "black", userId: userId
    },
    {
      name: "suit1", category: "suit", style: "work", remark: "This is a suit",
      image_URL: "https://i1.adis.ws/i/tom_ford/21Y74V-411R47_NVY_APPENDGRID?$listing_grid$",
      temperature: "25", season: "", wind: "medium", material: "", color: "black", userId: userId
    },
    {
      name: "red skirt", category: "bottom", style: "daily", remark: "This is a red skirt",
      image_URL: "https://www.dancinginthestreet.com/imagecache/c8353be8-3cb9-4e9e-936c-a723008ae655_800x800.jpg",
      temperature: "25", season: "summer", wind: "weak", material: "cotton", color: "red", userId: userId
    },
    {
      name: "plaid skirt", category: "bottom", style: "daily", remark: "This is a yellow plaid skirt",
      image_URL: "https://m.media-amazon.com/images/I/91D149WZJNL._SR500,500_.jpg",
      temperature: "25", season: "summer", wind: "weak", material: "cotton", color: "plaid, yellow", userId: userId
    },
    {
      name: "skirt1", category: "bottom", style: "daily", remark: "This is a skirt",
      image_URL: "https://images-na.ssl-images-amazon.com/images/I/411RPnLvQBL._SX342_QL70_.jpg",
      temperature: "25", season: "summer", wind: "weak", material: "cotton", color: "black", userId: user2Id
    },
  ]);
  const tshirt1 = await Item.findOne({ name: "tshirt1" });
  const skirt1 = await Item.findOne({ name: "skirt1" });

  await Outfit.createEach([
    {
      oName: "outfit1", style: "holiday", remark: "This is a T-shirt",
      image_URL: "https://cdn.shopify.com/s/files/1/2377/4733/products/Outfit_168__1400_2048x2048.jpg?v=1537227483",
      temperature: "25", season: "summer", userId: userId
    },
    {
      oName: "outfit2", style: "holiday", remark: "This is a T-shirt",
      image_URL: "https://cdn.shopify.com/s/files/1/2377/4733/products/Outfit_Tienda_270_2048x2048.jpg?v=1552486994",
      temperature: "25", season: "summer", userId: userId
    },
  ]);
  const outfit1 = await Outfit.findOne({ oName: "outfit1" });
  const outfit2 = await Outfit.findOne({ oName: "outfit2" });

  await Size.createEach([
    {
      sizeType: "shoes", sizeData: "38", userId: userId
    }, {
      sizeType: "shoulder", sizeData: "40", userId: userId
    },
  ]);


  await Item.addToCollection(tshirt1.id, 'in').members(outfit1.id);
  await Item.addToCollection(tshirt1.id, 'in').members(outfit2.id);

  await Outfit.addToCollection(outfit1.id, 'contains').members(skirt1.id);
  await Outfit.addToCollection(outfit1.id, 'contains').members(tshirt1.id);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
