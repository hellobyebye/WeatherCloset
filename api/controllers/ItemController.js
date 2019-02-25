/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - allItems 
    allItems: async function (req, res) {

        var items = await Item.find();
        if (req.wantsJSON) {
            return res.json(items);
        } else {
            return res.view('item/allItems', { 'allItems': items });
        }
    },

    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/create');

        if (typeof req.body.Item === "undefined")
            return res.badRequest("Form-data not received.");

        //if (!await User.findOne(req.session.username)) return res.send("User not found");;

        // var user = await User.findOne({ username : req.session.username });

        await Item.create(req.body.Item);
        
        if (req.wantsJSON) {
            return res.json(item);
        } else {
            return res.ok("Successfully created!");
        }
    },

    populate: async function (req, res) {

        if (!['ownedBy'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await Item.findOne(req.params.id).populate(req.params.association);

        if (!model) return res.notFound();

        return res.json(model);
    },

};

