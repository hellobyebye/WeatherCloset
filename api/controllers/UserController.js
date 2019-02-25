/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401);
            return res.send("User not found");
        }

        const match = await sails.bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.role = user.role;
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

    //add item to my closet
    add: async function (req, res) {

        if (!await User.findOne(req.session.userid)) return res.notFound();

        if (!await Item.findOne(parseInt(req.params.fk))) return res.notFound();

        //await User.addToCollection(req.session.userid, 'owns').members(req.params.fk);

        return res.ok('Operation completed.');

    },
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/create');

        if (typeof req.body.Item === "undefined")
            return res.badRequest("Form-data not received.");

        if (!await User.findOne(req.session.userid)) return res.send("User not found");
        var user = await User.findOne(req.session.userid);
        
        if (!req.body.Item) return res.send("Item not find");;
        var item = req.body.Item;
        item.userId = user.id;

        await Item.create(item);

        if (req.wantsJSON) {
            return res.json(item);
        } else {
            return res.ok("Successfully created!");
        }
    },

    //remove item from my closet
    remove: async function (req, res) {

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (!await User.findOne(req.session.userid)) return res.notFound();

        await User.removeFromCollection(req.session.userid, 'owns').members(req.params.fk);

        return res.ok('Operation completed.');

    },

    //My Closet Items
    myItems: async function (req, res) {

        var myItems = await User.findOne(req.session.userid).populate('owns');

        if (req.wantsJSON) {
            return res.json(myItems.owns);
        } else {
            return res.view('user/myItems', { 'Items': myItems.owns });
        }
    },

};

