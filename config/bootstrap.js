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

  sails.bcrypt = require('bcrypt');
  const saltRounds = 10;

  sails.getInvalidIdMsg = function (opts) {

    if (opts.id && isNaN(parseInt(opts.id))) {
      return "Primary key specfied is invalid (incorrect type).";
    }

    if (opts.fk && isNaN(parseInt(opts.fk))) {
      return "Foreign key specfied is invalid (incorrect type).";
    }

    return null;        // falsy

  }

  const hash = await sails.bcrypt.hash('123456', saltRounds);

  await User.createEach([
    { "username": "user", "password": hash, "role": "user", gender: "female", age: 22 },
    { "username": "user2", "password": hash, "role": "user", gender: "male", age: 21 },
    // etc.
  ]);

  if (await Item.count() > 0) {
    return done();
  }

  const user = await User.findOne({ username: "user" });
  const userId = user.id;

  await Item.createEach([
    {
      name: "tshirt1", category: "top", style: "casual", remark: "This is a T-shirt",
      image_URL: "https://res.cloudinary.com/teepublic/image/private/s--iIpdpqFc--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829017:production:blanks:qe3008lhp5hquxmwp4a0,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_285,q_90,w_285/v1548276441/production/designs/4066543_0",
      temperature: "25", season: "summer", wind: "medium", material: "cotton", color: "white", userId: userId
    },
    {
      name: "skirt1", category: "bottom", style: "casual", remark: "This is a skirt",
      image_URL: "https://images-na.ssl-images-amazon.com/images/I/411RPnLvQBL._SX342_QL70_.jpg",
      temperature: "25", season: "summer", wind: "weak", material: "cotton", color: "black", userId: userId
    },
  ]);


  // await User.addToCollection(user.id, 'owns').members(tshirt.id);
  // await User.addToCollection(user.id, 'owns').members(skirt.id);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
