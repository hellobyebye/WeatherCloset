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

  if (await Item.count() > 0) {
    return done();
  }

  await Item.createEach([
    {
      name: "tshirt1", category: "top", style: "casual", remark: "This is a T-shirt",
      image_URL: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi-zv6_ybjfAhVNdXAKHeOYAQYQjRx6BAgBEAU&url=https%3A%2F%2Fwww.sunspel.com%2Fuk%2Fmens-short-sleeve-crew-neck-t-shirt-black.html&psig=AOvVaw3lSTUloWP4YBI9h-iSF52v&ust=1545744597809742", 
      temperature: "25", season: "summer", wind: "medium", material: "cotton", color: "white"
    },
    {
      name: "skirt1", category: "bottom", style: "casual", remark: "This is a skirt",
      image_URL: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwinnuPRybjfAhVCfXAKHQhgAbIQjRx6BAgBEAU&url=https%3A%2F%2Fwww.amazon.com%2FUrban-CoCo-Womens-Versatile-Stretchy%2Fdp%2FB07BSZSR2Y&psig=AOvVaw0RyqKK5XVeF69Wi8vTk1aw&ust=1545744633638892", 
      temperature: "25", season: "summer", wind: "weak", material: "cotton", color: "black"
    },
  ]);


  const hash = await sails.bcrypt.hash('123456', saltRounds);

  await User.createEach([
    { "username": "user", "password": hash, "role": "user" },
    { "username": "user2", "password": hash, "role": "user" },
    // etc.
  ]);

  const user = await User.findOne({ username: "user" });
  const tshirt = await Item.findOne({ name: "tshirt1" });
  const skirt = await Item.findOne({ name: "skirt1" });

  // await User.addToCollection(user.id, 'owns').members(tshirt.id);
  // await User.addToCollection(user.id, 'owns').members(skirt.id);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
