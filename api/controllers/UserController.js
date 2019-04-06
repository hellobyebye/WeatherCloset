/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.email) return res.badRequest();
        if (!req.body.password) return res.badRequest();

        var user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(401);
            return res.send("User not found");
        }

        const match = await sails.bcrypt.compare(req.body.password, user.password);
        const match2 = await req.body.password === user.password;
        console.log(match, "+", match2);
        if (!match && !match2) {
            res.status(403);
            return res.send("Wrong Password");
        }

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.email = user.email;
            req.session.userid = user.id;

            sails.log("Session: " + JSON.stringify(req.session));

            // return res.json(req.session);

            if (req.wantsJSON) {
                return res.redirect('/item/allItems');
            } else {
                return res.ok("Login successfully");
            }
        });

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {
            if (err) return res.serverError(err);

            return res.ok("Log out successfully");
        });
    },

    populate: async function (req, res) {

        if (!['owns'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await User.findOne(req.params.id).populate(req.params.association);

        if (!model) return res.notFound();

        return res.json(model);

    },

    // //add item to my closet
    // add: async function (req, res) {

    //     if (!await User.findOne(req.session.userid)) return res.notFound();

    //     if (!await Item.findOne(parseInt(req.params.fk))) return res.notFound();

    //     //await User.addToCollection(req.session.userid, 'owns').members(req.params.fk);

    //     return res.ok('Operation completed.');

    // },

    //create new user
    signup: async function (req, res) {

        if (req.method == "GET")
            return res.view('user/signup');

        if (typeof req.body.User === "undefined")
            return res.badRequest("Form-data not received.");

        if (!req.body.User) return res.send("User not find");

        var user = req.body.User;
        sails.bcrypt = require('bcrypt');
        const saltRounds = 10;
        const hash = await sails.bcrypt.hash(user.password, saltRounds);
        user.password = hash;

        console.log("new user: " + JSON.stringify(user));

        await User.create(user);

        if (req.wantsJSON) {
            return res.json(user);
        } else {
            return res.ok("Successfully created!");
        }

    },

    //create new item, and add to user's closet
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/create');

        if (typeof req.body.Item === "undefined")
            return res.badRequest("Form-data not received.");

        if (!await User.find({ where: { userId: req.session.userid } })) return res.send("User not found");
        //var user = await User.find({ where: { userId: req.session.userid } });

        if (!req.body.Item) return res.send("Item not find");;
        var item = req.body.Item;
        item.userId = req.session.userid;
        item.status = true;
        console.log("item.status: " + item.status);
        console.log("Item.userId: " + item.userId);

        await Item.create(item);

        if (req.wantsJSON) {
            return res.json(item);
        } else {
            return res.ok("Successfully created!");
        }
    },

    //create new outfit, and add to user's closet
    createOutfit: async function (req, res) {

        if (req.method == "GET")
            return res.view('outfit/create');

        if (typeof req.body.Outfit === "undefined")
            return res.badRequest("Form-data not received.");

        if (!await User.find({ where: { userId: req.session.userid } })) return res.send("User not found");

        if (!req.body.Outfit) return res.send("Outfit not find");
        var outfit = req.body.Outfit;
        outfit.userId = req.session.userid;

        await Outfit.create(outfit);

        if (req.wantsJSON) {
            return res.json(outfit);
        } else {
            return res.ok("Successfully created!");
        }
    },

    // //remove item from my closet
    // remove: async function (req, res) {

    //     const message = sails.getInvalidIdMsg(req.params);

    //     if (message) return res.badRequest(message);

    //     if (!await User.findOne(req.session.userid)) return res.notFound();

    //     await User.removeFromCollection(req.session.userid, 'owns').members(req.params.fk);

    //     return res.ok('Operation completed.');

    // },

    //size
    mySize: async function (req, res) {

        var mysizes = await User.findOne(req.session.userid).populate('owns');

        if (req.wantsJSON) {
            //return res.json(myItems.owns);
        } else {
            return res.view('user/mySize', { 'Sizes': mysizes });
        }
    },

    // show user profile
    myProfile: async function (req, res) {

        var user = await User.find({ where: { id: req.session.userid } });
        //console.log("current user: "+ JSON.stringify(user));

        return res.json(user);

    },

    // update user profile
    updateProfile: async function (req, res) {

        if (req.method == "GET") {

            var model = await User.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('user/updateProfile', { 'user': model });

        } else {

            if (typeof req.body.User === "undefined")
                return res.badRequest("Form-data not received.");

            var models = await User.update(req.session.userid).set({
                username: req.body.User.username || req.session.username,
                email: req.body.User.email || req.session.email,
                age: req.body.User.age,
                gender: req.body.User.gender,
            }).fetch();

            console.log("updat user id: " + JSON.stringify(req.session.userid));
            console.log("updated user: " + JSON.stringify(models));

            if (models.length == 0) return res.notFound();

            if (req.wantsJSON) {
                return res.json(models);
            }

        }
    },

};

