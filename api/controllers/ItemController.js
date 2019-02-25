/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - myhomepage 
    myhomepage: async function (req, res) {

        var items = await Item.find();
        return res.view('item/myhomepage', { 'allItems': items });
    },

    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/create');

        if (typeof req.body.Item === "undefined")
            return res.badRequest("Form-data not received.");

        await Item.create(req.body.Item);

        return res.ok("Successfully created!");
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

